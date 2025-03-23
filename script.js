import { showLoader, hideLoader } from './utils/loader.js';

// Navigation handler
document.addEventListener('click', (e) => {
    // Check if clicked element is a link or button
    if (e.target.tagName === 'A' || 
        (e.target.tagName === 'BUTTON' && e.target.classList.contains('create-listing'))) {
        showLoader();
    }
});

// Hide loader when page loads
window.addEventListener('load', hideLoader);

// Show loader before unload
window.addEventListener('beforeunload', showLoader);

window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.querySelector('.pl');
        loader.style.display = 'none';
        window.location.href = '/';
    }, 4000);
});
