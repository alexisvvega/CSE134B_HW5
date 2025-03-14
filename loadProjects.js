// Function to fetch data and create cards
async function loadProjects() {
    try {
        // Fetch data from the JSON file
        const response = await fetch("projects.json");
        const projects = await response.json();

        // Get the container for the cards
        const projectList = document.querySelector(".project-list");

        // Clear any existing content
        projectList.innerHTML = "";

        // Create and append a <project-card> for each project
        projects.forEach(project => {
            const card = document.createElement("project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("description", project.description);
            card.setAttribute("image", project.image);
            card.setAttribute("alt", project.alt);
            card.setAttribute("role", project.role);
            card.setAttribute("technologies", project.technologies);
            card.setAttribute("contributions", project.contributions);
            card.setAttribute("bullets", project.bullets);
            card.setAttribute("link", project.link);
            projectList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

// Call the function to load projects when the page loads
document.addEventListener("DOMContentLoaded", loadProjects);