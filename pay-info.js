const fullname = document.querySelector('.fullname')
const email = document.querySelector('.email')
const payButton = document.querySelector('.payButton')
const overNumber = document.querySelector('.overNumber')
const quantityNumber = document.querySelector('.quantityNumber')
const indexLink = document.querySelector('.main-header__title')

//Se obtiene toda la información del carrito de compra.
const purchaseInfo = JSON.parse(sessionStorage.getItem('arraycar')).flat()

payButton.addEventListener('click', newInvoice)

let totalPurchase = []
let total = 0
//Se agregan a un array todos los zapatos comprados junto con cantidad, precio unitario y subtotal.
for (let i = 0; i < purchaseInfo.length; i++) {
    let shoes
    let quantity
    let subtotal

    shoes = purchaseInfo[i].name
    quantity = purchaseInfo[i].quantity
    price = purchaseInfo[i].price
    subtotal = price * quantity
    total += subtotal
    totalPurchase.push(new purchasedShoes(shoes, quantity, price, subtotal))
}
//Se genera un JSON y se eliminan los elementos del sessionstorage.
function newInvoice() {
    let invoice = new createInvoice(fullname.value, email.value, totalPurchase, total)
    let jsonInvoice = JSON.stringify(invoice, undefined, 2)//Los parámetros 2 y 3 hacen más legible el JSON.
    sessionStorage.removeItem('shoe')
    sessionStorage.removeItem('arraycar')
    sessionStorage.removeItem('carnumber')
    overNumber.style.visibility = "hidden"

    /* Esta parte permite descargar el JSON. Siendo sincero, tuve que buscar la primera línea en internet
    ya que no me descargaba el JSON. Entiendo que encodeURI codifica el texto según la expecificación
    que se le designe. En el stringify solo puse algunos espacios para que el JSON fuera más legible.*/
    if (confirm('¿Deseas descargar el archivo JSON con la información de compra?')) {
        jsonInvoice = "data:text/json;charset=utf-8," + encodeURIComponent(jsonInvoice);
        const jsonDownload = document.getElementById('jsonDownload');
        jsonDownload.style.visibility = "Hidden"
        jsonDownload.setAttribute("href", jsonInvoice);
        jsonDownload.setAttribute("download", "jsonInvoice.json");
        jsonDownload.click();
    }
    indexLink.click()
}

//Se crea un objeto con la información relacionada en el carrito.
function purchasedShoes(shoes, quantity, price, subtotal) {
    this.shoe = shoes
    this.quantity = quantity
    this.price = price
    this.subtotal = subtotal
}
//Se crea un objeto con el nombre y correo electrónico de la persona, además de la información de la compra.
function createInvoice(name, email, purchase, total) {
    this.name = name
    this.email = email
    this.purchase = purchase
    this.total = total
}

//Se pinta el número de items en el carrito. Si es igual a "NaN", se oculta el ícono.
window.onload = function () {
    const overNumber = document.querySelector('.overNumber')
    const quantityNumber = document.querySelector('.quantityNumber')
    let sessionStorageNumber = parseInt(sessionStorage.getItem('carnumber'))
    overNumber.style.visibility = "visible"
    quantityNumber.innerHTML = sessionStorageNumber
    if (quantityNumber.textContent === "NaN") {
        overNumber.style.visibility = "hidden"
    }
}