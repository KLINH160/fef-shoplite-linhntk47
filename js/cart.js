const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {

    cartItems.innerHTML = "<h3>Giỏ hàng của bạn đang trống</h3>";

    cartTotal.parentElement.style.display = "none";

} else {

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
                            Số lượng: ${item.quantity}
                        </p>

                    </div>
                </div>

                <div class="col-md-4 text-end pe-3">

                    <button
                        class="btn btn-danger delete-btn"
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

    cartTotal.textContent = `$${total.toFixed(2)}`;

}