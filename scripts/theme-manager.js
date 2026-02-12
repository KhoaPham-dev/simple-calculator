/**
 * Theme Manager for Calculator App
 * Handles theme switching between dark and light modes
 */

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'dark';
        this.themeToggleButton = document.getElementById('theme-toggle');
        this.themeIcon = document.querySelector('.theme-icon');
        
        this.init();
    }

    /**
     * Initialize theme manager
     */
    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    /**
     * Set up event listeners for theme toggle
     */
    setupEventListeners() {
        if (this.themeToggleButton) {
            this.themeToggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    /**
     * Toggle between dark and light themes
     */
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        this.storeTheme(this.currentTheme);
        this.updateThemeIcon();
    }

    /**
     * Apply a specific theme
     * @param {string} theme - Theme to apply ('dark' or 'light')
     */
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon();
    }

    /**
     * Update the theme icon based on current theme
     */
    updateThemeIcon() {
        if (this.themeIcon) {
            this.themeIcon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    /**
     * Store theme preference in localStorage
     * @param {string} theme - Theme to store
     */
    storeTheme(theme) {
        try {
            localStorage.setItem('calculator-theme', theme);
        } catch (e) {
            console.warn('Unable to store theme preference:', e);
        }
    }

    /**
     * Get stored theme preference from localStorage
     * @returns {string|null} - Stored theme or null if not found
     */
    getStoredTheme() {
        try {
            return localStorage.getItem('calculator-theme');
        } catch (e) {
            console.warn('Unable to retrieve stored theme:', e);
            return null;
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Export for module usage (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}