function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
   startBtn: document.querySelector('button[data-start]'),
   stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId = null;
let isIntervalActive = false;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', () => {

   if (isIntervalActive) {
      return;
   }
   intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
   }, 1000);
   isIntervalActive = true;
   refs.startBtn.disabled = true;
   refs.stopBtn.disabled = false;
});


refs.stopBtn.addEventListener('click', () => {
   
   if (!isIntervalActive) {
      return 
   }
   clearInterval(intervalId);
   document.body.style.backgroundColor = '';
   isIntervalActive = false; // нужно сбросить значение интервала, чтобы запустить заново
   refs.startBtn.disabled = false;
   refs.stopBtn.disabled = true;
});
