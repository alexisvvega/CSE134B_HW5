class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Get attributes with fallbacks
        const title = this.getAttribute("title") || "Project Title";
        const description = this.getAttribute("description") || "Project description.";
        const imageSrc = this.getAttribute("image") || "default.jpg";
        const imageAlt = this.getAttribute("alt") || "Project Image";
        const link = this.getAttribute("link") || "#";
        const role = this.getAttribute("role") || "Role not specified";
        const technologies = this.getAttribute("technologies") || "Technologies not listed";
        const contributions = this.getAttribute("contributions") || "Contributions not listed";
        const bullets = this.getAttribute("bullets") || ""; 
        const bulletList = bullets ? bullets.split("|") : []; 

        // Validate link
        const isValidLink = link.startsWith("http") || link.startsWith("#");

        // Template for the project card
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                :host {
                    --text-color: #2c2c2c; /* Default: Dark mode */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between; /* Distribute space evenly */
                    width: 70%;
                    min-height: 400px; /* Reduced minimum height */
                    background: var(--background-color, #ffffff);
                    color: var(--primary-color, #0d2950);
                    border-radius: 1rem;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    padding: 1.5rem; /* Consistent padding */
                    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                    overflow: hidden; /* Ensure content stays within the card */
                }

                :host(:hover) {
                    transform: scale(1.05);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Increase shadow on hover */
                }

                h2 {
                    font-size: 1.8rem;
                    text-align: center;
                    margin-bottom: 1rem; /* Consistent margin */
                    color: var(--card-title-color, #6a5acd);
                }

                picture {
                    display: flex;
                    justify-content: center;
                    align-items: center; /* Center the image vertically */
                    width: 100%; /* Make the container full width */
                    height: 150px; /* Fixed height for images */
                    margin-bottom: 1rem; /* Consistent margin */
                }

                picture img {
                    width: 100%; /* Make the image fill the container's width */
                    height: 100%; /* Ensure the image fills the container's height */
                    object-fit: contain; /* Ensures the entire image is visible without cutting off */
                    border-radius: 10px;
                }

                p {
                    font-size: 1rem;
                    color: var(--text-color, #2c2c2c);
                    text-align: center;
                    margin: 0.5rem 0; /* Consistent margin */
                    overflow: hidden; /* Prevent text overflow */
                    text-overflow: ellipsis; /* Add ellipsis for overflow text */
                    display: -webkit-box;
                    -webkit-line-clamp: 3; /* Limit description to 3 lines */
                    -webkit-box-orient: vertical;
                }

                .project-meta {
                    font-size: 0.9rem;
                    color: var(--secondary-color, #7c8bdc);
                    text-align: center;
                    margin: 0.5rem 0; /* Consistent margin */
                }

                a {
                    display: inline-block;
                    margin: 1rem 0; /* Consistent margin */
                    padding: 10px 20px;
                    background-color: var(--primary-color, #0d2950);
                    color: #ffffff; /* Force text color to white */
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: bold;
                    transition: background-color 0.3s ease-in-out, transform 0.2s;
                    text-align: center;
                }

                ul {
                    list-style-type: disc; /* Add bullet points */
                    padding-left: 1.5rem; /* Indent bullets */
                    margin: 0.5rem 0; /* Consistent margin */
                    font-size: 0.9rem;
                    color: var(--text-color, #2c2c2c);
                    text-align: left; /* Align text to the left */
                }

                ul li {
                    margin-bottom: 0.5rem; /* Add spacing between bullet points */
                }

                a:hover {
                    background-color: var(--secondary-color, #7c8bdc);
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    :host {
                        width: 90%; /* Adjust width for smaller screens */
                        max-width: 100%; /* Allow cards to take full width on mobile */
                        height: auto; /* Allow height to adjust on mobile */
                    }

                    picture {
                        height: 150px; /* Smaller image height for mobile */
                    }
                }
            </style>

            <h2>${title}</h2>
            <picture>
                <img src="${imageSrc}" alt="${imageAlt}">
            </picture>
            <p>${description}</p>
            ${bullets ? `
                <ul>
                    ${bulletList.map(bullet => `<li>${bullet}</li>`).join("")}
                </ul>
            ` : ""}
            <p class="project-meta"><strong>Role:</strong> ${role}</p>
            <p class="project-meta"><strong>Technologies:</strong> ${technologies}</p>
            <p class="project-meta"><strong>Key Contributions:</strong> ${contributions}</p>
            <a href="${link}" target="_blank">Learn More</a>
        `;
    }
}

// Register the custom element
customElements.define("project-card", ProjectCard);