// Get cart from localStorage

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// Get HTML elements

const cartDiv =
    document.getElementById("cart");

const totalItems =
    document.getElementById("total-items");

const totalPrice =
    document.getElementById("total-price");

const cartCount =
    document.getElementById("cart-count");


// Display cart

function loadCart() {


    cartDiv.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        cartDiv.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products from our shop.
                </p>

                <a href="shop.html">
                    Continue Shopping
                </a>

            </div>

        `;


        updateSummary();

        return;

    }


    // Display cart items

    cart.forEach((item, index) => {


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        div.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price}
                </p>

            </div>


            <button
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartDiv.appendChild(div);

    });


    updateSummary();

}



// Remove item

function removeFromCart(index) {


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}



// Update totals

function updateSummary() {


    const total =
        cart.reduce(
            (sum, item) =>
                sum + Number(item.price),
            0
        );


    totalItems.innerText =
        cart.length;


    totalPrice.innerText =
        total;


    if (cartCount) {

        cartCount.innerText =
            cart.length;

    }

}



// Checkout

function checkout() {


    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + Number(item.price),
            0
        );


    alert(

        `Order placed successfully!

Total Items: ${cart.length}

Total Price: ₹${total}`

    );


    // Clear cart

    cart = [];


    localStorage.removeItem(
        "cart"
    );


    loadCart();

}



// Load cart when page opens

loadCart();