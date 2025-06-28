document.addEventListener("DOMContentLoaded", async () => {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    const checkoutBtn = document.getElementById("checkoutBtn");

    const fetchProducts = async () => {
        const response = await fetch("/api/products");
        return await response.json();
    };

    const displayCart = async () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const products = await fetchProducts();
        let total = 0;
        cartItemsContainer.innerHTML = "";

        cart.forEach(productId => {
            const product = products.find(p => p._id === productId);
            if (product) {
                total += product.price;
                const item = document.createElement("div");
                item.className = "list-group-item d-flex justify-content-between align-items-center";
                item.innerHTML = `
                    ${product.name} - ₹${product.price}
                    <button class="btn btn-danger btn-sm remove-btn" data-id="${product._id}">Remove</button>
                `;
                cartItemsContainer.appendChild(item);
            }
        });

        totalPriceElement.textContent = total;

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const idToRemove = e.target.getAttribute("data-id");
                let updatedCart = cart.filter(id => id !== idToRemove);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                displayCart();
            });
        });
    };

    checkoutBtn.addEventListener("click", () => {
        alert("Checkout successful!");
        localStorage.removeItem("cart");
        displayCart();
    });

    displayCart();
});
