const products = [
    { id: 1, name: "Laptop Pro", price: 999, image: "https://via.placeholder.com/200x140?text=Laptop", category: "Electronics" },
    { id: 2, name: "Wireless Headphones", price: 199, image: "https://via.placeholder.com/200x140?text=Headphones", category: "Electronics" },
    { id: 3, name: "Running Shoes", price: 129, image: "https://via.placeholder.com/200x140?text=Shoes", category: "Fashion" },
    { id: 4, name: "Smart TV", price: 499, image: "https://via.placeholder.com/200x140?text=TV", category: "Home" },
    { id: 5, name: "Yoga Mat", price: 49, image: "https://via.placeholder.com/200x140?text=Yoga+Mat", category: "Sports" },
    { id: 6, name: "T-Shirt Pack", price: 39, image: "https://via.placeholder.com/200x140?text=T-Shirts", category: "Fashion" }
  ];
  
  const productList = document.getElementById("productList");
  const searchInput = document.getElementById("searchInput");
  const summaryTotal = document.getElementById("summaryTotal");
  const summaryPrice = document.getElementById("summaryPrice");
  
  let activeCategory = "All";
  
  function displayProducts(filter = "") {
    const filtered = products.filter(p =>
      (activeCategory === "All" || p.category === activeCategory) &&
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  
    productList.innerHTML = "";
  
    filtered.forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
      `;
      productList.appendChild(div);
    });
  
    summaryTotal.textContent = `Total Products: ${filtered.length}`;
    const totalPrice = filtered.reduce((sum, p) => sum + p.price, 0);
    summaryPrice.textContent = `Total Price: $${totalPrice}`;
  }
  
  searchInput.addEventListener("input", () => {
    displayProducts(searchInput.value);
  });
  
  document.querySelectorAll(".sidebar li").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".sidebar li").forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      activeCategory = item.dataset.category;
      displayProducts(searchInput.value);
    });
  });
  
  displayProducts();
  