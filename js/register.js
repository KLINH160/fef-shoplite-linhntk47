const form = document.getElementById("register-form");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const agree = document.getElementById("agree");

const fullNameError = fullName.nextElementSibling;
const emailError = email.nextElementSibling;
const passwordError = password.nextElementSibling;
const phoneError = phone.nextElementSibling;
const agreeError = agree.parentElement.querySelector(".text-danger");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    fullNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    phoneError.textContent = "";
    agreeError.textContent = "";

    let isValid = true;

    if (fullName.value.trim() === "") {
        fullNameError.textContent = "Vui lòng nhập họ tên";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        emailError.textContent = "Vui lòng nhập email";
        isValid = false;
    }
    else if (!emailRegex.test(email.value)) {
        emailError.textContent = "Email không hợp lệ";
        isValid = false;
    }

    if (password.value.trim() === "") {
        passwordError.textContent = "Vui lòng nhập mật khẩu";
        isValid = false;
    }
    else if (password.value.length < 6) {
        passwordError.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
        isValid = false;
    }

    if (phone.value.trim() === "") {
        phoneError.textContent = "Vui lòng nhập số điện thoại";
        isValid = false;
    }
    else if (!/^[0-9]{10}$/.test(phone.value)) {
        phoneError.textContent = "Số điện thoại phải có 10 chữ số";
        isValid = false;
    }

    if (!agree.checked) {
        agreeError.textContent = "Bạn phải đồng ý với điều khoản";
        isValid = false;
    }

    if (isValid) {
        alert("Đăng ký thành công!");
    }

});


fullName.addEventListener("input", function () {
    if (fullName.value.trim() !== "") {
        fullNameError.textContent = "";
    }
});

email.addEventListener("input", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email.value)) {
        emailError.textContent = "";
    }
});

password.addEventListener("input", function () {
    if (password.value.length >= 6) {
        passwordError.textContent = "";
    }
});

phone.addEventListener("input", function () {
    if (/^[0-9]{10}$/.test(phone.value)) {
        phoneError.textContent = "";
    }
});

agree.addEventListener("change", function () {
    if (agree.checked) {
        agreeError.textContent = "";
    }
});