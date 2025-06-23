const accordionContainer = document.querySelector('.questions__accordion-list');
const accordionItem = Array.from(accordionContainer.querySelectorAll('.questions__accordion-item'));

accordionItem.forEach((item) => {
    item.addEventListener('click', (e) => {
        const target = e.target;
        const activeIndex = accordionItem.findIndex((item) => {
            return item === target;
        });
        const activeElement = accordionItem.find((item) => {
            return item.classList.contains('active');
        });
        if (accordionItem[activeIndex] && activeElement) {
            accordionItem[activeIndex].classList.add('active');
            activeElement.classList.remove('active');
        } else {
            accordionItem[activeIndex].classList.add('active');
        }
    });
});

accordionItem[0].classList.add('active');
