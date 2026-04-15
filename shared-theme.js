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
        toggle.setAttribute("aria-pressed", String(body.classList.contains("dark")));
        toggle.addEventListener("click", () => {
            body.classList.toggle("dark");
            const isDark = body.classList.contains("dark");
            localStorage.setItem(
                storageKey,
                isDark ? "dark" : "light"
            );
            toggle.setAttribute("aria-pressed", String(isDark));
        });
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
})();
