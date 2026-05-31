const basketDialogRef = document.getElementById('basket-dialog');
const confirmedDialogRef = document.getElementById('confirmed-dialog');


function init() {
    getBasketFromLocalStorage();
    renderDishes();
    renderBasket();
}

function renderDishes() {
    const pizzaRef = document.getElementById('pizza-section');
    const burgerRef = document.getElementById('burger-section');
    const saladRef = document.getElementById('salad-section');

    let pizzaContent = "";
    let burgerContent = "";
    let saladContent = "";

    let pizza = dishes.filter(item => item.category === "pizza");
    for (let i = 0; i < pizza.length; i++) {
        pizzaContent += getDishTemplate(pizza[i]);
    }

    let burger = dishes.filter(item => item.category === "burger");
    for (let i = 0; i < burger.length; i++) {
        burgerContent += getDishTemplate(burger[i]);
    }
    let salad = dishes.filter(item => item.category === "salad");
    for (let i = 0; i < salad.length; i++) {
        saladContent += getDishTemplate(salad[i]);
    }
    pizzaRef.innerHTML = pizzaContent;
    burgerRef.innerHTML = burgerContent;
    saladRef.innerHTML = saladContent;

}

function renderBasket() {
    const basketRef = document.getElementById('basked-content');
    const basketCounterRef = document.getElementById("shopping-cart-counter");
    let basketContent = "";
    let basketItemsCount = 0;
    if (basket.length === 0) {
        basketRef.innerHTML = getEmptyBasketTemplate();
        basketCounterRef.innerHTML = basketItemsCount;
        renderTotalPrice();
        return;
    }

    basketContent += `<div class="basket-item-wrapper">`;
    for (let i = 0; i < basket.length; i++) {
        basketContent += getBasketTemplate(i);
        basketItemsCount += basket[i].amount;
    }
    basketContent += `</div>`;
    basketContent += getBasketFooterTemplate();
    basketRef.innerHTML = basketContent;
    basketCounterRef.innerHTML = basketItemsCount;
    renderTotalPrice();
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

function enableOutsideClickCloseBasktDialog(basketDialogRef) {
    basketDialogRef.addEventListener("click", (event) => {
        if (event.target === basketDialogRef) {
            basketDialogRef.close();
        }
    });
}

enableOutsideClickCloseBasktDialog(basketDialogRef);