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


document.addEventListener("DOMContentLoaded", () => {
    // Carrito de compras: Objeto para gestionar productos reservados
    const carrito = {};

    // Obtener los botones de las categorías
    const todosButton = document.getElementById('todos');
    const movilesButton = document.getElementById('moviles');
    const portatilesButton = document.getElementById('portatiles');
    const televisionesButton = document.getElementById('televisiones');

    // Contenedor donde se mostrarán los productos
    const contenedorProductos = document.getElementById('contenedor-productos');
    const contadorCarrito = document.getElementById('contador-carrito');  // Contador de productos en el carrito

    // Función para renderizar los productos
    function renderizarProductos(categoria, productosJSON) {
        // Limpiar el contenedor de productos
        contenedorProductos.innerHTML = '';

        // Filtrar productos por categoría
        const productosFiltrados = productosJSON.filter(producto => categoria === 'todos' || producto.categoria.id === categoria);

        // Mostrar los productos filtrados
        productosFiltrados.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.dataset.categoria = producto.categoria.id;

            productoDiv.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="Imagen producto">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" data-id="${producto.id}">Agregar</button>
                </div>
            `;
            
            contenedorProductos.appendChild(productoDiv);
        });
    }

    // Función para agregar al carrito
    function agregarAlCarrito(productoId) {
        if (carrito[productoId]) {
            carrito[productoId].cantidad += 1;  // Incrementa la cantidad
        } else {
            // Si el producto no está en el carrito, se agrega con cantidad 1
            const producto = productosJSON.find(p => p.id === productoId);
            carrito[productoId] = {
                producto: producto,
                cantidad: 1
            };
        }

        // Actualizar contador de productos en el carrito
        actualizarContadorCarrito();
    }

    // Función para actualizar el contador del carrito
    function actualizarContadorCarrito() {
        const cantidadProductos = Object.values(carrito).reduce((total, item) => total + item.cantidad, 0);
        contadorCarrito.textContent = cantidadProductos;  // Actualiza el número en el contador
    }

    // Función para resaltar el botón activo
    function setActiveButton(button) {
        document.querySelectorAll('.boton-categoria').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }

    // Función para cargar productos desde el archivo JSON
    function cargarProductos() {
        fetch('./js/productos.json')  // La ruta al archivo JSON
            .then(response => response.json())
            .then(data => {
                // Guardamos los datos de los productos en la variable global productosJSON
                const productosJSON = data;

                // Renderizamos los productos al cargar la página
                renderizarProductos('todos', productosJSON);

                // Añadir eventos a los botones para filtrar los productos
                todosButton.addEventListener('click', () => {
                    renderizarProductos('todos', productosJSON);
                    setActiveButton(todosButton);
                });

                movilesButton.addEventListener('click', () => {
                    renderizarProductos('moviles', productosJSON);
                    setActiveButton(movilesButton);
                });

                portatilesButton.addEventListener('click', () => {
                    renderizarProductos('portatiles', productosJSON);
                    setActiveButton(portatilesButton);
                });

                televisionesButton.addEventListener('click', () => {
                    renderizarProductos('televisiones', productosJSON);
                    setActiveButton(televisionesButton);
                });

                // Escuchar clics en los botones de agregar
                contenedorProductos.addEventListener('click', (event) => {
                    if (event.target && event.target.classList.contains('producto-agregar')) {
                        const productoId = event.target.dataset.id;
                        agregarAlCarrito(productoId);
                    }
                });
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    }

    // Llamamos a la función para cargar los productos al iniciar
    cargarProductos();
});
