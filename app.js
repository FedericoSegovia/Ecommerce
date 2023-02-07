const stockProductos = [
  {
    id: 1,
    nombre: "Disco duro 1 TB WESTERN DIGITAL WD BLACK ",
    cantidad: 1,
    desc: "DISCO DURO 1 TB SATA III 64MB WESTERN DIGITAL WD BLACK",
    precio: 17000,
    img: "img/DISCO DURO 1 TB SATA III 64MB WESTERN DIGITAL WD BLACK 17k.png",
  },
  {
    id: 2,
    nombre: "DISCO DURO HDD 4TB TOSHIBA",
    cantidad: 1,
    desc: "SATA III P-NAS N300",
    precio: 23000,
    img: "img/DISCO DURO HDD 4TB TOSHIBA SATA III P-NAS N300 23k.png",
  },
  {
    id: 3,
    nombre: "DISCO SOLIDO SSD GIGABYTE",
    cantidad: 1,
    desc: "SSD 120GB",
    precio: 6000,
    img: "img/DISCO SOLIDO SSD 120GB GIGABYTE SATAIII GP-GSTF 4k.png",
  },
  {
    id: 4,
    nombre: "GABINETE MSI",
    cantidad: 1,
    desc: "VAMPIRIC 010 TG ARGB",
    precio: 11000,
    img: "img/GABINETE MSI MAG VAMPIRIC 010 TG ARGB 11k.jpg",
  },
  {
    id: 5,
    nombre: "MONITOR 19 SAMSUNG",
    cantidad: 1,
    desc: "MONITOR 19 SAMSUNG LED S33A",
    precio: 35000,
    img: "img/MONITOR 19 SAMSUNG LED S33A 35k.png",
  },
  {
    id: 6,
    nombre: "MONITOR 24 LED LG",
    cantidad: 1,
    desc: "MONITOR 24 LED LG 24MK600M HDMI IPS FHD 75HZ",
    precio: 55000,
    img: "img/MONITOR 24 LED LG 24MK600M HDMI IPS FHD 75HZ 55k.jpg",
  },
  {
    id: 7,
    nombre: "NOTEBOOK MSI KATANA",
    cantidad: 1,
    desc: "MSI KATANA GF76 12UC I5 12500H RTX 3050 8GB SSD 512GB 17.3 W11",
    precio: 360000,
    img: "img/NOTEBOOK MSI KATANA GF76 12UC I5 12500H RTX 3050 8GB SSD 512GB 17.3 W11 360k.png",
  },
  {
    id: 8,
    nombre: "NOTEBOOK XPG XENIA",
    cantidad: 1,
    desc: "XPG XENIA 15 I5 1135G7 IRIS XE SSD 512GB NVME 16GB 14 W10",
    precio: 175000,
    img: "img/NOTEBOOK XPG XENIA 15 I5 1135G7 IRIS XE SSD 512GB NVME 16GB 14 W10 175k.png",
  },
  {
    id: 9,
    nombre: "PLACA DE VIDEO EVGA NVIDIA GEFORCE RTX 3050",
    cantidad: 1,
    desc: "8GB GDDR6",
    precio: 97000,
    img: "img/PLACA DE VIDEO EVGA NVIDIA GEFORCE RTX 3050 XC 8GB GDDR6 97k.png",
  },
  {
    id: 10,
    nombre: "PLACA DE VIDEO MSI 3070 TI VENTUS",
    cantidad: 1,
    desc: "8GB OC LHR",
    precio: 200000,
    img: "img/PLACA DE VIDEO MSI NVIDIA GEFORCE RTX 3070 TI VENTUS 3X 8GB OC LHR 200k.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');



   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }