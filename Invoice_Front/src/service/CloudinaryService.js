import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
    if (!imageData) {
        throw new Error('No image data provided');
    }

    const formData = new FormData();
    
    // Handle different input types
    if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
        // Convert base64 to blob
        const response = await fetch(imageData);
        const blob = await response.blob();
        formData.append('file', blob, `invoice_${Date.now()}.png`);
    } else if (imageData instanceof File) {
        formData.append('file', imageData);
    } else {
        throw new Error('Invalid file provided - expected File object or base64 string');
    }
    
    formData.append('upload_preset', 'invoice-thumbnail');

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dgbiowyya/image/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        
        return response.data.secure_url;
    } catch (error) {
        console.error('Upload error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || 'Upload failed');
    }
};