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
            cart.push({ name, price
, quantity });
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
            alert('Proceeding to checkout');
            localStorage.removeItem('cart');
            cart = [];
            displayOrder();
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
