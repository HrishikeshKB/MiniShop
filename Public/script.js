const API_URL = '/api/products';


const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const submitBtn = productForm.querySelector('button');

let editingProductId = null;

// Load products with image support
async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();

  productList.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.objectFit = 'cover';
    img.style.marginRight = '10px';
    img.onerror = () => {
      img.src = 'https://via.placeholder.com/100?text=No+Image';
    };

    const info = document.createElement('span');
    info.textContent = `${product.name} - ₹${product.price} (${product.description}) - Stock: ${product.stock}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', async () => {
      if (confirm(`Delete "${product.name}"?`)) {
        await fetch(`${API_URL}/${product._id}`, { method: 'DELETE' });
        loadProducts();
      }
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      document.getElementById('name').value = product.name;
      document.getElementById('price').value = product.price;
      document.getElementById('description').value = product.description;
      document.getElementById('image').value = product.image;
      document.getElementById('stock').value = product.stock; // prefill stock
      submitBtn.textContent = 'Update Product';
      editingProductId = product._id;
    });

    li.appendChild(img);
    li.appendChild(info);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    productList.appendChild(li);
  });
}

// Add or Update product with image and stock
productForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').value;
  const stock = document.getElementById('stock').value;

  if (editingProductId) {
    await fetch(`${API_URL}/${editingProductId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, description, image, stock })
    });
    editingProductId = null;
    submitBtn.textContent = 'Add Product';
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, description, image, stock }) // ✅ Fixed
    });
  }

  productForm.reset();
  loadProducts();
});

window.onload = loadProducts;
