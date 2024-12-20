const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const btnVaciarCarrito = document.getElementById(".btnVaciarCarrito");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const btnVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Mapeo de categorías a rutas
const categoryRoutes = {
    camisetas: "./camisetas.html",
    short: "./shorts.html",
    todos: "./verTodos.html"
};

function actualizarCarrito() {
    if (contenedorCarritoVacio && contenedorCarritoProductos && contenedorCarritoAcciones && contenedorCarritoComprado) {
        if (productosEnCarrito.length > 0) {
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.remove("disabled");
            contenedorCarritoAcciones.classList.remove("disabled");
            contenedorCarritoComprado.classList.add("disabled");
            contenedorCarritoProductos.innerHTML = "";
           

            productosEnCarrito.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("carrito-producto");
                div.innerHTML = `
                    <a href="#" class="carrito-producto-link" data-category="${producto.category}">
                        <img class="carrito-producto-imagen" src="${producto.image}" alt="${producto.name}">
                    </a>
                    <div class="carrito-producto-titulo">
                        <small>Título</small>
                        <h3>${producto.name}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$ ${producto.price}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$ ${producto.price * producto.cantidad}</p>
                    </div>
                    <button id="${producto.id}" class="carrito-producto-eliminar"><i class="bi bi-trash-fill"></i></button>
                `;
                contenedorCarritoProductos.append(div);
            });
            // Agregar eventos a los enlaces de producto
            const productLinks = document.querySelectorAll(".carrito-producto-link");
            productLinks.forEach(link => {
                link.addEventListener("click", e => {
                    e.preventDefault();
                    const category = e.currentTarget.getAttribute("data-category");
                    const route = categoryRoutes[category] || "verTodos.js";
                    window.location.href = route;
                });
            });
        } else {
            contenedorCarritoVacio.classList.remove("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.add("disabled");
            navCarrito();
        }
        actualizarBotonesEliminar();
        actualizarTotal();
    }
}
            
        

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto Eliminado ",
        duration: 1500,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, rgba(215, 231, 39),rgba(7, 30, 132))",
          margin: "1rem",
          borderRadius: "1rem",
          textTransform: "upperCase",
          fontSize: ".85rem"
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id.toString() === idBoton); // Asegúrate de comparar strings
    if (index !== -1) {
        productosEnCarrito.splice(index, 1);
        actualizarCarrito();
        actualizarNumerito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
}

actualizarCarrito();

function navCarrito() {
    const nav = document.querySelector(".navbar");
    nav.classList.add("fixed-top");
}

btnVaciar.addEventListener("click", vaciarCarrito);

    function vaciarCarrito(){
        
        Swal.fire({
            title: "Estás seguro?",
            text: `Se van a borrar ${productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad,0 )} producto/s`,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, vaciar!"
            
        }).then((result) => {
            if (result.isConfirmed) {
                
                    productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        actualizarCarrito();
        actualizarNumerito();
                
            }
        });
        
    }

function actualizarTotal()    {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.price* producto.cantidad),0);
    total.innerHTML = `$${totalCalculado} `;
}

botonComprar.addEventListener("click", comprarCarrito);
    function comprarCarrito(){
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
            navCarrito();
            actualizarNumerito();
        }


