export const SKILL_CATALOG = [
  {
    id: "typescript",
    label: "TypeScript / JavaScript",
    category: "Engineering",
    aliases: ["typescript", "javascript", "node.js", "node", "react", "frontend", "full-stack", "full stack"]
  },
  {
    id: "python",
    label: "Python",
    category: "Engineering",
    aliases: ["python", "fastapi", "flask", "django"]
  },
  {
    id: "api",
    label: "API Design",
    category: "Engineering",
    aliases: ["api", "apis", "rest", "microservice", "microservices", "backend service"]
  },
  {
    id: "rag",
    label: "RAG / Vector Search",
    category: "Applied AI",
    aliases: ["rag", "retrieval-augmented", "retrieval augmented", "vector", "embeddings", "vector database", "vector index"]
  },
  {
    id: "llm",
    label: "LLM Integration",
    category: "Applied AI",
    aliases: ["llm", "large language model", "openai", "claude", "prompt", "prompt orchestration", "function calling"]
  },
  {
    id: "evaluation",
    label: "Evaluation / Testing",
    category: "Quality",
    aliases: ["evaluation", "eval", "testing", "regression", "metrics", "a/b testing", "automated testing", "automated evaluation"]
  },
  {
    id: "cloud",
    label: "Cloud / Deployment",
    category: "Infrastructure",
    aliases: ["aws", "azure", "gcp", "cloud", "cloud ai", "docker", "kubernetes", "ci/cd", "deployment", "observability", "monitoring"]
  },
  {
    id: "data",
    label: "Data Pipelines",
    category: "Data",
    aliases: ["data pipeline", "ingest", "transform", "etl", "feature store", "postgresql", "redis", "sql"]
  },
  {
    id: "product",
    label: "Product Collaboration",
    category: "Product",
    aliases: ["product", "design", "stakeholder", "customer", "prototype", "poc", "mvp", "user", "user-centered", "workflow optimization", "technical communication", "decision support"]
  }
];

export const RESUME_PROFILE = {
  name: "Tirth Patel",
  targetRole: "Applied AI Product Engineer",
  evidence:
    "Python Java C++ C# Rust JavaScript TypeScript Go Kotlin Swift SQL Bash data structures algorithms Linux Git REST APIs distributed systems CI/CD multithreading parallel computing API-driven systems front-end development back-end development full-stack development machine learning deep learning neural networks generative AI large language models LLMs NLP predictive modeling feature engineering EDA PyTorch TensorFlow Scikit-learn LangChain React prompt engineering RAG OpenAI API vector databases vector search AI agents multi-agent systems MCP tools data pipelines ETL Apache Spark Databricks Docker Kubernetes Cloud AI automated evaluation workflows user-centered design workflow optimization technical communication cross-functional collaboration decision support systems Jupyter Notebook Google Colab GitHub VS Code Azure ML Airflow Nexus Battery Solutions embedded C++ firmware telemetry infrastructure battery management system real-time monitoring remote tuning ML-driven optimization operational decision support student IT assistant troubleshooting system reliability Career Fit Analyzer JavaScript Node.js automated testing resume job matching AI chatbot OpenAI API LangChain RAG vector search MCP tools REST API Spec-Driven Agentic Orchestration controller-worker architecture Parallel Processor pthread C++ multithreading",
  strengths: [
    "Broad programming foundation across Python, C++, JavaScript, TypeScript, SQL, Bash, and systems coursework",
    "Applied AI coursework and projects using LLMs, RAG, OpenAI API, LangChain, vector search, AI agents, and MCP tools",
    "Systems experience through embedded C++ firmware, telemetry architecture, Linux, multithreading, and parallel computing",
    "Product-adjacent communication through decision-support tools, troubleshooting workflows, and technical documentation"
  ]
};

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const countMatches = (text, aliases) => {
  const haystack = normalize(text);
  return aliases.reduce((count, alias) => {
    const needle = normalize(alias);
    if (!needle) return count;
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|\\s)${escaped}(\\s|$)`, "g");
    return count + (haystack.match(pattern) || []).length;
  }, 0);
};

export function extractSkillSignals(text, catalog = SKILL_CATALOG) {
  return catalog.map((skill) => ({
    ...skill,
    mentions: countMatches(text, skill.aliases),
    present: countMatches(text, skill.aliases) > 0
  }));
}

export function summarizeJobs(jobs, catalog = SKILL_CATALOG) {
  return catalog
    .map((skill) => {
      const jobHits = jobs.filter((job) => countMatches(`${job.title} ${job.description}`, skill.aliases) > 0);
      const totalMentions = jobs.reduce(
        (sum, job) => sum + countMatches(`${job.title} ${job.description}`, skill.aliases),
        0
      );

      return {
        id: skill.id,
        label: skill.label,
        category: skill.category,
        jobCount: jobHits.length,
        totalMentions,
        demandScore: jobs.length ? Math.round((jobHits.length / jobs.length) * 100) : 0,
        sources: jobHits.map((job) => job.company)
      };
    })
    .sort((a, b) => b.demandScore - a.demandScore || b.totalMentions - a.totalMentions);
}

export function analyzeGap(resumeText, jobs, catalog = SKILL_CATALOG) {
  const resumeSignals = extractSkillSignals(resumeText, catalog);
  const jobSummary = summarizeJobs(jobs, catalog);

  return jobSummary.map((skill) => {
    const resumeSignal = resumeSignals.find((item) => item.id === skill.id);
    const resumeMentions = resumeSignal?.mentions || 0;
    const gapLevel =
      skill.demandScore >= 60 && resumeMentions === 0
        ? "High"
        : skill.demandScore >= 40 && resumeMentions <= 1
          ? "Medium"
          : "Covered";

    return {
      ...skill,
      resumeMentions,
      gapLevel,
      recommendation: recommendAction(skill.id, gapLevel)
    };
  });
}

export function recommendProjectFocus(analysis) {
  const gaps = analysis.filter((item) => item.gapLevel !== "Covered");
  const ranked = gaps.length ? gaps : analysis;
  return ranked
    .slice()
    .sort((a, b) => {
      const severity = { High: 3, Medium: 2, Covered: 1 };
      return severity[b.gapLevel] - severity[a.gapLevel] || b.demandScore - a.demandScore;
    })
    .slice(0, 2);
}

function recommendAction(id, gapLevel) {
  if (gapLevel === "Covered") return "Keep this visible with concise project evidence.";

  const actions = {
    rag: "Turn existing RAG experience into measurable proof: retrieval examples, source-grounded outputs, and relevance checks.",
    llm: "Show LLM implementation quality through prompt controls, failure cases, and clear assumptions.",
    evaluation: "Add concrete eval cases, scoring criteria, and regression checks that prove AI behavior improves over time.",
    cloud: "Show production readiness with deployment notes, environment configuration, monitoring, and reliability tradeoffs.",
    python: "Connect Python ML work to an application workflow or service boundary.",
    data: "Show a clear pipeline from raw inputs to normalized analysis outputs and explain quality checks.",
    api: "Expose the core analyzer through a small API or modular function boundary.",
    product: "Frame each project around a specific user, decision, workflow, and measurable outcome.",
    typescript: "Keep the UI and analysis logic cleanly separated so the engineering work is easy to inspect."
  };

  return actions[id] || "Add a focused feature that creates visible proof for this skill.";
}
