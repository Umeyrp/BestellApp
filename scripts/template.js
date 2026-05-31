function getDishTemplate(dish) {
    return `    <article>
                    <img src="${dish.img}" alt="">
                    <h2>${dish.name}</h2>
                    <p>${dish.description}</p>
                    <div class="food-footer">
                        <p>${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(dish.price)}</p>
                        <button onclick="addToBasket(${dish.id})">Add to basket</button>
                    </div>
                </article>`;
}

function getBasketTemplate(basket_id) {
    return `<div class="basket-item">
                <div>
                    <h3>${basket[basket_id].amount} x ${dishes[basket[basket_id].id].name}</h3>
                    ${basket[basket_id].amount > 1 ? `<button class="basket-item-button" onclick="deleteFromBasket(${basket_id})"><img src="./assets/icons/delete.svg" alt="trash bin icon"></button>` : ``}
                </div>
                <div class="basket-item-footer">
                    <div class="basket-item-buttons-wrapper">
                        ${basket[basket_id].amount > 1 ? `<button class="basket-item-button" onclick="decreaseFromBasket(${basket_id})"><p>-</p></button>` : `<button class="basket-item-button" onclick="deleteFromBasket(${basket_id})"><img src="./assets/icons/delete.svg" alt="trash bin icon"></button>`}
                        <p>${basket[basket_id].amount}</p>
                        <button class="basket-item-button" onclick="addToBasket(${basket[basket_id].id})"><p>+</p></button>
                    </div>
                    <p class="basket-item-price">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(dishes[basket[basket_id].id].price)}</p>
                </div>
            </div>`;
}

function getBasketFooterTemplate() {
    return `<div class="basket-price-wrapper">
                <p>Subtotal</p>
                <p>${renderTotalPrice()}</p>
            </div>
            <div class="basket-price-wrapper">
                <p>Delivery fee</p>
                <p>2 €</p>
            </div>
            <hr>
            <div class="basket-price-wrapper">
                <p>Total</p>
                <p>${renderTotalPrice(2)}</p>
            </div>
            <button onclick="orderFood()" id="totalPrice" class="basket-buy-button">
            Buy now (${renderTotalPrice(2)})
            </button>`;
}

function getEmptyBasketTemplate() {
    return `<p class="empty-basket-text">Nothing here yet.<br>Go ahead and choose something<br>delicious!</p>
            <img src="./assets/icons/shopping_cart.svg" class="emtpy-basket-img" alt="shopping cart icon">
    `;
}