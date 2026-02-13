// src/data/experimentsData.js

export const initialExperiments = [
  {
    id: 1,
    title: "Build Portfolio Site",
    problem: "Decide which frontend framework to use",
    solution: "Use React.js for its component-based architecture and ecosystem",
    category: "Frontend"
  },
  {
    id: 2,
    title: "API Integration",
    problem: "Connect backend API to frontend",
    solution: "Implement Axios for handling HTTP requests and centralize API calls",
    category: "Backend"
  },
  {
    id: 3,
    title: "Database Setup",
    problem: "Design database schema for user skills",
    solution: "Use a Many-to-Many relationship between Users and Skills tables",
    category: "Database"
  },
  {
    id: 4,
    title: "Security Best Practices",
    problem: "Implement JWT authentication",
    solution: "Store tokens in HTTP-only cookies to prevent XSS attacks",
    category: "Cybersecurity"
  },
  {
    id: 5,
    title: "Responsive Design",
    problem: "Ensure dashboard works on mobile and desktop",
    solution: "Apply CSS Grid and Flexbox with mobile-first media queries",
    category: "Frontend"
  },
  {
    id: 6,
    title: "Mock Data Loading",
    problem: "Load initial experiments from mock data",
    solution: "Created a centralized JS file to export a static array of objects",
    category: "Backend"
  },
  {
    id: 7,
    title: "Table Pagination",
    problem: "Add ability to scroll or paginate long lists",
    solution: "Integrated a custom pagination hook to slice data into pages",
    category: "Frontend"
  },
  {
    id: 8,
    title: "Validation Forms",
    problem: "Check required fields before saving",
    solution: "Used Yup library with Formik for schema-based validation",
    category: "Backend"
  },
  {
    id: 9,
    title: "Dark Mode",
    problem: "Toggle between light and dark themes",
    solution: "Utilized CSS Variables and LocalStorage to persist theme choice",
    category: "Frontend"
  }
];