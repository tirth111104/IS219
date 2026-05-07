# Career Fit Analyzer

Career Fit Analyzer is a small professional demo project for the Resume Analysis + Job Technology final. It compares my current resume direction with real job descriptions for applied AI and software engineering roles, then identifies the skills I should develop next.

Target direction: Applied AI Product Engineer / Full-Stack AI Engineer.

## Why I Built This

The job descriptions I reviewed repeatedly asked for:

- full-stack engineering with TypeScript, React, Node.js, and APIs
- LLM integration, prompt workflows, and AI product features
- RAG, embeddings, vector indexes, and retrieval systems
- automated testing, evaluation, reliability, and documentation
- cloud/deployment awareness

My resume and portfolio already show React, TypeScript, Node.js, D3, OpenAI API/MCP coursework, data storytelling, and AI-assisted product thinking. The main underrepresented areas are RAG/vector-search workflows and evaluation practices for AI systems.

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

- Guidehouse AI Engineer (Full-Stack): https://swooped.co/job-postings/ai-engineer-full-stack-remote-guidehouse-10163
- Perplexity Full Stack Software Engineer - Applied AI: https://www.jobscroller.net/jobs/555398
- TEKsystems Full Stack AI Engineer: https://www.careercircle.com/jobs/all/all/usa/ga/alpharetta/67a0b304-790f-4b17-b9eb-ebb1adaaf78b
- Boeing Entry-Level Software Engineer: https://jobs.boeing.com/job/oklahoma-city/entry-level-software-engineer/185/93929137312

## AI Use

AI was used to compare role expectations, identify repeated missing skills, scope a realistic project, and refine documentation. The project remains intentionally honest: it does not claim production AI experience, but it creates a working and tested artifact that supports the next learning step.
