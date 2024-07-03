document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
                    menuItem.removeChild(quantityInput);
                    menuItem.removeChild(addButton);
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
});
