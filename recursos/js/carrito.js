// Ruta del archivo JSON
const URL_JSON = "./js/productos.json";

// Función principal para cargar los productos
const cargarProductos = async () => {
    try {
        // Realizar la solicitud al archivo JSON
        const respuesta = await fetch(URL_JSON);

        // Comprobar si la respuesta fue exitosa
        if (!respuesta.ok) {
            throw new Error(`Error al cargar productos: ${respuesta.status}`);
        }

        // Convertir la respuesta a JSON
        const productos = await respuesta.json();

        // Renderizar los productos en la página
        renderizarProductos(productos);

    } catch (error) {
        // Mostrar cualquier error en la consola
        console.error("Error al cargar los productos:", error);
    }
};

// Función para renderizar los productos en el DOM
const renderizarProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedor-productos");

    // Limpiar cualquier contenido existente
    contenedorProductos.innerHTML = "";

    // Iterar sobre los productos y crear elementos HTML
    productos.forEach((producto) => {
        const productoElemento = document.createElement("div");
        productoElemento.classList.add("producto");

        // Crear el contenido del producto
        productoElemento.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
            </div>
        `;

        // Agregar el producto al contenedor principal
        contenedorProductos.appendChild(productoElemento);
    });
};

// Inicializar la carga de productos al cargar la página
document.addEventListener("DOMContentLoaded", cargarProductos);
