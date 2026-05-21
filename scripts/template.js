function getDishTemplate(dish_id) {
    return `<div>${dishes[dish_id].name}<br>${dishes[dish_id].description}<br>${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(dishes[dish_id].price)}</div><br> <button onclick="addToBasket(${dish_id})">In Warenkorb</button>`;
}

function getBasketTemplate(basket_id) {
    return `<div style="background-color: red; color:white;">${dishes[basket[basket_id].id].name} Anzahl: ${basket[basket_id].amount} <button onclick="addToBasket(${basket[basket_id].id})">+</button> <button onclick="decreaseFromBasket(${basket_id})">-</button><button onclick="deleteFromBasket(${basket_id})">Löschen</button></div>`;
}