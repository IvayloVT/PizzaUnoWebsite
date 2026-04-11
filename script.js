document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");

    if (navToggle && nav) {
        navToggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    const basketStatus = document.getElementById("basket-status");
    const subtotalField = document.querySelector(".subtotal-val");
    const totalField = document.querySelector(".total-val");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const orderButtons = document.querySelectorAll(".order-btn");
    const deliveryFee = 2.5;
    let subtotal = 0;

    if (orderButtons.length && basketStatus && subtotalField && totalField && checkoutBtn) {
        orderButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const priceMatch = button.textContent.match(/£([\d.]+)/);
                if (!priceMatch) {
                    return;
                }

                subtotal += parseFloat(priceMatch[1]);
                subtotalField.textContent = `£${subtotal.toFixed(2)}`;
                totalField.textContent = `£${(subtotal + deliveryFee).toFixed(2)}`;
                basketStatus.textContent = "Items added to your basket.";
                basketStatus.style.color = "#1f8f56";
                checkoutBtn.disabled = false;
            });
        });

        checkoutBtn.addEventListener("click", () => {
            sessionStorage.setItem("checkoutSubtotal", subtotal.toFixed(2));
            sessionStorage.setItem("checkoutTotal", (subtotal + deliveryFee).toFixed(2));
            window.location.href = "checkout.html";
        });
    }

    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    if (banner && acceptBtn) {
        if (localStorage.getItem("pizzaUnoCookies")) {
            banner.classList.add("cookie-hidden");
        }

        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("pizzaUnoCookies", "true");
            banner.classList.add("cookie-hidden");
        });
    }

    const checkoutSubtotal = document.getElementById("checkout-subtotal");
    const checkoutTotal = document.getElementById("checkout-total");
    const placeOrderBtn = document.querySelector(".place-order");

    if (checkoutSubtotal && checkoutTotal) {
        const storedSubtotal = sessionStorage.getItem("checkoutSubtotal") || "0.00";
        const storedTotal = sessionStorage.getItem("checkoutTotal") || "0.00";
        checkoutSubtotal.textContent = `£${storedSubtotal}`;
        checkoutTotal.textContent = `£${storedTotal}`;
    }

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", () => {
            alert("Your order has been placed.");
            sessionStorage.removeItem("checkoutSubtotal");
            sessionStorage.removeItem("checkoutTotal");
            window.location.href = "index.html";
        });
    }
});

