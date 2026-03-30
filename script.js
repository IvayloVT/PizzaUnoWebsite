document.addEventListener('DOMContentLoaded', () => {

    const orderButtons = document.querySelectorAll('.offer-card button');
    const subtotalElement = document.querySelector('.subtotal-val');
    const totalElement = document.querySelector('.total-val');
    const basketStatus = document.getElementById('basket-status');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let subtotal = 0.00;
    const deliveryFee = 2.50;

    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
       
            const buttonText = button.textContent;
            const price = parseFloat(buttonText.replace(/[^\d.]/g, ''));

            if (!isNaN(price)) {
                addToBasket(price);
            }
        });
    });

    function addToBasket(price) {
        subtotal += price;

        subtotalElement.textContent = `£${subtotal.toFixed(2)}`;
        totalElement.textContent = `£${(subtotal + deliveryFee).toFixed(2)}`;

        basketStatus.textContent = "Items added to your basket!";
        basketStatus.style.color = "#15b812";
        
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = "1";
        checkoutBtn.style.cursor = "pointer";
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    if (localStorage.getItem("pizzaUnoCookies")) {
        banner.classList.add("cookie-hidden");
    }

    acceptBtn.addEventListener("click", function() {
        localStorage.setItem("pizzaUnoCookies", "true");
        banner.classList.add("cookie-hidden");
    });
});

let subtotal = 0;

const orderButtons = document.querySelectorAll(".order-btn");
const subtotalField = document.querySelector(".subtotal-val");
const totalField = document.querySelector(".total-val");
const basketStatus = document.getElementById("basket-status");
const checkoutBtn = document.querySelector(".checkout-btn");



orderButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const text = btn.textContent;
        const priceMatch = text.match(/£([\d\.]+)/);

        if (priceMatch) {
            const price = parseFloat(priceMatch[1]);
            subtotal += price;

            subtotalField.textContent = `£${subtotal.toFixed(2)}`;
            totalField.textContent = `£${(subtotal + 2.50).toFixed(2)}`;

            basketStatus.textContent = "Items added to your basket";

            checkoutBtn.disabled = false;
        }
    });
});



checkoutBtn.addEventListener("click", () => {

    window.location.href = "checkout.html";
});
checkoutBtn.addEventListener("click", () => {
    sessionStorage.setItem("checkoutSubtotal", subtotal.toFixed(2));
    sessionStorage.setItem("checkoutTotal", (subtotal + 2.50).toFixed(2));

    window.location.href = "checkout.html";
});
