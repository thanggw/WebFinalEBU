
function searchProduct() {
    const searchQuery = document.getElementById('search').value;
    if (searchQuery) {
        alert('Searching for: ' + searchQuery);
    } else {
        alert('Please enter a product name.');
    }
}

//Tự động gợi ý từ khóa khi nhập vào thanh tìm kiếm
document.querySelector('.search-bar input').addEventListener('input', function() {
    const suggestions = document.querySelector('.suggestions');
    const searchText = this.value.toLowerCase();

    if (searchText) {
        suggestions.style.display = 'block';
        Array.from(suggestions.children).forEach(item => {
            if (item.textContent.toLowerCase().includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    } else {
        suggestions.style.display = 'none';
    }
});
function startCountdown(hours, minutes, seconds) {
    const countdown = document.querySelector('.countdown');
    const updateCountdown = () => {
        if (seconds === 0) {
            if (minutes === 0) {
                if (hours === 0) {
                    clearInterval(interval);
                    return;
                }
                hours--;
                minutes = 59;
            } else {
                minutes--;
            }
            seconds = 59;
        } else {
            seconds--;
        }
        
        countdown.innerHTML = `
            <span class="time">${hours.toString().padStart(2, '0')}</span> :
            <span class="time">${minutes.toString().padStart(2, '0')}</span> :
            <span class="time">${seconds.toString().padStart(2, '0')}</span>
        `;
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

// Start countdown with 2 hours, 9 minutes, 45 seconds
startCountdown(2, 9, 45);


//Sao chép mã voucher khi nhấn vào nút 'Sao chép'
document.querySelectorAll('.copy-code').forEach(button => {
    button.addEventListener('click', function() {
        const code = this.previousElementSibling.textContent;
        navigator.clipboard.writeText(code).then(() => {
            alert('Đã sao chép mã: ' + code);
        }).catch(err => {
            console.error('Không thể sao chép', err);
        });
    });
});

//Thêm tính năng cuộn mượt khi nhấp vào liên kết menu
document.querySelectorAll('.navigation a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


//Hiển thị thông báo khi thêm sản phẩm vào giỏ hàng
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', function() {
        // Lấy thông tin sản phẩm
        const product = this.closest('.product');
        const productImg = product.querySelector('img').src; // Lấy ảnh sản phẩm
        const productName = product.querySelector('h3').innerText;

        // Tạo hình ảnh bay
        const flyingImg = document.createElement('img');
        flyingImg.src = productImg;
        flyingImg.classList.add('fly-to-cart');
        document.body.appendChild(flyingImg);

        // Lấy vị trí hiện tại của sản phẩm và giỏ hàng (bao gồm cả phần cuộn)
        const productRect = product.getBoundingClientRect();
        const cartIcon = document.querySelector('.cart .fa-shopping-bag');
        const cartRect = cartIcon.getBoundingClientRect();

        // Điều chỉnh vị trí bắt đầu cho hình ảnh theo vị trí trên trang (thêm window.scrollX, window.scrollY)
        flyingImg.style.position = 'absolute';
        flyingImg.style.top = `${productRect.top + window.scrollY}px`;
        flyingImg.style.left = `${productRect.left + window.scrollX}px`;
        flyingImg.style.width = `${productRect.width}px`; // Đặt kích thước hình ảnh theo sản phẩm
        flyingImg.style.height = `${productRect.height}px`;

        // Bắt đầu di chuyển ảnh đến giỏ hàng
        setTimeout(() => {
            flyingImg.style.transform = `translate(${cartRect.left - productRect.left}px, ${cartRect.top - productRect.top}px)`;
            flyingImg.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
            flyingImg.style.opacity = '0';
        }, 100); // Độ trễ nhỏ để thấy hiệu ứng bắt đầu

        // Xóa ảnh sau khi kết thúc hiệu ứng
        setTimeout(() => {
            flyingImg.remove();
            // Cập nhật số lượng giỏ hàng
            const cartItemsCount = document.querySelector('.cart-items-count');
            cartItemsCount.textContent = parseInt(cartItemsCount.textContent) + 1;
        }, 1000); // Thời gian hiệu ứng bay (khớp với CSS transition)

    });
});



function toggleMenu() {
    var menu = document.getElementById('menu-list');
    menu.classList.toggle('show');
}



    // Lấy tất cả các phần tử có class 'scroll-to-products'
    const scrollToProducts = document.querySelectorAll('.scroll-to-products');

    // Lặp qua từng thẻ span và gán sự kiện click
    scrollToProducts.forEach(function(span) {
        span.addEventListener('click', function() {
            // Tìm phần tử có id 'product-list' và scroll tới nó
            document.getElementById('product-list').scrollIntoView({
                behavior: 'smooth' // Cuộn mượt
            });
        });
    });



    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.product button').forEach((button, index) => {
          button.addEventListener('click', () => {
            const product = document.querySelectorAll('.product')[index];
            const productName = product.querySelector('h3').innerText;
            const productPrice = product.querySelector('p').innerText;
            const productImage = product.querySelector('img').src; // Lấy link ảnh sản phẩm
      
            const item = { 
              name: productName, 
              price: productPrice, 
              quantity: 1, 
              image: productImage // Thêm thuộc tính image vào item
            };
      
            const existingItem = cart.find(i => i.name === item.name);
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              cart.push(item);
            }
      
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
          });
        });
      
        // Kiểm tra xem giỏ hàng đã có trong localStorage chưa
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
          updateCartDisplay();
        }
      
        document.querySelector('.cart').addEventListener('click', () => {
          window.location.href = './cart.html'; // Chuyển hướng đến trang giỏ hàng
        });
      });

      document.querySelector('.user-details').addEventListener('click', () => {
        window.location.href = './profile.html'; // Chuyển hướng đến trang giỏ hàng
      });
      
      // Cập nhật hiển thị giỏ hàng
      function updateCartDisplay() {
        const cartIcon = document.querySelector('.cart .cart-items-count');
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartIcon.textContent = totalItems;
      }
      
      // Khởi tạo giỏ hàng trống
      let cart = [];
      
      // Lưu giỏ hàng vào localStorage (nếu có)
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        updateCartDisplay(); // Cập nhật hiển thị giỏ hàng khi tải trang
      }
      
      // Xử lý khi nhấn vào giỏ hàng
      document.querySelector('.cart').addEventListener('click', () => {
        window.location.href = './cart.html'; // Chuyển hướng đến trang giỏ hàng
      });
      



    

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.product-sales .add-to-cart').forEach((button, index) => {
          button.addEventListener('click', () => {
            const product = document.querySelectorAll('.product-sales')[index];
            const productName = product.querySelector('h3').innerText;
            const productPrice = product.querySelector('.sale-price').innerText;
            const productImage = product.querySelector('img').src; 
      
            const item = { name: productName, price: productPrice, quantity: 1, image: productImage };
      
            const existingItem = cart.find(i => i.name === item.name);
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              cart.push(item);
            }
      
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
          });
        });
      
        
      
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
          updateCartDisplay();
        }
      
        document.querySelector('.cart').addEventListener('click', () => {
          window.location.href = './cart.html';
        });
    });

    document.querySelectorAll('.product-sales button').forEach(button => {
        button.addEventListener('click', function() {
            // Lấy thông tin sản phẩm
            const product = this.closest('.product-sales');
            const productImg = product.querySelector('img').src; // Lấy ảnh sản phẩm
            const productName = product.querySelector('h3').innerText;
    
            // Tạo hình ảnh bay
            const flyingImg = document.createElement('img');
            flyingImg.src = productImg;
            flyingImg.classList.add('fly-to-cart');
            document.body.appendChild(flyingImg);
    
            // Lấy vị trí hiện tại của sản phẩm và giỏ hàng (bao gồm cả phần cuộn)
            const productRect = product.getBoundingClientRect();
            const cartIcon = document.querySelector('.cart .fa-shopping-bag');
            const cartRect = cartIcon.getBoundingClientRect();
    
            // Điều chỉnh vị trí bắt đầu cho hình ảnh theo vị trí trên trang (thêm window.scrollX, window.scrollY)
            flyingImg.style.position = 'absolute';
            flyingImg.style.top = `${productRect.top + window.scrollY}px`;
            flyingImg.style.left = `${productRect.left + window.scrollX}px`;
            flyingImg.style.width = `${productRect.width}px`; // Đặt kích thước hình ảnh theo sản phẩm
            flyingImg.style.height = `${productRect.height}px`;
    
            // Bắt đầu di chuyển ảnh đến giỏ hàng
            setTimeout(() => {
                flyingImg.style.transform = `translate(${cartRect.left - productRect.left}px, ${cartRect.top - productRect.top}px)`;
                flyingImg.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
                flyingImg.style.opacity = '0';
            }, 100); // Độ trễ nhỏ để thấy hiệu ứng bắt đầu
    
            // Xóa ảnh sau khi kết thúc hiệu ứng
            setTimeout(() => {
                flyingImg.remove();
                // Cập nhật số lượng giỏ hàng
                const cartItemsCount = document.querySelector('.cart-items-count');
                cartItemsCount.textContent = parseInt(cartItemsCount.textContent) + 1;
            }, 1000); // Thời gian hiệu ứng bay (khớp với CSS transition)
    
        });
    });
    
    
      
   
      
      
      
      
      
      

 
  