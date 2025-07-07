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
  { nombre: "Vela Llama", imagen: "LLama 2.jpg", enlace: "#" },
  { nombre: "Vela Copa con osito", imagen: "Osito en copita.jpg", enlace: "#" },
  { nombre: "Vela Osito Esfera", imagen: "Osito en envase.jpg", enlace: "#" },
  { nombre: "Vela Gato", imagen: "Gato.jpg", enlace: "#" }
];

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
        window.location.href = p.enlace;
      });
      resultados.appendChild(div);
    });
  });
}

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

  // Nuevo: Si ya hay sesión, redirige al hacer click en "Cuenta"
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

  if (cerrarCuenta) {
    cerrarCuenta.addEventListener("click", () => {
      modalCuenta.classList.add("oculto");
      formCuenta.reset();
      limpiarError();
    });
  }

  if (formCuenta) {
    formCuenta.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();

      // Aquí puedes agregar más usuarios si deseas
      if (usuario === "isaias" && contrasena === "isaias811") {
        localStorage.setItem("usuarioActivo", "Adrián Isaías Huamaní Ramos");
        window.location.href = "cuenta.html";
      } else {
        mostrarError("Usuario o contraseña incorrectos.");
      }
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
  carritoTotal.textContent = total.toFixed(2);

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

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del modal
  const modal = document.getElementById("modal-producto");
  const modalImg = document.getElementById("modal-img");
  const modalNombre = document.getElementById("modal-nombre");
  const modalDesc = document.getElementById("modal-desc");
  const modalPrecio = document.getElementById("modal-precio");
  const cerrarModal = document.getElementById("cerrar-producto");

  const productos = document.querySelectorAll(".producto");

  // Abrir modal con info del producto
  productos.forEach((producto) => {
    producto.addEventListener("click", () => {
      const nombre = producto.getAttribute("data-nombre");
      const precio = producto.getAttribute("data-precio");
      const descripcion = producto.getAttribute("data-desc");
      const imagen = producto.getAttribute("data-img");

      modalImg.src = imagen;
      modalImg.alt = nombre;
      modalNombre.textContent = nombre;
      modalDesc.textContent = descripcion;
      modalPrecio.textContent = `S/ ${precio}`; // ✅

      modal.classList.remove("oculto");
      modal.classList.add("activo");
    });
  });

  // Cerrar modal al hacer clic en "X"
  cerrarModal.addEventListener("click", () => {
    modal.classList.remove("activo");
    modal.classList.add("oculto");
  });

  // Cerrar modal si se hace clic fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("activo");
      modal.classList.add("oculto");
    }
  });
});

