document.addEventListener('DOMContentLoaded', function() {
    // ========== NAVBAR RESPONSIVA ==========
    const navbar = document.querySelector('.navbar');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navContainer = document.getElementById('navContainer');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (navbar && hamburgerMenu && navContainer) {
        // Função para verificar o tamanho da tela e ajustar a navbar
        function setupNavbar() {
            if (window.innerWidth <= 768) { // Modo mobile
                // Configurações específicas para mobile
                hamburgerMenu.style.display = 'flex';
                navContainer.style.display = 'none';
                
                // Adiciona evento de clique para o menu hamburger
                hamburgerMenu.addEventListener('click', toggleMobileMenu);
                
                // Adiciona eventos para os itens do menu (mobile)
                navItems.forEach(item => {
                    item.addEventListener('click', closeMobileMenu);
                });
            } else { // Modo desktop
                // Configurações específicas para desktop
                hamburgerMenu.style.display = 'none';
                navContainer.style.display = 'flex';
                
                // Remove eventos mobile se existirem
                hamburgerMenu.removeEventListener('click', toggleMobileMenu);
                navItems.forEach(item => {
                    item.removeEventListener('click', closeMobileMenu);
                });
            }
        }
        
        // Função para alternar o menu mobile
        function toggleMobileMenu() {
            this.classList.toggle('active');
            navContainer.classList.toggle('active');
            
            // Controle explícito da exibição com animação
            if (navContainer.classList.contains('active')) {
                navContainer.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Impede scroll quando menu está aberto
            } else {
                navContainer.style.display = 'none';
                document.body.style.overflow = ''; // Restaura scroll
            }
        }
        
        // Função para fechar o menu mobile
        function closeMobileMenu() {
            hamburgerMenu.classList.remove('active');
            navContainer.classList.remove('active');
            navContainer.style.display = 'none';
            document.body.style.overflow = ''; // Restaura scroll
        }
        
        // Configura inicialmente a navbar
        setupNavbar();
        
        // Atualiza quando a janela é redimensionada
        window.addEventListener('resize', function() {
            setupNavbar();
            
            // Se mudar para desktop, garante que o menu está no estado correto
            if (window.innerWidth > 768) {
                hamburgerMenu.classList.remove('active');
                navContainer.classList.remove('active');
                navContainer.style.display = 'flex';
                document.body.style.overflow = '';
            }
        });
    }

    // ========== CARROSSEL ==========
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    
    if (carousel && images.length > 0) {
        let currentIndex = 0;
        const intervalTime = 5000;
        let carouselInterval;
        
        // Configuração inicial do carrossel
        function initCarousel() {
            carousel.style.position = 'relative';
            
            images.forEach((img, index) => {
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.opacity = '0';
                img.style.transition = 'opacity 1s ease-in-out';
                
                // Para mobile, ajusta o object-fit se necessário
                if (window.innerWidth <= 768) {
                    img.style.objectPosition = 'center center';
                }
            });
            
            images[currentIndex].style.opacity = '1';
            startCarousel();
        }
        
        // Avança para a próxima imagem
        function nextImage() {
            images[currentIndex].style.opacity = '0';
            currentIndex = (currentIndex + 1) % images.length;
            
            setTimeout(() => {
                images[currentIndex].style.opacity = '1';
            }, 50);
        }
        
        // Inicia o carrossel automático
        function startCarousel() {
            if (carouselInterval) clearInterval(carouselInterval);
            carouselInterval = setInterval(nextImage, intervalTime);
        }
        
        // Pausa o carrossel quando o mouse está sobre ele
        function setupCarouselEvents() {
            carousel.addEventListener('mouseenter', () => {
                if (carouselInterval) clearInterval(carouselInterval);
            });
            
            carousel.addEventListener('mouseleave', startCarousel);
            
            // Para touch devices
            carousel.addEventListener('touchstart', () => {
                if (carouselInterval) clearInterval(carouselInterval);
            });
            
            carousel.addEventListener('touchend', startCarousel);
        }
        
        initCarousel();
        setupCarouselEvents();
        
        // Ajusta o carrossel no redimensionamento
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                images.forEach(img => {
                    img.style.objectPosition = 'center center';
                });
            }
        });
    }

    // ========== SISTEMA DE TABS ==========
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
                    
                    // Scroll suave para a seção
                    setTimeout(() => {
                        targetTab.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            }
        }
        
        // Adiciona eventos aos itens de navegação
        tabNavItems.forEach(item => {
            item.addEventListener('click', handleTabClick);
            
            // Para touch devices
            item.addEventListener('touchend', handleTabClick);
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

    // ========== EFEITOS DE HOVER/TOUCH ==========
    const interactiveElements = document.querySelectorAll('.content-image, .species-image, .cta-button, .quiz-answer');
    
    if (interactiveElements.length > 0) {
        function handleInteraction(e) {
            const element = this;
            
            if (e.type === 'mouseenter' || e.type === 'touchstart') {
                element.style.transform = 'scale(1.03)';
                element.style.transition = 'all 0.3s ease';
                
                if (element.classList.contains('content-image') || element.classList.contains('species-image')) {
                    element.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }
            } else {
                element.style.transform = 'scale(1)';
                
                if (element.classList.contains('content-image') || element.classList.contains('species-image')) {
                    element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                }
            }
        }
        
        // Adiciona eventos para mouse e touch
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', handleInteraction);
            element.addEventListener('mouseleave', handleInteraction);
            element.addEventListener('touchstart', handleInteraction, { passive: true });
            element.addEventListener('touchend', handleInteraction, { passive: true });
        });
    }
});