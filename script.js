let userBalance = 1000;

// Check if user is logged in
if (!localStorage.getItem("username")) {
  window.location.href = "login.html"; // Redirect to login page if not logged in
}

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

// Example crate data
const crates = {
  iphone: [
    { name: "iPhone 15 Pro", img: "images/iphone-15-pro.jpg", rarity: "legendary" },
    { name: "iPhone 14", img: "images/iphone-14.jpg", rarity: "rare" },
    { name: "iPhone Case", img: "images/iphone-case.jpg", rarity: "common" },
  ],
  // Other crate types can be added similarly
};

function openCrate(type) {
  if (userBalance < 100) {
    alert("Not enough credits!");
    return;
  }

  userBalance -= 100;
  document.getElementById("balanceBar").innerText = `Balance: ${userBalance} Credits`;

  const prizeList = crates[type];
  const prize = prizeList[Math.floor(Math.random() * prizeList.length)];

  setTimeout(() => {
    alert(`🎉 You won a ${prize.name}!`);
    addToInventory(prize);
  }, 2000);
}

// Add won prize to the inventory
function addToInventory(prize) {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.push(prize);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  updateInventory();
}

// Logout function to clear session and redirect to login page
function logout() {
  localStorage.clear();
  window.location.href = "login.html"; // Redirect to login page
}

// Deposit function to add credits
function depositCredits() {
  const depositAmount = prompt("Enter the amount of credits to deposit:");
  if (depositAmount && !isNaN(depositAmount) && depositAmount > 0) {
    userBalance += parseInt(depositAmount);
    document.getElementById("balanceBar").innerText = `Balance: ${userBalance} Credits`;
  } else {
    alert("Invalid deposit amount.");
  }
}

// Withdraw function to subtract credits
function withdrawCredits() {
  const withdrawAmount = prompt("Enter the amount of credits to withdraw:");
  if (withdrawAmount && !isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= userBalance) {
    userBalance -= parseInt(withdrawAmount);
    document.getElementById("balanceBar").innerText = `Balance: ${userBalance} Credits`;
  } else {
    alert("Invalid or insufficient funds.");
  }
}

// Call the inventory update function on page load
window.onload = updateInventory;
