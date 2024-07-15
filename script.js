document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to add item to cart
    function addItemToCart(name, price, quantity = 1) {
        const cartItem = cart.find(item => item.name === name);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to order');
        displayOrder();
        updateCartLinkVisibility(); // Update visibility of "Go to Cart" link
    }

    // Function to display order on order.html
    function displayOrder() {
        const orderList = document.querySelector('#order-list');
        const orderTotal = document.querySelector('#order-total');
        let total = 0;

        // Clear existing list items before updating
        orderList.innerHTML = '';

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item.name} - ${item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                <button class="remove-item-btn" data-index="${index}">Remove</button>`;
            orderList.appendChild(listItem);
            total += item.quantity * item.price;
        });

        orderTotal.innerText = `Total: ${total.toFixed(2)}`;

        const removeButtons = document.querySelectorAll('.remove-item-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(button.getAttribute('data-index'));
                removeItemFromCart(index);
            });
        });
    }

    // Function to remove item from cart
    function removeItemFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayOrder();
        updateCartLinkVisibility(); // Update visibility of "Go to Cart" link
    }

    // Function to clear cart on reload
    function clearCartOnReload() {
        localStorage.removeItem('cart');
    }

    // Function to update visibility of "Go to Cart" link
    function updateCartLinkVisibility() {
        const cartLink = document.getElementById('go-to-cart');
        if (cart.length > 0) {
            cartLink.style.display = 'block'; // Show link if cart is not empty
        } else {
            cartLink.style.display = 'none'; // Hide link if cart is empty
        }
    }

    // Check if on order.html and display order
    if (window.location.pathname.endsWith('order.html')) {
        displayOrder();
        clearCartOnReload();
    }

    // Handle "Add to Order" button clicks in menu.html and index.html
    const addToOrderButtons = document.querySelectorAll('.add-to-order-btn');
    addToOrderButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission behavior

            const menuItem = button.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').innerText;
            const itemPrice = parseFloat(menuItem.querySelector('p').innerText.split('@')[1].trim());
            addItemToCart(itemName, itemPrice);
        });
    });

    // Handle payment form submission on payment.html
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Get form data
            const phoneNumber = document.getElementById('phone-number').value;
            const address = document.getElementById('address').value;
            const landmark = document.getElementById('landmark').value;
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

            // Validate form data (example validation)
            if (!phoneNumber || !address || !paymentMethod) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate generating QR code based on payment method
            let qrCodeUrl = '';
            if (paymentMethod === 'esewa') {
                // Generate eSewa QR code URL
                qrCodeUrl = 'https://example.com/esewa-qr-code'; // Replace with actual URL or logic
            } else if (paymentMethod === 'khalti') {
                // Generate Khalti QR code URL
                qrCodeUrl = 'https://example.com/khalti-qr-code'; // Replace with actual URL or logic
            }

            // Display QR code
            const qrCodeImg = document.getElementById('qr-code');
            qrCodeImg.src = qrCodeUrl;
            const qrCodeContainer = document.getElementById('qr-code-container');
            qrCodeContainer.style.display = 'block';
        });
    }
});
