// Predefined list of users (for demonstration purposes)
const users = [

    { email: '24eg105k10@anurag.edu.in', rollNumber: '12345' },
    { email: 'student2@college.edu', rollNumber: '67890' },
    { email: 'student3@college.edu', rollNumber: '54321' }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const rollNumber = document.getElementById('password').value;

    // Validate the login credentials
    const user = users.find(user => user.email === email && user.rollNumber === rollNumber);
    if (user) {
        // Redirect to the main page after successful login
        window.location.href = 'grabngo.html';
    } else {
        alert('Invalid email or roll number');
    }
});

document.getElementById('orderNowBtn').addEventListener('click', function() {
    window.location.href = "menu.html";
});

// Function to add item to cart
function addToCart(name, price) {
    if (!name || isNaN(price)) {
        console.error("Invalid item name or price.");
        return;
    }

    // Get cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add new item to cart
    cartItems.push({ name, price });

    // Save updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update cart display
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    // Get cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Get cart items container
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) {
        console.error("Cart container not found.");
        return;
    }

    cartItemsContainer.innerHTML = '';

    // Add each cart item to the container
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Load cart items when the cart page is opened
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        updateCartDisplay();
    }
});