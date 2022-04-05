const productos = [
    {
        id: 1,
        nombre: 'Zapallo Criollo',
        stock: 7,
        precio: 99,
        tipo: 'Verduras',
        imagen: '/images/zapallo criollo.jpg'
    },
    {
        id: 2,
        nombre: 'Uvas',
        stock: 0,
        precio: 300,
        tipo: 'Frutas',
        imagen: '/images/uva.jpg'
    },
    {
        id: 3,
        nombre: 'Bananas',
        stock: 10,
        precio: 189,
        tipo: 'Frutas',
        imagen: '/images/bananas.jpg'
    },
    {
        id: 4,
        nombre: 'Huevos',
        stock: 5,
        precio: 15,
        tipo: 'Huevos',
        imagen: '/images/huevo.jpg'
    },
    {
        id: 5,
        nombre: 'Papa',
        stock: 2,
        precio: 69,
        tipo: 'Verduras',
        imagen: '/images/papa.jpg'
    },
    {
        id: 6,
        nombre: 'Durazno',
        stock: 0,
        precio: 329,
        tipo: 'Frutas',
        imagen: '/images/durazno.jpg'
    },
    {
        id: 7,
        nombre: 'Zapallitos Verdes',
        stock: 0,
        precio: 259,
        tipo: 'Verduras',
        imagen: '/images/zapallitos.jpg'
    },
    {
        id: 8,
        nombre: 'Manzana',
        stock: 0,
        precio: 170,
        tipo: 'Frutas',
        imagen: '/images/manzana.jpg'
    },
    {
        id: 9,
        nombre: 'Ciruelas',
        stock: 0,
        precio: 170,
        tipo: 'Frutas',
        imagen: '/images/ciruela.jpg'
    },
    {
        id: 10,
        nombre: 'Lechuga',
        stock: 5,
        precio: 250,
        tipo: 'Verduras',
        imagen: '/images/lechuga.jpg'
    },
    {
        id: 11,
        nombre: 'Tomate',
        stock: 2,
        precio: 350,
        tipo: 'Verduras',
        imagen: '/images/tomate.jpg'
    },
    {
        id: 12,
        nombre: 'Limon',
        stock: 12,
        precio: 220,
        tipo: 'Frutas',
        imagen: '/images/limon.jpg'
    }
];
const carrito = [];
const DOMproductos = document.querySelector('#productos');
const DOMcarrito = document.querySelector('#lista-carrito tbody');
const DOMtotal = document.querySelector('#total');
const DOMdropProductos = document.querySelector('#lista-productos');

const DOMbtnComprar = document.querySelector('#boton-comprar');
const DOMbtnBorrar = document.querySelector('#boton-borrar');

DOMbtnBorrar.addEventListener('click',borrarCarrito);

document.querySelector('.btn-flotante').addEventListener('click',function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function ordenarObjetos(x, y) {
    if (x.nombre > y.nombre) {
        return 1;
    }
    else {
        return -1;
    }
}

function cargarProductos() {
    //Borro lo cargado en el DOM para que no repita al recargar
    DOMproductos.innerHTML ='';
    DOMdropProductos.innerHTML ='';

    productos.sort(ordenarObjetos);
    productos.forEach(prod => {
        // Creo los div de cada tarjeta
        const divCard = document.createElement('div');
        divCard.classList.add('col-sm-6');

        const nuevaCard = document.createElement('div');
        nuevaCard.classList.add('card','text-dark', 'bg-light');

        //Cargamos la imagen de la tarjeta
        const imgCard = document.createElement('img');
        imgCard.classList.add('card-img-top');
        imgCard.setAttribute('src', prod.imagen);
        imgCard.style.cssText = 'display: block;max-width: 100%;height: 6cm;';

        //Creacion del body de la tarjeta
        const bodyCard = document.createElement('div');
        bodyCard.classList.add('card-body');

        //Cargo los elementos de la tarjeta
        const tituloCard = document.createElement('h5');
        tituloCard.classList.add('card-title');
        tituloCard.textContent = prod.nombre;

        const precioCard = document.createElement('p');
        precioCard.classList.add('card-text');
        precioCard.textContent = `$${prod.precio}`;

        const tipoCard = document.createElement('p');
        tipoCard.classList.add('card-text');
        tipoCard.style.cssText = 'text-align: end;padding-top:5mm;';
        tipoCard.textContent = `${prod.tipo}`;

        const stockCard = document.createElement('p');
        stockCard.classList.add('card-text');
        stockCard.style.cssText = 'text-align: end';
        stockCard.innerHTML = `<small class="text-muted">Stock: ${prod.stock}</small>`;

        const btnCard = document.createElement('button');
        btnCard.classList.add('btn', 'btn-primary');
        if(prod.stock==0){
            btnCard.classList.add('disabled');
            btnCard.textContent = 'Sin stock';
        }else{
            btnCard.textContent = 'Agregar';
        }
        btnCard.setAttribute('codigo', prod.id);
        btnCard.addEventListener('click', agregarCarrito);

        //Cargo los elementos
        bodyCard.appendChild(tituloCard);
        bodyCard.appendChild(precioCard);
        bodyCard.appendChild(tipoCard);
        bodyCard.appendChild(stockCard);
        bodyCard.appendChild(btnCard);

        nuevaCard.appendChild(imgCard);
        nuevaCard.appendChild(bodyCard);
        divCard.appendChild(nuevaCard);

        const itemProducto = document.createElement('li');
        itemProducto.innerHTML = `<a class="dropdown-item" href="#">${prod.nombre}</a>`;
        //Cargo la tarjeta en el DOM
        DOMproductos.appendChild(divCard);
        DOMdropProductos.appendChild(itemProducto);
    })
}

function agregarCarrito(e) {
    carrito.push(e.target.getAttribute('codigo'));  //Cargo el id en el Array para luego mostrar por pantalla el carrito
    //Busco el producto y reduzco su stock
    const nuevoProd = productos.filter(buscoProducto => buscoProducto.id === parseInt(e.target.getAttribute('codigo')));
    nuevoProd[0].stock--;
    //Cargo el producto en el carrito y actualizo el stock
    cargarProductos();
    cargarCarrito();
}

function cargarCarrito() {
    if (carrito.length == 0) {      //Si el carrito está vacio deshabilito los botones para comprar y borrar
        DOMbtnComprar.classList.add('disabled');
        DOMbtnBorrar.classList.add('disabled');
    }
    else {
        DOMbtnComprar.classList.remove('disabled');
        DOMbtnBorrar.classList.remove('disabled');
    }
    DOMcarrito.textContent = '';  //Limpio la tabla del carrito para actualizarlo
    const carritoAux = [...new Set(carrito)];
    carritoAux.forEach(prod => {
        // Obtenemos el prod que necesitamos de la variable base de datos
        const nuevoProd = productos.filter(buscoProducto => buscoProducto.id === parseInt(prod))[0];
        // Cuenta el número de veces que se repite el producto
        const cantProducto = carrito.reduce((total, prodId) => prodId === prod ? total += 1 : total, 0);
        // Creamos el nodo del prod del carrito
        const nuevoNodo = document.createElement('tr');
        nuevoNodo.innerHTML = `
            <th scope="row"> ${nuevoProd.nombre} </th>
            <td> $${nuevoProd.precio} </td>
            <td> ${cantProducto} </td>
            `;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-outline-danger');
        miBoton.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
        miBoton.dataset.prod = prod;
        miBoton.addEventListener('click', borrarProductoCarrito);
        // Mezclamos nodos
        nuevoNodo.appendChild(miBoton);
        DOMcarrito.appendChild(nuevoNodo);
    });
    DOMtotal.textContent = calcularTotal();
}

function borrarProductoCarrito (evento){
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.prod;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    cargarCarrito();
}

function calcularTotal() {
    return carrito.reduce((total, prod) => {    // De cada elemento obtenemos su precio
        const nuevoProd = productos.filter(buscoProducto => buscoProducto.id === parseInt(prod));
        return total + nuevoProd[0].precio; // Sumamo al total
    }, 0).toFixed(2);
}

function borrarCarrito() {
    carrito.splice(0);
    cargarCarrito();
}

cargarProductos();
cargarCarrito();