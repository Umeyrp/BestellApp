const basketDialogRef = document.getElementById('basket-dialog');
const confirmedDialogRef = document.getElementById('confirmed-dialog');


function init() {
    getBasketFromLocalStorage();
    renderDishes();
    renderBasket();
}

function getDishesTemplateByCategory(category) {
    let content = "";

    let categoryDishes = dishes.filter(item => item.category === category);
    for (let i = 0; i < categoryDishes.length; i++) {
        content += getDishTemplate(categoryDishes[i]);
    }

    return content;
}

function renderDishes() {
    const pizzaRef = document.getElementById('pizza-section');
    const burgerRef = document.getElementById('burger-section');
    const saladRef = document.getElementById('salad-section');

    pizzaRef.innerHTML = getDishesTemplateByCategory("pizza");
    burgerRef.innerHTML = getDishesTemplateByCategory("burger");
    saladRef.innerHTML = getDishesTemplateByCategory("salad");
}

function renderBasket() {
    const basketRef = document.getElementById('basked-content');
    if (basket.length === 0) {
        basketRef.innerHTML = getEmptyBasketTemplate();
        updateBasketInfo();
        return;
    }

    let basketContent = "";
    basketContent += `<div class="basket-item-wrapper">`;
    for (let i = 0; i < basket.length; i++) {
        basketContent += getBasketTemplate(i);
    }
    basketContent += `</div>`;
    basketContent += getBasketFooterTemplate();
    basketRef.innerHTML = basketContent;
    updateBasketInfo();
}

function updateBasketInfo() {
    renderTotalPrice();
    renderBasketCounter();
}

function renderBasketCounter() {
    const basketCounterRef = document.getElementById("shopping-cart-counter");
    let basketItemsCount = 0;
    if (basket.length === 0) {
        basketCounterRef.innerHTML = basketItemsCount;
        return;
    }

    for (let i = 0; i < basket.length; i++) {
        basketItemsCount += basket[i].amount;
    }
    basketCounterRef.innerHTML = basketItemsCount;
}

function renderTotalPriceWithFee() {
    renderTotalPrice(2);
}

function renderTotalPrice(DeliveryFee = 0) {
    if (basket.length !== 0) {
        let price = 0;
        for (let i = 0; i < basket.length; i++) {
            price += basket[i].amount * dishes[basket[i].id].price;
        }
        price += DeliveryFee;
        price = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);
        return price;
    }
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

function orderFood() {
    clearBasket();
    renderBasket();
    openConfirmedDialog();
    closeBasketDialog();
    setTimeout(closeConfirmedDialog, 2000);
}

function clearBasket() {
    basket = [];
    saveBasketInLocalStorage();
    renderBasket();
}

function deleteFromBasket(basket_id) {
    basket.splice(basket_id, 1);
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


function openBasketDialog() {
    basketDialogRef.showModal();
}

function openConfirmedDialog() {
    confirmedDialogRef.showModal();
}

function closeBasketDialog() {
    basketDialogRef.close();
}

function closeConfirmedDialog() {
    confirmedDialogRef.close();
}

function enableOutsideClickCloseBasketDialog(basketDialogRef) {
    basketDialogRef.addEventListener("click", (event) => {
        if (event.target === basketDialogRef) {
            basketDialogRef.close();
        }
    });
}

function enableOutsideClickCloseConfirmedDialog(confirmedDialogRef) {
    confirmedDialogRef.addEventListener("click", (event) => {
        if (event.target === confirmedDialogRef) {
            confirmedDialogRef.close();
        }
    });
}

enableOutsideClickCloseBasketDialog(basketDialogRef);
enableOutsideClickCloseConfirmedDialog(confirmedDialogRef);