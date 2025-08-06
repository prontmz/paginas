document.addEventListener('DOMContentLoaded', function() {
    // ========== MENU HAMBURGER PARA MOBILE ==========
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navContainer = document.getElementById('navContainer');
    
    if (hamburgerMenu && navContainer) {
        // Função para verificar a viewport e configurar a exibição inicial
        function checkMobileView() {
            if (window.innerWidth <= 768) {
                navContainer.style.display = 'none';
                hamburgerMenu.style.display = 'block';
            } else {
                navContainer.style.display = 'flex';
                hamburgerMenu.style.display = 'none';
                hamburgerMenu.classList.remove('active');
                navContainer.classList.remove('active');
            }
        }
        
        // Configuração inicial
        checkMobileView();
        
        // Evento de clique no hamburger
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navContainer.classList.toggle('active');
            
            // Controle explícito da exibição
            if (navContainer.classList.contains('active')) {
                navContainer.style.display = 'flex';
            } else {
                navContainer.style.display = 'none';
            }
        });
        
        // Fechar menu ao clicar em um item (mobile)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    hamburgerMenu.classList.remove('active');
                    navContainer.classList.remove('active');
                    navContainer.style.display = 'none';
                }
            });
        });
        
        // Redimensionamento da janela
        window.addEventListener('resize', function() {
            checkMobileView();
        });
    }

    // ========== CARROSSEL COM EFEITO FADE ==========
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    let currentIndex = 0;
    const intervalTime = 5000;
    
    if (carousel && images.length > 0) {
        // Configuração inicial do carrossel
        carousel.style.position = 'relative';
        images.forEach(img => {
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.opacity = '0';
            img.style.transition = 'opacity 1s ease-in-out';
        });
        
        images[currentIndex].style.opacity = '1';
        
        function nextImage() {
            images[currentIndex].style.opacity = '0';
            currentIndex = (currentIndex + 1) % images.length;
            
            setTimeout(() => {
                images[currentIndex].style.opacity = '1';
            }, 50);
        }
        
        let carouselInterval = setInterval(nextImage, intervalTime);
        
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextImage, intervalTime);
        });
    }

    // ========== FUNCIONALIDADE DE TABS ==========
    const tabNavItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabNavItems.length > 0 && tabContents.length > 0) {
        function handleTabClick() {
            // Remove a classe active de todos os itens e conteúdos
            tabNavItems.forEach(navItem => navItem.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona a classe active ao item clicado
            this.classList.add('active');
            
            // Ativa o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            if (tabId) {
                const targetTab = document.getElementById(tabId);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            }
            
            // Scroll suave para a seção
            const contentSection = document.querySelector('.content-section');
            if (contentSection) {
                window.scrollTo({
                    top: contentSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        }
        
        // Adiciona eventos aos itens de navegação
        tabNavItems.forEach(item => {
            item.addEventListener('click', handleTabClick);
        });
        
        // Ativa a primeira tab por padrão se nenhuma estiver ativa
        const activeTabs = document.querySelectorAll('.nav-item.active, .tab-content.active');
        if (activeTabs.length === 0 && tabNavItems.length > 0) {
            tabNavItems[0].classList.add('active');
            const firstTabId = tabNavItems[0].getAttribute('data-tab');
            if (firstTabId) {
                const firstTabContent = document.getElementById(firstTabId);
                if (firstTabContent) {
                    firstTabContent.classList.add('active');
                }
            }
        }
    }

    // ========== SCROLL SUAVE ==========
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                window.scrollTo({
                    top: navbar.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ========== EFEITO HOVER NAS IMAGENS ==========
    const imagesHover = document.querySelectorAll('.content-image, .species-image');
    
    function handleImageHover(e) {
        if (e.type === 'mouseenter') {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        } else {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    }
    
    if (imagesHover.length > 0) {
        imagesHover.forEach(img => {
            img.addEventListener('mouseenter', handleImageHover);
            img.addEventListener('mouseleave', handleImageHover);
        });
    }
});