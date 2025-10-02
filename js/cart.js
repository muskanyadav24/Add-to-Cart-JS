let cartProducts = document.getElementById('your-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cart.forEach(item => {
    let str ='';
    str += `
        <div class="col-12 col-md-6 col-lg-3 mb-3">
            <div class="card h-100 bg-black text-white">
                <img src="${item.thumbnail}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <strong class="card-text text-danger">Price: $${item.price}</strong>
                    <div class="d-flex align-items-center mb-2">
                    <strong class="card-text pe-3 m-0">Quantity: ${item.quantity}</strong>
                                <button class="btn btn-sm btn-outline-light me-2" onclick="incrementQuantity(${item.id})">+</button>
                                <button class="btn btn-sm btn-outline-light ms-2" onclick="decrementQuantity(${item.id})">-</button>
                    </div>
                    <strong class="card-text">Subtotal: $${(item.price * item.quantity).toFixed(2)}</strong><br>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-sm btn-outline-danger col-6 m-4 p-2" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    cartProducts.innerHTML += str;
});

// total amount
let yourTotal = document.getElementById('your-total');
yourTotal.innerText = `Total amount : $${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}`;

// increment (++)
const incrementQuantity = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id == id);
    if (product) {
        product.quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
};
// decrement (--) but not less than 1
const decrementQuantity = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id == id);
    if (product) {
        product.quantity -= 1;
        if (product.quantity < 1) {
            product.quantity = 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
};

// remove from cart
const removeFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != id);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
};
