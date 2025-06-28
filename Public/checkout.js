const API_URL = '/api/products';
const cartContainer = document.getElementById('cartContainer');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

async function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        checkoutBtn.disabled = true;
        clearCartBtn.disabled = true;
        return;
    }

    cartContainer.innerHTML = '';
    let total = 0;

    for (const productId of cart) {
        try {
            const res = await fetch(`${API_URL}/${productId}`);
            const product = await res.json();

            const card = document.createElement('div');
            card.className = 'card mb-2';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex justify-content-between align-items-center';

            const info = document.createElement('div');
            info.innerHTML = `
                <h5 class="card-title mb-0">${product.name}</h5>
                <p class="mb-0">Price: ₹${product.price}</p>
            `;

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.style.width = '80px';
            img.style.height = '80px';
            img.style.objectFit = 'cover';
            img.className = 'ms-2';

            cardBody.appendChild(info);
            cardBody.appendChild(img);
            card.appendChild(cardBody);
            cartContainer.appendChild(card);

            total += Number(product.price);
        } catch (error) {
            console.error(`Error fetching product ${productId}:`, error);
        }
    }

    const totalElement = document.createElement('h4');
    totalElement.className = 'text-end mt-3';
    totalElement.textContent = `Total: ₹${total}`;
    cartContainer.appendChild(totalElement);
}

// Checkout: decrement stock and clear cart
checkoutBtn.addEventListener('click', async () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    for (const productId of cart) {
        try {
            const res = await fetch(`${API_URL}/${productId}`);
            const product = await res.json();

            if (product.stock > 0) {
                // Decrement stock by 1
                await fetch(`${API_URL}/${productId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ stock: product.stock - 1 })
                });
            } else {
                alert(`"${product.name}" is out of stock and was not purchased.`);
            }
        } catch (error) {
            console.error(`Error updating product ${productId}:`, error);
        }
    }

    alert('Checkout completed!');
    localStorage.removeItem('cart');
    loadCart();
});

// Clear cart manually
clearCartBtn.addEventListener('click', () => {
    localStorage.removeItem('cart');
    loadCart();
});

window.onload = loadCart;
