
const galleryItems = document.querySelectorAll(
    ".gallery-item img"
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");

const closeButton = document.querySelector(".lightbox-close");
const nextButton = document.querySelector(".lightbox-next");
const prevButton = document.querySelector(".lightbox-prev");

let currentImageIndex = 0;
let previousFocus = null;

// Open the lightbox
galleryItems.forEach((image, index) => {
    image.parentElement.addEventListener("click", () => {
        currentImageIndex = index;
        previousFocus = document.activeElement;
        showImage(currentImageIndex);

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        closeButton.focus();
    });
});

// Display the selected image
function showImage(index) {
    const image = galleryItems[index];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
}

// Next image
nextButton.addEventListener("click", () => {
    currentImageIndex =
        (currentImageIndex + 1) % galleryItems.length;

    showImage(currentImageIndex);
});

// Previous image
prevButton.addEventListener("click", () => {
    currentImageIndex =
        (currentImageIndex - 1 + galleryItems.length)
        % galleryItems.length;

    showImage(currentImageIndex);
});

// Close the lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImage.removeAttribute("src");
    previousFocus?.focus();
}

closeButton.addEventListener("click", closeLightbox);

// Close when clicking outside the image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextButton.click();
    }

    if (event.key === "ArrowLeft") {
        prevButton.click();
    }

    // Keep keyboard focus within the lightbox
    if (event.key === "Tab") {
        const controls = [
            closeButton,
            prevButton,
            nextButton
        ];

        const index = controls.indexOf(document.activeElement);

        if (event.shiftKey) {
            controls[(index - 1 + controls.length) %
                controls.length].focus();
        } else {
            controls[(index + 1) %
                controls.length].focus();
        }

        event.preventDefault();
    }
});



// ===== MOBILE NAVIGATION =====

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Open and close the menu
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the menu when a navigation link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
    });
});

// Close the menu when Escape is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" &&
        navLinks.classList.contains("active")) {

        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
        menuToggle.focus();
    }
});
