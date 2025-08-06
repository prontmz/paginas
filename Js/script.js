document.addEventListener('DOMContentLoaded', function() {
    // Carrossel automático
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    let currentIndex = 0;
    const totalImages = images.length;
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    setInterval(nextImage, 5000);
    
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navContainer.classList.toggle('active');
    });
    
    // Navegação por tabs
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Close mobile menu after selection
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
            }
            
            // Scroll to top of content
            window.scrollTo({
                top: document.querySelector('.content-section').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Quiz functionality
    window.checkAnswer = function(button, isCorrect) {
        if (isCorrect) {
            button.style.backgroundColor = '#4CAF50';
            button.style.color = 'white';
            setTimeout(() => {
                alert('Resposta correta! A África do Sul tem três capitais: Pretória (executiva), Cidade do Cabo (legislativa) e Bloemfontein (judiciária).');
            }, 300);
        } else {
            button.style.backgroundColor = '#f44336';
            button.style.color = 'white';
        }
        
        // Disable all buttons after answer
        const buttons = document.querySelectorAll('.quiz-answer');
        buttons.forEach(btn => {
            btn.disabled = true;
        });
    };
    
    // Responsive adjustments
    function handleResize() {
        // Adjust hero height on mobile
        if (window.innerWidth <= 480) {
            document.querySelector('.hero').style.height = '60vh';
        } else {
            document.querySelector('.hero').style.height = '80vh';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Run once on load
});