'use strict';

const womenProductsButton = document.querySelector('.sidebar__women')
const content = document.querySelector('.content')

let clicked = true

content.addEventListener('click', targeted)
womenProductsButton.addEventListener('click', paintShoes)

function paintShoes() {
    if (clicked === true) {
        fetch('allShoes.json')
            .then(response => response.json())
            .then(data => {
                let allShoes = data.allshoes.filter(shoe => shoe.gender === "women")

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

window.onload = function () {
    womenProductsButton.click()

    const overNumber = document.querySelector('.overNumber')
    const quantityNumber = document.querySelector('.quantityNumber')
    let sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))
    overNumber.style.visibility = "visible"
    quantityNumber.innerHTML = sessionStorageNumber
    if (quantityNumber.textContent === "NaN") {
        overNumber.style.visibility = "hidden"
    }
}

function targeted(e) {
    const idTarget = parseInt(e.target.id)
    if (isNaN(idTarget) === false) {
        sessionStorage.setItem('shoe', idTarget)        
    }
}
