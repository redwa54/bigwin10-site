function openCrate(type) {
  if (userBalance < 100) {
    alert("Not enough credits!");
    return;
  }

  userBalance -= 100;
  balanceBar.innerText = `Balance: ${userBalance} Credits`;

  const prizeArea = document.getElementById("prizeArea");
  const prizeText = document.getElementById("prizeText");
  const prizeImage = document.getElementById("prizeImage");
  const rollingText = document.getElementById("rollingText");

  prizeArea.style.display = "block";
  rollingText.style.display = "block";
  prizeText.style.display = "none";
  prizeImage.style.display = "none";

  // Apply the spinning animation
  const lootBox = event.target.closest('.loot-box');
  lootBox.classList.add('spinning');

  const prizeList = crates[type];
  const prize = prizeList[Math.floor(Math.random() * prizeList.length)];

  setTimeout(() => {
    // After 3 seconds, stop the spinning animation
    lootBox.classList.remove('spinning');

    rollingText.style.display = "none";
    prizeText.innerText = `🎉 You won a ${prize.name}!`;
    prizeImage.src = prize.img;
    prizeText.style.display = "block";
    prizeImage.style.display = "block";
    raritySounds[prize.rarity].play();
  }, 3000);  // Match this duration with the CSS animation time
}
