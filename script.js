const dialogRef = document.getElementById('basket-dialog');

function init() {
    getBasketFromLocalStorage();
    renderPizza();
    renderBasket();
}

function renderPizza() {
    const pizzaRef = document.getElementById('pizza-section');
    let Content = "";
    let pizza = dishes.filter(item => item.category === "pizza");
    for (let i = 0; i < pizza.length; i++) {
        Content += getPizzaTemplate(pizza, i);
    }
    pizzaRef.innerHTML = Content;
}

function renderBasket() {
    const basketRef = document.getElementById('basket');
    const basketCounterRef = document.getElementById("shopping-cart-counter");
    let basketContent = "";
    let basketItemsCount = 0;
    if (basket.length === 0) {
        basketRef.innerHTML = "Warenkorb leer";
        basketCounterRef.innerHTML = basketItemsCount;
        renderTotalPrice();
        return;
    }

    for (let i = 0; i < basket.length; i++) {
        basketContent += getBasketTemplate(i);
        basketItemsCount += basket[i].amount;
    }
    basketRef.innerHTML = basketContent;
    basketCounterRef.innerHTML = basketItemsCount;
    renderTotalPrice();
}

function renderTotalPrice() {
    const totalPriceRef = document.getElementById('totalPrice');

    if (basket.length === 0) {
        totalPriceRef.innerHTML = "";
        return;
    }

    let price = 0;
    for (let i = 0; i < basket.length; i++) {
        price += basket[i].amount * dishes[basket[i].id].price;
    }
    totalPriceRef.innerHTML = getPriceTemplate(price);
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

function openDialog() {
    dialogRef.innerHTML = "";
    dialogRef.innerHTML = getDialogTemplate();
    dialogRef.showModal();
}

function closeDialog() {
    dialogRef.close();
}

function enableOutsideClickClose(dialogRef) {
    dialogRef.addEventListener("click", (event) => {
        if (event.target === dialogRef) {
            dialogRef.close();
        }
    });
}

enableOutsideClickClose(dialogRef);