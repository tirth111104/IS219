# Can Recent Graduates Afford to Buy a House?

This repo is a **scrollytelling + spec-driven development** redesign of my housing-affordability project. The homepage now tells the story in scenes, linked content pages expand the ideas in a calmer format, and the live tool section still includes the chart, calculator, and chatbot.

## Live Site

- Homepage: [https://tirth111104.github.io/IS219/](https://tirth111104.github.io/IS219/)
- Why this project matters: [https://tirth111104.github.io/IS219/why-this-project.html](https://tp364.github.io/IS219/why-this-project.html)
- How the data and tool work: [https://tirth111104.github.io/IS219/how-it-works.html](https://tp364.github.io/IS219/how-it-works.html)
- How spec-driven development helped: [https://tirth111104.github.io/IS219/spec-driven-process.html](https://tp364.github.io/IS219/spec-driven-process.html)

## Assignment Focus

- Use a scrollytelling homepage instead of a plain app shell.
- Add linked content pages that feel connected to the story.
- Practice spec-driven development with durable context in files.

The process artifacts for this assignment live in:

- `docs/_references/teacher-context-pack.md`
- `docs/specs/`
- `docs/phases/`

## Current Status

As of `2026-04-25`, the assignment pass is complete:

- Story-driven homepage implemented in React.
- Three linked content pages added in `public/`.
- Shared visual system applied across the homepage and content pages.
- Interactive tool section preserved with the city chart, calculator, and chatbot.
- Build verified with `npm run build`.

## Stack

- Vite
- React
- TypeScript
- D3
- Express server for local development
- MCP SDK for dataset tools

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` when running the local server, or use the Vite preview/build workflow below.

```bash
npm run build
npm run preview
```

## Deployment

GitHub Pages is configured through the existing deploy script:

```bash
npm run deploy
```

The site publishes to:

- `https://tp364.github.io/IS219/`

## Features

### Scrollytelling homepage

The homepage uses a sticky visual panel and scroll-driven text steps to move through:

1. the housing pressure facing graduates
2. the project question
3. the data method
4. the evidence
5. the interactive tool
6. the spec-driven workflow

### Supporting content pages

Three standalone pages extend the story:

- `why-this-project.html`
- `how-it-works.html`
- `spec-driven-process.html`

Each page includes a return link back to the homepage flow.

### Interactive tool section

The homepage keeps the original project utility visible:

- `CityChart` compares price-to-income ratios by region and year.
- `Calculator` lets a visitor test income, down payment, and mortgage assumptions.
- `Chatbot` answers affordability questions using the same dataset and local-first logic.

## MCP Tooling

This project includes an MCP server that exposes the affordability dataset and core calculations as tools.

### Run the MCP server

```bash
npm run mcp
```

### Tools exposed

- `list_regions`
- `get_affordability_record`
- `affordability_summary`
- `calculate_monthly_payment`
- `price_to_income`

## Essential Question

Can a student or recent graduate realistically buy a median-priced home in their city within five years of graduation given typical starting salaries, a 20% down payment target, and prevailing mortgage rates?

## Claim

Most students cannot afford a median-priced home within five years after graduation without additional financial support or substantially above-average earnings.

## Data Notes

The project uses the processed dataset in `data/processed.json` and raw source data in `data/raw.csv`. Supporting notes remain in `data/notes.md`.
