
export interface TechTerm {
  id: string;
  term: string;
  category: string;
  description: string;
  longDescription?: string;
  examples?: string[];
  relatedTerms?: string[];
}

export const categories = [
  "Programming",
  "Web Development",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Databases",
  "Mobile Development",
];

export const techTerms: TechTerm[] = [
  {
    id: "1",
    term: "API",
    category: "Web Development",
    description: "Application Programming Interface - allows different software applications to communicate with each other.",
    longDescription: "An API (Application Programming Interface) defines the methods and data formats that applications can use to request and exchange information. APIs serve as bridges that enable different software systems to communicate and share functionality, regardless of how they were built or what programming languages they use. They abstract complex underlying code, allowing developers to use predefined functions rather than create them from scratch.",
    examples: [
      "RESTful APIs for web services",
      "JavaScript's fetch API for making HTTP requests",
      "Operating system APIs that allow applications to interact with hardware"
    ],
    relatedTerms: ["REST", "GraphQL", "Endpoint", "JSON"]
  },
  {
    id: "2",
    term: "HTML",
    category: "Web Development",
    description: "HyperText Markup Language - the standard markup language for creating web pages.",
    longDescription: "HTML (HyperText Markup Language) is the foundation of web content. It uses a system of tags to define elements on a webpage, creating the structure that browsers interpret and display. HTML elements represent content such as headings, paragraphs, images, links, and forms. Modern HTML5 introduced semantic elements like <header>, <footer>, and <article> that better describe their content purpose, improving accessibility and SEO.",
    examples: [
      "<h1>This is a heading</h1>",
      "<p>This is a paragraph.</p>",
      "<a href=\"https://example.com\">This is a link</a>"
    ],
    relatedTerms: ["CSS", "DOM", "Semantic HTML", "Web Browser"]
  },
  {
    id: "3",
    term: "CSS",
    category: "Web Development",
    description: "Cascading Style Sheets - styles and layouts for HTML documents.",
    longDescription: "CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. It defines how web pages look in terms of layout, colors, fonts, and responsive design. The 'cascading' nature refers to how styles can inherit and override each other based on specificity. CSS uses selectors to target HTML elements and apply property-value pairs that control their appearance. Modern CSS features like flexbox, grid, and custom properties (variables) have made complex layouts and theming more manageable.",
    examples: [
      "body { font-family: Arial; color: #333; }",
      ".container { display: flex; gap: 1rem; }",
      "@media (max-width: 768px) { .sidebar { display: none; } }"
    ],
    relatedTerms: ["HTML", "Responsive Design", "Flexbox", "CSS Grid"]
  },
  {
    id: "4",
    term: "JavaScript",
    category: "Programming",
    description: "A programming language that enables interactive web pages and is an essential part of web applications.",
    longDescription: "JavaScript is a versatile, high-level programming language that adds interactivity to websites and powers modern web applications. It runs in the browser (client-side) and can also run on servers (via Node.js). JavaScript is an event-driven language with first-class functions, meaning functions can be passed as arguments, returned from other functions, and assigned to variables. Modern JavaScript (ES6+) introduced features like arrow functions, destructuring, promises, and modules that have significantly improved developer experience.",
    examples: [
      "document.getElementById('button').addEventListener('click', () => alert('Clicked!'));",
      "const data = await fetch('https://api.example.com/data').then(res => res.json());",
      "const sum = (a, b) => a + b;"
    ],
    relatedTerms: ["DOM", "ES6", "Node.js", "Asynchronous Programming"]
  },
  {
    id: "5",
    term: "React",
    category: "Web Development",
    description: "A JavaScript library for building user interfaces, particularly single-page applications.",
    longDescription: "React is a declarative JavaScript library developed by Facebook for building user interfaces. It uses a component-based architecture where UI elements are encapsulated into reusable components that maintain their own state. React's virtual DOM efficiently updates only the necessary parts of the actual DOM, improving performance. React introduces JSX, a syntax extension that allows writing HTML-like code in JavaScript. The React ecosystem includes tools like React Router for navigation, Redux for state management, and Next.js for server-side rendering.",
    examples: [
      "function Welcome() { return <h1>Hello, world!</h1>; }",
      "const [count, setCount] = useState(0);",
      "<Button onClick={() => setVisible(!visible)}>Toggle</Button>"
    ],
    relatedTerms: ["JSX", "Components", "Hooks", "Virtual DOM"]
  },
  {
    id: "6",
    term: "Docker",
    category: "DevOps",
    description: "A platform for developing, shipping, and running applications in containers.",
    longDescription: "Docker is a platform that uses containerization technology to package applications and their dependencies together in isolated environments called containers. Unlike virtual machines, containers share the host system's kernel but have their own filesystem, CPU, memory, and process space, making them lightweight and portable. Docker enables the 'build once, run anywhere' approach, ensuring applications work consistently across different environments. Docker's ecosystem includes Docker Compose for multi-container applications and Docker Swarm for container orchestration.",
    examples: [
      "FROM node:14\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD [\"npm\", \"start\"]",
      "docker build -t myapp .",
      "docker run -p 3000:3000 myapp"
    ],
    relatedTerms: ["Container", "Kubernetes", "Microservices", "DevOps"]
  },
  {
    id: "7",
    term: "Machine Learning",
    category: "Machine Learning",
    description: "A field of AI that gives computers the ability to learn without being explicitly programmed.",
    longDescription: "Machine Learning (ML) is a subset of artificial intelligence that enables systems to learn and improve from experience without explicit programming. ML algorithms build mathematical models based on sample data (training data) to make predictions or decisions. Machine learning approaches include supervised learning (using labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error with rewards). Deep learning, a subset of ML using neural networks with multiple layers, has driven recent advances in image recognition, natural language processing, and game playing.",
    examples: [
      "Linear regression for predicting housing prices",
      "Neural networks for image classification",
      "Reinforcement learning for game AI"
    ],
    relatedTerms: ["Neural Network", "Deep Learning", "Supervised Learning", "Data Science"]
  },
  {
    id: "8",
    term: "Cloud Computing",
    category: "Cloud Computing",
    description: "The delivery of computing services over the internet (the cloud).",
    longDescription: "Cloud computing provides on-demand access to computing resources—servers, storage, databases, networking, software, and more—over the internet without direct active management by users. The main service models are Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Cloud computing offers benefits like scalability, cost-efficiency (pay-as-you-go), reliability through distributed systems, and accessibility from anywhere. Major cloud providers include AWS, Microsoft Azure, and Google Cloud Platform.",
    examples: [
      "Amazon Web Services (AWS) for hosting applications",
      "Google Drive for file storage",
      "Microsoft Office 365 for productivity tools"
    ],
    relatedTerms: ["IaaS", "PaaS", "SaaS", "Serverless"]
  },
  {
    id: "9",
    term: "SQL",
    category: "Databases",
    description: "Structured Query Language - used to communicate with and manipulate databases.",
    longDescription: "SQL (Structured Query Language) is a domain-specific language used for managing and querying relational databases. It allows users to define, manipulate, and control data in relational database management systems (RDBMS). SQL operations include selecting data, inserting new records, updating existing records, and deleting records. SQL also provides commands for defining database schemas, creating tables with specific column types, and establishing relationships between tables. Common RDBMS that use SQL include MySQL, PostgreSQL, SQLite, and Microsoft SQL Server.",
    examples: [
      "SELECT * FROM users WHERE age > 21;",
      "INSERT INTO products (name, price) VALUES ('Laptop', 999.99);",
      "CREATE TABLE customers (id INT PRIMARY KEY, name VARCHAR(100));"
    ],
    relatedTerms: ["Database", "RDBMS", "Normalization", "Indexing"]
  },
  {
    id: "10",
    term: "Git",
    category: "DevOps",
    description: "A distributed version control system for tracking changes in source code during software development.",
    longDescription: "Git is a distributed version control system that tracks changes to files, enabling multiple developers to work on projects simultaneously without conflicts. Unlike centralized version control systems, Git gives each developer a complete copy of the repository with full history, allowing work offline and providing built-in backup. Git's key concepts include commits (snapshots of changes), branches (divergent versions of code), merging (combining branches), and remote repositories (hosted versions of projects). Git has become the industry standard for source code management, with platforms like GitHub, GitLab, and Bitbucket built around it.",
    examples: [
      "git commit -m \"Fix navigation bug\"",
      "git push origin main",
      "git merge feature/login"
    ],
    relatedTerms: ["GitHub", "Version Control", "Branch", "Commit"]
  },
  {
    id: "11",
    term: "REST",
    category: "Web Development",
    description: "Representational State Transfer - an architectural style for designing networked applications.",
    longDescription: "REST (Representational State Transfer) is an architectural style for creating web services. RESTful APIs use HTTP requests to perform CRUD (Create, Read, Update, Delete) operations on resources, which are identified by URLs. REST principles include a client-server architecture, statelessness (each request contains all necessary information), cacheability, and a uniform interface. REST APIs typically use standard HTTP methods (GET, POST, PUT, DELETE) and return responses in formats like JSON or XML. This approach has become dominant for web APIs due to its simplicity, scalability, and alignment with web technologies.",
    examples: [
      "GET /api/users to retrieve user data",
      "POST /api/orders to create a new order",
      "DELETE /api/comments/123 to remove a comment"
    ],
    relatedTerms: ["API", "HTTP", "JSON", "Resource"]
  },
  {
    id: "12",
    term: "Blockchain",
    category: "Cybersecurity",
    description: "A distributed ledger technology that maintains a continuously growing list of records, called blocks.",
    longDescription: "Blockchain is a distributed ledger technology where data is stored in blocks that are linked using cryptography, forming an immutable chain. Each block contains transaction data, a timestamp, and a cryptographic hash of the previous block, making the chain resistant to modification. Blockchain operates on a peer-to-peer network where consensus mechanisms validate new blocks without requiring a central authority. While best known for powering cryptocurrencies like Bitcoin, blockchain technology has broader applications in supply chain management, digital identity, voting systems, and smart contracts that automatically execute when conditions are met.",
    examples: [
      "Bitcoin cryptocurrency transactions",
      "Ethereum smart contracts",
      "Supply chain tracking using blockchain"
    ],
    relatedTerms: ["Cryptocurrency", "Smart Contract", "Distributed Ledger", "Consensus Mechanism"]
  },
];

// Filter tech terms by search query
export const filterTerms = (terms: TechTerm[], query: string): TechTerm[] => {
  const lowercaseQuery = query.toLowerCase().trim();
  if (!lowercaseQuery) return terms;
  
  return terms.filter(term => 
    term.term.toLowerCase().includes(lowercaseQuery) || 
    term.description.toLowerCase().includes(lowercaseQuery) ||
    term.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Filter tech terms by category
export const filterByCategory = (terms: TechTerm[], category: string): TechTerm[] => {
  if (!category || category === "All") return terms;
  return terms.filter(term => term.category === category);
};

// Get tech term by ID
export const getTermById = (id: string): TechTerm | undefined => {
  return techTerms.find(term => term.id === id);
};

// Get related terms
export const getRelatedTerms = (term: TechTerm): TechTerm[] => {
  if (!term.relatedTerms || term.relatedTerms.length === 0) return [];
  
  return techTerms.filter(t => 
    term.relatedTerms?.includes(t.term) && t.id !== term.id
  ).slice(0, 3);
};
