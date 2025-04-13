
let slideNumber = 1;
let lastClickTime = 0;
let clickCount = 0;

const image = document.getElementById('slider-image');
const slideNumberText = document.getElementById('slide-number');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

function loadImage() {
  image.src = `https://picsum.photos/600/400?random=${Date.now()}`;
  slideNumberText.textContent = `Slide ${slideNumber}`;
}

function handleClick(direction) {
  const now = Date.now();

  // Reset click count if more than 1 second has passed
  if (now - lastClickTime > 1000) {
    clickCount = 0;
  }

  clickCount++;
  lastClickTime = now;

  if (clickCount > 3) {
    alert("Chill chill, loading it!!");
    return;
  }

  // Throttle image change
  if (!handleClick.throttle || now - handleClick.throttle > 1000) {
    handleClick.throttle = now;

    if (direction === 'next') {
      slideNumber++;
    } else if (direction === 'prev' && slideNumber > 1) {
      slideNumber--;
    }

    loadImage();
  }
}

nextBtn.addEventListener('click', () => handleClick('next'));
prevBtn.addEventListener('click', () => handleClick('prev'));
