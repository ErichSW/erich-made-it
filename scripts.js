// List of works
const worksFolder = 'works/';
const works = [
    'Fingerless Gloves',
    'Chonky Uni Beanie',
    'Reversible Beanie',
    'Gnar Spreader',
    'Navy Beanie',
    'Lil Waffle Bean',
    'Raw Wool Mittens',
    'Ocean Shawl',
    'Twin Toques',
    'Silver Cable Hat',
    'Winter Scarf',
    'Basic Knit Cap',
    'First Swatch'
];

// Function to show modal
function showModal(image, title, details) {
    const modal = document.createElement("div");
    modal.className = "modal";

    // main modal content
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.style.position = "relative"; // Ensure modalContent is the positioning context

    // close button
    const closeButton = document.createElement("button");
    closeButton.className = "close-button"; // Add class to the button
    closeButton.addEventListener("click", () => {
        modal.remove();
    });
    
    // event listener to close modal when clicking outside the modal content
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });

    // image, title, and details
    const modalImage = document.createElement("img");
    modalImage.className = "modal-image";
    modalImage.src = image;
    modalImage.addEventListener("click", () => {
        window.open(image, '_blank'); // Open full res image in new tab
    });
    const modalTitle = document.createElement("h2");
    modalTitle.textContent = title;
    const modalDetails = document.createElement("p");
    modalDetails.textContent = details;
    modalDetails.style.whiteSpace = "pre-wrap"; // Preserve line breaks from text file

    // assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalImage);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDetails);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = "flex";
}

// create gallery
const gallery = document.getElementById('gallery');
if (gallery) {
    works.forEach((folder) => {

        // create each gallery item
        const box = document.createElement("div");
        box.className = "box";

        // add image container
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";
        imageContainer.style.position = "relative";
        imageContainer.style.width = "100%";
        imageContainer.style.paddingTop = "100%"; // 1:1 Aspect Ratio

        // get image
        const img = document.createElement("img");
        img.src = `${worksFolder}${folder}/image.jpg`;
        img.alt = folder;
        imageContainer.appendChild(img);
        box.appendChild(imageContainer);
        
        // add title
        const title = document.createElement("h3");
        title.textContent = folder;
        box.appendChild(title);
        
        // event listener to show modal on click
        box.addEventListener("click", () => {
            fetch(`${worksFolder}${folder}/details.txt`) // get details from text file
                .then((response) => response.text())
                .then((details) => {
                    showModal(`${worksFolder}${folder}/image.jpg`, folder, details);
                })
                .catch((error) => {
                    console.error('Error fetching details:', error);
                    showModal(`${worksFolder}${folder}/image.jpg`, folder, ''); // Show modal with blank details on error
                });
        });

        gallery.appendChild(box);
    });
} else {
    console.error('Gallery element not found');
}

// randomized animation of polaroids
document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        const randomX = Math.random() * 40 - 20; // Random value between -20 and 20
        const randomY = Math.random() * 40 - 20; // Random value between -20 and 20
        const randomRotate = Math.random() * 20 - 10; // Random value between -10deg and 10deg
    
        box.style.setProperty('--random-x', `${randomX}px`);
        box.style.setProperty('--random-y', `${randomY}px`);
        box.style.setProperty('--random-rotate', `${randomRotate}deg`);
        box.style.animation = `fadeIn 1s forwards ${index * 0.2}s`; // Apply fade-in animation with delay
    });
  });
