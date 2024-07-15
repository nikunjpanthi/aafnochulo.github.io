document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Menu items data (you can replace this with actual data if it's from a database or backend)
    const menuItems = [
        { name: 'Chicken MoMo', price: 140 },
        { name: 'Chicken Biryani', price: 1500 },
        { name: 'Chicken Chowmein', price: 100 }
        // Add more menu items as needed
    ];

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
        updateOrder(); // Update order section
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
    }

    // Function to update order section
    function updateOrder() {
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

    // Function to handle menu item search
    function handleSearch() {
        const searchInput = document.getElementById('menu-search');
        const searchTerm = searchInput.value.toLowerCase().trim();
        const searchResults = menuItems.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
        displaySearchResults(searchResults);
    }

    // Function to display search results
    function displaySearchResults(results) {
        const searchResultsContainer = document.getElementById('search-results');
        searchResultsContainer.innerHTML = '';

        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<p>No results found.</p>';
        } else {
            results.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.classList.add('menu-item');
                menuItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <button class="add-to-order-btn">Add to Order</button>
                `;
                searchResultsContainer.appendChild(menuItem);

                const addButton = menuItem.querySelector('.add-to-order-btn');
                addButton.addEventListener('click', function() {
                    addItemToCart(item.name, item.price);
                });
            });
        }
    }

    // Event listener for search input
    const searchInput = document.getElementById('menu-search');
    searchInput.addEventListener('input', handleSearch);

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
