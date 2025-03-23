import { showLoader, hideLoader } from './loader.js';
//hello
// Initial load handler
if (window.location.pathname === '/loader') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            window.location.href = '/';
        }, 4000);
    });
} else {
    // Navigation handler for other pages
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || 
            (e.target.tagName === 'BUTTON' && e.target.classList.contains('create-listing'))) {
            e.preventDefault();
            showLoader();
            setTimeout(() => {
                if (e.target.href) {
                    window.location.href = e.target.href;
                } else if (e.target.form) {
                    e.target.form.submit();
                }
            }, 1000);
        }
    });

    window.addEventListener('load', hideLoader);
    window.addEventListener('beforeunload', showLoader);
}
