'use strict';

const content = document.querySelector('.content')
const overNumber = document.querySelector('.overNumber')
const quantityNumber = document.querySelector('.quantityNumber')

let arrayOfShoesInSessionStorage = JSON.parse(sessionStorage.getItem('arraycar'))
let sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))

if (sessionStorage.getItem('arraycar')) {
    let arrayOfShoes = arrayOfShoesInSessionStorage.flat()

    const propertiesBox = document.createElement('div')
    const emptyPropertiesBox = document.createElement('div')
    const quantity = document.createElement('h2')
    const price = document.createElement('h2')
    const subtotal = document.createElement('h2')
    quantity.appendChild(document.createTextNode('Cantidad'))
    price.appendChild(document.createTextNode('Precio'))
    subtotal.appendChild(document.createTextNode('Subtotal'))
    subtotal.setAttribute('class', 'subtotal')
    propertiesBox.setAttribute('class', 'propertiesBox')
    emptyPropertiesBox.setAttribute('class', 'emptyPropertiesBox')
    propertiesBox.appendChild(emptyPropertiesBox)
    propertiesBox.appendChild(quantity)
    propertiesBox.appendChild(price)
    propertiesBox.appendChild(subtotal)
    content.appendChild(propertiesBox)

    let total = 0

    class ShoppingCar {
        constructor(arrayOfShoes) {
            this.arrayOfShoes = arrayOfShoes;
        }

        addShoes() {
            let eraseButton
            this.arrayOfShoes.forEach(shoe => {
                const shoeBoxView = document.createElement('div')
                const shoeImgBox = document.createElement('div')
                const shoeImg = document.createElement('img')
                const shoeName = document.createElement('p')
                const quantityOfShoes = document.createElement('p')
                const priceOfShoes = document.createElement('p')
                const subtotalOfShoes = document.createElement('p')
                eraseButton = document.createElement('button')
                shoeName.appendChild(document.createTextNode(shoe.name))
                quantityOfShoes.appendChild(document.createTextNode(shoe.quantity))
                priceOfShoes.appendChild(document.createTextNode(shoe.price))
                subtotalOfShoes.appendChild(document.createTextNode(shoe.price * shoe.quantity))
                eraseButton.appendChild(document.createTextNode('X'))

                shoeBoxView.setAttribute('class', 'shoeBoxView')
                shoeBoxView.setAttribute('id', shoe.id)
                shoeImgBox.setAttribute('class', 'shoeImgBox')
                shoeImg.setAttribute('src', shoe.img)
                quantityOfShoes.setAttribute('class', 'quantityOfShoes')
                subtotalOfShoes.setAttribute('id', `subtotal${shoe.id}`)
                subtotalOfShoes.setAttribute('class', 'subtotalOfShoes')
                priceOfShoes.setAttribute('class', 'priceOfShoes')
                eraseButton.setAttribute('class', 'eraseButton')
                eraseButton.setAttribute('id', shoe.id)
                shoeImgBox.appendChild(shoeName)
                shoeImgBox.appendChild(shoeImg)
                shoeBoxView.appendChild(shoeImgBox)
                shoeBoxView.appendChild(quantityOfShoes)
                shoeBoxView.appendChild(priceOfShoes)
                shoeBoxView.appendChild(subtotalOfShoes)
                shoeBoxView.appendChild(eraseButton)
                content.appendChild(shoeBoxView)

                this.eraseShoe(eraseButton)
            });
            this.addTotal()
        }

        eraseShoe(eraseButton) {
            let shoeTargetedId
            eraseButton.addEventListener('click', (e) => {
                const totalPriceNumber = document.querySelector('.totalPriceNumber')
                shoeTargetedId = parseInt(e.target.id)
                const shoeTargeted = e.target.parentElement
                const subtotalId = document.getElementById(`subtotal${shoeTargetedId}`)
                total -= parseInt(subtotalId.textContent)
                totalPriceNumber.innerHTML = total

                content.removeChild(shoeTargeted)

                arrayOfShoes = arrayOfShoes.filter(shoe => shoe.id !== shoeTargetedId)
                sessionStorage.setItem('arraycar', JSON.stringify(arrayOfShoes))

                if (arrayOfShoes.length === 0) {
                    const empty = document.createElement('h1')
                    const emptyText = document.createTextNode('No tienes productos en el carrito.')
                    content.removeChild(propertiesBox)
                    empty.appendChild(emptyText)
                    content.appendChild(empty)
                }

                let quantityofShoes = parseInt(shoeTargeted.firstChild.nextSibling.textContent)
                sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))
                sessionStorageNumber -= quantityofShoes
                overNumber.style.visibility = "visible"
                quantityNumber.innerHTML = sessionStorageNumber
                sessionStorage.setItem('carnumber', sessionStorageNumber)

                this.arrayOfShoes = this.arrayOfShoes.filter(element => element.id !== shoeTargetedId)
                if (this.arrayOfShoes.length === 0) {
                    sessionStorage.removeItem('arraycar')
                    while (content.firstChild) {
                        content.removeChild(content.firstChild)
                    }
                    const empty = document.createElement('h1')
                    empty.setAttribute('class', 'empty')
                    const emptyText = document.createTextNode('NO TIENES PRODUCTOS EN EL CARRITO')
                    empty.appendChild(emptyText)
                    content.appendChild(empty)

                    overNumber.style.visibility = "hidden"
                    sessionStorage.removeItem('carnumber')
                }

            })
        }

        addTotal() {
            let subtotal = document.querySelectorAll('.subtotalOfShoes')

            subtotal.forEach(subtotal => {
                total += parseInt(subtotal.textContent)
            });

            const payBox = document.createElement('div')
            const totalText = document.createElement('h2')
            const totalPriceNumber = document.createElement('h2')
            const payButton = document.createElement('button')
            const link = document.createElement('a')
            totalText.appendChild(document.createTextNode('Total: '))
            totalPriceNumber.appendChild(document.createTextNode(total))
            payButton.appendChild(document.createTextNode('PAGAR'))
            totalText.setAttribute('class', 'totalText')
            totalPriceNumber.setAttribute('class', 'totalPriceNumber')
            payBox.setAttribute('class', 'payBox')
            payButton.setAttribute('class', 'payButton')
            link.setAttribute('href', 'pay-info.html')

            payBox.appendChild(totalText)
            payBox.appendChild(totalPriceNumber)
            link.appendChild(payButton)
            payBox.appendChild(link)
            content.appendChild(payBox)
        }
    }
    const shoe = new ShoppingCar(arrayOfShoes);
    shoe.addShoes()

} else {
    const empty = document.createElement('h1')
    empty.setAttribute('class', 'empty')
    const emptyText = document.createTextNode('NO TIENES PRODUCTOS EN EL CARRITO')
    empty.appendChild(emptyText)
    content.appendChild(empty)
}

window.onload = function () {
    overNumber.style.visibility = "visible"
    quantityNumber.innerHTML = sessionStorageNumber
    if (quantityNumber.textContent === "NaN") {
        overNumber.style.visibility = "hidden"
    }
}


