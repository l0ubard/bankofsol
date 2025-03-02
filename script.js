// Loader/Intro Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
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
        
        // Add new connection message
        if (messageIndex < connectionMessages.length && Math.random() > 0.5) {
            const newMessage = document.createElement('p');
            newMessage.textContent = connectionMessages[messageIndex];
            connectionLogs.appendChild(newMessage);
            connectionLogs.scrollTop = connectionLogs.scrollHeight;
            messageIndex++;
        }
        
        // When loading is complete
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Add final message
            const finalMessage = document.createElement('p');
            finalMessage.textContent = "Welcome to Bank of SOL!";
            connectionLogs.appendChild(finalMessage);
            
            // Show welcome screen after a short delay
            setTimeout(function() {
                bankLoading.style.display = 'none';
                welcomeScreen.style.display = 'block';
            }, 500);
        }
    }, 200); // Update every 200ms for a total of ~3 seconds
    
    // Add event listeners to buttons
    stayPoorBtn.addEventListener('click', function() {
        // Show poor message
        poorMessage.style.display = 'block';
        
        // Close the site after 3 seconds
        setTimeout(function() {
            window.close();
            // Fallback if window.close() is blocked by the browser
            document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: black; color: #D4AF37; font-family: Montserrat, sans-serif;"><h1>Window closed. Refresh to restart.</h1></div>';
        }, 3000);
    });
    
    apeBtn.addEventListener('click', function() {
        // Hide welcome screen
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transition = 'opacity 0.5s ease-in-out';
        
        // Directly transition to main content (door animation removed)
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 1s ease-in-out';
            
            setTimeout(function() {
                loader.style.display = 'none';
                mainContent.style.display = 'block';
                
                // Fade in main content
                setTimeout(function() {
                    mainContent.classList.add('visible');
                    initializeMainContent();
                }, 100);
            }, 1000);
        }, 500);
    });
    
    // Function to initialize main content
    function initializeMainContent() {
        // Initialize AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: false
        });

        // Initialize Tokenomics Chart with enhanced styling
        const ctx = document.getElementById('tokenomicsChart').getContext('2d');
        
        // Chart configuration
        const tokenomicsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Liquidity Pool', 'Development', 'Marketing', 'Team', 'Reserves'],
                datasets: [{
                    data: [50, 20, 15, 10, 5],
                    backgroundColor: [
                        'rgba(212, 175, 55, 0.8)',
                        'rgba(255, 215, 0, 0.8)',
                        'rgba(184, 134, 11, 0.8)',
                        'rgba(218, 165, 32, 0.8)',
                        'rgba(238, 232, 170, 0.8)'
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
                        titleColor: '#D4AF37',
                        bodyColor: '#FFFFFF',
                        borderColor: '#D4AF37',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        titleFont: {
                            family: 'Montserrat',
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

        // Add hover effects to timeline items with enhanced animations
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                const dot = item.querySelector('.timeline-dot');
                dot.classList.add('glow');
                
                // Add pulse animation to icon
                const icon = dot.querySelector('i');
                if (icon) {
                    icon.style.animation = 'pulse 1s infinite';
                }
                
                // Add subtle scale effect to content
                const content = item.querySelector('.timeline-content');
                if (content) {
                    content.style.transform = 'translateY(-8px)';
                    content.style.boxShadow = '0 12px 25px rgba(212, 175, 55, 0.3)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const dot = item.querySelector('.timeline-dot');
                dot.classList.remove('glow');
                
                // Remove pulse animation
                const icon = dot.querySelector('i');
                if (icon) {
                    icon.style.animation = '';
                }
                
                // Remove scale effect
                const content = item.querySelector('.timeline-content');
                if (content) {
                    content.style.transform = '';
                    content.style.boxShadow = '';
                }
            });
        });
        
        // Add hover effects to vision features
        const visionFeatures = document.querySelectorAll('.vision-feature');
        visionFeatures.forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                feature.style.transform = 'translateY(-8px)';
                feature.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
                feature.style.borderColor = '#D4AF37';
                
                const icon = feature.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            feature.addEventListener('mouseleave', () => {
                feature.style.transform = '';
                feature.style.boxShadow = '';
                feature.style.borderColor = '';
                
                const icon = feature.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
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

        // Add header scroll effect
        const header = document.querySelector('header');
        window.addEventListener('scroll', function() {
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

// Add particle background effect
document.addEventListener('DOMContentLoaded', function() {
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
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
});

function createParticle(container) {
    const particle = document.createElement('div');
    
    // Random size between 2px and 5px
    const size = Math.random() * 3 + 2;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random opacity between 0.1 and 0.5
    const opacity = Math.random() * 0.4 + 0.1;
    
    // Random animation duration between 20s and 40s
    const duration = Math.random() * 20 + 20;
    
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
