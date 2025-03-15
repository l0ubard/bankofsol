// Loader/Intro Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Préchargement du widget DexScreener
    const dexScreenerContainer = document.getElementById('dexscreener-container');
    let dexScreenerLoaded = false;
    
    // Fonction pour charger l'iframe DexScreener immédiatement
    function loadDexScreener() {
        if (!dexScreenerLoaded && dexScreenerContainer) {
            dexScreenerLoaded = true;
            
            // Créer l'iframe
            const iframe = document.createElement('iframe');
            iframe.src = 'https://dexscreener.com/solana?embed=1&theme=dark';
            iframe.frameBorder = '0';
            iframe.width = '100%';
            iframe.height = '500px';
            iframe.className = 'chart-iframe';
            
            // Ajouter un événement pour détecter quand l'iframe est chargée
            iframe.addEventListener('load', function() {
                console.log('DexScreener iframe chargée complètement');
                widgetsLoaded = true;
                checkAllLoaded();
            });
            
            // Supprimer le placeholder de chargement
            dexScreenerContainer.innerHTML = '';
            
            // Ajouter l'iframe au conteneur
            dexScreenerContainer.appendChild(iframe);
            
            console.log('DexScreener iframe en cours de chargement');
        }
    }
    
    // Charger DexScreener immédiatement
    loadDexScreener();
    
    // Initialisation du nouveau fond animé sophistiqué
    // Nous n'utilisons plus particlesJS pour le fond principal
    // Les animations sont maintenant gérées par CSS
    
    // Ajout d'étoiles scintillantes supplémentaires
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        if (!starsContainer) return;
        
        const starCount = isMobile ? 50 : 150;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Position aléatoire
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Taille aléatoire
            const size = Math.random() * 2 + 1;
            
            // Opacité aléatoire
            const opacity = Math.random() * 0.7 + 0.3;
            
            // Délai d'animation aléatoire
            const delay = Math.random() * 5;
            
            star.style.cssText = `
                position: absolute;
                top: ${y}%;
                left: ${x}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                animation: twinkle 3s infinite alternate;
                animation-delay: ${delay}s;
            `;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Appel de la fonction pour créer les étoiles
    createStars();

    // Initialize GSAP with optimisations pour mobile
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        // Détection des appareils mobiles
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        // Réduire ou désactiver certaines animations sur mobile
        if (isMobile) {
            // Animations minimales pour mobile
            gsap.to('.grid-lines', {
                backgroundPosition: '50px 50px', // Déplacement réduit
                duration: 40, // Plus lent
                repeat: -1,
                ease: 'linear'
            });
            
            // Animation simplifiée pour cyber circles
            gsap.to('.cyber-circles', {
                opacity: 0.3, // Opacité réduite
                duration: 5, // Plus lent
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        } else {
            // Animations normales pour desktop
            // Create timeline for intro animations
            const introTl = gsap.timeline();
            
            // Animate grid lines
            gsap.to('.grid-lines', {
                backgroundPosition: '100px 100px',
                duration: 20,
                repeat: -1,
                ease: 'linear'
            });
            
            // Animate cyber circles
            gsap.to('.cyber-circles', {
                opacity: 0.5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }

    // Get loader elements
    const loader = document.getElementById('loader');
    const bankLoading = document.getElementById('bankLoading');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const stayPoorBtn = document.getElementById('stayPoorBtn');
    const apeBtn = document.getElementById('apeBtn');
    const poorMessage = document.getElementById('poorMessage');
    const progressBar = document.getElementById('progressBar');
    const connectionLogs = document.getElementById('connectionLogs');
    const progressGlow = document.querySelector('.progress-glow');
    const dots = document.querySelector('.dots');
    
    // Always show loader to ensure all content loads properly
    if (loader) {
        loader.style.display = 'flex';
        mainContent.style.opacity = '0';
        mainContent.style.display = 'none';
    }
    
    // Track loading status
    let resourcesLoaded = false;
    let widgetsLoaded = false;
    let animationsLoaded = false;
    
    // Function to check if everything is loaded and hide loader
    function checkAllLoaded() {
        if (resourcesLoaded && widgetsLoaded && animationsLoaded) {
            // Hide loader and show main content
            if (loader) {
                // Fade out loader
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s ease';
                
                setTimeout(function() {
                    loader.style.display = 'none';
                    
                    // Show main content
                    mainContent.style.display = 'block';
                    setTimeout(function() {
                        mainContent.classList.add('visible');
                        initializeMainContent();
                    }, 50);
                }, 500);
            }
        }
    }
    
    // Track when resources are loaded
    window.addEventListener('load', function() {
        console.log('All resources loaded');
        resourcesLoaded = true;
        checkAllLoaded();
    });
    
    // Track when 3D card animation is loaded
    document.querySelector('spline-viewer')?.addEventListener('load', function() {
        console.log('3D animation loaded');
        animationsLoaded = true;
        checkAllLoaded();
    });
    
    // Set a timeout to ensure widgets are considered loaded after a reasonable time
    // This is a fallback in case some widgets don't trigger load events
    setTimeout(function() {
        console.log('Widgets loading timeout reached');
        widgetsLoaded = true;
        checkAllLoaded();
    }, 5000);
    
    // Set a timeout to ensure animations are considered loaded after a reasonable time
    setTimeout(function() {
        console.log('Animations loading timeout reached');
        animationsLoaded = true;
        checkAllLoaded();
    }, 8000);
    
    // Track when Raydium iframe is loaded
    const raydiumIframe = document.querySelector('.raydium-iframe');
    if (raydiumIframe) {
        raydiumIframe.addEventListener('load', function() {
            console.log('Raydium widget loaded');
            widgetsLoaded = true;
            checkAllLoaded();
        });
    } else {
        // If iframe doesn't exist yet, set a flag to check later
        widgetsLoaded = true;
    }
    
    // Animate dots
    if (dots) {
        setInterval(() => {
            if (dots.textContent === '...') dots.textContent = '.';
            else if (dots.textContent === '.') dots.textContent = '..';
            else if (dots.textContent === '..') dots.textContent = '...';
        }, 500);
    }
    
    // Fake connection messages
    const connectionMessages = [
        "Establishing secure connection...",
        "Verifying blockchain credentials...",
        "Connecting to Solana network...",
        "Fetching token data...",
        "Initializing banking protocols...",
        "Verifying wallet integrity...",
        "Loading smart contracts...",
        "Syncing with blockchain...",
        "Connection established successfully!"
    ];
    
    // Start loading animation
    let progress = 0;
    let messageIndex = 0;
    
    // Simulate loading progress
    const loadingInterval = setInterval(function() {
        // Update progress
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        // Update loading spinner animation
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            // Make spinner rotate faster as progress increases
            const rotationSpeed = 1 - (progress / 200); // Gradually speed up
            spinner.style.animationDuration = `${rotationSpeed}s`;
            
            // Increase glow as progress increases
            const glowIntensity = 0.3 + (progress / 100) * 0.7;
            spinner.style.boxShadow = `0 0 ${20 * glowIntensity}px rgba(0, 194, 255, ${glowIntensity})`;
        }
        
        // When loading is complete
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Show main content after a short delay
            setTimeout(function() {
                if (typeof gsap !== 'undefined') {
                    // Fade out loader with animation
                    gsap.to(loader, {
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => {
                            loader.style.display = 'none';
                            mainContent.style.display = 'block';
                            
                            // Animate main content in
                            gsap.fromTo(mainContent, 
                                { opacity: 0 },
                                { 
                                    opacity: 1, 
                                    duration: 1.5, 
                                    ease: 'power2.out',
                                    onComplete: () => {
                                        mainContent.classList.add('visible');
                                        initializeMainContent();
                                    }
                                }
                            );
                        }
                    });
                } else {
                    // Simple fade without GSAP
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.8s ease';
                    
                    setTimeout(function() {
                        loader.style.display = 'none';
                        mainContent.style.display = 'block';
                        mainContent.style.opacity = '1';
                        mainContent.classList.add('visible');
                        initializeMainContent();
                    }, 800);
                }
            }, 500);
        }
    }, 200); // Update every 200ms for a total of ~3 seconds
    
    // Event listeners for buttons removed as they're no longer needed with the simplified loader
    
    // Function to initialize main content with enhanced animations
    function initializeMainContent() {
        // Détection des appareils mobiles
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        // Initialize AOS with optimized settings for mobile
        AOS.init({
            duration: isMobile ? 600 : 1000, // Durée plus courte sur mobile
            easing: 'ease-out', // Easing plus simple
            once: isMobile, // Sur mobile, jouer les animations qu'une seule fois pour économiser les ressources
            mirror: false,
            disable: isMobile ? 'phone' : false, // Désactiver certaines animations sur téléphone
            anchorPlacement: 'top-bottom',
            throttleDelay: isMobile ? 100 : 50 // Augmenter le délai de throttle sur mobile
        });
        
        // Initialize GSAP animations for main content
        if (typeof gsap !== 'undefined') {
            // Header animations - simplifiées sur mobile
            gsap.from('header', {
                y: isMobile ? -50 : -100, // Déplacement réduit sur mobile
                opacity: 0,
                duration: isMobile ? 0.5 : 1, // Plus rapide sur mobile
                ease: 'power3.out'
            });
            
            // Suppression des animations d'entrée pour la section hero
            // Aucune animation pour le contenu de la section hero
            
            if (!isMobile) {
                // Garder uniquement les animations non liées à la section hero pour desktop
                
                // Scroll indicator animation
                gsap.to('.scroll-indicator', {
                    y: 10,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
                
                // Parallax effect for hero section
                gsap.to('.hero-bg', {
                    backgroundPosition: '0 100px',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });
                
                // Animate sections on scroll
                gsap.utils.toArray('section').forEach((section, i) => {
                    const bgElements = section.querySelectorAll('.section-bg > div');
                    
                    bgElements.forEach((el) => {
                        gsap.to(el, {
                            backgroundPosition: `${i % 2 ? '-' : ''}100px ${i % 2 ? '-' : ''}100px`,
                            scrollTrigger: {
                                trigger: section,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true
                            }
                        });
                    });
                });
            }
            
            // Désactivation complète de l'effet 3D de la carte
            const card = document.querySelector('.card-3d-container');
            if (card) {
                // Supprimer tous les écouteurs d'événements qui pourraient causer des animations
                card.onmousemove = null;
                card.onmouseenter = null;
                card.onmouseleave = null;
                card.ontouchmove = null;
                card.ontouchstart = null;
                card.ontouchend = null;
                
                // Assurer que la carte reste dans sa position normale
                card.style.transform = 'none';
                card.style.transition = 'none';
                card.style.perspective = 'none';
            }
        }

        // Initialize Tokenomics Chart with enhanced styling
        const ctx = document.getElementById('tokenomicsChart')?.getContext('2d');
        
        if (ctx) {
            // Chart configuration with blue neon colors
            const tokenomicsChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Public', 'Treasury'],
                    datasets: [{
                        data: [99, 1],
                        backgroundColor: [
                            'rgba(0, 194, 255, 0.8)',
                            'rgba(0, 119, 255, 0.8)'
                        ],
                        borderColor: '#000000',
                        borderWidth: 2,
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false, // Hide default legend as we have custom one
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw}%`;
                                }
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            titleColor: '#00c2ff',
                            bodyColor: '#FFFFFF',
                            borderColor: '#00c2ff',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: true,
                            titleFont: {
                                family: 'Orbitron, Montserrat',
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                family: 'Montserrat',
                                size: 13
                            }
                        }
                    },
                    cutout: '65%',
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // Add enhanced hover effects to timeline items with GSAP
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                const dot = item.querySelector('.timeline-dot');
                dot.classList.add('glow');
                
                // Add pulse animation to icon
                const icon = dot.querySelector('i');
                if (icon) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(icon, {
                            scale: 1.2,
                            duration: 0.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        });
                    } else {
                        icon.style.animation = 'pulse 1s infinite';
                    }
                }
                
                // Add subtle scale effect to content
                const content = item.querySelector('.timeline-content');
                if (content) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(content, {
                            y: -8,
                            boxShadow: '0 12px 25px rgba(0, 194, 255, 0.3)',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    } else {
                        content.style.transform = 'translateY(-8px)';
                        content.style.boxShadow = '0 12px 25px rgba(0, 194, 255, 0.3)';
                    }
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const dot = item.querySelector('.timeline-dot');
                dot.classList.remove('glow');
                
                // Remove pulse animation
                const icon = dot.querySelector('i');
                if (icon) {
                    if (typeof gsap !== 'undefined') {
                        gsap.killTweensOf(icon);
                        gsap.to(icon, {
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    } else {
                        icon.style.animation = '';
                    }
                }
                
                // Remove scale effect
                const content = item.querySelector('.timeline-content');
                if (content) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(content, {
                            y: 0,
                            boxShadow: '0 5px 15px rgba(0, 194, 255, 0.2)',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    } else {
                        content.style.transform = '';
                        content.style.boxShadow = '';
                    }
                }
            });
        });
        
        // Add enhanced hover effects to vision features
        const visionFeatures = document.querySelectorAll('.vision-feature');
        visionFeatures.forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(feature, {
                        y: -8,
                        boxShadow: '0 8px 20px rgba(0, 194, 255, 0.3)',
                        borderColor: '#00c2ff',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    const icon = feature.querySelector('i');
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1.2,
                            color: '#00c2ff',
                            textShadow: '0 0 10px rgba(0, 194, 255, 0.7)',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                } else {
                    feature.style.transform = 'translateY(-8px)';
                    feature.style.boxShadow = '0 8px 20px rgba(0, 194, 255, 0.3)';
                    feature.style.borderColor = '#00c2ff';
                    
                    const icon = feature.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'scale(1.2)';
                        icon.style.transition = 'transform 0.3s ease';
                    }
                }
            });
            
            feature.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(feature, {
                        y: 0,
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                        borderColor: 'rgba(0, 194, 255, 0.3)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    const icon = feature.querySelector('i');
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1,
                            color: 'var(--accent-color)',
                            textShadow: 'none',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                } else {
                    feature.style.transform = '';
                    feature.style.boxShadow = '';
                    feature.style.borderColor = '';
                    
                    const icon = feature.querySelector('i');
                    if (icon) {
                        icon.style.transform = '';
                    }
                }
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            }
        });

        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

    // Vérifier lors du défilement
    window.addEventListener('scroll', function() {
        
        // Effet de défilement pour l'en-tête
        if (window.scrollY > 50) {
            header.style.padding = '1rem 2rem';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.padding = '1.5rem 2rem';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Vérifier également au chargement initial
    window.addEventListener('load', loadDexScreener);
    
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Animate menu toggle icon
            const spans = menuToggle.querySelectorAll('span');
            if (mainNav.classList.contains('active')) {
                // Transform to X
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                // Reset to hamburger
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                
                // Reset hamburger icon
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                
                // Reset hamburger icon
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

        // Suppression de l'effet de typing pour le titre de la section hero
    }
});

// Function to copy contract address to clipboard
function copyAddress() {
    const contractText = document.getElementById('contract');
    const textArea = document.createElement('textarea');
    textArea.value = contractText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Show copied notification
    const notification = document.createElement('div');
    notification.textContent = 'Address copied to clipboard!';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#D4AF37';
    notification.style.color = '#000000';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.fontWeight = 'bold';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}

// Création d'un fond cyberpunk néon élégant
document.addEventListener('DOMContentLoaded', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Création du conteneur principal pour le fond
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'cyberpunk-background';
    backgroundContainer.style.position = 'fixed';
    backgroundContainer.style.top = '0';
    backgroundContainer.style.left = '0';
    backgroundContainer.style.width = '100%';
    backgroundContainer.style.height = '100%';
    backgroundContainer.style.zIndex = '-10';
    backgroundContainer.style.overflow = 'hidden';
    backgroundContainer.style.backgroundColor = '#050510'; // Fond très sombre avec une teinte bleue
    document.body.prepend(backgroundContainer);
    
    // Création de la grille néon
    createNeonGrid(backgroundContainer);
    
    // Création des cercles lumineux
    const glowCirclesCount = isMobile ? 5 : 10;
    for (let i = 0; i < glowCirclesCount; i++) {
        createGlowCircle(backgroundContainer);
    }
    
    // Création des lignes horizontales néon
    const horizontalLinesCount = isMobile ? 3 : 7;
    for (let i = 0; i < horizontalLinesCount; i++) {
        createHorizontalNeonLine(backgroundContainer);
    }
    
    // Création des lignes verticales néon
    const verticalLinesCount = isMobile ? 3 : 7;
    for (let i = 0; i < verticalLinesCount; i++) {
        createVerticalNeonLine(backgroundContainer);
    }
    
    // Création des hexagones néon
    const hexagonsCount = isMobile ? 5 : 15;
    for (let i = 0; i < hexagonsCount; i++) {
        createNeonHexagon(backgroundContainer);
    }
    
    // Création des éclairs néon
    const lightningCount = isMobile ? 2 : 5;
    for (let i = 0; i < lightningCount; i++) {
        createNeonLightning(backgroundContainer);
    }
    
    // Création du brouillard de fond
    createBackgroundFog(backgroundContainer);
    
    // Création de l'effet de scan
    createScanEffect(backgroundContainer);
    
    // Création de l'effet de vignette
    createVignetteEffect(backgroundContainer);
});

// Fonction pour créer la grille néon
function createNeonGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'neon-grid';
    
    // Styles
    grid.style.position = 'absolute';
    grid.style.top = '0';
    grid.style.left = '0';
    grid.style.width = '100%';
    grid.style.height = '100%';
    grid.style.backgroundImage = `
        linear-gradient(to right, rgba(0, 194, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 194, 255, 0.05) 1px, transparent 1px)
    `;
    grid.style.backgroundSize = '50px 50px';
    grid.style.transform = 'perspective(500px) rotateX(60deg) scale(2.5) translateY(-10%)';
    grid.style.transformOrigin = 'center center';
    grid.style.opacity = '0.4';
    
    // Animation
    grid.style.animation = 'gridMove 20s linear infinite';
    
    // Ajouter au conteneur
    container.appendChild(grid);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#grid-animation')) {
        const style = document.createElement('style');
        style.id = 'grid-animation';
        style.textContent = `
            @keyframes gridMove {
                0% {
                    background-position: 0 0;
                }
                100% {
                    background-position: 50px 50px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer un cercle lumineux
function createGlowCircle(container) {
    const circle = document.createElement('div');
    
    // Taille aléatoire
    const size = Math.random() * 300 + 100;
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Couleur néon bleue avec variation
    const hue = 190 + Math.random() * 30; // Variation de bleu
    const saturation = 80 + Math.random() * 20;
    const lightness = 50 + Math.random() * 10;
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.05)`;
    
    // Animation
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    // Styles
    circle.style.position = 'absolute';
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.borderRadius = '50%';
    circle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
    circle.style.left = `${posX}%`;
    circle.style.top = `${posY}%`;
    circle.style.filter = 'blur(40px)';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.animation = `pulseCircle ${duration}s infinite alternate ease-in-out ${delay}s`;
    
    // Ajouter au conteneur
    container.appendChild(circle);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#circle-animation')) {
        const style = document.createElement('style');
        style.id = 'circle-animation';
        style.textContent = `
            @keyframes pulseCircle {
                0% {
                    opacity: 0.2;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                50% {
                    opacity: 0.4;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                100% {
                    opacity: 0.2;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer une ligne horizontale néon
function createHorizontalNeonLine(container) {
    const line = document.createElement('div');
    
    // Dimensions
    const width = 100; // Pleine largeur en pourcentage
    const height = Math.random() * 1 + 0.5; // Hauteur fine
    
    // Position aléatoire (uniquement verticale)
    const posY = Math.random() * 100;
    
    // Couleur néon bleue avec variation
    const hue = 190 + Math.random() * 30; // Variation de bleu
    const saturation = 90 + Math.random() * 10;
    const lightness = 60 + Math.random() * 10;
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
    
    // Animation
    const duration = Math.random() * 5 + 3;
    const delay = Math.random() * 2;
    
    // Styles
    line.style.position = 'absolute';
    line.style.width = `${width}%`;
    line.style.height = `${height}px`;
    line.style.background = `linear-gradient(90deg, transparent, ${color}, transparent)`;
    line.style.left = '0';
    line.style.top = `${posY}%`;
    line.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    line.style.opacity = '0';
    line.style.animation = `flashHorizontal ${duration}s infinite alternate ease-in-out ${delay}s`;
    
    // Ajouter au conteneur
    container.appendChild(line);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#horizontal-line-animation')) {
        const style = document.createElement('style');
        style.id = 'horizontal-line-animation';
        style.textContent = `
            @keyframes flashHorizontal {
                0% {
                    opacity: 0;
                    transform: scaleX(0.3);
                }
                5% {
                    opacity: 0.8;
                    transform: scaleX(1);
                }
                10% {
                    opacity: 0.2;
                }
                15% {
                    opacity: 0.8;
                }
                20% {
                    opacity: 0;
                }
                100% {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer une ligne verticale néon
function createVerticalNeonLine(container) {
    const line = document.createElement('div');
    
    // Dimensions
    const width = Math.random() * 1 + 0.5; // Largeur fine
    const height = 100; // Pleine hauteur en pourcentage
    
    // Position aléatoire (uniquement horizontale)
    const posX = Math.random() * 100;
    
    // Couleur néon bleue avec variation
    const hue = 190 + Math.random() * 30; // Variation de bleu
    const saturation = 90 + Math.random() * 10;
    const lightness = 60 + Math.random() * 10;
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
    
    // Animation
    const duration = Math.random() * 5 + 3;
    const delay = Math.random() * 2;
    
    // Styles
    line.style.position = 'absolute';
    line.style.width = `${width}px`;
    line.style.height = `${height}%`;
    line.style.background = `linear-gradient(0deg, transparent, ${color}, transparent)`;
    line.style.left = `${posX}%`;
    line.style.top = '0';
    line.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    line.style.opacity = '0';
    line.style.animation = `flashVertical ${duration}s infinite alternate ease-in-out ${delay}s`;
    
    // Ajouter au conteneur
    container.appendChild(line);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#vertical-line-animation')) {
        const style = document.createElement('style');
        style.id = 'vertical-line-animation';
        style.textContent = `
            @keyframes flashVertical {
                0% {
                    opacity: 0;
                    transform: scaleY(0.3);
                }
                5% {
                    opacity: 0.8;
                    transform: scaleY(1);
                }
                10% {
                    opacity: 0.2;
                }
                15% {
                    opacity: 0.8;
                }
                20% {
                    opacity: 0;
                }
                100% {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer un hexagone néon
function createNeonHexagon(container) {
    const hexagon = document.createElement('div');
    
    // Taille aléatoire
    const size = Math.random() * 100 + 50;
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Couleur néon bleue avec variation
    const hue = 190 + Math.random() * 30; // Variation de bleu
    const saturation = 90 + Math.random() * 10;
    const lightness = 60 + Math.random() * 10;
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`;
    
    // Animation
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    const rotationDirection = Math.random() > 0.5 ? 'normal' : 'reverse';
    
    // Styles
    hexagon.style.position = 'absolute';
    hexagon.style.width = `${size}px`;
    hexagon.style.height = `${size * 0.866}px`; // Hauteur d'un hexagone = largeur * sin(60°)
    hexagon.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
    hexagon.style.border = `1px solid ${color}`;
    hexagon.style.backgroundColor = 'transparent';
    hexagon.style.left = `${posX}%`;
    hexagon.style.top = `${posY}%`;
    hexagon.style.boxShadow = `0 0 15px ${color}`;
    hexagon.style.transform = 'translate(-50%, -50%)';
    hexagon.style.animation = `rotateHexagon ${duration}s infinite linear ${delay}s ${rotationDirection}`;
    
    // Ajouter au conteneur
    container.appendChild(hexagon);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#hexagon-animation')) {
        const style = document.createElement('style');
        style.id = 'hexagon-animation';
        style.textContent = `
            @keyframes rotateHexagon {
                0% {
                    transform: translate(-50%, -50%) rotate(0deg);
                }
                100% {
                    transform: translate(-50%, -50%) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer un éclair néon
function createNeonLightning(container) {
    const lightning = document.createElement('div');
    
    // Dimensions
    const height = Math.random() * 200 + 100;
    const width = height * 0.1;
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Couleur néon bleue avec variation
    const hue = 190 + Math.random() * 30; // Variation de bleu
    const saturation = 90 + Math.random() * 10;
    const lightness = 60 + Math.random() * 10;
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
    
    // Animation
    const duration = Math.random() * 2 + 1;
    const delay = Math.random() * 10;
    
    // Styles
    lightning.style.position = 'absolute';
    lightning.style.width = `${width}px`;
    lightning.style.height = `${height}px`;
    lightning.style.background = `linear-gradient(to bottom, transparent, ${color}, transparent)`;
    lightning.style.left = `${posX}%`;
    lightning.style.top = `${posY}%`;
    lightning.style.transform = 'translate(-50%, -50%) rotate(10deg)';
    lightning.style.clipPath = 'polygon(50% 0%, 30% 40%, 60% 50%, 40% 100%, 50% 100%, 70% 50%, 40% 40%)';
    lightning.style.boxShadow = `0 0 20px ${color}`;
    lightning.style.opacity = '0';
    lightning.style.animation = `flashLightning ${duration}s infinite ${delay}s`;
    
    // Ajouter au conteneur
    container.appendChild(lightning);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#lightning-animation')) {
        const style = document.createElement('style');
        style.id = 'lightning-animation';
        style.textContent = `
            @keyframes flashLightning {
                0%, 100% {
                    opacity: 0;
                }
                1%, 9% {
                    opacity: 0.8;
                }
                2%, 8% {
                    opacity: 0.3;
                }
                3%, 7% {
                    opacity: 0.8;
                }
                4%, 6% {
                    opacity: 0.3;
                }
                5% {
                    opacity: 0.9;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer un brouillard de fond
function createBackgroundFog(container) {
    const fog = document.createElement('div');
    
    // Styles
    fog.style.position = 'absolute';
    fog.style.top = '0';
    fog.style.left = '0';
    fog.style.width = '100%';
    fog.style.height = '100%';
    fog.style.background = `
        radial-gradient(circle at 20% 30%, rgba(0, 50, 100, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(0, 50, 100, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(0, 100, 150, 0.05) 0%, transparent 70%)
    `;
    fog.style.filter = 'blur(50px)';
    fog.style.opacity = '0.7';
    fog.style.animation = 'fogShift 30s infinite alternate ease-in-out';
    
    // Ajouter au conteneur
    container.appendChild(fog);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#fog-animation')) {
        const style = document.createElement('style');
        style.id = 'fog-animation';
        style.textContent = `
            @keyframes fogShift {
                0% {
                    background-position: 0% 0%;
                }
                100% {
                    background-position: 100% 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer un effet de scan
function createScanEffect(container) {
    const scanLine = document.createElement('div');
    
    // Styles
    scanLine.style.position = 'absolute';
    scanLine.style.top = '0';
    scanLine.style.left = '0';
    scanLine.style.width = '100%';
    scanLine.style.height = '2px';
    scanLine.style.background = 'linear-gradient(90deg, transparent, rgba(0, 194, 255, 0.8), transparent)';
    scanLine.style.boxShadow = '0 0 10px rgba(0, 194, 255, 0.8)';
    scanLine.style.opacity = '0.7';
    scanLine.style.animation = 'scanLine 5s infinite linear';
    scanLine.style.zIndex = '1';
    
    // Ajouter au conteneur
    container.appendChild(scanLine);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#scan-animation')) {
        const style = document.createElement('style');
        style.id = 'scan-animation';
        style.textContent = `
            @keyframes scanLine {
                0% {
                    top: -2px;
                }
                100% {
                    top: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer un effet de vignette
function createVignetteEffect(container) {
    const vignette = document.createElement('div');
    
    // Styles
    vignette.style.position = 'absolute';
    vignette.style.top = '0';
    vignette.style.left = '0';
    vignette.style.width = '100%';
    vignette.style.height = '100%';
    vignette.style.boxShadow = 'inset 0 0 150px rgba(0, 0, 0, 0.8)';
    vignette.style.pointerEvents = 'none';
    
    // Ajouter au conteneur
    container.appendChild(vignette);
}
// Loader/Intro Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Préchargement du widget DexScreener
    const dexScreenerContainer = document.getElementById('dexscreener-container');
    let dexScreenerLoaded = false;
    
    // Fonction pour charger l'iframe DexScreener immédiatement
    function loadDexScreener() {
        if (!dexScreenerLoaded && dexScreenerContainer) {
            dexScreenerLoaded = true;
            
            // Créer l'iframe
            const iframe = document.createElement('iframe');
            iframe.src = 'https://dexscreener.com/solana?embed=1&theme=dark';
            iframe.frameBorder = '0';
            iframe.width = '100%';
            iframe.height = '500px';
            iframe.className = 'chart-iframe';
            
            // Ajouter un événement pour détecter quand l'iframe est chargée
            iframe.addEventListener('load', function() {
                console.log('DexScreener iframe chargée complètement');
                widgetsLoaded = true;
                checkAllLoaded();
            });
            
            // Supprimer le placeholder de chargement
            dexScreenerContainer.innerHTML = '';
            
            // Ajouter l'iframe au conteneur
            dexScreenerContainer.appendChild(iframe);
            
            console.log('DexScreener iframe en cours de chargement');
        }
    }
    
    // Charger DexScreener immédiatement
    loadDexScreener();
    
    // Initialisation du nouveau fond animé sophistiqué
    // Nous n'utilisons plus particlesJS pour le fond principal
    // Les animations sont maintenant gérées par CSS
    
    // Ajout d'étoiles scintillantes supplémentaires
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        if (!starsContainer) return;
        
        const starCount = isMobile ? 50 : 150;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Position aléatoire
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Taille aléatoire
            const size = Math.random() * 2 + 1;
            
            // Opacité aléatoire
            const opacity = Math.random() * 0.7 + 0.3;
            
            // Délai d'animation aléatoire
            const delay = Math.random() * 5;
            
            star.style.cssText = `
                position: absolute;
                top: ${y}%;
                left: ${x}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                animation: twinkle 3s infinite alternate;
                animation-delay: ${delay}s;
            `;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Appel de la fonction pour créer les étoiles
    createStars();

    // Initialize GSAP with optimisations pour mobile
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        // Détection des appareils mobiles
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        // Réduire ou désactiver certaines animations sur mobile
        if (isMobile) {
            // Animations minimales pour mobile
            gsap.to('.grid-lines', {
                backgroundPosition: '50px 50px', // Déplacement réduit
                duration: 40, // Plus lent
                repeat: -1,
                ease: 'linear'
            });
            
            // Animation simplifiée pour cyber circles
            gsap.to('.cyber-circles', {
                opacity: 0.3, // Opacité réduite
                duration: 5, // Plus lent
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        } else {
            // Animations normales pour desktop
            // Create timeline for intro animations
            const introTl = gsap.timeline();
            
            // Animate grid lines
            gsap.to('.grid-lines', {
                backgroundPosition: '100px 100px',
                duration: 20,
                repeat: -1,
                ease: 'linear'
            });
            
            // Animate cyber circles
            gsap.to('.cyber-circles', {
                opacity: 0.5,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }

    // Get loader elements
    const loader = document.getElementById('loader');
    const bankLoading = document.getElementById('bankLoading');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');
    const stayPoorBtn = document.getElementById('stayPoorBtn');
    const apeBtn = document.getElementById('apeBtn');
    const poorMessage = document.getElementById('poorMessage');
    const progressBar = document.getElementById('progressBar');
    const connectionLogs = document.getElementById('connectionLogs');
    const progressGlow = document.querySelector('.progress-glow');
    const dots = document.querySelector('.dots');
    
    // Always show loader to ensure all content loads properly
    if (loader) {
        loader.style.display = 'flex';
        mainContent.style.opacity = '0';
        mainContent.style.display = 'none';
    }
    
    // Track loading status
    let resourcesLoaded = false;
    let widgetsLoaded = false;
    let animationsLoaded = false;
    
    // Function to check if everything is loaded and hide loader
    function checkAllLoaded() {
        if (resourcesLoaded && widgetsLoaded && animationsLoaded) {
            // Hide loader and show main content
            if (loader) {
                // Fade out loader
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s ease';
                
                setTimeout(function() {
                    loader.style.display = 'none';
                    
                    // Show main content
                    mainContent.style.display = 'block';
                    setTimeout(function() {
                        mainContent.classList.add('visible');
                        initializeMainContent();
                    }, 50);
                }, 500);
            }
        }
    }
    
    // Track when resources are loaded
    window.addEventListener('load', function() {
        console.log('All resources loaded');
        resourcesLoaded = true;
        checkAllLoaded();
    });
    
    // Track when 3D card animation is loaded
    document.querySelector('spline-viewer')?.addEventListener('load', function() {
        console.log('3D animation loaded');
        animationsLoaded = true;
        checkAllLoaded();
    });
    
    // Set a timeout to ensure widgets are considered loaded after a reasonable time
    // This is a fallback in case some widgets don't trigger load events
    setTimeout(function() {
        console.log('Widgets loading timeout reached');
        widgetsLoaded = true;
        checkAllLoaded();
    }, 5000);
    
    // Set a timeout to ensure animations are considered loaded after a reasonable time
    setTimeout(function() {
        console.log('Animations loading timeout reached');
        animationsLoaded = true;
        checkAllLoaded();
    }, 8000);
    
    // Track when Raydium iframe is loaded
    const raydiumIframe = document.querySelector('.raydium-iframe');
    if (raydiumIframe) {
        raydiumIframe.addEventListener('load', function() {
            console.log('Raydium widget loaded');
            widgetsLoaded = true;
            checkAllLoaded();
        });
    } else {
        // If iframe doesn't exist yet, set a flag to check later
        widgetsLoaded = true;
    }
    
    // Animate dots
    if (dots) {
        setInterval(() => {
            if (dots.textContent === '...') dots.textContent = '.';
            else if (dots.textContent === '.') dots.textContent = '..';
            else if (dots.textContent === '..') dots.textContent = '...';
        }, 500);
    }
    
    // Fake connection messages
    const connectionMessages = [
        "Establishing secure connection...",
        "Verifying blockchain credentials...",
        "Connecting to Solana network...",
        "Fetching token data...",
        "Initializing banking protocols...",
        "Verifying wallet integrity...",
        "Loading smart contracts...",
        "Syncing with blockchain...",
        "Connection established successfully!"
    ];
    
    // Start loading animation
    let progress = 0;
    let messageIndex = 0;
    
    // Simulate loading progress
    const loadingInterval = setInterval(function() {
        // Update progress
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        // Update loading spinner animation
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            // Make spinner rotate faster as progress increases
            const rotationSpeed = 1 - (progress / 200); // Gradually speed up
            spinner.style.animationDuration = `${rotationSpeed}s`;
            
            // Increase glow as progress increases
            const glowIntensity = 0.3 + (progress / 100) * 0.7;
            spinner.style.boxShadow = `0 0 ${20 * glowIntensity}px rgba(0, 194, 255, ${glowIntensity})`;
        }
        
        // When loading is complete
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Show main content after a short delay
            setTimeout(function() {
                if (typeof gsap !== 'undefined') {
                    // Fade out loader with animation
                    gsap.to(loader, {
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => {
                            loader.style.display = 'none';
                            mainContent.style.display = 'block';
                            
                            // Animate main content in
                            gsap.fromTo(mainContent, 
                                { opacity: 0 },
                                { 
                                    opacity: 1, 
                                    duration: 1.5, 
                                    ease: 'power2.out',
                                    onComplete: () => {
                                        mainContent.classList.add('visible');
                                        initializeMainContent();
                                    }
                                }
                            );
                        }
                    });
                } else {
                    // Simple fade without GSAP
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.8s ease';
                    
                    setTimeout(function() {
                        loader.style.display = 'none';
                        mainContent.style.display = 'block';
                        mainContent.style.opacity = '1';
                        mainContent.classList.add('visible');
                        initializeMainContent();
                    }, 800);
                }
            }, 500);
        }
    }, 200); // Update every 200ms for a total of ~3 seconds
    
    // Event listeners for buttons removed as they're no longer needed with the simplified loader
    
    // Function to initialize main content with enhanced animations
    function initializeMainContent() {
        // Détection des appareils mobiles
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        // Initialize AOS with optimized settings for mobile
        AOS.init({
            duration: isMobile ? 600 : 1000, // Durée plus courte sur mobile
            easing: 'ease-out', // Easing plus simple
            once: isMobile, // Sur mobile, jouer les animations qu'une seule fois pour économiser les ressources
            mirror: false,
            disable: isMobile ? 'phone' : false, // Désactiver certaines animations sur téléphone
            anchorPlacement: 'top-bottom',
            throttleDelay: isMobile ? 100 : 50 // Augmenter le délai de throttle sur mobile
        });
        
        // Initialize GSAP animations for main content
        if (typeof gsap !== 'undefined') {
            // Header animations - simplifiées sur mobile
            gsap.from('header', {
                y: isMobile ? -50 : -100, // Déplacement réduit sur mobile
                opacity: 0,
                duration: isMobile ? 0.5 : 1, // Plus rapide sur mobile
                ease: 'power3.out'
            });
            
            // Suppression des animations d'entrée pour la section hero
            // Aucune animation pour le contenu de la section hero
            
            if (!isMobile) {
                // Garder uniquement les animations non liées à la section hero pour desktop
                
                // Scroll indicator animation
                gsap.to('.scroll-indicator', {
                    y: 10,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
                
                // Parallax effect for hero section
                gsap.to('.hero-bg', {
                    backgroundPosition: '0 100px',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });
                
                // Animate sections on scroll
                gsap.utils.toArray('section').forEach((section, i) => {
                    const bgElements = section.querySelectorAll('.section-bg > div');
                    
                    bgElements.forEach((el) => {
                        gsap.to(el, {
                            backgroundPosition: `${i % 2 ? '-' : ''}100px ${i % 2 ? '-' : ''}100px`,
                            scrollTrigger: {
                                trigger: section,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true
                            }
                        });
                    });
                });
            }
            
            // Désactivation complète de l'effet 3D de la carte
            const card = document.querySelector('.card-3d-container');
            if (card) {
                // Supprimer tous les écouteurs d'événements qui pourraient causer des animations
                card.onmousemove = null;
                card.onmouseenter = null;
                card.onmouseleave = null;
                card.ontouchmove = null;
                card.ontouchstart = null;
                card.ontouchend = null;
                
                // Assurer que la carte reste dans sa position normale
                card.style.transform = 'none';
                card.style.transition = 'none';
                card.style.perspective = 'none';
            }
        }

        // Initialize Tokenomics Chart with enhanced styling
        const ctx = document.getElementById('tokenomicsChart')?.getContext('2d');
        
        if (ctx) {
            // Chart configuration with blue neon colors
            const tokenomicsChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Public', 'Treasury'],
                    datasets: [{
                        data: [99, 1],
                        backgroundColor: [
                            'rgba(0, 194, 255, 0.8)',
                            'rgba(0, 119, 255, 0.8)'
                        ],
                        borderColor: '#000000',
                        borderWidth: 2,
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false, // Hide default legend as we have custom one
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw}%`;
                                }
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            titleColor: '#00c2ff',
                            bodyColor: '#FFFFFF',
                            borderColor: '#00c2ff',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: true,
                            titleFont: {
                                family: 'Orbitron, Montserrat',
                                size: 14,
                                weight: 'bold'
                            },
                            bodyFont: {
                                family: 'Montserrat',
                                size: 13
                            }
                        }
                    },
                    cutout: '65%',
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // Add enhanced hover effects to timeline items with GSAP
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                const dot = item.querySelector('.timeline-dot');
                dot.classList.add('glow');
                
                // Add pulse animation to icon
                const icon = dot.querySelector('i');
                if (icon) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(icon, {
                            scale: 1.2,
                            duration: 0.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        });
                    } else {
                        icon.style.animation = 'pulse 1s infinite';
                    }
                }
                
                // Add subtle scale effect to content
                const content = item.querySelector('.timeline-content');
                if (content) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(content, {
                            y: -8,
                            boxShadow: '0 12px 25px rgba(0, 194, 255, 0.3)',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    } else {
                        content.style.transform = 'translateY(-8px)';
                        content.style.boxShadow = '0 12px 25px rgba(0, 194, 255, 0.3)';
                    }
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const dot = item.querySelector('.timeline-dot');
                dot.classList.remove('glow');
                
                // Remove pulse animation
                const icon = dot.querySelector('i');
                if (icon) {
                    if (typeof gsap !== 'undefined') {
                        gsap.killTweensOf(icon);
                        gsap.to(icon, {
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    } else {
                        icon.style.animation = '';
                    }
                }
                
                // Remove scale effect
                const content = item.querySelector('.timeline-content');
                if (content) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(content, {
                            y: 0,
                            boxShadow: '0 5px 15px rgba(0, 194, 255, 0.2)',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    } else {
                        content.style.transform = '';
                        content.style.boxShadow = '';
                    }
                }
            });
        });
        
        // Add enhanced hover effects to vision features
        const visionFeatures = document.querySelectorAll('.vision-feature');
        visionFeatures.forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(feature, {
                        y: -8,
                        boxShadow: '0 8px 20px rgba(0, 194, 255, 0.3)',
                        borderColor: '#00c2ff',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    const icon = feature.querySelector('i');
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1.2,
                            color: '#00c2ff',
                            textShadow: '0 0 10px rgba(0, 194, 255, 0.7)',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                } else {
                    feature.style.transform = 'translateY(-8px)';
                    feature.style.boxShadow = '0 8px 20px rgba(0, 194, 255, 0.3)';
                    feature.style.borderColor = '#00c2ff';
                    
                    const icon = feature.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'scale(1.2)';
                        icon.style.transition = 'transform 0.3s ease';
                    }
                }
            });
            
            feature.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(feature, {
                        y: 0,
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                        borderColor: 'rgba(0, 194, 255, 0.3)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    const icon = feature.querySelector('i');
                    if (icon) {
                        gsap.to(icon, {
                            scale: 1,
                            color: 'var(--accent-color)',
                            textShadow: 'none',
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                } else {
                    feature.style.transform = '';
                    feature.style.boxShadow = '';
                    feature.style.borderColor = '';
                    
                    const icon = feature.querySelector('i');
                    if (icon) {
                        icon.style.transform = '';
                    }
                }
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            }
        });

        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

    // Vérifier lors du défilement
    window.addEventListener('scroll', function() {
        
        // Effet de défilement pour l'en-tête
        if (window.scrollY > 50) {
            header.style.padding = '1rem 2rem';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.padding = '1.5rem 2rem';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Vérifier également au chargement initial
    window.addEventListener('load', loadDexScreener);
    
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Animate menu toggle icon
            const spans = menuToggle.querySelectorAll('span');
            if (mainNav.classList.contains('active')) {
                // Transform to X
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                // Reset to hamburger
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                
                // Reset hamburger icon
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                
                // Reset hamburger icon
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

        // Suppression de l'effet de typing pour le titre de la section hero
    }
});

// Function to copy contract address to clipboard
function copyAddress() {
    const contractText = document.getElementById('contract');
    const textArea = document.createElement('textarea');
    textArea.value = contractText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Show copied notification
    const notification = document.createElement('div');
    notification.textContent = 'Address copied to clipboard!';
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#D4AF37';
    notification.style.color = '#000000';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.fontWeight = 'bold';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}

// Système de particules avancé et interactif
document.addEventListener('DOMContentLoaded', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Création du conteneur principal pour les particules
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-advanced';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.zIndex = '0';
    document.body.prepend(particleContainer);
    
    // Ajout d'un canvas pour les particules
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    particleContainer.appendChild(canvas);
    
    // Contexte du canvas
    const ctx = canvas.getContext('2d');
    
    // Ajout des effets lumineux dynamiques
    const glowContainer = document.createElement('div');
    glowContainer.className = 'glow-effects';
    glowContainer.style.position = 'fixed';
    glowContainer.style.top = '0';
    glowContainer.style.left = '0';
    glowContainer.style.width = '100%';
    glowContainer.style.height = '100%';
    glowContainer.style.pointerEvents = 'none';
    glowContainer.style.zIndex = '0';
    document.body.prepend(glowContainer);
    
    // Création des points lumineux
    const glowPointsCount = isMobile ? 5 : 12;
    for (let i = 0; i < glowPointsCount; i++) {
        createGlowPoint(glowContainer);
    }
    
    // Création des lignes énergétiques
    const energyLinesCount = isMobile ? 8 : 20;
    for (let i = 0; i < energyLinesCount; i++) {
        createEnergyLine(glowContainer, isMobile);
    }
    
    // Création des vortex énergétiques
    const vortexCount = isMobile ? 2 : 5;
    for (let i = 0; i < vortexCount; i++) {
        createEnergyVortex(glowContainer, isMobile);
    }
    
    // Paramètres des particules
    const particleCount = isMobile ? 80 : 200;
    const particles = [];
    const connections = [];
    
    // Couleurs des particules
    const particleColors = [
        'rgba(0, 194, 255, 0.8)',
        'rgba(0, 150, 255, 0.7)',
        'rgba(0, 100, 255, 0.6)',
        'rgba(0, 220, 255, 0.7)',
        'rgba(0, 255, 220, 0.6)',
        'rgba(212, 175, 55, 0.7)'
    ];
    
    // Création des particules
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * (isMobile ? 3 : 4) + 1,
            speedX: (Math.random() - 0.5) * (isMobile ? 0.5 : 1),
            speedY: (Math.random() - 0.5) * (isMobile ? 0.5 : 1),
            color: particleColors[Math.floor(Math.random() * particleColors.length)],
            pulse: Math.random() * 0.1,
            pulseSpeed: 0.01 + Math.random() * 0.02,
            pulseDirection: Math.random() > 0.5 ? 1 : -1,
            connectDistance: Math.random() * 100 + 50
        });
    }
    
    // Fonction pour dessiner les particules
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner les connexions entre particules
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < particles[i].connectDistance) {
                    const opacity = 1 - (distance / particles[i].connectDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 194, 255, ${opacity * 0.3})`;
                    ctx.lineWidth = opacity * 1.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Dessiner les particules
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Mise à jour de la pulsation
            p.pulse += p.pulseSpeed * p.pulseDirection;
            if (p.pulse > 0.5 || p.pulse < 0) {
                p.pulseDirection *= -1;
            }
            
            // Dessiner la particule
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size + p.pulse, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Ajouter un halo
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2 + p.pulse * 2, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(
                p.x, p.y, p.size,
                p.x, p.y, p.size * 2 + p.pulse * 2
            );
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Déplacer la particule
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Rebondir sur les bords
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        }
        
        requestAnimationFrame(drawParticles);
    }
    
    // Démarrer l'animation
    drawParticles();
    
    // Redimensionner le canvas lors du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Interaction avec la souris
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    
    window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        // Ajouter un effet d'attraction vers la souris
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = 0.2 * (1 - distance / 150);
                p.speedX += dx * force / distance;
                p.speedY += dy * force / distance;
                
                // Limiter la vitesse
                const maxSpeed = 2;
                const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
                if (speed > maxSpeed) {
                    p.speedX = (p.speedX / speed) * maxSpeed;
                    p.speedY = (p.speedY / speed) * maxSpeed;
                }
            }
        }
        
        // Désactiver après 2 secondes d'inactivité
        setTimeout(function() {
            isMouseMoving = false;
        }, 2000);
    });
});

// Fonction pour créer un point lumineux
function createGlowPoint(container) {
    const glowPoint = document.createElement('div');
    
    // Taille aléatoire
    const size = Math.random() * 150 + 50;
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Couleur aléatoire
    const hue = Math.random() > 0.7 ? 45 : 195; // Or ou bleu
    const saturation = Math.floor(Math.random() * 30 + 70);
    const lightness = Math.floor(Math.random() * 20 + 40);
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`;
    
    // Animation
    const duration = Math.random() * 20 + 20;
    const delay = Math.random() * 5;
    
    // Styles
    glowPoint.style.position = 'absolute';
    glowPoint.style.width = `${size}px`;
    glowPoint.style.height = `${size}px`;
    glowPoint.style.borderRadius = '50%';
    glowPoint.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
    glowPoint.style.left = `${posX}%`;
    glowPoint.style.top = `${posY}%`;
    glowPoint.style.filter = 'blur(20px)';
    glowPoint.style.animation = `pulseGlow ${duration}s infinite alternate ease-in-out ${delay}s`;
    glowPoint.style.transform = 'translate(-50%, -50%)';
    
    // Ajouter au conteneur
    container.appendChild(glowPoint);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#glow-animation')) {
        const style = document.createElement('style');
        style.id = 'glow-animation';
        style.textContent = `
            @keyframes pulseGlow {
                0% {
                    opacity: 0.3;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                50% {
                    opacity: 0.7;
                    transform: translate(-50%, -50%) scale(1.2);
                }
                100% {
                    opacity: 0.3;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer une ligne d'énergie
function createEnergyLine(container, isMobile) {
    const energyLine = document.createElement('div');
    
    // Dimensions
    const width = Math.random() * (isMobile ? 150 : 300) + 100;
    const height = Math.random() * 3 + 1;
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Rotation aléatoire
    const rotation = Math.random() * 360;
    
    // Couleur aléatoire
    const hue = Math.random() > 0.3 ? 195 : 45; // Bleu ou or
    const saturation = Math.floor(Math.random() * 30 + 70);
    const lightness = Math.floor(Math.random() * 30 + 50);
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`;
    
    // Animation
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    
    // Styles
    energyLine.style.position = 'absolute';
    energyLine.style.width = `${width}px`;
    energyLine.style.height = `${height}px`;
    energyLine.style.background = `linear-gradient(90deg, transparent, ${color}, transparent)`;
    energyLine.style.left = `${posX}%`;
    energyLine.style.top = `${posY}%`;
    energyLine.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    energyLine.style.boxShadow = `0 0 10px ${color}`;
    energyLine.style.animation = `pulseLine ${duration}s infinite alternate ease-in-out ${delay}s`;
    
    // Ajouter au conteneur
    container.appendChild(energyLine);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#line-animation')) {
        const style = document.createElement('style');
        style.id = 'line-animation';
        style.textContent = `
            @keyframes pulseLine {
                0% {
                    opacity: 0.3;
                    transform: translate(-50%, -50%) rotate(${rotation}deg) scaleX(0.8);
                }
                50% {
                    opacity: 0.8;
                    transform: translate(-50%, -50%) rotate(${rotation}deg) scaleX(1.2);
                }
                100% {
                    opacity: 0.3;
                    transform: translate(-50%, -50%) rotate(${rotation}deg) scaleX(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Fonction pour créer un vortex d'énergie
function createEnergyVortex(container, isMobile) {
    const vortex = document.createElement('div');
    
    // Taille
    const size = Math.random() * (isMobile ? 200 : 400) + 200;
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Couleur aléatoire
    const hue = Math.random() > 0.5 ? 195 : 45; // Bleu ou or
    const color = `hsla(${hue}, 80%, 50%, 0.1)`;
    
    // Animation
    const duration = Math.random() * 30 + 30;
    const delay = Math.random() * 10;
    const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
    
    // Styles
    vortex.style.position = 'absolute';
    vortex.style.width = `${size}px`;
    vortex.style.height = `${size}px`;
    vortex.style.borderRadius = '50%';
    vortex.style.background = `conic-gradient(from 0deg, transparent, ${color}, transparent, ${color}, transparent)`;
    vortex.style.left = `${posX}%`;
    vortex.style.top = `${posY}%`;
    vortex.style.transform = 'translate(-50%, -50%)';
    vortex.style.filter = 'blur(30px)';
    vortex.style.animation = `rotateVortex ${duration}s infinite linear ${delay}s ${direction}`;
    
    // Ajouter au conteneur
    container.appendChild(vortex);
    
    // Ajouter l'animation si elle n'existe pas déjà
    if (!document.querySelector('#vortex-animation')) {
        const style = document.createElement('style');
        style.id = 'vortex-animation';
        style.textContent = `
            @keyframes rotateVortex {
                0% {
                    transform: translate(-50%, -50%) rotate(0deg);
                }
                100% {
                    transform: translate(-50%, -50%) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}
