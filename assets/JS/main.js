// =============== NAVBAR FUNCTIONALITY ===============
function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");
    menuBtn.classList.toggle("responsive");
}

// =============== HEADER SHADOW ON SCROLL ===============
window.onscroll = function() { 
    headerShadow(); 
    updateActiveNavLink();
};

function headerShadow() {
    const navHeader = document.getElementById("header");
    
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
        navHeader.style.height = "70px";
        navHeader.style.lineHeight = "70px";
    } else {
        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.lineHeight = "90px";
    }
}

// =============== ACTIVE NAV LINK BASED ON SCROLL ===============
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// =============== GRADIENT MOUSE EFFECT ===============
document.addEventListener('mousemove', (e) => {
    const xPercent = (e.clientX / window.innerWidth) * 100;
    const yPercent = (e.clientY / window.innerHeight) * 100;
    
    document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
    document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);
});

// =============== TYPING EFFECT ===============
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Typed !== 'undefined') {
        var typingEffect = new Typed(".typedText", {
            strings: ["Graphic Designer", "Photographer", "Videographer", "Freelancer"],
            loop: true,
            typeSpeed: 100,
            backSpeed: 80,
            backDelay: 2000
        });
    }
});

// =============== SCROLL REVEAL ANIMATION ===============
document.addEventListener('DOMContentLoaded', function() {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 2000,
            reset: true
        });

        // Home section animations
        sr.reveal('.feature-text-card', {});
        sr.reveal('.featured-name', { delay: 100 });
        sr.reveal('.featured-text-info', { delay: 200 });
        sr.reveal('.featured-text-btn', { delay: 200 });
        sr.reveal('.social_icon', { delay: 200 });
        sr.reveal('.featured-image', { delay: 300 });

        // Other sections animations
        sr.reveal('.section-title', {});
        sr.reveal('.about-content', { delay: 200 });
        sr.reveal('.design-card', { interval: 200 });
        sr.reveal('.contact-content', { delay: 200 });
        sr.reveal('.skill-item', { interval: 100 });
        sr.reveal('.contact-item', { interval: 100 });
    }
});

// =============== SMOOTH SCROLLING FOR NAVIGATION LINKS ===============
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const menuBtn = document.getElementById("myNavMenu");
            if (menuBtn && menuBtn.className.includes("responsive")) {
                menuBtn.className = "nav-menu";
            }
        });
    });
});

// =============== PROJECT SECTION FUNCTIONALITY ===============
function showProjectSection(sectionName) {
    // Hide all project content sections
    const sections = document.querySelectorAll('.project-content');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.project-nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Animate cards with delay
    setTimeout(() => {
        const cards = document.querySelectorAll(`#${sectionName} .design-card`);
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

// =============== UTILITY FUNCTION FOR SMOOTH SCROLLING ===============
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
    }
}

// =============== CONTACT FORM FUNCTIONALITY ===============
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="uil uil-spinner uil-spin"></i>';
            submitBtn.disabled = true;
            
            // Submit ke Formspree
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showNotification('Thank you for your message! I will get back to you soon.', 'success');
                    this.reset();
                } else {
                    showNotification('Oops! There was a problem sending your message', 'error');
                }
            }).catch(error => {
                showNotification('Oops! There was a problem sending your message', 'error');
            }).finally(() => {
            // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// =============== NOTIFICATION SYSTEM ===============
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; padding: 0 0 0 15px; font-size: 18px;">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease-out;
        background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* =============== PROJECT DATA =============== */
const projectsData = [
    {
        title: "E-commerce Website",
        description: "A fully responsive e-commerce platform built with modern web technologies. Features include product catalog, shopping cart, user authentication, and payment integration.",
        technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
        image: "assets/images/ecommerce-preview.jpg", // Placeholder path
        liveUrl: "https://ecommerce-example.com",
        githubUrl: "https://github.com/username/ecommerce-project"
    },
    {
        title: "Portfolio Dashboard",
        description: "An interactive dashboard for tracking project metrics, client feedback, and performance analytics. Designed with data visualization in mind.",
        technologies: ["Vue.js", "Chart.js", "Tailwind CSS", "Firebase"],
        image: "assets/images/dashboard-preview.jpg",
        liveUrl: "https://dashboard-example.com",
        githubUrl: "https://github.com/username/dashboard-project"
    },
    {
        title: "Mobile App UI Kit",
        description: "A comprehensive UI kit for mobile applications with 50+ customizable components. Includes dark/light mode support and accessibility features.",
        technologies: ["Figma", "Adobe XD", "Sketch"],
        image: "assets/images/ui-kit-preview.jpg",
        liveUrl: "",
        githubUrl: "https://github.com/username/ui-kit"
    },
    {
        title: "Blog Platform",
        description: "A content management system for bloggers with rich text editing, SEO optimization, and social sharing capabilities.",
        technologies: ["Next.js", "Strapi", "PostgreSQL"],
        image: "assets/images/blog-preview.jpg",
        liveUrl: "https://blog-example.com",
        githubUrl: "https://github.com/username/blog-platform"
    },
    {
        title: "Fitness Tracker App",
        description: "A web-based fitness application that tracks workouts, nutrition, and progress with gamification elements.",
        technologies: ["Angular", "TypeScript", "Firebase", "D3.js"],
        image: "assets/images/fitness-preview.jpg",
        liveUrl: "https://fitness-example.com",
        githubUrl: "https://github.com/username/fitness-app"
    },
    {
        title: "Restaurant Website",
        description: "A modern restaurant website with online reservation system, menu showcase, and location integration.",
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        image: "assets/images/restaurant-preview.jpg",
        liveUrl: "https://restaurant-example.com",
        githubUrl: "https://github.com/username/restaurant-site"
    }
];

// =============== CARD CLICK EFFECTS ===============
document.addEventListener('DOMContentLoaded', function() {
    // Design card click effects - IMPROVED VERSION
    const cards = document.querySelectorAll('.design-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Prevent event bubbling but don't stop other handlers completely
            event.stopPropagation();
            
            console.log('Card clicked:', this);

            // Add visual feedback
            this.style.transition = 'transform 0.15s ease';
            this.style.transform = 'scale(0.98) translateY(-8px)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            const titleElement = this.querySelector('h3');
            if (!titleElement) {
                console.error('Title element not found in card');
                return;
            }

            const title = titleElement.textContent.trim();
            console.log('Processing card with title:', title);

            // Check if it's a video card
            const videoUrl = this.getAttribute('data-video-url');
            if (videoUrl && videoUrl.trim() !== '') {
                console.log('Opening video modal for:', videoUrl);
                openVideoModal(videoUrl, title);
                return;
            }

            // Check if it's an image card with full image
            const fullImage = this.getAttribute('data-full-image');
            if (fullImage && fullImage.trim() !== '') {
                console.log('Opening image modal for:', fullImage);
                openImageModal(fullImage, title);
                return;
            }

            // Find matching project data and open project modal
            const project = projectsData.find(p => p.title === title);
            if (project) {
                console.log('Opening project modal for:', project);
                createModal(project);
                return;
            }

            // Fallback
            console.log('No modal action found for:', title);
            showNotification('No preview available for this project', 'info');
        });
    });

    // Certificate item click effects - IMPROVED VERSION
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.stopPropagation();
            
            const fullImage = this.getAttribute('data-full-image');
            const titleElement = this.querySelector('h4');
            
            if (fullImage && titleElement) {
                const title = titleElement.textContent.trim();
                openImageModal(fullImage, title);
            }
        });
    });
});

// =============== INTERSECTION OBSERVER FOR ANIMATIONS ===============
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for skill items
                if (entry.target.classList.contains('skill-item')) {
                    const skillItems = entry.target.parentElement.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('.design-card, .skill-item, .contact-item');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
});

// =============== SMOOTH SCROLL TO TOP BUTTON ===============
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="uil uil-angle-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--second-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 201, 255, 0.4);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 201, 255, 0.6)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 201, 255, 0.4)';
    });
});

// =============== KEYBOARD NAVIGATION SUPPORT ===============
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for project buttons
    const projectBtns = document.querySelectorAll('.project-nav-btn');
    projectBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                projectBtns[index - 1].focus();
            } else if (e.key === 'ArrowRight' && index < projectBtns.length - 1) {
                projectBtns[index + 1].focus();
            }
        });
    });
});

// =============== LAZY LOADING FOR IMAGES ===============
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// =============== PERFORMANCE OPTIMIZATION ===============
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    headerShadow();
    updateActiveNavLink();
}, 16)); // ~60fps

// =============== ERROR HANDLING ===============
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// =============== PRELOADER ===============
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Show preloader initially
        preloader.classList.remove('hide');

        // Hide preloader when page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('hide');
                // Remove from DOM after animation completes
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000); // Minimum display time for better UX
        });

        // Fallback: hide preloader after 5 seconds if load event doesn't fire
        setTimeout(() => {
            if (!preloader.classList.contains('hide')) {
                preloader.classList.add('hide');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 5000);
    }
});

// =============== DARK MODE TOGGLE (OPTIONAL) ===============
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load dark mode preference
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
});

// =============== RESUME/CV DOWNLOAD FUNCTIONALITY ===============
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('.nav-button .btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Replace with actual CV file path
            const cvUrl = 'assets/files/Arta_Wahyudi_CV.pdf';
            
            // Create temporary link for download
            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = 'Arta_Wahyudi_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show notification
            showNotification('CV download started!', 'success');
        });
    }
});

// =============== PORTFOLIO FILTER FUNCTIONALITY ===============
function filterProjects(category) {
    const projects = document.querySelectorAll('.design-card');
    
    projects.forEach(project => {
        const projectCategories = project.dataset.categories;
        if (!projectCategories) return;
        
        const categories = projectCategories.split(',').map(cat => cat.trim().toLowerCase());
        
        if (category === 'all' || categories.includes(category.toLowerCase())) {
            project.style.display = 'block';
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                project.style.transition = 'all 0.3s ease';
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 100);
        } else {
            project.style.transition = 'all 0.3s ease';
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// =============== SEARCH FUNCTIONALITY ===============
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const projects = document.querySelectorAll('.design-card');
        
        projects.forEach(project => {
            const title = project.querySelector('h3').textContent.toLowerCase();
            const description = project.querySelector('p').textContent.toLowerCase();
            const technologies = Array.from(project.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase()).join(' ');
            
            const isMatch = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          technologies.includes(searchTerm);
            
            if (isMatch || searchTerm === '') {
                project.style.display = 'block';
                project.classList.add('search-highlight');
            } else {
                project.style.display = 'none';
                project.classList.remove('search-highlight');
            }
        });
    }, 300));
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);

// =============== COPY TO CLIPBOARD FUNCTIONALITY ===============
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(function() {
        // Visual feedback
        const originalText = element.textContent;
        element.textContent = 'Copied!';
        element.style.color = 'var(--second-color)';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
        }, 2000);
        
        showNotification('Copied to clipboard!', 'success');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Add copy functionality to contact items
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const text = item.querySelector('p');
        if (text && (text.textContent.includes('@') || text.textContent.includes('+'))) {
            item.style.cursor = 'pointer';
            item.title = 'Click to copy';
            
            item.addEventListener('click', function() {
                copyToClipboard(text.textContent, text);
            });
        }
    });
});

// =============== IMAGE MODAL FUNCTIONALITY ===============
function openImageModal(imageSrc, title) {
    console.log('Opening image modal:', imageSrc, title);
    
    // Remove any existing modals first
    closeAllModals();

    // Validate image source
    if (!imageSrc || imageSrc.trim() === '') {
        showNotification('Image not found', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close image">&times;</button>
            <div class="modal-image-container">
                <img src="${imageSrc}" alt="${title}" loading="lazy">
            </div>
            <div class="modal-title">
                <h3>${title}</h3>
            </div>
        </div>
    `;

    // Add event listeners
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    overlay.addEventListener('click', closeImageModal);
    closeBtn.addEventListener('click', closeImageModal);

    // Add to DOM
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Add ESC key listener
    document.addEventListener('keydown', handleModalKeydown);
    
    console.log('Image modal created successfully');
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleModalKeydown);
        }, 300);
    }
}

// Handle ESC key for modals
function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeImageModal();
        closeModal();
        closeVideoModal();
    }
}

// =============== VIDEO MODAL FUNCTIONALITY ===============
function openVideoModal(videoUrl, title) {
    console.log('Opening video modal:', videoUrl, title);
    
    // Remove any existing modals first
    closeAllModals();

    // Validate video URL
    if (!videoUrl || videoUrl.trim() === '') {
        showNotification('Video URL not found', 'error');
        return;
    }

    // Process Google Drive URL properly
    let embedUrl = videoUrl;
    if (videoUrl.includes('drive.google.com')) {
        // Extract file ID from Google Drive URL
        const fileIdMatch = videoUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (fileIdMatch) {
            const fileId = fileIdMatch[1];
            embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
        } else {
            embedUrl = videoUrl.replace('/view?usp=sharing', '/preview').replace('/view?usp=drive_link', '/preview');
        }
    }

    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close video">&times;</button>
            <div class="modal-video-container">
                <iframe 
                    src="${embedUrl}" 
                    frameborder="0" 
                    allowfullscreen
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                    title="${title}"
                ></iframe>
            </div>
            <div class="modal-title">
                <h3>${title}</h3>
            </div>
        </div>
    `;

    // Add event listeners
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    overlay.addEventListener('click', closeVideoModal);
    closeBtn.addEventListener('click', closeVideoModal);

    // Add to DOM
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Add ESC key listener
    document.addEventListener('keydown', handleModalKeydown);
    
    console.log('Video modal created successfully');
}

function closeVideoModal() {
    const modal = document.querySelector('.video-modal');
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleModalKeydown);
        }, 300);
    }
}

// =============== MODAL FUNCTIONALITY FOR PROJECT DETAILS ===============
function createModal(project) {
    console.log('Creating project modal for:', project);
    
    // Remove any existing modals
    closeAllModals();

    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close project details">&times;</button>
            <div class="modal-header">
                <h2>${project.title}</h2>
                <div class="modal-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    ${project.image ? 
                        `<img src="${project.image}" alt="${project.title}" loading="lazy">` : 
                        '<div class="placeholder-image">🎨 Project Image</div>'
                    }
                </div>
                <div class="modal-description">
                    <p>${project.description}</p>
                    <div class="modal-links">
                        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn blue-btn" rel="noopener noreferrer">View Live</a>` : ''}
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn" rel="noopener noreferrer">GitHub</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add event listeners
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // Add to DOM
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Add ESC key listener
    document.addEventListener('keydown', handleModalKeydown);
}

function closeModal() {
    const modal = document.querySelector('.project-modal');
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleModalKeydown);
        }, 300);
    }
}

function closeAllModals() {
    closeImageModal();
    closeVideoModal();
    closeModal();
}

// Add modal CSS if not exists
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            @keyframes modalFadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            @keyframes modalFadeOut {
                from { opacity: 1; transform: scale(1); }
                to { opacity: 0; transform: scale(0.8); }
            }
            .image-modal,
            .video-modal,
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }
            .image-modal.active,
            .video-modal.active,
            .project-modal.active {
                display: flex;
                animation: modalFadeIn 0.3s ease-out;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
            }
            .image-modal .modal-content,
            .video-modal .modal-content {
                background: transparent;
                max-width: 95vw;
                max-height: 95vh;
                width: 90vw;
                height: 90vh;
                display: flex;
                flex-direction: column;
                padding: 0;
                border-radius: 15px;
                overflow: hidden;
            }
            .project-modal .modal-content {
                position: relative;
                background: white;
                border-radius: 20px;
                max-width: 90vw;
                max-height: 90vh;
                overflow: auto;
                padding: 0;
            }
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 30px;
                cursor: pointer;
                color: #fff;
                z-index: 1;
                padding: 10px;
            }
            .image-modal .modal-close,
            .video-modal .modal-close {
                color: #fff;
            }
            .project-modal .modal-close {
                color: #666;
            }
            .modal-title {
                position: absolute;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 15px;
                border-radius: 10px;
                z-index: 1;
                text-align: center;
            }
            .modal-title h3 {
                margin: 0;
                font-size: 1.5rem;
            }
            .modal-image-container,
            .modal-video-container {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background: #000;
                overflow: hidden;
            }
            .modal-image-container img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                border-radius: 0;
            }
            .modal-video-container {
                border-radius: 0;
            }
            .modal-video-container iframe {
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 0;
            }
            .project-modal .modal-header {
                padding: 30px 30px 20px;
                border-bottom: 1px solid #eee;
            }
            .project-modal .modal-body {
                padding: 30px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
            }
            .project-modal .modal-image {
                width: 100%;
                height: 300px;
                background: #f5f5f5;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: #666;
            }
            .project-modal .modal-links {
                margin-top: 20px;
                display: flex;
                gap: 15px;
            }
            @media (max-width: 768px) {
                .image-modal .modal-content,
                .video-modal .modal-content {
                    width: 98vw;
                    height: 98vh;
                }
                .project-modal .modal-content {
                    max-width: 95vw;
                    margin: 20px;
                }
                .project-modal .modal-body {
                    grid-template-columns: 1fr;
                    padding: 20px;
                }
                .modal-title {
                    left: 10px;
                    right: 10px;
                    bottom: 10px;
                    padding: 10px;
                }
                .modal-title h3 {
                    font-size: 1.2rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// =============== LOADING STATES ===============
function showLoadingState(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<i class="uil uil-spinner uil-spin"></i> Loading...';
    element.disabled = true;
    
    return function hideLoading() {
        element.innerHTML = originalContent;
        element.disabled = false;
    };
}

// =============== ANALYTICS EVENTS (OPTIONAL) ===============
function trackEvent(eventName, properties = {}) {
    // Replace with actual analytics implementation
    console.log('Analytics Event:', eventName, properties);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, properties);
    // }
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track project views
    document.querySelectorAll('.design-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            trackEvent('project_viewed', { project_name: title });
        });
    });
    
    // Track contact form submissions
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('contact_form_submitted');
        });
    }
    
// Track social media clicks and open links
document.querySelectorAll('.social_icon .icon, .footer-social .icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const platform = this.querySelector('i').className;
        const link = this.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
        trackEvent('social_media_clicked', { platform });
    });
});
});

// =============== ACCESSIBILITY IMPROVEMENTS ===============
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    document.querySelectorAll('.icon').forEach(icon => {
        if (!icon.getAttribute('aria-label')) {
            const iconClass = icon.querySelector('i').className;
            if (iconClass.includes('github')) icon.setAttribute('aria-label', 'GitHub Profile');
            if (iconClass.includes('instagram')) icon.setAttribute('aria-label', 'Instagram Profile');
            if (iconClass.includes('linkedin')) icon.setAttribute('aria-label', 'LinkedIn Profile');
            if (iconClass.includes('dribbble')) icon.setAttribute('aria-label', 'Dribbble Profile');
        }
    });
    
    // Add keyboard navigation for cards
    document.querySelectorAll('.design-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus management for mobile menu
    const mobileMenuBtn = document.querySelector('.nav-menu-btn');
    const mobileMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('responsive')) {
                // Menu is opening
                const firstLink = mobileMenu.querySelector('.nav-link');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
    }
});

// =============== UTILITY FUNCTIONS ===============
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// =============== INITIALIZATION ===============
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
    
    // Initialize any additional features here
    // You can add more initialization code as needed
});

// =============== EXPORT FUNCTIONS (IF USING MODULES) ===============
// Uncomment if using ES6 modules
/*
export {
    myMenuFunction,
    showProjectSection,
    scrollToSection,
    showNotification,
    toggleDarkMode,
    trackEvent
};
*/
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    console.error('Error occurred in:', e.filename, 'at line:', e.lineno);
});

// Add debugging for modal issues
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for cards...');
    const cards = document.querySelectorAll('.design-card');
    console.log(`Found ${cards.length} design cards`);
    
    cards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const videoUrl = card.getAttribute('data-video-url');
        const fullImage = card.getAttribute('data-full-image');
        
        console.log(`Card ${index + 1}:`, {
            title: title ? title.textContent.trim() : 'No title',
            hasVideo: !!videoUrl,
            hasImage: !!fullImage,
            videoUrl: videoUrl,
            imageUrl: fullImage
        });
    });
});