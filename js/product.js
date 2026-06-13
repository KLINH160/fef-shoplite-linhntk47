const productDetail = document.getElementById("product-detail");

// Đọc tham số trên URL
const params = new URLSearchParams(window.location.search);

// Lấy giá trị id
const productId = params.get("id");

async function loadProductDetail() {


if (!productId) {
    productDetail.innerHTML = "<h3>Không tìm thấy sản phẩm!</h3>";
    return;
}

try {

    // Hiển thị trạng thái loading
    productDetail.innerHTML = "<h3>Đang tải...</h3>";

    // Gọi API lấy chi tiết sản phẩm
    const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
    );

    // Chuyển dữ liệu JSON sang object JavaScript
    const product = await response.json();

    // Hiển thị giao diện Bootstrap
    productDetail.innerHTML = `
        <div class="col-md-6">

            <img src="${product.image}"
                 class="img-fluid"
                 alt="${product.title}">

        </div>

        <div class="col-md-6">

            <h2>${product.title}</h2>

            <h4 class="text-danger fw-bold">
                $${product.price}
            </h4>

            <p>
                ${product.description}
            </p>

            <button class="btn btn-success">
                Thêm vào giỏ hàng
            </button>

        </div>
    `;

} catch (error) {

    productDetail.innerHTML =
        "<h3>Lỗi tải dữ liệu sản phẩm!</h3>";

    console.error(error);
}


}

loadProductDetail();
