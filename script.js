var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  centeredSlides: true,
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  keyboard: true
});

async function fetchDogImages() {
  try {
    const responses = await Promise.all([
      fetch("https://dog.ceo/api/breeds/image/random"),
      fetch("https://dog.ceo/api/breeds/image/random"),
      fetch("https://dog.ceo/api/breeds/image/random"),
      fetch("https://dog.ceo/api/breeds/image/random"),
      fetch("https://dog.ceo/api/breeds/image/random"),
      fetch("https://dog.ceo/api/breeds/image/random"),
      fetch("https://dog.ceo/api/breeds/image/random")

    ]);

    const images = await Promise.all(responses.map(res => res.json()));
    updateSlideBackground(".swiper-slide", images);
  
  } catch (error) {
    console.error("Error fetching dog images:", error);
  }
}

// chỉnh bgr của thẻ
const slide = document.querySelectorAll(".swiper-slide");
function updateSlideBackground(selector, imageUrl) {
  const slide = document.querySelectorAll(selector);
  if (slide) {
    slide.forEach((image,index)=>{
      image.style.backgroundImage = `url('${imageUrl[index].message}')`;
    })
  } else {
    console.error(`Slide with selector "${selector}" not found`);
  }
}
fetchDogImages();
const hoverEvent= () =>{
  // const slide = document.querySelectorAll(selector);
  slide.forEach((item, index) => {
  console.log(item)
  // Add class 'opacity' for other slide-item 

  item.addEventListener('mouseenter', () => {
      slide.forEach((item, idx) => {
          if (idx !== index) {
              item.classList.add('opacity');
              
          }
      });
  });
  // Remove class 'opacity' when mouse leaves slide-item
  item.addEventListener('mouseleave', () => {
      slide.forEach((item) => {
          item.classList.remove('opacity');
      });
  });
  });
}
hoverEvent();
