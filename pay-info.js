const fullname = document.querySelector('.fullname')
const email = document.querySelector('.email')
const payButton = document.querySelector('.payButton')
const overNumber = document.querySelector('.overNumber')
const quantityNumber = document.querySelector('.quantityNumber')

const purchaseInfo = JSON.parse(sessionStorage.getItem('arraycar')).flat()

payButton.addEventListener('click', newInvoice)

let totalPurchase = []
let total = 0

for (let i = 0; i < purchaseInfo.length; i++) {
    let shoes
    let quantity
    let subtotal

    shoes = purchaseInfo[i].name
    quantity = purchaseInfo[i].quantity
    price = purchaseInfo[i].price
    subtotal = price * quantity
    total += subtotal
    totalPurchase.push(new purchasedShoes(shoes, quantity, price, subtotal, total))
}

function newInvoice() {
    let invoice = new createInvoice(fullname.value, email.value, totalPurchase)
    let jsonInvoice = JSON.stringify(invoice)
    sessionStorage.removeItem('shoe')
    sessionStorage.removeItem('arraycar')
    sessionStorage.removeItem('carnumber')
    overNumber.style.visibility = "hidden"
    console.log(jsonInvoice);
}

function purchasedShoes(shoes, quantity, price, subtotal, total) {
    this.shoe = shoes
    this.quantity = quantity
    this.price = price
    this.subtotal = subtotal
    this.total = total
}

function createInvoice(name, email, purchase) {
    this.name = name;
    this.email = email;
    this.purchase = purchase
}
















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