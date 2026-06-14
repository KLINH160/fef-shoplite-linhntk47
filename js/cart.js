const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function renderCart() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<h3>Giỏ hàng của bạn đang trống</h3>";

        cartTotal.parentElement.style.display =
            "none";

        return;
    }

    cartTotal.parentElement.style.display =
        "block";

    cartItems.innerHTML = cart.map(item => `
        <div class="card mb-3">
            <div class="row g-0 align-items-center">

                <div class="col-md-2">
                    <img
                        src="${item.image}"
                        class="img-fluid p-2"
                        alt="${item.title}">
                </div>

                <div class="col-md-6">
                    <div class="card-body">

                        <h5 class="card-title">
                            ${item.title}
                        </h5>

                        <p class="card-text">
                            Giá: $${item.price}
                        </p>

                        <p class="card-text">

                            <button
                                class="btn btn-sm btn-warning btn-minus"
                                data-id="${item.id}">
                                -
                            </button>

                            <span class="mx-2">
                                ${item.quantity}
                            </span>

                            <button
                                class="btn btn-sm btn-success btn-plus"
                                data-id="${item.id}">
                                +
                            </button>

                        </p>

                    </div>
                </div>

                <div class="col-md-4 text-end pe-3">

                    <button
                        class="btn btn-danger btn-delete"
                        data-id="${item.id}">
                        Xóa
                    </button>

                </div>

            </div>
        </div>
    `).join("");


    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}

renderCart();


cartItems.addEventListener("click", function (e) {

    const productId =
        Number(e.target.dataset.id);

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    if (e.target.classList.contains("btn-delete")) {

        cart = cart.filter(
            item => item.id !== productId
        );

    }

    else if (e.target.classList.contains("btn-plus")) {

        const product = cart.find(
            item => item.id === productId
        );

        if (product) {
            product.quantity++;
        }

    }

    else if (e.target.classList.contains("btn-minus")) {

        const product = cart.find(
            item => item.id === productId
        );

        if (product) {

            product.quantity--;

            if (product.quantity <= 0) {

                cart = cart.filter(
                    item => item.id !== productId
                );

            }

        }

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();

});

