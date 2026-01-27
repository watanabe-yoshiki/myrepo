    document.querySelectorAll(".open-modal").forEach(button => {
        button.addEventListener("click", function() {
            let targetId = this.getAttribute("data-target");
            document.getElementById(targetId).style.display = "block";
        });
    });
    
    document.querySelectorAll(".close").forEach(closeBtn => {
        closeBtn.addEventListener("click", function() {
            this.closest(".modal").style.display = "none";
        });
    });
    
    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("modal")) {
            event.target.style.display = "none";
        }
    });

document.querySelectorAll('.scroll-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // デフォルトのリンク動作を無効化
        const target = document.querySelector(this.getAttribute('href'));
        const offset = -80; // 表示位置をずらす量（例：-50px）
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth' // スムーズなスクロール
        });
    });
});
