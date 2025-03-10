
import { TechTerm } from './types';

export const techTerms: TechTerm[] = [
  {
    id: "1",
    term: "API",
    category: "Web Development",
    description: "Application Programming Interface - allows different software applications to communicate with each other.",
    longDescription: "An API (Application Programming Interface) defines the methods and data formats that applications can use to request and exchange information. APIs serve as bridges that enable different software systems to communicate and share functionality, regardless of how they were built or what programming languages they use.",
    examples: ["RESTful APIs", "JavaScript's fetch API", "Operating system APIs"],
    relatedTerms: ["REST", "GraphQL", "Endpoint", "JSON"]
  },
  {
    id: "2",
    term: "HTML",
    category: "Web Development",
    description: "HyperText Markup Language - the standard markup language for creating web pages.",
    longDescription: "HTML (HyperText Markup Language) is the foundation of web content. It uses a system of tags to define elements on a webpage, creating the structure that browsers interpret and display.",
    examples: ["<h1>This is a heading</h1>", "<p>This is a paragraph.</p>"],
    relatedTerms: ["CSS", "DOM", "Semantic HTML", "Web Browser"]
  },
  {
    id: "3",
    term: "CSS",
    category: "Web Development",
    description: "Cascading Style Sheets - styles and layouts for HTML documents.",
    longDescription: "CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. It defines how web pages look in terms of layout, colors, fonts, and responsive design.",
    examples: ["body { font-family: Arial; color: #333; }", ".container { display: flex; gap: 1rem; }", "@media (max-width: 768px) { .sidebar { display: none; } }"],
    relatedTerms: ["HTML", "Responsive Design", "Flexbox", "CSS Grid"]
  },
  {
    id: "4",
    term: "JavaScript",
    category: "Programming",
    description: "A programming language that enables interactive web pages and is an essential part of web applications.",
    longDescription: "JavaScript is a versatile, high-level programming language that adds interactivity to websites and powers modern web applications.",
    examples: ["document.getElementById('button').addEventListener('click', () => alert('Clicked!'));", "const data = await fetch('https://api.example.com/data').then(res => res.json());", "const sum = (a, b) => a + b;"],
    relatedTerms: ["DOM", "ES6", "Node.js", "Asynchronous Programming"]
  },
  {
    id: "5",
    term: "React",
    category: "Web Development",
    description: "A JavaScript library for building user interfaces, particularly single-page applications.",
    longDescription: "React is a declarative JavaScript library developed by Facebook for building user interfaces.",
    examples: ["function Welcome() { return <h1>Hello, world!</h1>; }", "const [count, setCount] = useState(0);", "<Button onClick={() => setVisible(!visible)}>Toggle</Button>"],
    relatedTerms: ["JSX", "Components", "Hooks", "Virtual DOM"]
  },
  {
    id: "6",
    term: "Docker",
    category: "DevOps",
    description: "A platform for developing, shipping, and running applications in containers.",
    longDescription: "Docker is a platform that uses containerization technology to package applications and their dependencies together in isolated environments called containers.",
    examples: ["FROM node:14\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD [\"npm\", \"start\"]", "docker build -t myapp .", "docker run -p 3000:3000 myapp"],
    relatedTerms: ["Container", "Kubernetes", "Microservices", "DevOps"]
  },
  {
    id: "7",
    term: "Machine Learning",
    category: "Machine Learning",
    description: "A field of AI that gives computers the ability to learn without being explicitly programmed.",
    longDescription: "Machine Learning (ML) is a subset of artificial intelligence that enables systems to learn and improve from experience without explicit programming.",
    examples: ["Linear regression for predicting housing prices", "Neural networks for image classification", "Reinforcement learning for game AI"],
    relatedTerms: ["Neural Network", "Deep Learning", "Supervised Learning", "Data Science"]
  },
  {
    id: "8",
    term: "Cloud Computing",
    category: "Cloud Computing",
    description: "The delivery of computing services over the internet (the cloud).",
    longDescription: "Cloud computing provides on-demand access to computing resources—servers, storage, databases, networking, software, and more—over the internet without direct active management by users.",
    examples: ["Amazon Web Services (AWS) for hosting applications", "Google Drive for file storage", "Microsoft Office 365 for productivity tools"],
    relatedTerms: ["IaaS", "PaaS", "SaaS", "Serverless"]
  },
  {
    id: "9",
    term: "SQL",
    category: "Databases",
    description: "Structured Query Language - used to communicate with and manipulate databases.",
    longDescription: "SQL (Structured Query Language) is a domain-specific language used for managing and querying relational databases.",
    examples: ["SELECT * FROM users WHERE age > 21;", "INSERT INTO products (name, price) VALUES ('Laptop', 999.99);", "CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(100));"],
    relatedTerms: ["Database", "RDBMS", "Normalization", "Indexing"]
  },
  {
    id: "10",
    term: "Git",
    category: "DevOps",
    description: "A distributed version control system for tracking changes in source code during software development.",
    longDescription: "Git is a distributed version control system that tracks changes to files, enabling multiple developers to work on projects simultaneously without conflicts.",
    examples: ["git commit -m \"Fix navigation bug\"", "git push origin main", "git merge feature/login"],
    relatedTerms: ["GitHub", "Version Control", "Branch", "Commit"]
  },
  {
    id: "11",
    term: "REST",
    category: "Web Development",
    description: "Representational State Transfer - an architectural style for designing networked applications.",
    longDescription: "REST (Representational State Transfer) is an architectural style for creating web services.",
    examples: ["GET /api/users to retrieve user data", "POST /api/orders to create a new order", "DELETE /api/comments/123 to remove a comment"],
    relatedTerms: ["API", "HTTP", "JSON", "Resource"]
  },
  {
    id: "12",
    term: "Blockchain",
    category: "Cybersecurity",
    description: "A distributed ledger technology that maintains a continuously growing list of records, called blocks.",
    longDescription: "Blockchain is a distributed ledger technology where data is stored in blocks that are linked using cryptography, forming an immutable chain.",
    examples: ["Bitcoin cryptocurrency transactions", "Ethereum smart contracts", "Supply chain tracking using blockchain"],
    relatedTerms: ["Cryptocurrency", "Smart Contract", "Distributed Ledger", "Consensus Mechanism"]
  },
  {
    id: "13",
    term: "GraphQL",
    category: "Web Development",
    description: "A query language for APIs and a runtime for executing those queries with existing data.",
    longDescription: "GraphQL is a query language and server-side runtime for APIs that prioritizes giving clients exactly the data they request.",
    examples: ["query { user(id: 4) { name, email } }"],
    relatedTerms: ["API", "REST", "JSON", "Query"]
  },
  {
    id: "14",
    term: "Node.js",
    category: "Backend",
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.",
    longDescription: "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser.",
    examples: ["const http = require('http'); http.createServer((req, res) => res.end('Hello World')).listen(3000);"],
    relatedTerms: ["JavaScript", "Express", "npm", "Backend"]
  },
  {
    id: "15",
    term: "TypeScript",
    category: "Programming",
    description: "A superset of JavaScript that adds static typing to the language.",
    longDescription: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    examples: ["function greet(name: string): string { return `Hello, ${name}!`; }"],
    relatedTerms: ["JavaScript", "Static Typing", "Interface", "Generics"]
  },
  {
    id: "16",
    term: "Kubernetes",
    category: "DevOps",
    description: "An open-source platform for automating deployment, scaling, and management of containerized applications.",
    longDescription: "Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications.",
    examples: ["kubectl create deployment nginx --image=nginx"],
    relatedTerms: ["Container", "Docker", "Microservices", "Orchestration"]
  },
  {
    id: "17",
    term: "Redux",
    category: "Frontend",
    description: "A predictable state container for JavaScript apps, commonly used with React.",
    longDescription: "Redux is a predictable state container for JavaScript apps, often used with React.",
    examples: ["const store = createStore(reducer); store.dispatch(action);"],
    relatedTerms: ["React", "State Management", "Action", "Reducer"]
  },
  {
    id: "18",
    term: "PWA",
    category: "Web Development",
    description: "Progressive Web App - a type of application software delivered through the web, built using common web technologies.",
    longDescription: "Progressive Web Apps (PWAs) are web applications that use service workers, manifests, and other web-platform features in combination with progressive enhancement to give users an experience on par with native apps.",
    examples: ["Service workers for offline capability", "Web app manifest for home screen installation"],
    relatedTerms: ["Service Worker", "Web App Manifest", "Cache API", "Push Notifications"]
  },
  {
    id: "19",
    term: "CI/CD",
    category: "DevOps",
    description: "Continuous Integration and Continuous Delivery - practices of automating building, testing and deployment of applications.",
    longDescription: "CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development.",
    examples: ["GitHub Actions workflow", "Jenkins pipeline", "CircleCI configuration"],
    relatedTerms: ["DevOps", "Automation", "Testing", "Deployment"]
  },
  {
    id: "20",
    term: "SSR",
    category: "Web Development",
    description: "Server-Side Rendering - rendering a client-side web app on the server and sending a fully rendered page to the client.",
    longDescription: "Server-side rendering (SSR) is the process of rendering web pages on the server and sending the fully rendered HTML to the client.",
    examples: ["Next.js", "Nuxt.js", "Remix"],
    relatedTerms: ["CSR", "SEO", "Hydration", "Universal Rendering"]
  },
  {
    id: "21",
    term: "WebSockets",
    category: "Web Development",
    description: "A communication protocol providing full-duplex communication channels over a single TCP connection.",
    longDescription: "WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection.",
    examples: ["const socket = new WebSocket('ws://example.com/socket');", "socket.onmessage = (event) => console.log(event.data);"],
    relatedTerms: ["TCP", "Real-time", "Socket.IO", "Push Technology"]
  },
  {
    id: "22",
    term: "ORM",
    category: "Databases",
    description: "Object-Relational Mapping - a technique that allows you to query and manipulate data from a database using an object-oriented paradigm.",
    longDescription: "ORM (Object-Relational Mapping) is a programming technique for converting data between incompatible type systems using object-oriented programming languages.",
    examples: ["Sequelize", "Prisma", "TypeORM", "Hibernate"],
    relatedTerms: ["Database", "SQL", "Entity", "Repository Pattern"]
  },
  {
    id: "23",
    term: "JWT",
    category: "Cybersecurity",
    description: "JSON Web Token - an open standard for securely transmitting information between parties as a JSON object.",
    longDescription: "JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.",
    examples: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0"],
    relatedTerms: ["Authentication", "OAuth", "Token", "Payload"]
  },
  {
    id: "24",
    term: "Agile",
    category: "Programming",
    description: "An iterative approach to project management and software development that helps teams deliver value faster.",
    longDescription: "Agile is a time-boxed, iterative approach to software delivery that builds software incrementally from the start of the project, instead of trying to deliver the entire product at once near the end.",
    relatedTerms: ["Scrum", "Kanban", "Sprint", "User Story"]
  },
  {
    id: "25",
    term: "Assembly",
    category: "Programming",
    description: "Low-level programming language with a strong correspondence between the language and architecture's machine code instructions.",
    longDescription: "Assembly language is a low-level programming language in which there is a strong correspondence between the language's instructions and the architecture's machine code instructions.",
    relatedTerms: ["Machine Code", "Compiler", "CPU", "Low-level Programming"]
  },
  {
    id: "200",
    term: "Zero-day",
    category: "Cybersecurity",
    description: "A software vulnerability that is unknown to those who should be interested in mitigating it.",
    longDescription: "A zero-day (or 0-day) vulnerability is a computer-software vulnerability that is unknown to those who should be interested in mitigating the vulnerability (including the vendor of the target software).",
    relatedTerms: ["Vulnerability", "Exploit", "Patch", "Security"]
  }
];
