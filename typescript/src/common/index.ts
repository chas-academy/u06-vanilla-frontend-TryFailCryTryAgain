import { BrowseBooksButton } from "./components";

// Dec.

document.addEventListener("DOMContentLoaded", () => {
    const button = BrowseBooksButton();
    button?.addEventListener("click", function() {
        console.log("Event has been registered!");
    });
});