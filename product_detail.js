'use strict';

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

let selectedShoe
let textQuantityNumber = 0

fetch('allShoes.json')
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

function addShoeCar() {
    let arrayCar = []
    let quantity = parseInt(quantityField.value)

    if (sessionStorage.getItem('arraycar')) {
        const arrayOfShoesInSessionStorage = JSON.parse(sessionStorage.getItem('arraycar'))
        let arrayToCompare = arrayOfShoesInSessionStorage.flat()
        let existe = false

        arrayToCompare.forEach(element => {
            if (element.id === shoeId) {
                existe = true
            }
        });

        if (existe) {
            arrayToCompare.forEach(element => {
                if (element.id === shoeId) {
                    element.quantity += quantity
                    sessionStorage.setItem('arraycar', JSON.stringify(arrayToCompare))
                }
            });
            sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))
            sessionStorageNumber += quantity
            overNumber.style.visibility = "visible"
            quantityNumber.innerHTML = sessionStorageNumber
            sessionStorage.setItem('carnumber', sessionStorageNumber)

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
        selectedShoe[0].quantity = quantity
        arrayCar.push(selectedShoe)
        sessionStorage.setItem('arraycar', JSON.stringify(arrayCar))

        overNumber.style.visibility = "visible"
        quantityNumber.innerHTML = quantity
        sessionStorage.setItem('carnumber', quantity)
    }
}

window.onload = function () {
    overNumber.style.visibility = "visible"
    quantityNumber.innerHTML = sessionStorageNumber
    if (quantityNumber.textContent === "NaN") {
        overNumber.style.visibility = "hidden"
    }
}


