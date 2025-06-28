const API_URL = '/api/products';

const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');

// Load products
async function loadProducts(query = "") {
    const res = await fetch(API_URL);
    const products = await res.json();

    productList.innerHTML = '';

    products
        .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
        .forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-4';

            const card = document.createElement('div');
            card.className = 'card h-100';

            const img = document.createElement('img');
            img.src = product.image;
            img.className = 'card-img-top';
            img.alt = product.name;
            img.onerror = () => {
                img.src = 'https://via.placeholder.com/300x200?text=No+Image';
            };

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex flex-column';

            const title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = product.name;

            const desc = document.createElement('p');
            desc.className = 'card-text';
            desc.textContent = product.description;

            const price = document.createElement('p');
            price.className = 'card-text fw-bold';
            price.textContent = `₹${product.price}`;

            const stock = document.createElement('p');
            stock.className = 'card-text';
            stock.textContent = `Stock: ${product.stock}`;

            const btn = document.createElement('button');
            btn.className = 'btn btn-primary mt-auto';
            btn.textContent = 'Add to Cart';

            if (product.stock <= 0) {
                btn.disabled = true;
                btn.textContent = 'Out of Stock';
            }

            btn.addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(product._id);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} added to cart!`);
            });

            cardBody.appendChild(title);
            cardBody.appendChild(desc);
            cardBody.appendChild(price);
            cardBody.appendChild(stock);
            cardBody.appendChild(btn);

            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            productList.appendChild(col);
        });
}

// Search filter
searchInput.addEventListener('input', (e) => {
    loadProducts(e.target.value);
});

window.onload = () => loadProducts();
