var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    reachEnd: function () {
      loadMoreSlides();
    }
  }
});

async function fetchImage() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

async function loadMoreSlides() {
  for (let i = 0; i < 3; i++) { // Load 3 new slides each time
    const imageUrl = await fetchImage();
    if (imageUrl) {
      const newSlide = document.createElement('div');
      newSlide.classList.add('swiper-slide');
      const img = document.createElement('img');
      img.src = imageUrl;
      newSlide.appendChild(img);
      swiper.appendSlide(newSlide); // Add new slide to swiper
    }
  }
}

async function initializeSlides() {
  const slides = document.querySelectorAll('.swiper-slide');
  for (let i = 0; i < slides.length; i++) {
    const imageUrl = await fetchImage();
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      slides[i].innerHTML = ''; // Clear existing content
      slides[i].appendChild(img);
    }
  }
}

initializeSlides();