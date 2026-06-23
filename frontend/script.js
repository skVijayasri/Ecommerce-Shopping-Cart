let products = [];
let cart = [];

const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");

async function loadProducts() {
  const res = await fetch("http://localhost:5000/products");
  products = await res.json();

  productsDiv.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    let imagePath = "";

    if (product.name === "Laptop") {
      imagePath = "images/laptop.png";
    } else if (product.name === "Phone") {
      imagePath = "images/phone.png";
    } else if (product.name === "Headphones") {
      imagePath = "images/headphones.png";
    }

    div.innerHTML = `
      <img src="${imagePath}" width="150">
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productsDiv.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  loadCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  loadCart();
}

function loadCart() {
  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartDiv.appendChild(div);
  });

  document.getElementById("total-items").innerText = cart.length;
  document.getElementById("total-price").innerText = total;
}

loadProducts();


function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);

  alert(
    `Order placed successfully!\nTotal Items: ${cart.length}\nTotal Price: ₹${total}`
  );

  cart = [];
  loadCart();
}