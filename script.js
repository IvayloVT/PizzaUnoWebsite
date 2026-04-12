const BASKET_KEY = "pizzaUnoBasket";
const DELIVERY_FEE = 2.5;

function getBasket() {
    try {
        return JSON.parse(localStorage.getItem(BASKET_KEY)) || [];
    } catch {
        return [];
    }
}

function saveBasket(items) {
    localStorage.setItem(BASKET_KEY, JSON.stringify(items));
}

function formatCurrency(value) {
    return `£${value.toFixed(2)}`;
}

function renderBasketSummary() {
    const basketStatus = document.getElementById("basket-status");
    const basketItems = document.getElementById("basket-items");
    const subtotalField = document.querySelector(".subtotal-val");
    const totalField = document.querySelector(".total-val");
    const checkoutBtn = document.querySelector(".checkout-btn");

    if (!basketStatus || !basketItems || !subtotalField || !totalField || !checkoutBtn) {
        return;
    }

    const basket = getBasket();
    const subtotal = basket.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

    basketItems.innerHTML = "";

    if (!basket.length) {
        basketStatus.textContent = "Your basket is empty.";
        basketStatus.style.color = "";
        basketItems.innerHTML = '<div class="cart-item"><span class="cart-item-name">No items yet</span><span class="cart-item-price">£0.00</span></div>';
        checkoutBtn.disabled = true;
    } else {
        basketStatus.textContent = `${basket.length} item${basket.length === 1 ? "" : "s"} ready for checkout.`;
        basketStatus.style.color = "#256845";
        basket.forEach((item) => {
            const row = document.createElement("div");
            row.className = "cart-item";
            row.innerHTML = `<span class="cart-item-name">${item.name}</span><span class="cart-item-price">${formatCurrency(item.price)}</span>`;
            basketItems.appendChild(row);
        });
        checkoutBtn.disabled = false;
    }

    subtotalField.textContent = formatCurrency(subtotal);
    totalField.textContent = formatCurrency(total);
}

function renderCheckout() {
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutSubtotal = document.getElementById("checkout-subtotal");
    const checkoutTotal = document.getElementById("checkout-total");
    const placeOrderBtn = document.querySelector(".place-order");

    if (!checkoutItems || !checkoutSubtotal || !checkoutTotal || !placeOrderBtn) {
        return;
    }

    const basket = getBasket();
    const subtotal = basket.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal > 0 ? subtotal + DELIVERY_FEE : 0;

    checkoutItems.innerHTML = "";

    if (!basket.length) {
        checkoutItems.innerHTML = '<div class="checkout-item"><span>No items added yet</span><span>£0.00</span></div>';
        placeOrderBtn.disabled = true;
    } else {
        basket.forEach((item) => {
            const row = document.createElement("div");
            row.className = "checkout-item";
            row.innerHTML = `<span>${item.name}</span><span>${formatCurrency(item.price)}</span>`;
            checkoutItems.appendChild(row);
        });
        placeOrderBtn.disabled = false;
    }

    checkoutSubtotal.textContent = formatCurrency(subtotal);
    checkoutTotal.textContent = formatCurrency(total);

    placeOrderBtn.addEventListener("click", () => {
        alert("Your order has been placed.");
        localStorage.removeItem(BASKET_KEY);
        window.location.href = "index.html";
    });
}

function setupOrderButtons() {
    const orderButtons = document.querySelectorAll(".order-btn[data-name][data-price]");
    if (!orderButtons.length) {
        return;
    }

    orderButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const basket = getBasket();
            basket.push({
                name: button.dataset.name,
                price: Number(button.dataset.price)
            });
            saveBasket(basket);
            renderBasketSummary();
        });
    });
}

function setupCheckoutLink() {
    const checkoutBtn = document.querySelector(".checkout-btn");
    if (!checkoutBtn) {
        return;
    }

    checkoutBtn.addEventListener("click", () => {
        if (!getBasket().length) {
            return;
        }
        window.location.href = "checkout.html";
    });
}

function setupCookieBanner() {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    if (!banner || !acceptBtn) {
        return;
    }

    if (localStorage.getItem("pizzaUnoCookies")) {
        banner.classList.add("cookie-hidden");
    }

    acceptBtn.addEventListener("click", () => {
        localStorage.setItem("pizzaUnoCookies", "true");
        banner.classList.add("cookie-hidden");
    });
}

function setupNav() {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");

    if (!navToggle || !nav) {
        return;
    }

    navToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("nav-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

function setupHeaderScroll() {
    const header = document.querySelector("header");

    if (!header) {
        return;
    }

    const toggleHeader = () => {
        header.classList.toggle("header-hidden", window.scrollY > 10);
    };

    toggleHeader();
    window.addEventListener("scroll", toggleHeader, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
    setupHeaderScroll();
    setupNav();
    setupOrderButtons();
    setupCheckoutLink();
    setupCookieBanner();
    renderBasketSummary();
    renderCheckout();
});
