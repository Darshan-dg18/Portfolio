// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav a');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && window.innerWidth <= 768) {
        navList.style.display = 'none';
        menuToggle.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                navList.style.display = 'none';
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Animate skill progress bars when they come into view
const progressBars = document.querySelectorAll('.progress');
const animateProgress = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.parentElement.dataset.progress;
            observer.unobserve(entry.target);
        }
    });
};

const progressObserver = new IntersectionObserver(animateProgress, {
    threshold: 0.5
});

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});