const productDetail = document.getElementById("product-detail");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let product = null;

async function loadProductDetail() {

    if (!productId) {
        productDetail.innerHTML =
            "<h3 class='text-danger'>Không tìm thấy sản phẩm!</h3>";
        return;
    }

    try {

        productDetail.innerHTML =
            "<h3>Đang tải dữ liệu...</h3>";

        const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
        );

        product = await response.json();

        productDetail.innerHTML = `
            <div class="col-md-6">
                <img
                    src="${product.image}"
                    class="img-fluid"
                    alt="${product.title}">
            </div>

            <div class="col-md-6">

                <h2>${product.title}</h2>

                <h4 class="text-danger fw-bold">
                    $${product.price}
                </h4>

                <p>${product.description}</p>

                <button
                    id="add-to-cart"
                    class="btn btn-success">
                    Thêm vào giỏ hàng
                </button>

            </div>
        `;

        // Gắn sự kiện sau khi render HTML
        const addToCartBtn =
            document.getElementById("add-to-cart");

        addToCartBtn.addEventListener("click", function () {

            let cart =
                JSON.parse(localStorage.getItem("cart"))
                || [];

            const existingProduct = cart.find(
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

            alert("Đã thêm sản phẩm vào giỏ hàng!");

        });

    }
    catch (error) {

        console.error(error);

        productDetail.innerHTML =
            "<h3 class='text-danger'>Lỗi tải dữ liệu sản phẩm!</h3>";

    }

}

loadProductDetail();