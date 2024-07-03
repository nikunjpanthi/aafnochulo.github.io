document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = button.parentElement;
            const itemName = menuItem.querySelector('h3').innerText;
            const itemPrice = parseFloat(menuItem.querySelector('p').innerText.split('@')[1].trim());
            addItemToCart(itemName, itemPrice);
        });
    });

    function addItemToCart(name, price) {
        const cartItem = cart.find(item => item.name === name);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateOrderSection();
    }

    function updateOrderSection() {
        const orderList = document.querySelector('#order-list');
        const orderTotal = document.querySelector('#order-total');
        orderList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerText = `${item.name} - ${item.quantity} x ${item.price} = ${item.quantity * item.price}`;
            orderList.appendChild(listItem);
            total += item.quantity * item.price;
        });
        orderTotal.innerText = `Total: ${total.toFixed(2)}`;
    }
});
