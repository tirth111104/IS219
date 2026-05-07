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
    aliases: ["evaluation", "eval", "testing", "regression", "metrics", "a/b testing", "automated testing"]
  },
  {
    id: "cloud",
    label: "Cloud / Deployment",
    category: "Infrastructure",
    aliases: ["aws", "azure", "gcp", "cloud", "docker", "kubernetes", "ci/cd", "deployment", "observability"]
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
    aliases: ["product", "design", "stakeholder", "customer", "prototype", "poc", "mvp", "user"]
  }
];

export const RESUME_PROFILE = {
  name: "Tirth Patel",
  targetRole: "Applied AI Product Engineer",
  evidence:
    "React TypeScript Node.js OpenAI API MCP D3 Vite GitHub Pages data storytelling chatbot calculator documented data pipeline portfolio case studies product judgment AI workflow critique",
  strengths: [
    "React and TypeScript interfaces",
    "AI-assisted product workflow",
    "Data storytelling and visualization",
    "Clear documentation and presentation framing"
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
    rag: "Build a small retrieval workflow: ingest documents, rank relevant snippets, and explain the evidence used.",
    llm: "Add a reliable LLM-facing interface with prompt controls, transparent assumptions, and fallback behavior.",
    evaluation: "Write automated tests and simple evaluation cases that prove the system handles realistic inputs.",
    cloud: "Document deployment steps and add environment-based configuration for production readiness.",
    python: "Add a Python service or notebook only if the project truly needs ML/data processing.",
    data: "Show a clear data pipeline from source material to normalized analysis output.",
    api: "Expose the core analyzer through a small API or modular function boundary.",
    product: "Frame the project around a reviewer, user problem, and decision it helps make.",
    typescript: "Keep the UI and analysis logic cleanly separated so the engineering work is easy to inspect."
  };

  return actions[id] || "Add a focused feature that creates visible proof for this skill.";
}
