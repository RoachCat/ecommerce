'use strict';

const content = document.querySelector('.content')
const overNumber = document.querySelector('.overNumber')
const quantityNumber = document.querySelector('.quantityNumber')
//Se obtiene la información del sessionstorage respecto a los items agregados al carro.
let arrayOfShoesInSessionStorage = JSON.parse(sessionStorage.getItem('arraycar'))
let sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))

if (sessionStorage.getItem('arraycar')) {
    let arrayOfShoes = arrayOfShoesInSessionStorage.flat()
//En caso de haber algo en el carro, se pintarán los elementos que den la información respectiva.
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
/* Esta variable ayuda a controlar el valor total de los productos. La declaré global ya que me resultó
un poco engorroso pasarla entre métodos.*/
    let total = 0
/* La clase "ShoppingCar" tiene como propiedad los items ingresados. En cuanto a sus métodos,
"addShoes" lista los items en la página del carrito, "eraseShoe" permite borrar los zapatos mediante
un botón y "addTotal" se encarga de pintar el valor total y el botón "pagar".*/ 
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
//Este método pone a la escucha un botón (una X en la página) para borrar zapatos.
        eraseShoe(eraseButton) {
            let shoeTargetedId
            eraseButton.addEventListener('click', (e) => {
/* Se obtiene el id perteneciente al zapato a borrar tanto para restar su valor del total como para
borrarlo del carrito.*/
                const totalPriceNumber = document.querySelector('.totalPriceNumber')
                shoeTargetedId = parseInt(e.target.id)
                const shoeTargeted = e.target.parentElement
                const subtotalId = document.getElementById(`subtotal${shoeTargetedId}`)
                total -= parseInt(subtotalId.textContent)
                totalPriceNumber.innerHTML = total

                content.removeChild(shoeTargeted)
//Con arrayOfShoes se actualiza el carrito contenido en sessionstorage.
                arrayOfShoes = arrayOfShoes.filter(shoe => shoe.id !== shoeTargetedId)
                sessionStorage.setItem('arraycar', JSON.stringify(arrayOfShoes))

//Este bloque de código se encarga de modificar el número del ícono del carrito al borrar un elemento.
                let quantityofShoes = parseInt(shoeTargeted.firstChild.nextSibling.textContent)
                sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))
                sessionStorageNumber -= quantityofShoes
                overNumber.style.visibility = "visible"
                quantityNumber.innerHTML = sessionStorageNumber
                sessionStorage.setItem('carnumber', sessionStorageNumber)
/* Si el array de zapatos está vacío, se eliminarán todas las etiquetas creadas en el método anterior y
se pintará un mensaje indicando que no hay nada en el carro. */
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
//Se obtiene sl subtotal de todos los zapatos para sumarlos al total.
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
//Aquí se instancia la clase "ShoppingCar" y se le pasa por argumeto el array de zapatos
    const shoe = new ShoppingCar(arrayOfShoes);
    shoe.addShoes()
//Si no hay ningún zapato en el carrito (es decir, nada en sessionstorage) se pinta el mensaje.
} else {
    const empty = document.createElement('h1')
    empty.setAttribute('class', 'empty')
    const emptyText = document.createTextNode('NO TIENES PRODUCTOS EN EL CARRITO')
    empty.appendChild(emptyText)
    content.appendChild(empty)
}
//Función que muestra el ícono de los zapatos en el carrito.
window.onload = function () {
    overNumber.style.visibility = "visible"
    quantityNumber.innerHTML = sessionStorageNumber
    if (quantityNumber.textContent === "NaN") {
        overNumber.style.visibility = "hidden"
    }
}


