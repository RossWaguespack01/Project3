const crank = document.getElementById('crank');
const reels = document.querySelectorAll('.reel');

crank.addEventListener('click', () => {
  crank.classList.add('pulled');
  setTimeout(() => crank.classList.remove('pulled'), 300);

  reels.forEach((reel, i) => {
    reel.classList.add('spinning');
    setTimeout(() => {
      reel.classList.remove('spinning');
      const symbols = reel.querySelector('.symbols');
      const total = symbols.children.length;
      const rand = Math.floor(Math.random() * total);
      symbols.style.transform = `translateY(-${rand * 90}px)`;
    }, 2000 + i * 500);
  });
});