function getDishTemplate(dish) {
    return `    <article>
                    <img src="./assets/img/pizza_img_1.jpg" alt="">
                    <h2>${dish.name}</h2>
                    <p>${dish.description}</p>
                    <div class="food-footer">
                        <p>${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(dish.price)}</p>
                        <button onclick="addToBasket(${dish.id})">Add to basket</button>
                    </div>
                </article>`;
}

function getBasketTemplate(basket_id) {
    return `<div>
                <h3>${basket[basket_id].amount} x ${dishes[basket[basket_id].id].name}</h3>
                <div>
                    <div>
                        <button onclick="deleteFromBasket(${basket_id})">Löschen</button>                            
                        <p>${basket[basket_id].amount}</p>
                        ${basket[basket_id].amount > 1 ? `<button onclick="decreaseFromBasket(${basket_id})">-</button>` : ""}
                        <button onclick="addToBasket(${basket[basket_id].id})">+</button>
                    </div>
                    <p>${dishes[basket[basket_id].id].price}</p>
                </div>
            </div>`;
}

function getPriceTemplate(price) {
    return `Buy now (${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price)})`;
}

function getBasketFooterTemplate() {
    return `<div>
                <p>Subtotal</p>
                <p>Delivery fee</p>
            </div>
            <div>
                <p>2€</p>
                <p>3€</p>
            </div>
            <hr>
            <div>
                <p>Total</p>
                <p>24€</p>
            </div>
            <button id="totalPrice">
            </button>`;
}

function getEmptyBasketTemplate() {
    return `<p>Nothing here yet. Go ahead and choose something delicious!</p>
    Warenkorb icon`;
}