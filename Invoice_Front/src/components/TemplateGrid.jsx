import React from 'react'
import { templates } from '../assets/assets'

export default function TemplateGrid({onTemplateClick}) {
  return (
    <div className="container py-4">
      <div className="row g-4">

        {templates.map(({ id, label, image }) => (
          
          <div className="col-12 col-sm-6 col-lg-4" key={id}>
            
            <div
              className="border rounded shadow-sm overflow-hidden h-100"
              title={label}
              onClick={()=>onTemplateClick(id)}
              style={{ 
                cursor: "pointer",
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              
              {/* Image container with background */}
              <div style={{ 
                height: '200px',
                backgroundColor: '#e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid #dee2e6'
              }}>
                <img
                  src={image}
                  alt={label}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  loading="lazy"
                />
              </div>

              {/* Template label */}
              <div className="p-3 text-center fw-medium">
                {label}
              </div>

            </div>

          </div>

        ))}

      </div>
    </div>
  )
}