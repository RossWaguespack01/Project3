let balance = 5; // starting balance
let spinCount = 0; // counts spins since last guaranteed win
const balanceDisplay = document.getElementById('balance');
const message = document.getElementById('message');
const crank = document.getElementById('crank');
const insertCoinButton = document.getElementById('insert-coin');
const symbolList = ['🍒', '🍋', '🍇', '🍊', '⭐', '7️⃣'];

const payouts = {
  '🍒': 1,
  '🍋': 3,
  '🍇': 5,
  '🍊': 9,
  '7️⃣': 7,
  '⭐': 100
};

insertCoinButton.addEventListener('click', () => {
  if (balance < 1) {
    message.textContent = "You don't have enough money!";
    return;
  }

  balance -= 1;
  balanceDisplay.textContent = balance;
  message.textContent = "";

  crank.classList.add('pulled');
  setTimeout(() => crank.classList.remove('pulled'), 300);

  const reelsArray = Array.from(document.querySelectorAll('.reel'));
  const result = [];

  spinCount++; // increment the spin counter

  reelsArray.forEach((reel, i) => {
    reel.classList.add('spinning');

    setTimeout(() => {
      reel.classList.remove('spinning');

      let selectedSymbol;

      // Force a win on the 5th spin
      if (spinCount === 5) {
        // pick a random symbol to be the winning one
        selectedSymbol = symbolList[Math.floor(Math.random() * symbolList.length)];
      } else {
        // random symbol normally
        selectedSymbol = symbolList[Math.floor(Math.random() * symbolList.length)];
      }

      result.push(selectedSymbol);

      // update visual position
      const symbolsDiv = reel.querySelector('.symbols');
      const symbolIndex = symbolList.indexOf(selectedSymbol);
      symbolsDiv.style.transform = `translateY(-${symbolIndex * 90}px)`;

      if (result.length === reelsArray.length) {
        if (spinCount === 5) {
          // force all symbols to match
          const winningSymbol = result[0];
          result[1] = winningSymbol;
          result[2] = winningSymbol;

          // update visuals for the other reels
          reelsArray[1].querySelector('.symbols').style.transform = `translateY(-${symbolList.indexOf(winningSymbol) * 90}px)`;
          reelsArray[2].querySelector('.symbols').style.transform = `translateY(-${symbolList.indexOf(winningSymbol) * 90}px)`;

          spinCount = 0; // reset counter after guaranteed win
        }

        if (result.every(s => s === result[0])) {
          const payout = payouts[result[0]];
          balance += payout;
          balanceDisplay.textContent = balance;
          message.textContent = `🎉 You got 3 ${result[0]}! You win $${payout}!`;
        } else {
          message.textContent = "No match! Insert another $1 to try again.";
        }
      }

    }, 2000 + i * 500);
  });
});