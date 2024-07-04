document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderNumber = localStorage.getItem('orderNumber') || 0; // Initialize order number

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
                menuItem.querySelector('.quantity-controls').appendChild(quantityInput);

                const addButton = document.createElement('button');
                addButton.innerText = '+';
                addButton.classList.add('quantity-btn', 'add-quantity-btn');
                menuItem.querySelector('.quantity-controls').appendChild(addButton);

                const removeButton = document.createElement('button');
                removeButton.innerText = '-';
                removeButton.classList.add('quantity-btn', 'remove-quantity-btn');
                menuItem.querySelector('.quantity-controls').appendChild(removeButton);

                addButton.addEventListener('click', function() {
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                });

                removeButton.addEventListener('click', function() {
                    if (parseInt(quantityInput.value) > 1) {
                        quantityInput.value = parseInt(quantityInput.value) - 1;
                    }
                });
            }

            // Check if the item is already in the cart
            const cartItemIndex = cart.findIndex(item => item.name === itemName);
            if (cartItemIndex !== -1) {
                // Item already exists in cart, update quantity
                cart[cartItemIndex].quantity += parseInt(quantityInput.value);
            } else {
                // Item doesn't exist in cart, add new item
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: parseInt(quantityInput.value)
                });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Show confirmation message
            alert('Item added to cart');

            // Update cart link visibility
            updateCartLinkVisibility();
        });
    });

    // Function to update cart link visibility
    function updateCartLinkVisibility() {
        const cartLink = document.getElementById('go-to-cart');
        if (cart.length > 0) {
            cartLink.style.display = 'block';
        } else {
            cartLink.style.display = 'none';
        }
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

    // Update cart link visibility initially
    updateCartLinkVisibility();
});
