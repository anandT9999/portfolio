// All portfolio content lives here, sourced from the resume and public GitHub.
export const profile = {
  first: 'Anand',
  last: 'Torati',
  role: 'Backend Engineer',
  location: 'Hyderabad, India',
  current: 'Project Lead · Arcitech',
  email: 'anandtorati@gmail.com',
  github: 'https://github.com/anandT9999',
  linkedin: 'https://www.linkedin.com/in/anand-torati9999/',
  resume: './Anand_Torati_Resume.pdf',
}

export const stats = [
  { to: 4.5, dec: 1, suffix: '', sup: 'yrs', label: 'Building Python backends' },
  { to: 1, dec: 0, suffix: 'M+', label: 'Files indexed for semantic search' },
  { to: 4, dec: 0, suffix: '', label: 'Environments I ship releases across' },
  { to: 85, dec: 0, suffix: '%', label: 'Test coverage, 40% fewer prod issues' },
]

export const marquee = [
  ['Async APIs', true], ['Event-driven pipelines'], ['Cloud-native on AWS'], ['Vector search', true],
  ['AI agents'], ['CI/CD'], ['System design', true],
]

export const timeline = [
  ['2018', 'B.Tech (Hons) CSE, Data Science, at LPU'],
  ['2022', 'Associate Software Engineer at iLink Digital'],
  ['2024', 'Software Engineer at Amunik'],
  ['2025', 'Senior Python Developer at Arcitech'],
  ['2026', 'Project Lead, Aufgang at Arcitech'],
  ['Next', 'Backend architecture', true],
]

export const tldr = [
  ['Role', 'Project Lead at Arcitech (previously Senior Python Developer)'],
  ['Core', 'Python · FastAPI · PostgreSQL / pgvector · MongoDB · Redis'],
  ['Scale', 'SQS / Kafka / Celery pipelines, Lambda & ECS workers, OpenSearch'],
  ['AI', 'LLM agents with LangChain, OpenAI, Claude, Gemini; vector search'],
  ['Ship', 'AWS CodeBuild / CodeDeploy, Docker, Kubernetes; DEV → QAT → PRE → PROD'],
  ['Also', 'Java, C# (Revit plugin), React'],
  ['Next', 'System design & backend architecture'],
]

export const journey = [
  {
    n: 'L1', title: 'Endpoints', q: 'Does the API work and stay correct?',
    body: 'REST APIs in FastAPI and Flask, Pydantic validation, secure PostgreSQL CRUD, 100+ tests at 85% coverage.',
    chips: ['FastAPI', 'Flask', 'Pydantic', '100+ tests'],
  },
  {
    n: 'L2', title: 'Data in motion', q: 'How do services talk without blocking each other?',
    body: 'Kafka streaming for real-time exchange, Celery for scheduled async work, Databricks ETL tuning, schema and query optimisation.',
    chips: ['Kafka', 'Celery', 'Databricks', 'SQL tuning'],
  },
  {
    n: 'L3', title: 'Cloud-native delivery', q: 'How does it run, deploy and roll back?',
    body: 'Docker and Kubernetes, AWS EC2 / S3 / RDS / Lambda, CI/CD with CodePipeline, CodeBuild and CodeDeploy.',
    chips: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
  {
    n: 'L4', title: 'Distributed pipelines', q: 'What happens at a million files?',
    body: 'Size-routed OCR through SQS to Lambda or ECS, skipping OCR on text-layer PDFs to cut cost, embeddings for semantic search, and a resumable reconciliation job keeping OpenSearch in sync.',
    chips: ['SQS', 'Lambda / ECS', 'OpenSearch', 'pgvector'],
  },
  {
    n: 'L5', title: 'Ownership', q: 'How does a team ship it safely?',
    body: 'Leading the team: sprint planning, code reviews, backend design decisions and releases across DEV, QAT, PRE and PROD.',
    chips: ['Tech lead', 'Code review', 'Release mgmt'],
  },
  {
    n: 'L6', title: 'System design & architecture', q: 'What should the system look like before anyone writes code?',
    body: "What I'm studying and applying now:", next: true,
    chips: ['Scalability patterns', 'Caching strategies', 'Event-driven design', 'Idempotency & retries', 'Data partitioning', 'Observability', 'Trade-off docs'],
  },
]

export const feature = {
  label: '01 · AI platform · Arcitech', when: '2025 → now', title: 'Aufgang',
  lede: 'An AI-enabled platform for an architecture firm: projects, chatbot, building-code compliance, Revit / ACC integration and file search.',
  bullets: [
    'Async FastAPI services on PostgreSQL (asyncpg) and MongoDB (Motor / Beanie) for projects, profiles and file sync.',
    'Metadata scanning and vectorisation over a 1M+ file network share, with size-routed OCR via SQS to Lambda or ECS.',
    'Agent-based chatbot and building-code compliance checks with OpenAI, Claude and Gemini.',
    'Autodesk Construction Cloud (OAuth) sync and submit-and-poll endpoints for a C# Revit plugin; Microsoft Graph mail search.',
    'Deployed on AWS with CodeBuild / CodeDeploy across four environments.',
  ],
  chips: ['FastAPI', 'PostgreSQL', 'MongoDB', 'SQS', 'Lambda', 'ECS', 'OpenSearch', 'LLMs'],
  pipeline: [
    ['scan', 'file share · 1M+ files'],
    ['route', 'by size → SQS'],
    ['ocr', 'Lambda / ECS · skipped for text-layer PDFs'],
    ['chunk + embed', 'semantic vectors'],
    ['index', 'OpenSearch'],
    ['reconcile ↺', 'resumable · keeps index = filesystem', true],
  ],
}

export const projects = [
  {
    label: '02 · AIOps · ISOutsource', when: '2023 – 2024', title: 'BEAK',
    body: 'An AI-powered AIOps platform for IT operations automation, risk mitigation and infrastructure monitoring.',
    bullets: [
      'Built and optimised FastAPI services with PostgreSQL and Kafka streaming.',
      'Pydantic validation and secure CRUD to improve data integrity.',
      'Automated data collection with BeautifulSoup scraping.',
    ],
    chips: ['FastAPI', 'Kafka', 'PostgreSQL', 'Pydantic'],
  },
  {
    label: '03 · Data tooling · AECOM', when: '2022 – 2023', title: 'Database Migration Tool',
    body: 'A Flask tool that automates schema mapping and data conversion across database formats.',
    bullets: [
      'Migration workflow on SQLAlchemy ORM to preserve data integrity.',
      'Celery for scheduled, asynchronous tasks, improving scalability.',
    ],
    chips: ['Flask', 'SQLAlchemy', 'Celery'],
  },
]

export const repos = [
  ['Vendor Management System', 'Vendor profiles, purchase orders and computed performance metrics', 'Django REST', 'Vendor-Management-System-with-Performance-Metrics'],
  ['Book Review API', 'RESTful book review service', 'FastAPI', 'FastAPI-Development'],
  ['Fitness Studio Booking API', 'Booking API for a fitness studio', 'Python', 'Fitness-Studio-Booking-API'],
  ['Reminder API', 'Scheduled reminders with pluggable SMS / email channels', 'Flask', 'flask-reminder-api'],
]

export const jobs = [
  {
    when: 'Jun 2025 – Present', current: true, company: 'Arcitech', sub: 'arcitech.ai',
    roles: [
      {
        title: 'Project Lead, Aufgang', when: 'Apr 2026 – Present',
        bullets: [
          'Lead the engineering team through sprint planning, task allocation, code reviews and stakeholder coordination.',
          'Drive backend design and delivery across FastAPI services, AI and Revit integrations, and AWS releases.',
          'Coordinate releases across DEV, QAT, PRE and PROD.',
        ],
      },
      {
        title: 'Senior Python Developer', when: 'Jun 2025 – Apr 2026',
        bullets: [
          'Designed and built async FastAPI services on PostgreSQL and MongoDB for projects, user profiles and file sync.',
          'Built Celery and SQS pipelines for OCR, chunking, embeddings and OpenSearch indexing over a 1M+ file share.',
          'Developed the agent-based chatbot and building-code compliance checks with OpenAI, Claude and Gemini.',
          'Integrated Autodesk Construction Cloud, a C# Revit plugin and Microsoft Graph.',
        ],
      },
    ],
  },
  {
    when: 'May 2024 – Jun 2025', company: 'Amunik Private Limited', sub: 'Software Engineer',
    bullets: [
      'Built and tested REST APIs with Flask and Postman; developed responsive React.js interfaces on top.',
      'Set up DigitalOcean pipelines automating build, test and deployment.',
      'Designed scalable schemas and resolved SQL performance issues to improve query efficiency.',
      'Built operational reports and Tableau executive dashboards.',
    ],
  },
  {
    when: 'Jan 2022 – Apr 2024', company: 'iLink Digital', sub: 'Associate Software Engineer',
    bullets: [
      'Built REST APIs with FastAPI and Flask on PostgreSQL, MySQL and Kafka for real-time data exchange.',
      'Deployed on AWS EC2, S3, RDS and Lambda with CodePipeline / CodeBuild; containerised with Docker and Kubernetes.',
      'Wrote 100+ tests at 85% coverage, cutting production issues by 40%.',
      'Optimised ETL processes and tuned Databricks pipelines; gathered requirements with ISOutsource and AECOM.',
    ],
  },
]

export const stack = [
  ['Languages & frameworks', ['Python', 'FastAPI', 'Flask', 'Django', 'PySpark', 'Java', 'C#', 'React.js']],
  ['Databases', ['PostgreSQL', 'pgvector', 'MySQL', 'MongoDB', 'Redis', 'Cassandra', 'SQLite']],
  ['Data & messaging', ['Kafka', 'KSQL', 'Kafka Connect', 'Celery', 'SQS', 'Databricks', 'Avro', 'Protobuf']],
  ['Cloud & DevOps', ['AWS EC2', 'S3', 'RDS', 'Lambda', 'ECS', 'Textract', 'CodePipeline', 'CodeDeploy', 'Docker', 'Kubernetes']],
  ['AI & search', ['AI agents', 'LangChain', 'OpenAI', 'Claude', 'Gemini / Vertex AI', 'OpenSearch', 'Vector search']],
  ['Integrations & tools', ['Autodesk ACC / Revit', 'Microsoft Graph', 'Postman', 'Power BI', 'Tableau', 'GitHub']],
]

export const certs = [
  ['Microsoft Certified: Power BI Data Analyst Associate', 'PL-300'],
  ['Microsoft Certified: Azure Fundamentals'],
  ['Databricks Lakehouse Fundamentals'],
]

export const education = [
  ['B.Tech (Hons) Computer Science, Data Science', 'Lovely Professional University · 2018 – 2022'],
  ['M.P.C., 97.1%', 'Sasi Junior College · 2016 – 2018'],
]
