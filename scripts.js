// Function to show modal
function showModal(image, title, details) {
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.marginBottom = "10px";
    closeButton.addEventListener("click", () => {
        modal.remove();
    });

    const modalImage = document.createElement("img");
    modalImage.src = image;
    modalImage.style.width = "100%"; // Scale image to fit modal

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = title;

    const modalDetails = document.createElement("p");
    modalDetails.textContent = details;
    modalDetails.style.whiteSpace = "pre-wrap"; // Preserve line breaks

    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalImage);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDetails);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    modal.style.display = "flex";
}

// Manually list the works
const works = [
    { folder: 'works/008', title: 'Navy Beanie', image: 'image.jpg' },
    { folder: 'works/007', title: 'Lil baby bean', image: 'image.jpg' },
    { folder: 'works/006', title: 'Rustic Wool Mittens', image: 'image.jpg' },
    { folder: 'works/005', title: 'Ocean Shawl', image: 'image.jpg' },
    { folder: 'works/004', title: 'Twin Cable Beanies', image: 'image.jpg' },
    { folder: 'works/003', title: 'Silver Cable Hat', image: 'image.jpg' },
    { folder: 'works/002', title: 'Winter Scarf', image: 'image.jpg' },
    { folder: 'works/001', title: 'First Swatch', image: 'image.jpg' }
];

// Ensure gallery element exists
const gallery = document.getElementById('gallery');
if (gallery) {
    works.forEach((work) => {
        const box = document.createElement("div");
        box.className = "box";

        if (work.image) {
            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";
            imageContainer.style.position = "relative";
            imageContainer.style.width = "100%";
            imageContainer.style.paddingTop = "100%"; // 1:1 Aspect Ratio

            const img = document.createElement("img");
            img.src = `${work.folder}/${work.image}`;
            img.alt = work.title;
            img.style.position = "absolute";
            img.style.top = "0";
            img.style.left = "0";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover"; // Crop the image to fit the container

            imageContainer.appendChild(img);
            box.appendChild(imageContainer);
        }

        const title = document.createElement("h3");
        title.textContent = work.title;
        box.appendChild(title);

        box.addEventListener("click", () => {
            fetch(`${work.folder}/details.txt`)
                .then((response) => response.text())
                .then((details) => {
                    showModal(`${work.folder}/${work.image}`, work.title, details);
                })
                .catch((error) => {
                    console.error('Error fetching details:', error);
                });
        });

        gallery.appendChild(box);
    });
} else {
    console.error('Gallery element not found');
}

// rng
document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
      const randomX = Math.random() * 40 - 20; // Random value between -10 and 10
      const randomY = Math.random() * 40 - 20; // Random value between -10 and 10
      const randomRotate = Math.random() * 20 - 10; // Random value between -10deg and 10deg
  
      box.style.setProperty('--random-x', `${randomX}px`);
      box.style.setProperty('--random-y', `${randomY}px`);
      box.style.setProperty('--random-rotate', `${randomRotate}deg`);
      box.style.animation = `fadeIn 1s forwards ${index * 0.4}s`; // Apply fade-in animation with delay
    });
  });