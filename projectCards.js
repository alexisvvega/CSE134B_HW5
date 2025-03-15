class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Get attributes with fallbacks
    const title = this.getAttribute("title") || "Project Title";
    const description =
      this.getAttribute("description") || "Project description.";
    const imageSrc = this.getAttribute("image") || "default.jpg";
    const imageAlt = this.getAttribute("alt") || "Project Image";
    const link = this.getAttribute("link") || "#";
    const role = this.getAttribute("role") || "Role not specified";
    const technologies =
      this.getAttribute("technologies") || "Technologies not listed";
    const contributions =
      this.getAttribute("contributions") || "Contributions not listed";
    const bullets = this.getAttribute("bullets") || "";
    const bulletList = bullets ? bullets.split("|") : []; // Split bullets by "|"

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
      ${
        bulletList.length > 0
          ? `
          <ul>
            ${bulletList.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
        `
          : ""
      }
      <p class="project-meta"><strong>Role:</strong> ${role}</p>
      <p class="project-meta"><strong>Technologies:</strong> ${technologies}</p>
      <p class="project-meta"><strong>Key Contributions:</strong> ${contributions}</p>
      <a href="${link}" target="_blank">Learn More</a>
    `;
  }

  // Define observed attributes
  static get observedAttributes() {
    return [
      "title",
      "description",
      "image",
      "alt",
      "link",
      "role",
      "technologies",
      "contributions",
      "bullets",
    ];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return; // No change, exit early

    switch (name) {
      case "title":
        this.shadowRoot.querySelector("h2").textContent = newValue;
        break;
      case "description":
        this.shadowRoot.querySelector("p").textContent = newValue;
        break;
      case "image":
        this.shadowRoot.querySelector("img").src = newValue;
        break;
      case "alt":
        this.shadowRoot.querySelector("img").alt = newValue;
        break;
      case "link":
        this.shadowRoot.querySelector("a").href = newValue;
        break;
      case "role":
        this.shadowRoot.querySelector(
          ".project-meta:nth-of-type(1)"
        ).innerHTML = `<strong>Role:</strong> ${newValue}`;
        break;
      case "technologies":
        this.shadowRoot.querySelector(
          ".project-meta:nth-of-type(2)"
        ).innerHTML = `<strong>Technologies:</strong> ${newValue}`;
        break;
      case "contributions":
        this.shadowRoot.querySelector(
          ".project-meta:nth-of-type(3)"
        ).innerHTML = `<strong>Key Contributions:</strong> ${newValue}`;
        break;
      case "bullets":
        const bulletList = newValue ? newValue.split("|") : [];
        const ul = this.shadowRoot.querySelector("ul");
        if (ul) {
          ul.innerHTML = bulletList
            .map((bullet) => `<li>${bullet}</li>`)
            .join("");
        }
        break;
      default:
        console.warn(`Unknown attribute changed: ${name}`);
    }
  }
}

// Register the custom element
customElements.define("project-card", ProjectCard);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loadLocalBtn").addEventListener("click", loadLocalData);
  document.getElementById("loadRemoteBtn").addEventListener("click", loadRemoteData);
});

// Sample data to store in localStorage
const sampleData = [
  {
    title: "Psyches of Color",
    description:
      "As a developer for TSE, I am working on a mobile app for Psyches of Color, a nonprofit organization dedicated to raising mental health awareness for Black and Latinx communities.",
    image: "tse-logo-yellow.png",
    alt: "Psyches of Color app",
    role: "Software Developer",
    technologies: "React Native, Node.js, Express.js, MongoDB",
    contributions:
      "Developing core app features, ensuring secure authentication, and maintaining code quality.",
    bullets:
      "Developing the app using React Native, Node.js, Express.js, and MongoDB.|Implementing secure environment variables for sensitive data handling.|Establishing coding standards with Prettier and ESLint for maintainability.",
    link: "https://tritonse.github.io/",
  },
  {
    title: "YouLostIt",
    description: "YouLostIt is a privacy-focused lost item tracker developed as part of the CSE 190: Wireless Embedded Systems course.",
    image: "youlostit.png",
    alt: "STM32CubeIDE",
    role: "Embedded Systems Engineer",
    technologies: "STM32, C, Bluetooth Low-Energy",
    contributions: "Designed game mechanics, improved UI, and enhanced user experience.",
    bullets: "Designed a motion detection system on STM32 to simulate a lost-tag tracker.|Implemented I2C communication and LED feedback for real-time motion alerts.|Utilized ITM Console debugging for optimized hardware communication.|Developed firmware to manage sensors, radios, and power efficiently.",
    link: "https://github.com/ucsd-cse190b-w25/project-3-adding-low-energy-radio-communication-team-6/blob/main/youlostit-ble/Core/Src/main.c",
  },
  {
    title: "Mario's Playground",
    description:
      "Developed as part of the WIC project teams, this Nintendo-themed website offers a collection of interactive games featuring beloved characters.",
    bullets:
      "Designed and developed the MarioCoinfall game using HTML, CSS, and JavaScript.|Implemented player movement, coin collection, and bomb collision mechanics.|Built a Mario-themed homepage with intuitive navigation and interactive elements.|Optimized code for smooth performance across devices.",
    image: "wic.png",
    alt: "Mario's Playground screenshot",
    role: "Frontend Developer",
    technologies: "HTML, CSS, JavaScript",
    contributions:
      "Integrated scheduling, improved communication, and optimized volunteer coordination.",
    link: "https://alexisvvega.github.io/Team11/",
  },
  {
    title: "Nova Spero",
    description:
      "As part of UCSD's Design for Development course, my team partnered with Nova Spero, a nonprofit organization dedicated to supporting refugee communities through education.",
    bullets:
      "Integrated Google Calendar for streamlined scheduling.| Developed tools for efficient carpool coordination.|Implemented Remind App integration for mass communication.|Organized Google Drive for structured data management.",
    image: "novaspero.png",
    alt: "Nova Spero project",
    role: "UX Designer & Developer",
    technologies: "Google Calendar, Remind App",
    contributions:
      "Designed motion detection logic, developed firmware, and optimized power consumption.",
    link: "https://novaspero.org",
  },
];

// Save sample data to localStorage if it doesn't already exist
if (!localStorage.getItem("projects")) {
  localStorage.setItem("projects", JSON.stringify(sampleData));
}

// Load data from localStorage
function loadLocalData() {
  const data = JSON.parse(localStorage.getItem("projects"));
  if (data) {
    renderProjectCards(data);
  } else {
    alert("No data found in localStorage!");
  }
}

// Load data from a remote server
function loadRemoteData() {
  fetch("https://my-json-server.typicode.com/alexisvvega/CSE134B_HW5/projects")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => renderProjectCards(data))
    .catch((error) => {
      console.error("Error fetching remote data:", error);
      alert("Failed to load remote data. Please try again later.");
    });
}

// Render project cards dynamically
function renderProjectCards(data) {
  const container = document.getElementById("projects-container");
  container.innerHTML = ""; // Clear existing cards

  data.forEach((project) => {
    const card = document.createElement("project-card");
    card.setAttribute("title", project.title);
    card.setAttribute("description", project.description);
    card.setAttribute("image", project.image);
    card.setAttribute("alt", project.alt);
    card.setAttribute("role", project.role);
    card.setAttribute("technologies", project.technologies);
    card.setAttribute("contributions", project.contributions);
    card.setAttribute("bullets", project.bullets); // Pass bullets as a string
    card.setAttribute("link", project.link);
    container.appendChild(card);
  });
}