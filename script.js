// Check if user is logged in
if (!localStorage.getItem("username")) {
  window.location.href = "login.html"; // Redirect to login page if not logged in
}

// Load balance from localStorage or default to 1000
let userBalance = parseInt(localStorage.getItem("balance")) || 1000;
updateBalanceBar();

// Update the inventory section
function updateInventory() {
  const inventoryItems = JSON.parse(localStorage.getItem("inventory")) || [];
  const inventoryArea = document.getElementById("inventoryItems");
  inventoryArea.innerHTML = "";

  inventoryItems.forEach(item => {
    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;
    inventoryArea.appendChild(img);
  });
}

// Crate prize data
const crates = {
  iphone: [
    { name: "iPhone 15 Pro", img: "images/iphone-15-pro.jpg", rarity: "legendary" },
    { name: "iPhone 14", img: "images/iphone-14.jpg", rarity: "rare" },
    { name: "iPhone Case", img: "images/iphone-case.jpg", rarity: "common" }
  ]
  // Add more crates if needed
};

// Open crate function
function openCrate(type) {
  if (userBalance < 100) {
    alert("Not enough credits!");
    return;
  }

  userBalance -= 100;
  localStorage.setItem("balance", userBalance);
  updateBalanceBar();

  const prizeList = crates[type];
  const prize = prizeList[Math.floor(Math.random() * prizeList.length)];

  setTimeout(() => {
    alert(`🎉 You won a ${prize.name}!`);
    addToInventory(prize);
  }, 2000);
}

// Add won prize to inventory
function addToInventory(prize) {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.push(prize);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  updateInventory();
}

// Update balance bar UI
function updateBalanceBar() {
  const balanceBar = document.getElementById("balanceBar");
  if (balanceBar) {
    balanceBar.innerText = `Balance: ${userBalance} Credits`;
  }
}

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// Deposit function
function depositCredits() {
  const depositAmount = prompt("Enter the amount of credits to deposit:");
  if (depositAmount && !isNaN(depositAmount) && depositAmount > 0) {
    userBalance += parseInt(depositAmount);
    localStorage.setItem("balance", userBalance);
    updateBalanceBar();
  } else {
    alert("Invalid deposit amount.");
  }
}

// Withdraw function
function withdrawCredits() {
  const withdrawAmount = prompt("Enter the amount of credits to withdraw:");
  if (withdrawAmount && !isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= userBalance) {
    userBalance -= parseInt(withdrawAmount);
    localStorage.setItem("balance", userBalance);
    updateBalanceBar();
  } else {
    alert("Invalid or insufficient funds.");
  }
}

// On page load
window.onload = () => {
  updateInventory();
  updateBalanceBar();
};
