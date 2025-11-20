document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion-title");

  accordions.forEach(title => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;

      // active状態の切り替え
      title.classList.toggle("active");
      content.classList.toggle("active");
    });
  });
});
