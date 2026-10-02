/* =========================================
   FAQ ACCORDION
========================================= */

const faqItems = document.querySelectorAll(".faq-item");


faqItems.forEach(function(faqItem) {

    const faqQuestion =
        faqItem.querySelector(".faq-question");

    const faqIcon =
        faqItem.querySelector(".faq-icon");


    if (!faqQuestion) {
        return;
    }


    faqQuestion.addEventListener("click", function() {


        /* CHECK IF THIS FAQ IS ALREADY OPEN */

        const isActive =
            faqItem.classList.contains("active");


        /* CLOSE ALL FAQ ITEMS */

        faqItems.forEach(function(item) {

            item.classList.remove("active");

            const icon =
                item.querySelector(".faq-icon");

            if (icon) {
                icon.textContent = "+";
            }

        });


        /* OPEN THE SELECTED FAQ */

        if (!isActive) {

            faqItem.classList.add("active");

            if (faqIcon) {
                faqIcon.textContent = "−";
            }

        }

    });

});