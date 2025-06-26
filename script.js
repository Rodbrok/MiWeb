const productos = {
  Figuras: [
    { id: 1, nombre: "Darth Vader", precio: 40000, imagen: "imagenes/Vader.jpg"},
    { id: 2, nombre: "Batman", precio: 20000, imagen: "imagenes/Batman.jpg" },
    { id: 3, nombre: "Alien Xenomorph", precio: 30000, imagen: "imagenes/Alien.jpg" }
  ],
  Mascaras: [
    { id: 4, nombre: "MF Doom", precio: 25000, imagen: "imagenes/MfDoom.jpg" },
    { id: 5, nombre: "Mascara Samurai", precio: 10000, imagen: "imagenes/mascara samurai.jpg" }
  ],
  Decoracion: [
    { id: 6, nombre: "Lapicero Lego", precio: 8000, imagen: "imagenes/Lego.jpg" },
    { id: 7, nombre: "Florero Nefertiti", precio: 8500, imagen: "imagenes/Nefertiti.jpg" }
  ],
   Personalizado: [
    { id: 8, nombre: "Personalizar desde", precio: 10000, imagen: "imagenes/Perro.jpg" },
   ]
};

let carrito = [];

function mostrarCategoria(categoria) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";
  document.getElementById("carrito").style.display = "none";

  productos[categoria].forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const allProductos = [
    ...productos.Figuras, 
    ...productos.Mascaras, 
    ...productos.Decoracion, 
    ...productos.Personalizado
];

  const prod = allProductos.find(p => p.id === id);
  if (prod) {
    carrito.push(prod);
    setTimeout(() => {
  mensajeDiv.textContent = "";
}, 3000);
    const mensajeDiv = document.getElementById("mensaje-carrito");
mensajeDiv.textContent = `✅ ${prod.nombre} fue agregado al carrito.`;
  } else {
    alert("⚠️ Producto no encontrado.");
  }
}


function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalHTML = document.getElementById("total");
  document.getElementById("carrito").style.display = "block";
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
    total += item.precio;
  });

  totalHTML.textContent = total;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

// 🧪 Validación del Formulario
document.getElementById("form-contacto").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const motivo = document.getElementById("motivo").value;
  const mensaje = document.getElementById("mensaje").value.trim();
  const error = document.getElementById("mensaje-error");

  if (nombre.length < 3) {
    error.textContent = "Nombre debe tener al menos 3 letras.";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    error.textContent = "Correo inválido.";
    return;
  }

  if (!/^\d{7,15}$/.test(telefono)) {
    error.textContent = "Teléfono debe contener solo números y al menos 7 dígitos.";
    return;
  }

  if (!motivo) {
    error.textContent = "Selecciona un motivo válido.";
    return;
  }

  if (mensaje.length < 5) {
    error.textContent = "Mensaje muy corto.";
    return;
  }

  error.textContent = "";
  alert("Mensaje enviado correctamente 📨");
  this.reset();
});