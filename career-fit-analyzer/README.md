# Career Fit Analyzer

Career Fit Analyzer is a small professional demo project for the Resume Analysis + Job Technology final. It compares my current resume direction with real job descriptions for applied AI and software engineering roles, then identifies the skills I should develop next.

Hosted demo: https://tirth111104.github.io/IS219/career-fit-analyzer/

Target direction: Applied AI Product Engineer / Full-Stack AI Engineer.

## Why I Built This

The job descriptions I reviewed repeatedly asked for:

- applied AI product engineering with customer/product collaboration, pilots, prototypes, and deployment
- LLM integration through APIs, prompt engineering, agent development, tool-calling, and retrieval frameworks
- RAG, semantic retrieval, vector search, retrieval-augmented models, summarization, and context-aware reasoning
- AI evaluation through evaluation suites, evaluation pipelines, performance benchmarks, monitoring, and observability
- full-stack AI engineering with React, TypeScript, Node.js, Python, GraphQL/APIs, backend services, databases, and cloud infrastructure

My resume already shows strong alignment with the target direction: Python, JavaScript/TypeScript, REST APIs, LLMs, RAG, OpenAI API, LangChain, vector search, MCP tools, AI agents, multi-agent systems, embedded C++ firmware, telemetry infrastructure, Docker, Kubernetes, and automated evaluation workflows. The main underrepresented areas are not broad keyword gaps anymore. The stronger next proof areas are production evaluation depth, observability/reliability, deployment tradeoffs, and clearer applied product outcomes.

This project was chosen because it is realistic, relevant, and explainable in a five-minute presentation.

## Features

- Paste or edit resume evidence.
- Review the real job descriptions used for the analysis.
- Score employer demand by skill category.
- Compare demand against resume mentions.
- Recommend the best one or two skills to develop next.
- Keep the analysis logic separate from the browser UI.
- Validate the scoring behavior with automated tests.

## Run Locally

```bash
npm start
```

Then open:

```text
http://localhost:4173
```

The app can also be opened directly from `index.html`, but the local server is better for module loading.

## Run Tests

```bash
npm test
```

The tests use Node's built-in test runner, so no extra packages are required.

## Project Structure

```text
data/jobDescriptions.js   Real job descriptions used in the analysis
docs/                     Assignment notes, AI workflow, LinkedIn draft, presentation notes
src/analyzer.js           Core scoring and recommendation logic
src/app.js                Browser rendering and interaction
tests/analyzer.test.js    Automated tests
index.html                App shell
styles.css                Visual design
server.mjs                Tiny local static server
```

## Job Sources

- Anthropic Applied AI Engineer: https://job-boards.greenhouse.io/anthropic/jobs/5055488008
- Atomicwork Applied AI Engineer: https://job-boards.greenhouse.io/atomicwork/jobs/5073381008
- Scale AI Applied AI Engineer, Enterprise GenAI: https://job-boards.greenhouse.io/scaleai/jobs/4514173005
- Labelbox Full-Stack Engineer, AI Data Platform: https://job-boards.greenhouse.io/labelbox/jobs/5019254007

## AI Use

AI was used to compare role expectations, identify repeated missing skills, scope a realistic project, and refine documentation. The project remains intentionally honest: it does not claim production AI experience, but it creates a working and tested artifact that supports the next learning step.
