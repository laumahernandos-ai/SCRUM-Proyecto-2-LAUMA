import React, { useState } from 'react';
import categoriasData from './data/categories.json';
import productosData from './data/products.json';

function App() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // Estados para el Proceso de Checkout (Sprint 4)
  const [pasoCheckout, setPasoCheckout] = useState('carrito'); // 'carrito' | 'formulario' | 'confirmado'
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: ''
  });

  // Funciones del Carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  // Manejo de inputs del Formulario
  const manejarInputChange = (e) => {
    setDatosEnvio({
      ...datosEnvio,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvioFormulario = (e) => {
    e.preventDefault();
    setPasoCheckout('confirmado');
  };

  const cerrarYResetear = () => {
    setMostrarCarrito(false);
    if (pasoCheckout === 'confirmado') {
      setCarrito([]);
      setPasoCheckout('carrito');
      setDatosEnvio({ nombre: '', email: '', direccion: '', telefono: '' });
    }
  };

  const productosFiltrados = categoriaSeleccionada
    ? productosData.filter((prod) => prod.categoriaId === categoriaSeleccionada)
    : productosData;

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f9f8f6', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* Header con Contador */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <h1 style={{ color: '#2d3748', fontSize: '1.5rem', margin: 0 }}>🌿 Tienda Botánica</h1>
        </div>
        <button
          onClick={() => {
            setMostrarCarrito(true);
            if (pasoCheckout === 'confirmado') setPasoCheckout('carrito');
          }}
          style={{ padding: '8px 16px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          🛒 Carrito ({totalProductos})
        </button>
      </header>

      <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '0 20px' }}>
        
        {/* Filtros de Categoría */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2d3748', fontSize: '1.2rem', marginBottom: '12px' }}>Categorías</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCategoriaSeleccionada(null)}
              style={{ padding: '8px 16px', borderRadius: '20px', border: '2px solid #059669', backgroundColor: categoriaSeleccionada === null ? '#059669' : '#ffffff', color: categoriaSeleccionada === null ? '#ffffff' : '#059669', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Todas
            </button>
            {categoriasData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                style={{ padding: '8px 16px', borderRadius: '20px', border: '2px solid #059669', backgroundColor: categoriaSeleccionada === cat.id ? '#059669' : '#ffffff', color: categoriaSeleccionada === cat.id ? '#ffffff' : '#059669', cursor: 'pointer', fontWeight: 'bold' }}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </section>

        {/* Catálogo */}
        <main>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {productosFiltrados.map((prod) => (
              <div key={prod.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ margin: '0 0 8px 0', color: '#1a202c', fontSize: '1rem' }}>{prod.nombre}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#4a5568', lineHeight: '1.4' }}>{prod.descripcion}</p>
                  </div>
                </div>
                <div style={{ padding: '16px', paddingTop: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#059669' }}>${prod.precio} MXN</span>
                  <button
                    onClick={() => agregarAlCarrito(prod)}
                    style={{ padding: '8px 12px', backgroundColor: '#1a202c', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    + Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal Lateral (Carrito + Guest Checkout) */}
      {mostrarCarrito && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '420px', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '-4px 0 10px rgba(0,0,0,0.1)', overflowY: 'auto' }}>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, color: '#1a202c', fontSize: '1.3rem' }}>
                  {pasoCheckout === 'carrito' && '🛍️ Tu Carrito'}
                  {pasoCheckout === 'formulario' && '📋 Datos de Envío (Invitado)'}
                  {pasoCheckout === 'confirmado' && '🎉 ¡Pedido Confirmado!'}
                </h2>
                <button onClick={cerrarYResetear} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✖</button>
              </div>

              {/* VISTA 1: LISTA DEL CARRITO */}
              {pasoCheckout === 'carrito' && (
                <>
                  {carrito.length === 0 ? (
                    <p style={{ color: '#718096', textAlign: 'center', marginTop: '40px' }}>El carrito está vacío</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto' }}>
                      {carrito.map((item) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #edf2f7', paddingBottom: '12px' }}>
                          <div>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#2d3748' }}>{item.nombre}</h4>
                            <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 'bold' }}>${item.precio * item.cantidad} MXN</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button onClick={() => cambiarCantidad(item.id, -1)} style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e0', cursor: 'pointer' }}>-</button>
                            <span>{item.cantidad}</span>
                            <button onClick={() => cambiarCantidad(item.id, 1)} style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e0', cursor: 'pointer' }}>+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* VISTA 2: FORMULARIO DE GUEST CHECKOUT */}
              {pasoCheckout === 'formulario' && (
                <form id="form-checkout" onSubmit={manejarEnvioFormulario} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568', marginBottom: '4px' }}>Nombre Completo *</label>
                    <input required type="text" name="nombre" value={datosEnvio.nombre} onChange={manejarInputChange} placeholder="Ej. Ana García" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568', marginBottom: '4px' }}>Correo Electrónico *</label>
                    <input required type="email" name="email" value={datosEnvio.email} onChange={manejarInputChange} placeholder="ana@ejemplo.com" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568', marginBottom: '4px' }}>Dirección de Envío Completa *</label>
                    <input required type="text" name="direccion" value={datosEnvio.direccion} onChange={manejarInputChange} placeholder="Calle, Número, Colonia, C.P." style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#4a5568', marginBottom: '4px' }}>Teléfono de Contacto *</label>
                    <input required type="tel" name="telefono" value={datosEnvio.telefono} onChange={manejarInputChange} placeholder="55 1234 5678" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e0', borderRadius: '6px', boxSizing: 'border-box' }} />
                  </div>
                </form>
              )}

              {/* VISTA 3: CONFIRMACIÓN DEL PEDIDO */}
              {pasoCheckout === 'confirmado' && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📦</div>
                  <h3 style={{ color: '#059669', marginBottom: '10px' }}>¡Gracias por tu compra, {datosEnvio.nombre}!</h3>
                  <p style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: '1.5' }}>
                    Hemos enviado los detalles del pedido y el número de rastreo a: <br />
                    <strong>{datosEnvio.email}</strong>
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '15px' }}>
                    Dirección registrada: {datosEnvio.direccion}
                  </p>
                </div>
              )}

            </div>

            {/* BOTONES INFERIORES DE ACCIÓN */}
            <div style={{ borderTop: '2px solid #edf2f7', paddingTop: '16px', marginTop: '16px' }}>
              
              {pasoCheckout === 'carrito' && carrito.length > 0 && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}>
                    <span>Total:</span>
                    <span style={{ color: '#059669' }}>${totalPrecio} MXN</span>
                  </div>
                  <button onClick={() => setPasoCheckout('formulario')} style={{ width: '100%', padding: '12px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                    Proceder a Datos de Envío ➔
                  </button>
                </>
              )}

              {pasoCheckout === 'formulario' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setPasoCheckout('carrito')} style={{ flex: 1, padding: '12px', backgroundColor: '#e2e8f0', color: '#2d3748', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    ⬅ Volver
                  </button>
                  <button type="submit" form="form-checkout" style={{ flex: 2, padding: '12px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Confirmar Pedido (${totalPrecio} MXN)
                  </button>
                </div>
              )}

              {pasoCheckout === 'confirmado' && (
                <button onClick={cerrarYResetear} style={{ width: '100%', padding: '12px', backgroundColor: '#1a202c', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Volver a la Tienda
                </button>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;