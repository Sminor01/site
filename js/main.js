// Project data
const projects = [
    {
        id: 1,
        title: "Проект 1",
        description: "Описание первого проекта",
        image: "images/project1.jpg",
        projectUrl: "projects/project1.html"
    },
    {
        id: 2,
        title: "Проект 2",
        description: "Описание второго проекта",
        image: "images/project2.jpg",
        projectUrl: "projects/project2.html"
    },
    // Add more projects as needed
];

// Initialize projects grid
function initializeProjectsGrid() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectTile = document.createElement('div');
        projectTile.className = 'project-tile';
        projectTile.dataset.projectId = project.id;
        
        projectTile.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="overlay">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        
        projectTile.addEventListener('click', () => openProjectModal(project));
        projectsGrid.appendChild(projectTile);
    });
}

// Scroll reveal animation
function handleScrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectsGrid();
    handleScrollReveal();
    initializeSmoothScroll();
}); 