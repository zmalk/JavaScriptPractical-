let cart = JSON.parse(localStorage.getItem("cart")) || [];

function initializeApp() {
  fetch("./products.json")
    .then((response) => response.json())
    .then((products) => {
      let allProducts = products;
      renderCategories(allProducts);
      renderProducts(allProducts);
    })
    .catch((error) => {
      console.error("Error Fetching Products:", error);
    });
}

function renderCategories(products) {
  const categories = [...new Set(products.map((product) => product.category))];
  // console.log(categories);
  const navbar = document.getElementById("navbar");
  navbar.innerHTML = "";

  // Update Active Class
  function updateActiveCategory(activeItem) {
    const navbarItems = navbar.querySelectorAll(".nav-item");
    navbarItems.forEach((item) => item.classList.remove("active"));
    activeItem.classList.add("active");
  }

  // Add All Products Link
  const allProductsItem = document.createElement("li");
  allProductsItem.className = "nav-item active"; // Default Link -> All Products
  allProductsItem.textContent = "All Products";
  allProductsItem.addEventListener("click", () => {
    updateActiveCategory(allProductsItem);
    renderProducts(products);
  });
  navbar.appendChild(allProductsItem);

  // Add Categories Link
  categories.forEach((category) => {
    const navItem = document.createElement("li");
    navItem.className = "nav-item";
    navItem.textContent = category;
    navItem.addEventListener("click", () => {
      updateActiveCategory(navItem);
      const filteredProducts = products.filter((product) => product.category === category);
      renderProducts(filteredProducts);
    });
    navbar.appendChild(navItem);
  });
}

function renderProducts(products) {
  const productsListElement = document.getElementById("product-list");
  productsListElement.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    // console.log(product.id);
    // console.log(typeof product.id);

    const cartItem = cart.find((item) => item.id === product.id.toString());
    const inCartAmount = cartItem ? cartItem.quantity : 0;

    productCard.innerHTML = `
      <span class="id">#${product.id}</span>
      <img src="imgs/${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p class="description">${product.description}</p>
      <div class="info-container">
        <p class="price">$${product.price}</p>
        <p class="in-cart-amount">
          ${inCartAmount > 0 ? `[ <span>${inCartAmount}</span> ] In Cart` : ""}
        </p>
      </div>
      <button 
        data-id="${product.id}" 
        data-title="${product.title}" 
        data-price="${product.price}">
        Add To Cart
      </button>
    `;

    productsListElement.appendChild(productCard);
  });

  const addToCartButtons = document.querySelectorAll("button[data-id]");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  updateCart();
  updateProductsCards();
}

function addToCart(event) {
  const button = event.target;
  const id = button.getAttribute("data-id");
  const title = button.getAttribute("data-title");
  const price = parseFloat(button.getAttribute("data-price"));
  // console.log(id, title, price);

  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id, title, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateProductsCards();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div>
        <h4>${item.title}</h4>
        <span>${item.price} x ${item.quantity}</span>
      </div>
      <button class="delete-btn" data-id="${item.id}">Delete</button>
    `;
    cartItems.appendChild(listItem);
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(event) {
  const button = event.target;
  const id = button.getAttribute("data-id");
  cart = cart.filter((item) => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateProductsCards();
}

function updateProductsCards() {
  const productCards = document.querySelectorAll(".product-card");
  // console.log(productCards);
  productCards.forEach((card) => {
    const id = card.querySelector("button").getAttribute("data-id");
    const inCartAmountElement = card.querySelector(".in-cart-amount");
    const cartItem = cart.find((item) => item.id === id);

    if (cartItem) {
      inCartAmountElement.innerHTML = `[ <span>${cartItem.quantity}</span> ] In Cart`;
    } else {
      inCartAmountElement.innerHTML = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", initializeApp);
