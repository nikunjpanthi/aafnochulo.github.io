document.addEventListener('DOMContentLoaded', function() {
    
    // Function to filter menu items based on search input
    function filterMenuItems(searchTerm) {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const itemName = item.querySelector('h3').innerText.toLowerCase();
            if (itemName.startsWith(searchTerm.toLowerCase())) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Handle keyup event on search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = searchInput.value.trim();
            filterMenuItems(searchTerm);
        });
    }

    // Function to show all menu items
    function showAllMenuItems() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.style.display = 'block';
        });
    }

    // Initialize by showing all menu items
    showAllMenuItems();
});
