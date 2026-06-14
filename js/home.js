function updateCartBadge() {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const totalQuantity = cart.reduce(
        (sum, item) => {
            return sum + item.quantity;
        },
        0
    );

    const cartBadge =
        document.getElementById("cart-badge");

    cartBadge.textContent =
        totalQuantity;

}
updateCartBadge();

const productList = document.getElementById("product-list");

async function loadProducts() {
    try {
        productList.innerHTML = "<h3>Đang tải dữ liệu...</h3>";

        const response = await fetch("https://fakestoreapi.com/products");

        const products = await response.json();

        const html = products.map(product => `
            <div class="col-12 col-md-4 col-lg-3 mb-4">
                <div class="card h-100">

                    <img src="${product.image}"
                         class="card-img-top product-image"
                         alt="${product.title}">

                    <div class="card-body d-flex flex-column">

                        <h5 class="card-title">
                            ${product.title}
                        </h5>

                        <p class="card-text">
                            ${product.description.substring(0, 80)}...
                        </p>

                        <p class="fw-bold text-danger">
                            $${product.price}
                        </p>
                        <div class="mt-auto">
                        <a href="product.html?id=${product.id}" class="btn btn-primary">Xem chi tiết</a>

                        <button class="btn btn-success add-to-cart" data-id="${product.id}">
                            Thêm vào giỏ hàng
                        </button>
                        </div>

                    </div>

                </div>
            </div>
        `).join("");

        productList.innerHTML = html;
        const addToCartButtons =
    document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {

    button.addEventListener("click", function () {

        const productId =
            Number(this.dataset.id);

        const product =
            products.find(
                item => item.id === productId
            );

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        const existingProduct =
            cart.find(
                item => item.id === product.id
            );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
        updateCartBadge();

        alert("Đã thêm sản phẩm vào giỏ hàng!");

    });

});

    } catch (error) {
        productList.innerHTML = "<h3>Lỗi tải dữ liệu!</h3>";
        console.error(error);
    }
}

loadProducts();