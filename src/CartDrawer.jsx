// src/CartDrawer.jsx
import React from 'react';

export function CartDrawer({ onClose, items = [], onRemoveItem }) {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '350px',
          maxWidth: '90vw',
          height: '100%',
          backgroundColor: '#ffffff',
          padding: '20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 15px rgba(0,0,0,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Tu Carrito ({items.length})</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#555'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
          {items.length === 0 ? (
            <p style={{ color: '#777', textAlign: 'center', marginTop: '40px' }}>
              El carrito está vacío.
            </p>
          ) : (
            items.map((product, index) => (
              <div 
                key={index} 
                style={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #eee'
                }}
              >
                <div>
                  <strong style={{ display: 'block', fontSize: '1rem' }}>{product.name}</strong>
                  <span style={{ color: '#2b8a3e', fontWeight: 'bold' }}>${product.price ? product.price.toFixed(2) : '0.00'}</span>
                </div>
                {onRemoveItem && (
                  <button 
                    onClick={() => onRemoveItem(index)} 
                    style={{ color: '#e03131', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Quitar
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.1rem' }}>
            <strong>Total:</strong>
            <strong style={{ color: '#2b8a3e' }}>${total.toFixed(2)}</strong>
          </div>

          <button 
            onClick={onClose}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1c7ed6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Continuar comprando
          </button>
        </div>
      </div>
    </div>
  );
}