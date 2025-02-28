import * as deepar from "deepar";
import Carousel from "./carousel.js";

console.log("Deepar version: " + deepar.version);

let deepAR = null;
let currentEffect = null;

// Add click event listeners to all Try AR buttons
document.querySelectorAll('.try-ar-button').forEach(button => {
  button.addEventListener('click', (event) => {
    const effectPath = event.target.dataset.effect;
    initializeAR(effectPath);
    const shoeCard = button.closest(".shoe-card"); // Get the closest shoe-card container
    const shoeName = shoeCard.querySelector(".shoe-name").textContent; // Get the shoe name
    const shoePrice = shoeCard.querySelector(".shoe-price").textContent;

    // Set the shoe name in the ar-shoe-name element
    const arShoeNameElement = document.getElementById("ar-shoe-name");
    const arShoePriceElement = document.getElementById("ar-shoe-price");
    if (arShoeNameElement) {
        arShoeNameElement.textContent = shoeName;
        arShoePriceElement.textContent = shoePrice;
    }

  });
});

// Add exit AR functionality
document.getElementById('exit-ar-button').addEventListener('click', exitAR);

async function exitAR() {
  document.getElementById("ar-screen").style.display = "none";
  document.getElementById("welcome-screen").style.display = "block";
  
  if (deepAR) {
    try {
      await deepAR.shutdown();
      deepAR = null;
    } catch (error) {
      console.error('Error shutting down DeepAR:', error);
    }
  }
}

async function initializeAR(effectPath) {
  document.getElementById('welcome-screen').style.display = 'none';
  
  const previewElement = document.getElementById("ar-screen");

  try {
    deepAR = await deepar.initialize({
      licenseKey: "3e854fd36262b0ac35a422a922d8bc2a13f8bcef5bc0bc2fb27dd830a9aae259a297d08f8a89d53b",
      previewElement,
      effect: effectPath,
      rootPath: "./deepar-resources",
      additionalOptions: {
        cameraConfig: {
          facingMode: 'environment'
        },
        hint: "footInit",
      },
    });
    
  } catch (error) {
    console.error(error);
    document.getElementById("permission-denied-screen").style.display = "block";
    return;
  }

  document.getElementById("ar-screen").style.display = "block";
  currentEffect = effectPath;
}