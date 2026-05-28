let cart = {};

window.onload = () => {
  let saved = localStorage.getItem("cart");
  if(saved){
    cart = JSON.parse(saved);
    updateCart();
  }
};

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, price, name){

  if(!cart[id]){
    cart[id] = {name, price, qty:0};
  }

  cart[id].qty++;
  updateCart();
  showToast("Added ✔");
}

function removeFromCart(id){

  if(!cart[id]) return;

  cart[id].qty--;

  if(cart[id].qty <= 0){
    delete cart[id];
  }

  updateCart();
  showToast("Removed ❌");
}

function updateCart(){

  let count = 0;
  let total = 0;

  for(let id in cart){
    count += cart[id].qty;
    total += cart[id].qty * cart[id].price;
  }

  let el = document.getElementById("cart-count");
  if(el) el.innerText = count;

  renderCart(total);
  saveCart();
}

function renderCart(total){

  let box = document.getElementById("cart-items");
  if(!box) return;

  box.innerHTML = "";

  for(let id in cart){
    box.innerHTML += `
      <div>${cart[id].name} x${cart[id].qty}</div>
    `;
  }

  document.getElementById("cart-total").innerText = "Total: ₱" + total;
}

function openCart(){
  document.getElementById("cart-modal").style.display = "flex";
}

function closeCart(){
  document.getElementById("cart-modal").style.display = "none";
}

function goCheckout(){
  window.location.href = "checkout.html";
}

// TOAST
function showToast(msg){

  let toast = document.getElementById("toast");

  if(!toast){
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.innerText = msg;
  toast.className = "show";

  setTimeout(() => {
    toast.className = "";
  }, 1500);
}