// =====================
// Notificación visual
// =====================
function mostrarNotificacion(mensaje) {
  const contenedor = document.getElementById("notificacion-contenedor");
  if (!contenedor) return;

  const notificacion = document.createElement("div");
  notificacion.classList.add("notificacion");
  notificacion.textContent = mensaje;
  contenedor.appendChild(notificacion);

  setTimeout(() => {
    notificacion.remove();
  }, 3000);
}

// =====================
// Carrito persistente
// =====================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// =====================
// Modal de búsqueda
// =====================
const botonBusqueda = document.querySelector(".boton-busqueda");
const modal = document.getElementById("modal-busqueda");
const cerrar = document.getElementById("cerrar-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");
const resultados = document.getElementById("resultados-busqueda");

const productos = [
  { nombre: "Vela Llamita", imagen: "LLama 2.jpg", enlace: "#" },
  { nombre: "Vela Copa con Osito", imagen: "Osito en copita.jpg", enlace: "#" },
  { nombre: "Vela Osito Esfera", imagen: "Osito en envase.jpg", enlace: "#" },
  { nombre: "Vela Gatito", imagen: "Gato.jpg", enlace: "#" }
];

// ✨ Datos para el modal de detalle
const productosDetalle = {
  "Vela Llamita": {
    img: "LLama 2.jpg",
    precio: "S/ 13.00",
    descripcion: "Una vela en forma de llamita, ideal para regalar o decorar con ternura y calidez."
  },
  "Vela Copa con Osito": {
    img: "Osito en copita.jpg",
    precio: "S/ 9.00",
    descripcion: "Un encantador osito dentro de una copa. Perfecto para detalles delicados y tiernos."
  },
  "Vela Osito Esfera": {
    img: "Osito en envase.jpg",
    precio: "S/ 15.00",
    descripcion: "Osito dentro de una esfera de cera, elegante y adorable. Aporta calidez y estilo."
  },
  "Vela Gatito": {
    img: "Gato.jpg",
    precio: "S/ 10.00",
    descripcion: "Pequeña vela en forma de gatito. Perfecta para amantes de los felinos y la decoración minimalista."
  }
};

// ✨ Modal de detalle
const modalDetalle = document.getElementById("modal-detalle-busqueda");
const cerrarDetalle = document.getElementById("cerrar-detalle-busqueda");
const detalleImagen = document.getElementById("detalle-imagen");
const detalleTitulo = document.getElementById("detalle-titulo");
const detallePrecio = document.getElementById("detalle-precio");
const detalleDescripcion = document.getElementById("detalle-descripcion");

if (botonBusqueda) {
  botonBusqueda.addEventListener("click", () => {
    modal.classList.remove("oculto");
    inputBusqueda.focus();
  });

  cerrar.addEventListener("click", () => {
    modal.classList.add("oculto");
    inputBusqueda.value = "";
    resultados.innerHTML = "";
  });

  inputBusqueda.addEventListener("input", () => {
    const filtro = inputBusqueda.value.toLowerCase();
    resultados.innerHTML = "";

    const filtrados = productos.filter((p) =>
      p.nombre.toLowerCase().includes(filtro)
    );

    filtrados.forEach((p) => {
      const div = document.createElement("div");
      div.classList.add("producto-busqueda");
      div.innerHTML = `<img src="${p.imagen}" alt="${p.nombre}"><span>${p.nombre}</span>`;

      div.addEventListener("click", () => {
        const datos = productosDetalle[p.nombre];
        if (datos) {
          detalleImagen.src = datos.img;
          detalleImagen.alt = p.nombre;
          detalleTitulo.textContent = p.nombre;
          detallePrecio.textContent = datos.precio;
          detalleDescripcion.textContent = datos.descripcion;
          modalDetalle.classList.remove("oculto");
        } else {
          window.location.href = p.enlace;
        }
      });

      resultados.appendChild(div);
    });
  });
}

// ✨ Cerrar modal de detalle
cerrarDetalle?.addEventListener("click", () => {
  modalDetalle.classList.add("oculto");
});


// =====================
// Carrusel automático
// =====================
let indexSlide = 0;
const slides = document.querySelectorAll(".slide");
setInterval(() => {
  slides.forEach(slide => slide.classList.remove("activo"));
  indexSlide = (indexSlide + 1) % slides.length;
  slides[indexSlide].classList.add("activo");
}, 4000);

// =====================
// Modal de cuenta
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const enlaceCuenta = document.querySelector(".cuenta");
  const modalCuenta = document.getElementById("modal-cuenta");
  const cerrarCuenta = document.getElementById("cerrar-cuenta");
  const formCuenta = document.getElementById("form-cuenta");

  // Nuevos elementos para los otros modales
  const enlaceCrearCuenta = document.getElementById("enlace-crear-cuenta");
  const enlaceOlvido = document.getElementById("enlace-olvido");

  const modalCrearCuenta = document.getElementById("modal-crear-cuenta");
  const modalRecuperar = document.getElementById("modal-recuperar");

  const cerrarCrear = document.getElementById("cerrar-crear-cuenta");
  const cerrarRecuperar = document.getElementById("cerrar-recuperar");

  // Mostrar el modal de cuenta solo si no hay sesión
  if (enlaceCuenta) {
    enlaceCuenta.addEventListener("click", (e) => {
      e.preventDefault();
      const usuario = localStorage.getItem("usuarioActivo");
      if (usuario) {
        window.location.href = "cuenta.html";
      } else {
        modalCuenta.classList.remove("oculto");
      }
    });
  }

  // Cerrar modal de iniciar sesión
  if (cerrarCuenta) {
    cerrarCuenta.addEventListener("click", () => {
      modalCuenta.classList.add("oculto");
      formCuenta.reset();
      limpiarError();
    });
  }

  // Enviar formulario de iniciar sesión
  if (formCuenta) {
    formCuenta.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();

      // Aquí puedes agregar más validaciones
      if (usuario === "isaias" && contrasena === "isaias811") {
        localStorage.setItem("usuarioActivo", "Adrián Isaías Huamaní Ramos");
        window.location.href = "cuenta.html";
      } else {
        mostrarError("Usuario o contraseña incorrectos.");
      }
    });
  }

  // Mostrar modal de Crear Cuenta
  if (enlaceCrearCuenta) {
    enlaceCrearCuenta.addEventListener("click", (e) => {
      e.preventDefault();
      modalCuenta.classList.add("oculto");
      modalCrearCuenta.classList.remove("oculto");
    });
  }

  // Mostrar modal de Recuperar Contraseña
  if (enlaceOlvido) {
    enlaceOlvido.addEventListener("click", (e) => {
      e.preventDefault();
      modalCuenta.classList.add("oculto");
      modalRecuperar.classList.remove("oculto");
    });
  }

  // Cerrar modal de Crear Cuenta
  if (cerrarCrear) {
    cerrarCrear.addEventListener("click", () => {
      modalCrearCuenta.classList.add("oculto");
    });
  }

  // Cerrar modal de Recuperar Contraseña
  if (cerrarRecuperar) {
    cerrarRecuperar.addEventListener("click", () => {
      modalRecuperar.classList.add("oculto");
    });
  }

  function mostrarError(mensaje) {
    let error = document.getElementById("error-login");
    if (!error) {
      error = document.createElement("p");
      error.id = "error-login";
      error.style.color = "red";
      error.style.marginTop = "1rem";
      formCuenta.appendChild(error);
    }
    error.textContent = mensaje;
  }

  function limpiarError() {
    const error = document.getElementById("error-login");
    if (error) error.remove();
  }
});




// =====================
// Carrito
// =====================
const botonesAgregar = document.querySelectorAll(".boton-carrito");
const carritoModal = document.getElementById("carrito-modal");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const carritoItems = document.getElementById("carrito-items");
const carritoTotal = document.getElementById("carrito-total");
const carritoBtn = document.querySelector(".carrito");

const cuponInput = document.getElementById("cupon-input");
const aplicarCuponBtn = document.getElementById("aplicar-cupon");
const cuponMensaje = document.getElementById("cupon-mensaje");

let descuentoActivo = false;
let porcentajeDescuento = 0;

if (carritoBtn && carritoModal) {
  carritoBtn.addEventListener("click", () => {
    actualizarCarrito();
    carritoModal.classList.remove("oculto");
  });

  cerrarCarrito.addEventListener("click", () => {
    carritoModal.classList.add("oculto");
  });
}

botonesAgregar.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const producto = e.target.closest(".producto");
    const nombre = producto.querySelector("h3").textContent;
    const precio = parseFloat(producto.querySelector(".precio").textContent.replace("S/ ", ""));
    const existente = carrito.find(p => p.nombre === nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarNotificacion("Vela agregada al carrito.");
  });
});

function actualizarCarrito() {
  carritoItems.innerHTML = "";
  let total = 0;
  carrito.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item-carrito");
    itemDiv.innerHTML = `
      <div class="item-info">
        <strong>${item.nombre}</strong>
        <div>S/ ${(item.precio * item.cantidad).toFixed(2)}</div>
      </div>
      <div class="item-cantidad">
        <input type="number" min="1" value="${item.cantidad}" data-index="${index}" />
        <button class="eliminar-btn" data-index="${index}">✕</button>
      </div>`;
    carritoItems.appendChild(itemDiv);
    total += item.precio * item.cantidad;
  });

  let totalFinal = total;
  if (descuentoActivo) {
    totalFinal = total - (total * porcentajeDescuento);
  }

  carritoTotal.textContent = totalFinal.toFixed(2);

  document.querySelectorAll('.item-cantidad input').forEach(input => {
    input.addEventListener('change', (e) => {
      const index = parseInt(e.target.dataset.index);
      const nuevaCantidad = parseInt(e.target.value);
      if (nuevaCantidad >= 1) {
        carrito[index].cantidad = nuevaCantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
      }
    });
  });

  document.querySelectorAll('.eliminar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCarrito();
    });
  });
}

// Aplicar cupón
if (aplicarCuponBtn && cuponInput) {
  aplicarCuponBtn.addEventListener("click", () => {
    const codigo = cuponInput.value.trim().toUpperCase();
    if (codigo === "LUMI15") {
      descuentoActivo = true;
      porcentajeDescuento = 0.15;
      cuponMensaje.style.color = "green";
      cuponMensaje.textContent = "Cupón aplicado: 15% de descuento.";
    } else {
      descuentoActivo = false;
      porcentajeDescuento = 0;
      cuponMensaje.style.color = "red";
      cuponMensaje.textContent = "Código inválido.";
    }
    actualizarCarrito();
  });
}


// =====================
// Personalizador de vela
// =====================
const imagenVela = document.getElementById("imagen-vela");
const formaRadios = document.querySelectorAll('input[name="forma"]');
const coloresCheckboxes = document.querySelectorAll('input[name="color"]');
const esenciasCheckboxes = document.querySelectorAll('input[name="esencia"]');
const mensajeSeccion = document.getElementById("seccion-mensaje");
const mensajeInput = document.getElementById("mensaje");
const precioSpan = document.getElementById("precio-total");

formaRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    const img = radio.getAttribute("data-img");
    imagenVela.src = img;

    if (radio.value === "envase") {
      mensajeSeccion.classList.remove("oculto");
    } else {
      mensajeSeccion.classList.add("oculto");
      mensajeInput.value = "";
    }
    actualizarPrecio();
  });
});

coloresCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const seleccionados = Array.from(coloresCheckboxes).filter(cb => cb.checked);
    if (seleccionados.length > 2) {
      checkbox.checked = false;
      mostrarNotificacion("Solo puedes seleccionar hasta 2 colores.");
    }
    actualizarPrecio();
  });
});

esenciasCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const seleccionados = Array.from(esenciasCheckboxes).filter(cb => cb.checked);
    if (seleccionados.length > 3) {
      checkbox.checked = false;
      mostrarNotificacion("Solo puedes seleccionar hasta 3 esencias.");
    }
    actualizarPrecio();
  });
});

mensajeInput?.addEventListener("input", () => {
  actualizarPrecio();
});

function actualizarPrecio() {
  const formaSeleccionada = document.querySelector('input[name="forma"]:checked');
  if (!formaSeleccionada) {
    precioSpan.textContent = "0.00";
    return;
  }

  const base = {
    llama: 11,
    copa: 7,
    envase: 12,
    gato: 8
  }[formaSeleccionada.value];

  const colores = Array.from(coloresCheckboxes).filter(cb => cb.checked).length;
  const esencias = Array.from(esenciasCheckboxes).filter(cb => cb.checked).length;
  const mensaje = mensajeInput?.value.trim();
  const incluirMensaje = formaSeleccionada.value === "envase" && mensaje;
  const total = base + colores * 1 + esencias * 3 + (incluirMensaje ? 5 : 0);

  precioSpan.textContent = total.toFixed(2);
}
const btnAgregarPersonalizado = document.getElementById("agregar-carrito");

if (btnAgregarPersonalizado) {
  btnAgregarPersonalizado.addEventListener("click", () => {
    const forma = document.querySelector('input[name="forma"]:checked');
    if (!forma) {
      mostrarNotificacion("Selecciona una forma de vela.");
      return;
    }

    const formaNombre = forma.parentElement.textContent.trim();
    const formaValor = forma.value;

    const base = {
      llama: 11,
      copa: 7,
      envase: 12,
      gato: 8
    }[formaValor];

    const colores = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(cb => cb.parentElement.textContent.trim());
    const esencias = Array.from(document.querySelectorAll('input[name="esencia"]:checked')).map(cb => cb.parentElement.textContent.trim());

    const mensaje = mensajeInput?.value.trim();
    const incluirMensaje = formaValor === "envase" && mensaje;

    const precioColor = colores.length * 1;
    const precioEsencia = esencias.length * 3;
    const precioMensaje = incluirMensaje ? 5 : 0;
    const total = base + precioColor + precioEsencia + precioMensaje;

    let descripcion = `Vela ${formaNombre}`;
    if (colores.length) descripcion += ` | Colores: ${colores.join(", ")}`;
    if (esencias.length) descripcion += ` | Esencias: ${esencias.join(", ")}`;
    if (incluirMensaje) descripcion += ` | Mensaje: "${mensaje}"`;

    carrito.push({
      nombre: descripcion,
      precio: total,
      cantidad: 1
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarNotificacion("Vela personalizada agregada al carrito.");
  });
}


//Modal de producto//

document.querySelectorAll('.producto-imagen').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.getElementById('modal-producto');
    document.getElementById('modal-img').src = img.src;
    document.getElementById('modal-titulo').textContent = img.dataset.titulo;
    document.getElementById('modal-precio').textContent = img.dataset.precio;
    document.getElementById('modal-descripcion').textContent = img.dataset.descripcion;
    modal.style.display = 'flex';
  });
});

document.getElementById('cerrar-modal-producto').addEventListener('click', () => {
  document.getElementById('modal-producto').style.display = 'none';
});

window.addEventListener('click', e => {
  const modal = document.getElementById('modal-producto');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Modal de producto destacado//

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-producto");
  const cerrarModal = document.getElementById("cerrar-modal-producto");
  const modalImg = document.getElementById("modal-producto-imagen");
  const modalTitulo = document.getElementById("modal-producto-titulo");
  const modalPrecio = document.getElementById("modal-producto-precio");
  const modalDescripcion = document.getElementById("modal-producto-descripcion");

  const descripciones = {
    "Vela Llamita": "Una adorable vela en forma de llama que ilumina con ternura cualquier rincón.",
    "Vela Copa con Osito": "Dulce combinación de vela en copa decorada con un tierno osito.",
    "Vela Osito Esfera": "Perfecta para regalo. Un osito en un encantador recipiente redondo.",
    "Vela Gatito": "Una vela para amantes de los gatos. Delicada y simpática."
  };

  // Asignar evento a todas las imágenes dentro de productos destacados
  document.querySelectorAll(".producto img").forEach(img => {
    img.addEventListener("click", () => {
      const producto = img.closest(".producto");
      const titulo = producto.querySelector("h3").textContent;
      const precio = producto.querySelector(".precio").textContent;

      modalImg.src = img.src;
      modalImg.alt = titulo;
      modalTitulo.textContent = titulo;
      modalPrecio.textContent = precio;
      modalDescripcion.textContent = descripciones[titulo] || "Producto sin descripción.";

      modal.classList.remove("oculto");
      modal.style.display = "flex";
    });
  });

  cerrarModal.addEventListener("click", () => {
    modal.classList.add("oculto");
    modal.style.display = "none";
  });
});

