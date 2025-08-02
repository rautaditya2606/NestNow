// Intelligent loader system - only show when needed
const showLoader = () => {
    const loader = document.querySelector('.pl');
    if (loader) loader.style.display = 'block';
};

const hideLoader = () => {
    const loader = document.querySelector('.pl');
    if (loader) loader.style.display = 'none';
};

// Hide loader on initial page load
window.addEventListener('load', () => {
    setTimeout(hideLoader, 500);
});

// Show loader only for specific actions that might take time
document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Show loader for form submissions
    if (target.type === 'submit' || target.classList.contains('btn-primary')) {
        showLoader();
    }
    
    // Show loader for image uploads
    if (target.type === 'file') {
        showLoader();
    }
    
    // Show loader for external links or heavy pages
    if (target.tagName === 'A') {
        const href = target.href;
        if (href && (
            href.includes('/listings/new') ||
            href.includes('/listings/edit') ||
            href.includes('/login') ||
            href.includes('/signup') ||
            href.includes('/logout') ||
            href.startsWith('http') // External links
        )) {
            showLoader();
        }
    }
});

// Show loader for form submissions
document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.classList.contains('needs-validation') || 
        form.action.includes('/listings') ||
        form.action.includes('/login') ||
        form.action.includes('/signup')) {
        showLoader();
    }
});

// Show loader for file uploads
document.addEventListener('change', (e) => {
    if (e.target.type === 'file' && e.target.files.length > 0) {
        showLoader();
        // Hide loader after a short delay for file preview
        setTimeout(hideLoader, 1000);
    }
});

// Hide loader if page takes too long (fallback)
setTimeout(hideLoader, 10000);
