function getPizzaTemplate(pizza, dish_id) {
    return `    <article>
                    <img src="./assets/img/pizza_img_1.jpg" alt="">
                    <h2>${pizza[dish_id].name}</h2>
                    <p>${pizza[dish_id].description}</p>
                    <div class="food-footer">
                        <p>${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(pizza[dish_id].price)}</p>
                        <button onclick="addToBasket(${dish_id})">Add to basket</button>
                    </div>
                </article>`;
}

function getBasketTemplate(basket_id) {
    return `<div style="background-color: red; color:white;">${dishes[basket[basket_id].id].name} Anzahl: ${basket[basket_id].amount} <button onclick="addToBasket(${basket[basket_id].id})">+</button> ${basket[basket_id].amount > 1 ? `<button onclick="decreaseFromBasket(${basket_id})">-</button>` : ""} <button onclick="deleteFromBasket(${basket_id})">Löschen</button></div>`;
}

function getPriceTemplate(price) {
    return `Preis: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price)}`;
}