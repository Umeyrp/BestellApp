function getDishTemplate(dish) {
    return `<article>
                <img src="${dish.img}" alt="">
                <div class="dish-info">
                    <div class="dish-header">
                        <h2>${dish.name}</h2>
                        <p>${dish.description}</p>
                    </div>
                    <div class="dish-footer">
                        <p>${convertIntoEuroNumberFormat(dish.price)}</p>
                        <button onclick="addToBasket(${dish.id})" id="added-${dish.id}" class="add-to-basket">Add to basket</button>
                    </div>
                </div>
            </article>`;
}

function getBasketTemplate(basket_index) {
    return `<div class="basket-item" id="basket-item-id-${basket_index}">
                <div>
                    <h3><span class="basket-item-counter-${basket[basket_index].id}">${basket[basket_index].amount}</span> x ${dishes[basket[basket_index].id].name}</h3>
                    ${basket[basket_index].amount > 1 ? `<button class="basket-item-button" onclick="deleteFromBasket(${basket_index})"><img src="./assets/icons/delete.svg" alt="trash bin icon"></button>` : ``}
                </div>
                <div class="basket-item-footer">
                    <div class="basket-item-buttons-wrapper">
                        ${basket[basket_index].amount > 1 ? `<button class="basket-item-button" onclick="decreaseFromBasket(${basket_index}, ${basket[basket_index].id})"><p>-</p></button>` : `<button class="basket-item-button" onclick="deleteFromBasket(${basket_index})"><img src="./assets/icons/delete.svg" alt="trash bin icon"></button>`}
                        <p class="basket-item-counter-${basket[basket_index].id}">${basket[basket_index].amount}</p>
                        <button class="basket-item-button" onclick="addToBasket(${basket[basket_index].id})"><p>+</p></button>
                    </div>
                    <p class="basket-item-price">${convertIntoEuroNumberFormat(dishes[basket[basket_index].id].price)}</p>
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