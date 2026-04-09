/**
 * theme.js — Shared light/dark theme logic
 *
 * - Reads saved preference from localStorage
 * - Falls back to prefers-color-scheme on first visit
 * - Applies theme immediately (before DOMContentLoaded) to avoid flash
 * - Wires up the #theme-toggle button after DOM is ready
 */
(function () {
    var STORAGE_KEY = 'site-theme';

    function getInitialTheme() {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') {
            return saved;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        var btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.textContent = theme === 'dark' ? '☀ Світла' : '🌙 Темна';
            btn.setAttribute('aria-label', theme === 'dark' ? 'Перемкнути на світлу тему' : 'Перемкнути на темну тему');
        }
    }

    /* Apply immediately to prevent flash of unstyled content */
    var initialTheme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);

    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(initialTheme);

        var btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', function () {
                var current = document.documentElement.getAttribute('data-theme') || 'light';
                var next = current === 'dark' ? 'light' : 'dark';
                applyTheme(next);
                try {
                    localStorage.setItem(STORAGE_KEY, next);
                } catch (e) { /* storage unavailable */ }
            });
        }
    });
}());
