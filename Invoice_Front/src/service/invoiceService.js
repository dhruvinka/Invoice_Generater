import axios from 'axios';

export const getAllInvoices = (baseURL,token) => {
    return axios.get(`${baseURL}/invoice`,{
        headers : {
            Authorization:`Bearer ${token}`
        }
    });
}

export const saveInvoice = (baseURL, payload ,token) => {
    return axios.post(`${baseURL}/invoice`, payload,{
        headers : {
            Authorization:`Bearer ${token}`
        }
    });
}
export const deleteInvoice = (baseURL, id,token) => {
    return axios.delete(`${baseURL}/invoice/${id}`,{
        headers : {
            Authorization:`Bearer ${token}`
        }
    });
}
export const sendInvoice = (baseURL, formData,token) => {
    return axios.post(`${baseURL}/invoice/sendInvoice`, formData, {
        headers: {
             Authorization:`Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });
};



// Optional: Add error interceptor for better debugging
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data
        });
        return Promise.reject(error);
    }
);