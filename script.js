document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderNumber = localStorage.getItem('orderNumber') || 0; // Initialize order number

    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = button.parentElement;
            const itemName = menuItem.querySelector('h3').innerText;
            const itemPrice = parseFloat(menuItem.querySelector('p').innerText.split('$')[1].trim());

            let quantityInput = menuItem.querySelector('.quantity-input');
            if (!quantityInput) {
                quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.min = 1;
                quantityInput.value = 1;
                quantityInput.classList.add('quantity-input');
                menuItem.appendChild(quantityInput);

                const addButton = document.createElement('button');
                addButton.innerText = 'Add Quantity';
                addButton.classList.add('add-quantity-btn');
                menuItem.appendChild(addButton);

                addButton.addEventListener('click', function() {
                    const quantity = parseInt(quantityInput.value);
                    addItemToCart(itemName, itemPrice, quantity);

                    // Remove quantity input and add button after adding to cart
                    quantityInput.remove();
                    addButton.remove();
                });
            }
        });
    });

    function addItemToCart(name, price, quantity) {
        const cartItem = cart.find(item => item.name === name);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart');
        updateCartLinkVisibility();
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

        const checkoutButton = document.querySelector('#checkout-btn');
        checkoutButton.addEventListener('click', function() {
            // Redirect to payment.html
            window.location.href = 'payment.html';
        });
    }

    // Function to remove item from cart
    function removeItemFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayOrder();
        updateCartLinkVisibility();
    }

    // Function to clear cart on reload
    function clearCartOnReload() {
        localStorage.removeItem('cart');
    }

    // Check if on order.html and display order
    if (window.location.pathname.endsWith('order.html')) {
        displayOrder();
        clearCartOnReload();
    }

    // Handle payment form submission on payment.html
    const paymentForm = document.getElementById('payment-form');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const qrCodeImg = document.getElementById('qr-code');

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
                qrCodeUrl = 'https://ibb.co/BgjBvyK'; // Replace with actual URL or logic
            } else if (paymentMethod === 'khalti') {
                // Generate Khalti QR code URL
                qrCodeUrl = 'https://ibb.co/BgjBvyK'; // Replace with actual URL or logic
            }

            // Display QR code
            qrCodeImg.src = qrCodeUrl;
            qrCodeContainer.style.display = 'block';
        });
    }

    // Function to generate unique order number
    function generateOrderNumber() {
        orderNumber += 1;
        localStorage.setItem('orderNumber', orderNumber);
        return orderNumber;
    }

    // Redirect to payment page and store order number
    const checkoutButton = document.querySelector('#checkout-btn');
    checkoutButton.addEventListener('click', function() {
        const currentOrderNumber = generateOrderNumber();
        localStorage.setItem('currentOrderNumber', currentOrderNumber);
        window.location.href = 'payment.html';
    });

    // Update visibility of "Go to Cart" link
    function updateCartLinkVisibility() {
        const cartLink = document.getElementById('go-to-cart');
        if (cart.length > 0) {
            cartLink.style.display = 'block';
        } else {
            cartLink.style.display = 'none';
        }
    }

    // Update cart link visibility initially
    updateCartLinkVisibility();
});
