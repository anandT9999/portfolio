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
  { to: 1, dec: 0, suffix: 'M+', label: 'Files from a TB-scale share vectorised into OpenSearch' },
  { to: 400, dec: 0, suffix: '+', label: 'FastAPI endpoints on the platform I lead' },
  { to: 4, dec: 0, suffix: '', label: 'Environments I coordinate releases across' },
]

export const marquee = [
  ['FastAPI', true], ['RAG agents'], ['OCR pipelines', true], ['Vector search'], ['Node.js'],
  ['Revit integrations', true], ['Cloud-native on AWS'], ['System design', true],
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
  ['Now', 'FastAPI & Node.js services, TB-scale ingestion pipelines, Revit / Autodesk ACC integrations'],
  ['Core', 'Python · FastAPI · Node.js · PostgreSQL / pgvector · MongoDB · Redis · RabbitMQ'],
  ['Scale', 'Vectorising a TB-scale, 1M+ file share into OpenSearch: SQS, Celery, Lambda & ECS, Textract OCR with confidence filtering'],
  ['AI', 'Tool-calling agents on Claude, OpenAI and Gemini with RAG, streaming and LangGraph'],
  ['Lead', 'Sprint planning, code reviews and release coordination across DEV → QAT → PRE → PROD'],
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
    body: 'Celery for scheduled async work, message queues for real-time exchange, Databricks ETL tuning, schema and query optimisation.',
    chips: ['Celery', 'Queues', 'Databricks', 'SQL tuning'],
  },
  {
    n: 'L3', title: 'Cloud-native delivery', q: 'How does it run, deploy and roll back?',
    body: 'Docker and Kubernetes, AWS EC2 / S3 / RDS / Lambda, CI/CD with CodePipeline and CodeBuild.',
    chips: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
  {
    n: 'L4', title: 'Data at terabyte scale', q: 'What happens at a million files and terabytes of data?',
    body: 'Vectorising a TB-scale, 1M+ file share into OpenSearch. Files are routed by size through SQS to Lambda or ECS, text-layer PDFs keep their native text while scans go through Textract OCR with quality checks and confidence filtering, and a resumable reconciliation job keeps the index in sync with the live filesystem.',
    chips: ['OpenSearch', 'SQS', 'Lambda / ECS', 'Textract', 'OCR quality', 'pgvector'],
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
  label: '01 · AI platform · Arcitech', when: '2025 → now', title: 'Aufgang.ai',
  lede: 'An AI platform for NYC architecture firms: an AI assistant, Revit / Autodesk integration, NYC lot data, and search across every project file.',
  bullets: [
    'Vectorised a TB-scale, 1M+ file network share into OpenSearch, so every project file is searchable by meaning, not just by name.',
    'Large data handled efficiently: files are routed by size through SQS to Lambda or ECS workers, and a resumable reconciliation job keeps the index in sync without re-processing everything.',
    'OCR quality first: text-layer PDFs keep their native text, scans go through AWS Textract, and OCR quality checks with confidence filtering catch low-confidence text before it is embedded.',
    'Part of a platform with 400+ FastAPI endpoints across 41 modules on MongoDB, PostgreSQL / pgvector, OpenSearch, Redis and RabbitMQ.',
    'Migrated the Node.js / Express backend to FastAPI while keeping the API wire-compatible.',
  ],
  chips: ['FastAPI', 'OpenSearch', 'Textract', 'SQS', 'Lambda / ECS', 'Celery', 'pgvector', 'Node.js', 'Revit / ACC'],
  pipeline: [
    ['scan', 'TB-scale share · 1M+ files'],
    ['route', 'by size → SQS'],
    ['extract', 'native text layer when present'],
    ['ocr', 'Textract on Lambda / ECS for scans'],
    ['verify', 'quality checks · confidence filtering'],
    ['chunk + embed', 'semantic vectors'],
    ['index', 'OpenSearch'],
    ['reconcile ↺', 'resumable · keeps index = filesystem', true],
  ],
  modules: [
    ['AI assistant "Elise"', 'Tool-calling agent across several LLM providers with fallback, streaming over WebSocket / SSE, RAG over project files, RFI extraction from PDFs, chat memory and LLM cost tracking.'],
    ['Maps & lot data', 'NYC tax-lot lookup with GeoSearch and MapPLUTO, adjacency analysis and a Cesium 3D lot viewer.'],
    ['Revit / Autodesk', 'Revit plugin APIs, Autodesk Construction Cloud integration, drawing logs and project image search.'],
    ['Documents & file sync', 'Microsoft Graph sync of OneDrive files, previews for PDF, Word, PowerPoint and Excel, and the document search index.'],
    ['Auth & security', 'JWT with refresh tokens, one-time codes, Microsoft SSO, WebAuthn passkeys, role-based access, rate limiting, AWS Secrets Manager and Vault.'],
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
    chips: ['FastAPI', 'PostgreSQL', 'Pydantic', 'Streaming'],
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
          'Drive backend design and delivery across FastAPI services, AI agents and Revit integrations.',
          'Coordinate releases across DEV, QAT, PRE and PROD.',
        ],
      },
      {
        title: 'Senior Python Developer', when: 'Jun 2025 – Apr 2026',
        bullets: [
          'Vectorised a TB-scale, 1M+ file share into OpenSearch with Celery and SQS pipelines for OCR, chunking and embeddings.',
          'Kept large-data processing efficient and accurate: size-routed Lambda / ECS workers, native text for text-layer PDFs, Textract OCR for scans with quality checks and confidence filtering, and resumable reconciliation.',
          'Built an AI chat assistant on Claude, OpenAI and Gemini with tool calling, RAG and real-time streaming.',
          'Migrated the Node.js backend to FastAPI without breaking the API; integrated Autodesk ACC, a C# Revit plugin and Microsoft Graph.',
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
  ['Languages & frameworks', ['Python', 'FastAPI', 'Node.js', 'TypeScript', 'React', 'Flask', 'Django', 'C# (Revit)', 'Java']],
  ['Data & search', ['PostgreSQL', 'pgvector', 'MongoDB', 'OpenSearch', 'Redis', 'MySQL', 'Cassandra']],
  ['Pipelines & messaging', ['Celery', 'SQS', 'RabbitMQ', 'Textract OCR', 'Databricks', 'Kafka']],
  ['Cloud', ['AWS Lambda', 'ECS', 'S3', 'EC2', 'Textract', 'Secrets Manager', 'Docker', 'Kubernetes']],
  ['AI', ['AI agents', 'Tool calling', 'RAG', 'LangGraph', 'LangChain', 'Claude', 'OpenAI', 'Gemini / Vertex AI']],
  ['Integrations', ['Revit plugin (C#)', 'Autodesk ACC', 'Microsoft Graph', 'NYC open data', 'WebAuthn / SSO', 'Postman']],
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
