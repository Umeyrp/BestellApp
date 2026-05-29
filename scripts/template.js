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
    return `<div style="background-color: red; color:white;">${dishes[basket[basket_id].id].name} Anzahl: ${basket[basket_id].amount} <button onclick="addToBasket(${basket[basket_id].id})">+</button> ${basket[basket_id].amount > 1 ? `<button onclick="decreaseFromBasket(${basket_id})">-</button>` : ""} <button onclick="deleteFromBasket(${basket_id})">Löschen</button></div>`;
}

function getPriceTemplate(price) {
    return `Preis: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price)}`;
}

function getDialogTemplate() {
    return `<article class="dialog-content">
                <h2></h2>
                <div>
                    <h3></h3>
                    <div>
                        <div>
                            <button>X</button>
                            <p></p>
                            <button>+</button>
                        </div>
                        <p></p>
                    </div>
                </div>
                <div>
                    <p></p>
                    <p></p>
                </div>
                    <div>
                    <p>Subtotal</p>
                    <p>Delivery fee</p>
                </div>
                <hr>
                    <div>
                    <p>Total</p>
                    <p></p>
                </div>
                <button>
                    <p>Buy now (20,99€)</p>
                </button>
            </article>`;
}