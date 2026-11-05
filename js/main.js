// header menu toggle
(() => {
    const toggle = document.querySelector(".header__toggle");
    const menu = document.querySelector("#header-menu");

    if (!toggle || !menu) {
        return;
    }

    const closeButton = menu.querySelector(".header__close");
    const mobileBreakpoint = window.matchMedia("(max-width: 991px)");

    const setMenuOpen = (isOpen) => {
        const isMobile = mobileBreakpoint.matches;

        menu.dataset.open = String(isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        menu.setAttribute("aria-hidden", String(isMobile && !isOpen));
        menu.inert = isMobile && !isOpen;
    };

    const closeMenu = () => setMenuOpen(false);

    setMenuOpen(false);

    toggle.addEventListener("click", () => {
        setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    closeButton?.addEventListener("click", closeMenu);

    menu.querySelectorAll("a, button").forEach((item) => {
        item.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (menu.dataset.open === "true" && !menu.contains(event.target) && !toggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.dataset.open === "true") {
            closeMenu();
            toggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (!mobileBreakpoint.matches) {
            closeMenu();
        } else {
            setMenuOpen(menu.dataset.open === "true");
        }
    });
})();