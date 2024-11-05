// Change avatar on file upload
const avatarUpload = document.getElementById('avatar-upload');
const avatarImg = document.getElementById('avatar-img');
const removeAvatarButton = document.getElementById('remove-avatar');
const successModal = document.getElementById('success-modal');
const closeModal = document.getElementById('close-modal');

avatarUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            avatarImg.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Remove avatar
removeAvatarButton.addEventListener('click', function() {
    avatarImg.src = 'default-avatar.png';
});

// Handle form submission
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulate saving data (AJAX call)
    setTimeout(function() {
        successModal.style.display = 'block';  // Show success modal
    }, 500);
});

// Close modal
closeModal.addEventListener('click', function() {
    successModal.style.display = 'none';
});

// Close modal if clicked outside
window.onclick = function(event) {
    if (event.target == successModal) {
        successModal.style.display = 'none';
    }
}

function updateCartDisplay() {
    const cartIcon = document.querySelector('.cart .cart-items-count');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartIcon.textContent = totalItems ;
  }
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    updateCartDisplay(); // Cập nhật hiển thị giỏ hàng khi tải trang
  }