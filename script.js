// Loader/Intro Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Configuration optimisée pour mobile
    if (typeof particlesJS !== 'undefined') {
        // Configuration allégée pour mobile
        if (isMobile) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 20, density: { enable: true, value_area: 800 } }, // Réduit le nombre de particules
                    color: { value: "#00c2ff" },
                    shape: {
                        type: "circle",
                        stroke: { width: 0, color: "#000000" },
                        polygon: { nb_sides: 5 }
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: { enable: false } // Désactive l'animation d'opacité
                    },
                    size: {
                        value: 2,
                        random: true,
                        anim: { enable: false } // Désactive l'animation de taille
                    },
                    line_linked: {
                        enable: false // Désactive les lignes entre particules
                    },
                    move: {
                        enable: true,
                        speed: 0.5, // Réduit la vitesse
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: { enable: false }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: false }, // Désactive l'interactivité au survol
                        onclick: { enable: false }, // Désactive l'interactivité au clic
                        resize: true
                    }
                },
                retina_detect: false // Désactive la détection retina pour économiser des ressources
            });
        } else {
            // Configuration normale pour desktop
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#00c2ff" },
                    shape: {
                        type: "circle",
                        stroke: { width: 0, color: "#000000" },
                        polygon: { nb_sides: 5 }
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00c2ff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: { enable: false, rotateX: 600, rotateY: 1200 }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "grab" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 },
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            });
        }
    }

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
    
    // Skip loader and show main content directly
    if (loader) {
        loader.style.display = 'none';
    }
    
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.classList.add('visible');
        // Initialize main content immediately
        initializeMainContent();
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
    
    // Update progress bar and connection logs
    const loadingInterval = setInterval(function() {
        // Update progress
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        // Update progress glow position
        if (progressGlow) {
            progressGlow.style.left = `${progress - 5}%`;
        }
        
        // Add new connection message
        if (messageIndex < connectionMessages.length && Math.random() > 0.5) {
            const newMessage = document.createElement('p');
            newMessage.textContent = connectionMessages[messageIndex];
            
            // Add typing effect
            let i = 0;
            const text = connectionMessages[messageIndex];
            newMessage.textContent = '';
            
            const typeWriter = () => {
                if (i < text.length) {
                    newMessage.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 20);
                }
            };
            
            connectionLogs.appendChild(newMessage);
            typeWriter();
            
            connectionLogs.scrollTop = connectionLogs.scrollHeight;
            messageIndex++;
        }
        
        // When loading is complete
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Add final message
            const finalMessage = document.createElement('p');
            finalMessage.textContent = "Welcome to Bank of SOL!";
            finalMessage.style.color = '#00c2ff';
            finalMessage.style.fontWeight = 'bold';
            connectionLogs.appendChild(finalMessage);
            
            // Show welcome screen after a short delay
            setTimeout(function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(bankLoading, {
                        opacity: 0,
                        y: -50,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => {
                            bankLoading.style.display = 'none';
                            welcomeScreen.style.display = 'block';
                            gsap.fromTo(welcomeScreen, 
                                { opacity: 0, y: 50 },
                                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
                            );
                        }
                    });
                } else {
                    bankLoading.style.display = 'none';
                    welcomeScreen.style.display = 'block';
                }
            }, 500);
        }
    }, 200); // Update every 200ms for a total of ~3 seconds
    
    // Add event listeners to buttons with enhanced animations
    stayPoorBtn.addEventListener('click', function() {
        // Show poor message with animation
        if (typeof gsap !== 'undefined') {
            gsap.to(welcomeScreen, {
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            setTimeout(() => {
                poorMessage.style.display = 'block';
                gsap.fromTo(poorMessage, 
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out' }
                );
            }, 500);
        } else {
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                poorMessage.style.display = 'block';
            }, 500);
        }
        
        // Close the site after 3 seconds
        setTimeout(function() {
            window.close();
            // Fallback if window.close() is blocked by the browser
            document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black; color: #00c2ff; font-family: Orbitron, Montserrat, sans-serif;"><h1 class="glitch-text" data-text="Window closed. Refresh to restart.">Window closed. Refresh to restart.</h1></div>';
        }, 3000);
    });
    
    apeBtn.addEventListener('click', function() {
        // Hide welcome screen with enhanced animation
        if (typeof gsap !== 'undefined') {
            // Create a timeline for the transition
            const transitionTl = gsap.timeline();
            
            // Animate welcome screen out
            transitionTl.to(welcomeScreen, {
                opacity: 0,
                y: -50,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            // Animate loader out
            transitionTl.to(loader, {
                opacity: 0,
                duration: 1,
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
            }, "-=0.3"); // Overlap with previous animation
        } else {
            // Fallback for when GSAP is not available
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.transition = 'opacity 0.5s ease-in-out';
            
            setTimeout(function() {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 1s ease-in-out';
                
                setTimeout(function() {
                    loader.style.display = 'none';
                    mainContent.style.display = 'block';
                    
                    setTimeout(function() {
                        mainContent.classList.add('visible');
                        initializeMainContent();
                    }, 100);
                }, 1000);
            }, 500);
        }
    });
    
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
            
            if (isMobile) {
                // Animations simplifiées pour mobile
                // Fade in simple pour les sections hero sans déplacement
                gsap.from('.hero-left, .hero-right', {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
                
                // Désactiver les animations de parallaxe et de fond sur mobile
                // pour économiser les ressources
            } else {
                // Animations complètes pour desktop
                // Hero section animations
                gsap.from('.hero-left', {
                    x: -100,
                    opacity: 0,
                    duration: 1.2,
                    delay: 0.3,
                    ease: 'power3.out'
                });
                
                gsap.from('.hero-right', {
                    x: 100,
                    opacity: 0,
                    duration: 1.2,
                    delay: 0.3,
                    ease: 'power3.out'
                });
                
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
            
            // Désactivation de l'effet 3D de la carte qui causait des déformations
            // La carte 3D sera maintenant statique, sans effet de rotation au mouvement de la souris
            const card = document.querySelector('.card-3d-container');
            if (card) {
                // Assurer que la carte reste dans sa position normale
                card.style.transform = 'rotateY(0deg) rotateX(0deg)';
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

    // Implémentation du chargement paresseux (lazy loading) pour l'iframe DexScreener
    const dexScreenerContainer = document.getElementById('dexscreener-container');
    let dexScreenerLoaded = false;

    // Fonction pour vérifier si un élément est visible dans la fenêtre
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Fonction pour charger l'iframe DexScreener
    function loadDexScreener() {
        if (!dexScreenerLoaded && dexScreenerContainer && isElementInViewport(dexScreenerContainer)) {
            dexScreenerLoaded = true;
            
            // Créer l'iframe
            const iframe = document.createElement('iframe');
            iframe.src = 'https://dexscreener.com/solana?embed=1&theme=dark';
            iframe.frameBorder = '0';
            iframe.width = '100%';
            iframe.height = '500px';
            iframe.className = 'chart-iframe';
            
            // Supprimer le placeholder de chargement
            dexScreenerContainer.innerHTML = '';
            
            // Ajouter l'iframe au conteneur
            dexScreenerContainer.appendChild(iframe);
            
            console.log('DexScreener iframe chargée');
        }
    }

    // Vérifier lors du défilement
    window.addEventListener('scroll', function() {
        // Charger DexScreener si visible
        loadDexScreener();
        
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

        // Add typing effect to hero title
        const heroTitle = document.querySelector('.hero h2');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 500);
        }
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

// Add particle background effect with mobile optimization
document.addEventListener('DOMContentLoaded', function() {
    // Détection des appareils mobiles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '0';
    document.body.prepend(particleContainer);
    
    // Réduire considérablement le nombre de particules sur mobile
    const particleCount = isMobile ? 15 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer, isMobile);
    }
});

function createParticle(container, isMobile) {
    const particle = document.createElement('div');
    
    // Taille réduite sur mobile
    const size = isMobile ? (Math.random() * 2 + 1) : (Math.random() * 3 + 2);
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Opacité réduite sur mobile
    const opacity = isMobile ? (Math.random() * 0.3 + 0.1) : (Math.random() * 0.4 + 0.1);
    
    // Animation plus lente sur mobile pour économiser les ressources
    const duration = isMobile ? (Math.random() * 30 + 30) : (Math.random() * 20 + 20);
    
    // Set particle styles
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = '#D4AF37';
    particle.style.opacity = opacity.toString();
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animation = `float ${duration}s infinite ease-in-out`;
    
    // Add keyframes for floating animation
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                }
                50% {
                    transform: translateY(-10px) translateX(-10px);
                }
                75% {
                    transform: translateY(-30px) translateX(5px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    container.appendChild(particle);
}
