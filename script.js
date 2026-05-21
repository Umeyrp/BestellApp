function init() {
    getBasketFromLocalStorage();
    renderDishes();
    renderBasket();
}

function renderDishes() {
    const dishesRef = document.getElementById('dishes');
    let dishesContent = "";
    for (let i = 0; i < dishes.length; i++) {
        dishesContent += getDishTemplate(i);
    }
    dishesRef.innerHTML = dishesContent;
}

function renderBasket() {
    const basketRef = document.getElementById('basket');
    basketContent = "";
    for (let i = 0; i < basket.length; i++) {
        basketContent += getBasketTemplate(i);
    }
    basketRef.innerHTML = basketContent;
}

function addToBasket(dish_id) {
    let basketItem = basket.find(dish => dish.id === dish_id); //Check if dish already in basket
    let dish = dishes.find(dish => dish.id === dish_id);
    if (!dish) return; //Check if dish exists
    if (basketItem) {
        basketItem.amount++;
    } else {
        basket.push(
            {
                "id": dish_id,
                "amount": 1
            });
    }
    saveBasketInLocalStorage();
    renderBasket();
}

function decreaseFromBasket(basket_id) {
    if (basket[basket_id].amount === 1) {
        basket.splice(basket_id, 1);
    } else {
        basket[basket_id].amount--;
    }
    saveBasketInLocalStorage();
    renderBasket();
}

function saveBasketInLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasketFromLocalStorage() {
    const basketLocal = JSON.parse(localStorage.getItem("basket"));
    if (basketLocal) basket = basketLocal;
}