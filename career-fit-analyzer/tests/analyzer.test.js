import test from "node:test";
import assert from "node:assert/strict";

import { analyzeGap, extractSkillSignals, recommendProjectFocus, summarizeJobs } from "../src/analyzer.js";

const jobs = [
  {
    company: "Example AI",
    title: "Full Stack AI Engineer",
    description: "Build React TypeScript apps with RAG, embeddings, OpenAI APIs, tests, Docker, and AWS."
  },
  {
    company: "Example Product",
    title: "AI Product Engineer",
    description: "Prototype LLM workflows, retrieval augmented generation, evaluation metrics, and customer-facing APIs."
  }
];

test("extractSkillSignals detects known resume evidence", () => {
  const signals = extractSkillSignals("React TypeScript Node OpenAI API testing");
  const typescript = signals.find((skill) => skill.id === "typescript");
  const llm = signals.find((skill) => skill.id === "llm");

  assert.equal(typescript.present, true);
  assert.equal(llm.present, true);
});

test("summarizeJobs ranks repeated employer demand", () => {
  const summary = summarizeJobs(jobs);
  const rag = summary.find((skill) => skill.id === "rag");
  const llm = summary.find((skill) => skill.id === "llm");

  assert.equal(rag.demandScore, 100);
  assert.equal(llm.demandScore, 100);
});

test("analyzeGap marks missing repeated job skills as high priority", () => {
  const analysis = analyzeGap("React TypeScript API testing", jobs);
  const rag = analysis.find((skill) => skill.id === "rag");

  assert.equal(rag.gapLevel, "High");
  assert.equal(rag.resumeMentions, 0);
});

test("recommendProjectFocus returns the strongest uncovered skills", () => {
  const analysis = analyzeGap("React TypeScript API testing", jobs);
  const focus = recommendProjectFocus(analysis);

  assert.equal(focus.length, 2);
  assert.ok(focus.some((skill) => skill.id === "rag"));
});
