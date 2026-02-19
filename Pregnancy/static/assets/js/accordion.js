(function ($) {
    "use strict";
    const accordionItems = document.querySelectorAll(".rv-accordion-item");

    accordionItems.forEach((accordionItem) => {
        accordionItem.onclick = () => {
            const openedItems = document.querySelector(".rv-accordion-item.open");
            if (accordionItem.classList.contains("open")) {
                openedItems.classList.remove("open")
            } else {
                accordionItem.classList.toggle("open");
                if (openedItems) {
                    openedItems.classList.remove("open")
                }
            }
        }
    })
})(jQuery);