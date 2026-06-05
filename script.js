const basketDialogRef = document.getElementById('basket-dialog');
const confirmedDialogRef = document.getElementById('confirmed-dialog');
const basketRefs = document.querySelectorAll('.basket-content');


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
    if (!basket.length) return renderEmptyBasket();
    let basketContent = "";
    basketContent += `<div class="basket-item-wrapper">`;
    for (let i = 0; i < basket.length; i++) {
        basketContent += getBasketTemplate(i);
    }
    basketContent += `</div>`;
    basketRefs.forEach(element => {
        element.innerHTML = basketContent;
    });
    updateBasketInfo();
}

function renderBasketFooter() {
    if (basket.length === 0) { return; }
    const existingFooter = document.querySelectorAll('.basket-prices');
    if (existingFooter.length) {
        existingFooter.forEach(element => {
            element.remove();
        });
    }
    let basketContent = "";
    basketContent += `<div class="basket-prices">`;
    basketContent += getBasketFooterTemplate();
    basketRefs.forEach(element => {
        element.insertAdjacentHTML('beforeend', basketContent);
    });
}

function renderEmptyBasket() {
    basketRefs.forEach(element => {
        element.innerHTML = getEmptyBasketTemplate();
    });
    updateBasketInfo();
}

function updateBasketInfo() {
    renderBasketCounter();
    renderBasketButtons();
    renderBasketFooter();
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

function convertIntoEuroNumberFormat(number) {
    return number.toLocaleString('de-DE', { style: "currency", currency: "EUR" });
}

function renderTotalPrice(DeliveryFee = 0) {
    if (basket.length !== 0) {
        let price = 0;
        for (let i = 0; i < basket.length; i++) {
            price += basket[i].amount * dishes[basket[i].id].price;
        }
        price += DeliveryFee;
        price = convertIntoEuroNumberFormat(price);
        return price;
    }
}

function addToBasket(dish_id) {
    let basketItem = basket.find(dish => dish.id === dish_id); //Check if dish already in basket
    let dish = dishes.find(dish => dish.id === dish_id);
    if (!dish) return; //Check if dish exists
    if (basketItem) {
        basketItem.amount++;
        renderBasketItem(dish_id, basketItem.amount);
    } else {
        basket.push(
            {
                "id": dish_id,
                "amount": 1
            });
        renderBasket();
    }
    saveBasketInLocalStorage();
    updateBasketInfo();
}

function renderBasketItem(dish_id, amount) {
    let basket_index = getBasketIndexByDishId(dish_id);
    const basketItemRefs = document.querySelectorAll(`#basket-item-id-${dish_id}`);
    if (amount != 0) {
        basketItemRefs.forEach(element => {
            element.outerHTML = getBasketTemplate(basket_index);
        });
    } else {
        basketItemRefs.forEach(element => {
            element.remove();
        });
    }
}

function renderBasketButtons() {
    const buttons = document.querySelectorAll(".add-to-basket");
    buttons.forEach(btn => {
        btn.textContent = "Add to basket";
        btn.classList.remove("added");
    });
    basket.forEach(item => {
        const button = document.getElementById(`added-${item.id}`);
        if (!button) return;
        button.textContent = `Added ${item.amount}`;
        button.classList.add("added");
    });
}

function decreaseFromBasket(dish_id) {
    let basket_index = getBasketIndexByDishId(dish_id);
    basket[basket_index].amount--;
    saveBasketInLocalStorage();
    updateBasketInfo();
    renderBasketItem(dish_id, basket[basket_index].amount);
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

function getBasketIndexByDishId(dish_id) {
    return basket.findIndex(item => item.id == dish_id);
}

function deleteFromBasket(dish_id) {
    let basket_index = getBasketIndexByDishId(dish_id);
    renderBasketItem(dish_id, 0);
    basket.splice(basket_index, 1);
    saveBasketInLocalStorage();
    updateBasketInfo();
    if (!basket.length) return renderEmptyBasket();
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