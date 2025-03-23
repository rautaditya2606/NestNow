export const showLoader = () => {
    const loader = document.querySelector('.pl');
    if (loader) {
        loader.style.display = 'block';
    }
};

export const hideLoader = () => {
    const loader = document.querySelector('.pl');
    if (loader) {
        loader.style.display = 'none';
    }
};
