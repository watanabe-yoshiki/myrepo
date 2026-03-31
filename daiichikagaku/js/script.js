document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('js-nav-toggle');
    const spNav = document.getElementById('js-sp-nav');
    const navOverlay = document.getElementById('js-nav-overlay');
    const navLinks = document.querySelectorAll('.nav-list a');
    const header = document.querySelector('.header');

    // メニュー開閉
    const toggleMenu = () => {
        navToggle.classList.toggle('is-active');
        spNav.classList.toggle('is-active');
        // 背面のスクロール固定
        document.body.style.overflow = spNav.classList.contains('is-active') ? 'hidden' : '';
    };

    if (navToggle) navToggle.addEventListener('click', toggleMenu);
    if (navOverlay) navOverlay.addEventListener('click', toggleMenu);

    // ページ内リンク制御
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // 現在のページ内（#から始まるリンク）の場合のみスムーススクロールを実行
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    // メニューを閉じる
                    if (spNav.classList.contains('is-active')) {
                        toggleMenu();
                    }

                    // スムーススクロール
                    const headerHeight = header.offsetHeight;
                    const offsetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // index.html#about のような別ページリンクの場合は e.preventDefault() しないため、
            // そのままブラウザの機能で index.html へ遷移します。
        });
    });

    // --- 別ページ（thanks.html等）からハッシュ付きで飛んできた時の処理 ---
    if (window.location.hash) {
        // ページ読み込み完了後に実行
        window.addEventListener('load', () => {
            const hash = window.location.hash;
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const offsetPosition = targetElement.offsetTop - headerHeight;
                
                // 少しだけ遅らせることで、ブラウザ自体のジャンプと干渉するのを防ぎ、
                // 正確なヘッダー高さを考慮した位置にスクロールさせます。
                setTimeout(() => {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    }

    // モーダルの開閉
    const modalOpenBtns = document.querySelectorAll('[js-modal-open]');
    const modalCloses = document.querySelectorAll('.modal-close, .modal-overlay');

    modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('js-modal-open');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('is-active');
                document.body.style.overflow = 'hidden'; // 背景スクロール防止
            }
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', (e) => {
            // コンテンツ自体をクリックした時は閉じないようにする
            if (e.target.closest('.modal-content') && !e.target.classList.contains('modal-close')) return;
            
            const activeModal = document.querySelector('.modal-overlay.is-active');
            if (activeModal) {
                activeModal.classList.remove('is-active');
                document.body.style.overflow = '';
            }
        });
    });
});