'use strict';

const productsButton = document.querySelector('.main-header__products')
const sideBarAllProducts = document.querySelector('.sidebar__all')
const content = document.querySelector('.content')

//Variable de control que permite pintar los zapatos una única vez.
let clicked = true

content.addEventListener('click', targeted)
sideBarAllProducts.addEventListener('click', paintShoes)
productsButton.addEventListener('click', paintShoes)

//Función para pintar todos los zapatos existentes en el JSON. Todo el HTML se genera aquí.
/* Algo a resaltar es que es necesario usar un servidor, pues corriendo en local el navegador lanza un
error de CORS y la petición por fetch no funciona. En mi caso usé la extensión "live server"*/
function paintShoes() {
    if (clicked === true) {
        fetch('../allShoes.json')
            .then(response => response.json())
            .then(data => {
                let allShoes = data.allshoes

                allShoes.forEach(shoe => {
                    const product = document.createElement('div')
                    const detail = document.createElement('a')
                    const shoeImg = document.createElement('img')
                    const shoeName = document.createElement('h3')
                    const shoePrice = document.createElement('p')

                    const shoeNameText = document.createTextNode(shoe.name)
                    const shoePriceText = document.createTextNode(shoe.price)

                    product.setAttribute('class', 'shoeBox')
                    shoeImg.setAttribute('id', shoe.id)
                    shoeImg.setAttribute('src', shoe.img)
                    detail.setAttribute('href', 'product_detail.html')
                    shoePrice.appendChild(shoePriceText)
                    shoeName.appendChild(shoeNameText)
                    product.appendChild(shoeImg)
                    detail.appendChild(shoeImg)

                    product.appendChild(detail)
                    product.appendChild(shoeName)
                    product.appendChild(shoePrice)
                    content.appendChild(product)

                });
            })
        clicked = false
    }
}

//Se muestran los productos en el carrito y se pintan los zapatos nada más presionar en el botón "productos".
window.onload = function () {
    productsButton.click()

    const overNumber = document.querySelector('.overNumber')
    const quantityNumber = document.querySelector('.quantityNumber')
    let sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))
    overNumber.style.visibility = "visible"
    quantityNumber.innerHTML = sessionStorageNumber
    if (quantityNumber.textContent === "NaN") {
        overNumber.style.visibility = "hidden"
    }
}

/* Al hacer click en cualquier zapato, se guarda el id del mismo en sessionstorage para que la siguiente
página pueda dar el detalle del zapato. */
function targeted(e) {
    const idTarget = parseInt(e.target.id)
    if (isNaN(idTarget) === false) {
        sessionStorage.setItem('shoe', idTarget)
    }
}



