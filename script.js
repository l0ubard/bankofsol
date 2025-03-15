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
    
    // Suppression de toutes les animations de fond
    
    // Suppression de la création d'étoiles

    // Initialize GSAP with optimisations pour mobile
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        // Détection des appareils mobiles
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        
        // Désactiver complètement les animations pour tous les appareils
        // Définir des styles statiques pour les éléments
        const gridLines = document.querySelector('.grid-lines');
        if (gridLines) {
            gridLines.style.backgroundPosition = '0 0';
            gridLines.style.animation = 'none';
            gridLines.style.display = 'none'; // Masquer complètement
        }
        
        const cyberCircles = document.querySelector('.cyber-circles');
        if (cyberCircles) {
            cyberCircles.style.opacity = '0';
            cyberCircles.style.animation = 'none';
            cyberCircles.style.display = 'none'; // Masquer complètement
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
            if (isMobile) {
                // Désactiver complètement les animations GSAP sur mobile
                // Appliquer directement les styles sans animation
                const header = document.querySelector('header');
                if (header) {
                    header.style.opacity = '1';
                    header.style.transform = 'none';
                }
                
                // Désactiver les animations de survol sur mobile
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => {
                    // Supprimer les écouteurs d'événements qui pourraient causer des animations
                    item.onmouseenter = null;
                    item.onmouseleave = null;
                });
                
                const visionFeatures = document.querySelectorAll('.vision-feature');
                visionFeatures.forEach(feature => {
                    // Supprimer les écouteurs d'événements qui pourraient causer des animations
                    feature.onmouseenter = null;
                    feature.onmouseleave = null;
                });
            } else {
                // Animations normales pour desktop
                gsap.from('header', {
                    y: -100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
                
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

        // Suppression complète de l'effet de parallax pour tous les appareils

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

// Suppression de la création de particules
