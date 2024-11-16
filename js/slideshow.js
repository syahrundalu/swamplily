const images = JSON.parse(localStorage.getItem("slideshowImages"));
const title = localStorage.getItem("slideshowTitle");

// Set the title on the page
document.getElementById("slideshow-title").innerText = title;

// Initialize the slideshow
let currentIndex = 0;
const slideshow = document.getElementById("slideshow");

function updateSlideshow() {
  slideshow.innerHTML = `<img src="${images[currentIndex]}" alt="${title}">`;
}

// Navigation buttons (if needed)
document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlideshow();
});
document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlideshow();
});

// Initialize the first image
updateSlideshow();
