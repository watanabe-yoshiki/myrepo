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
    
    