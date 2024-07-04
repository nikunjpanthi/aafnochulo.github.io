document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = button.parentElement;
            const itemName = menuItem.querySelector('h3').innerText;
            const itemPrice = parseFloat(menuItem.querySelector('p').innerText.split('@')[1].trim());

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
    }

    if (window.location.pathname.endsWith('order.html')) {
        displayOrder();
        clearCartOnReload();
    }

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

    function removeItemFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayOrder();
    }

    function clearCartOnReload() {
        localStorage.removeItem('cart');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const qrCodeImg = document.getElementById('qr-code');

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
        qrCodeImg.src = qrCodeUrl;
        qrCodeContainer.style.display = 'block';
    });
});

