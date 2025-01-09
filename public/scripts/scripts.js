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

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = title;

    const modalDetails = document.createElement("p");
    modalDetails.textContent = details;
    modalDetails.style.whiteSpace = "pre-wrap"; // Preserve line breaks

    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalImage);
    modalImage.style.width = "100%"; // Scale image to fit modal
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDetails);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    modal.style.display = "flex";
}

// Ensure gallery element exists
const gallery = document.getElementById('gallery');
if (gallery) {
    fetch('/works')
        .then(response => response.json())
        .then(works => {
            works.forEach((work) => {
                const box = document.createElement("div");
                box.className = "box";

                if (work.image) {
                    const img = document.createElement("img");
                    img.src = `${work.folder}/${work.image}`;
                    img.alt = work.title;
                    box.appendChild(img);
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
        })
        .catch(error => {
            console.error('Error fetching works:', error);
        });
} else {
    console.error('Gallery element not found');
}