/* filepath: /c:/Users/rauta/OneDrive/Desktop/NestNow/public/js/darkMode.js */
function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    
    // Update icons and colors
    updateThemeUI(targetTheme);
}

function updateThemeUI(theme) {
    const moonIcon = document.querySelector('.dark-mode-toggle i');
    moonIcon.className = theme === 'dark' ? 
        'fa-solid fa-sun me-2' : 
        'fa-solid fa-moon me-2';
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
});