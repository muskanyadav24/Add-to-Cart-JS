let cartProducts = document.getElementById('your-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cart.forEach(item => {
    let str ='';
    str += `
        <div class="col-12 d-flex p-0 mb-3 align-items-center border rounded bg-black text-white">
        <div class="col-2 text-center">
            <img src="${item.thumbnail}" class="rounded-start w-50" alt="${item.name}">
        </div>
        <div class="col-2 text-center">
            <h5 class="card-title m-0">${item.name}</h5>
        </div>
        <div class="col-2 text-center">
            <strong class="card-text text-success">Price: $${item.price}</strong>
        </div>
        <div class="col-2 text-center">
            <p class="card-text m-0">
                <button class="btn btn-sm btn-outline-light" onclick="decrementQuantity(${item.id})">-</button>
                <span id="qty-${item.id}" class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-light" onclick="incrementQuantity(${item.id})">+</button>
            </p>
        </div>
        <div class="col-2 text-center">
            <p class="card-text m-0">
                Subtotal: <span id="price-${item.id}">${(item.price * item.quantity).toFixed(2)}</span>
            </p>
        </div>
        <div class="col-2 text-center">
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    </div>
`;
    cartProducts.innerHTML += str;
});

// total amount
let totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

let discount = 0;
let finalAmount = totalAmount;

if (totalAmount >= 500) {
  discount = totalAmount * 0.1; 
  finalAmount = totalAmount - discount;
}

document.getElementById('your-total').innerText = `Total Amount: $${totalAmount.toFixed(2)}`;

if (totalAmount >= 500) {
    document.getElementById('discount').innerText = "Discount (10%): -$" + discount.toFixed(2);
} else {
    document.getElementById('discount').innerText = "No Discount Applied";
}

document.getElementById('final').innerText = `Final Amount: $${finalAmount.toFixed(2)}`;

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
