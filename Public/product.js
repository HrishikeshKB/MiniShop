document.addEventListener("DOMContentLoaded", async () => {
    const productDetail = document.getElementById("productDetail");
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        productDetail.innerHTML = "<p class='text-center p-3'>Product not found.</p>";
        return;
    }

    const res = await fetch(`/api/products/${productId}`);
    const product = await res.json();

    productDetail.innerHTML = `
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
            <h3 class="card-title">${product.name}</h3>
            <p class="card-text">${product.description}</p>
            <h4 class="card-text">₹${product.price}</h4>
            <p class="card-text">Stock: ${product.stock}</p>
            <button class="btn btn-primary w-100 mt-3" id="addToCartBtn">Add to Cart</button>
        </div>
    `;

    document.getElementById("addToCartBtn").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    });
});
