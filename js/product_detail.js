'use strict';

//Se rescata el ID del zapato y el número de items en el carro, ambos almacenados en sessionstorage.
const shoeId = parseInt(sessionStorage.getItem('shoe'))
let sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))

const shoeBox = document.querySelector('.shoeBox')
const priceBox = document.querySelector('.priceBox')
const descriptionBox = document.querySelector('.descriptionBox')
const quantityField = document.querySelector('.inputNumber')
const content = document.querySelector('.content')
const addButton = document.querySelector('.addButton')
const overNumber = document.querySelector('.overNumber')
const quantityNumber = document.querySelector('.quantityNumber')

addButton.addEventListener('click', addShoeCar)

let selectedShoe /* Variable usada para filtrar del JSON las características del zapato seleccionado */
let textQuantityNumber = 0
//Se realia petición al JSON, se filtra y se pinta la información en el HTML.
fetch('../allShoes.json')
    .then(response => response.json())
    .then(data => {
        selectedShoe = data.allshoes.filter(shoe => shoe.id === shoeId)

        selectedShoe.forEach(shoe => {
            const shoeImg = document.createElement('img')
            const shoeName = document.createElement('h1')
            const shoePrice = document.createElement('h2')
            const shoeDescription = document.createElement('p')

            const shoeNameText = document.createTextNode(shoe.name)
            const shoePriceText = document.createTextNode(shoe.price)
            const shoeDescriptionText = document.createTextNode(shoe.description)

            shoeImg.setAttribute('src', shoe.img)
            shoeName.appendChild(shoeNameText)
            shoePrice.appendChild(shoePriceText)
            descriptionBox.appendChild(shoeDescriptionText)
            shoeBox.appendChild(shoeImg)
            priceBox.appendChild(shoeName)
            priceBox.appendChild(shoePrice)
            descriptionBox.appendChild(shoeDescription)
        });
    })

//Esta función agrega el producto al carro dependiendo de varias condiciones.
function addShoeCar() {
    let arrayCar = []
    let quantity = parseInt(quantityField.value)
//Si antes se ha agregado algún zapato al carro, entrará en este condicional y los obtendrá del sessionstorage.
    if (sessionStorage.getItem('arraycar')) {
        const arrayOfShoesInSessionStorage = JSON.parse(sessionStorage.getItem('arraycar'))
        let arrayToCompare = arrayOfShoesInSessionStorage.flat()
        let exist = false
//Se recorre el array obtenido del sessionstorage para validar si el zapato a agregar ya se ha agregado antes.
        arrayToCompare.forEach(element => {
            if (element.id === shoeId) {
                exist = true
            }
        });
//Si ya se ha agregado, solo se modificará la cantidad y se cachea nuevamente.
        if (exist) {
            arrayToCompare.forEach(element => {
                if (element.id === shoeId) {
                    element.quantity += quantity
                    sessionStorage.setItem('arraycar', JSON.stringify(arrayToCompare))
                }
            });
//Se modifica el número con la cantidad de números en el carrito.
            sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))
            sessionStorageNumber += quantity
            overNumber.style.visibility = "visible"
            quantityNumber.innerHTML = sessionStorageNumber
            sessionStorage.setItem('carnumber', sessionStorageNumber)
//Si el zapato es diferente, obtiene la info de sessionstorage, la modifica y la cachea.
        } else {
            let newSelectedShoe
            selectedShoe[0].quantity = quantity
            newSelectedShoe = JSON.parse(sessionStorage.getItem('arraycar'))
            newSelectedShoe.push(selectedShoe)
            sessionStorage.setItem('arraycar', JSON.stringify(newSelectedShoe))

            sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))
            sessionStorageNumber += quantity
            overNumber.style.visibility = "visible"
            quantityNumber.innerHTML = sessionStorageNumber
            sessionStorage.setItem('carnumber', sessionStorageNumber)
        }
    } else {
//Aquí entrará solo si es la primera vez que se agrega un zapato y modificará el ícono de items en el carrito.
        selectedShoe[0].quantity = quantity
        arrayCar.push(selectedShoe)
        sessionStorage.setItem('arraycar', JSON.stringify(arrayCar))

        overNumber.style.visibility = "visible"
        quantityNumber.innerHTML = quantity
        sessionStorage.setItem('carnumber', quantity)
    }
}
//Esto carga los items existentes en el carrito.
window.onload = function () {
    overNumber.style.visibility = "visible"
    quantityNumber.innerHTML = sessionStorageNumber
    if (quantityNumber.textContent === "NaN") {
        overNumber.style.visibility = "hidden"
    }
}


