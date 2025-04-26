// Handle balance display and update after login
window.onload = function() {
    const user = localStorage.getItem('username');
    const balance = localStorage.getItem('balance') || 0;

    if (user) {
        // If logged in, show user info and balance
        document.getElementById('userBalance').innerText = `User: ${user} | Balance: ${balance}`;
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'inline';
    }
};

// When opening a crate, update balance
function openCrate(type) {
    const user = localStorage.getItem('username');
    if (!user) {
        alert('Please login to open a crate.');
        return;
    }

    let balance = parseInt(localStorage.getItem('balance') || '0');
    if (balance < 100) {
        alert('Not enough credits to open this crate.');
        return;
    }

    balance -= 100;
    localStorage.setItem('balance', balance);
    document.getElementById('userBalance').innerText = `User: ${user} | Balance: ${balance}`;

    // Prize logic remains the same
    const prizeArea = document.getElementById('prizeArea');
    const prizeText = document.getElementById('prizeText');
    const prizeImage = document.getElementById('prizeImage');
    const list = crates[type];
    prizeArea.style.display = 'block';
    setTimeout(() => {
        const prize = list[Math.floor(Math.random() * list.length)];
        prizeText.innerText = `🎉 You won a ${prize.name}!`;
        prizeImage.src = prize.img;
        document.getElementById('sound-common').play();

        let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.push(prize);
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }, 2000);
}
