let products = [];


// Get product container

const productsDiv =
    document.getElementById("products");


// Load products from backend

async function loadProducts() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/products"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load products"
            );

        }


        products =
            await response.json();


        productsDiv.innerHTML = "";


        // Display products

        products.forEach(product => {

            const div =
                document.createElement("div");


            div.className =
                "product";


            // Product image

            let imagePath =
                "images/default.png";


            if (product.name === "Laptop") {

                imagePath =
                    "images/laptop.png";

            }

            else if (product.name === "Phone") {

                imagePath =
                    "images/phone.png";

            }

            else if (product.name === "Headphones") {

                imagePath =
                    "images/headphones.png";

            }


            div.innerHTML = `

                <img
                    src="${imagePath}"
                    alt="${product.name}"
                >

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ₹${product.price}
                </p>

                <button
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            `;


            productsDiv.appendChild(div);

        });


        updateCartCount();

    }

    catch (error) {

        console.error(error);


        productsDiv.innerHTML = `

            <div class="error-message">

                <h3>
                    Unable to load products
                </h3>

                <p>
                    Please make sure the backend
                    and MySQL are running.
                </p>

            </div>

        `;

    }

}



// Add product to cart

function addToCart(id) {


    const product =
        products.find(
            product => product.id === id
        );


    if (!product) {

        return;

    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push(product);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        `${product.name} added to cart!`
    );

}



// Update cart count

function updateCartCount() {


    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const cartCount =
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.innerText =
            cart.length;

    }

}



// Load products

loadProducts();