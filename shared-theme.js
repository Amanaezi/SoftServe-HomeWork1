(() => {
    const storageKey = "team-theme";
    const body = document.body;
    const toggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "dark") {
        body.classList.add("dark");
    } else if (savedTheme === "light") {
        body.classList.remove("dark");
    }

    if (toggle) {
        toggle.addEventListener("click", () => {
            body.classList.toggle("dark");
            localStorage.setItem(
                storageKey,
                body.classList.contains("dark") ? "dark" : "light"
            );
        });
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
})();