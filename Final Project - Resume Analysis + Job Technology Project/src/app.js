import { JOB_DESCRIPTIONS } from "../data/jobDescriptions.js";
import { RESUME_PROFILE, analyzeGap, recommendProjectFocus } from "./analyzer.js";

const resumeInput = document.querySelector("#resume-input");
const jobList = document.querySelector("#job-list");
const analysisBody = document.querySelector("#analysis-body");
const focusList = document.querySelector("#focus-list");
const summary = document.querySelector("#summary");
const analyzeButton = document.querySelector("#analyze-button");

resumeInput.value = RESUME_PROFILE.evidence;

function renderJobs() {
  jobList.innerHTML = JOB_DESCRIPTIONS.map(
    (job) => `
      <article class="job-item">
        <div>
          <p class="kicker">${job.company}</p>
          <h3>${job.title}</h3>
          <p>Found ${job.dateFound}</p>
        </div>
        <a href="${job.source}" target="_blank" rel="noreferrer">Source</a>
      </article>
    `
  ).join("");
}

function renderAnalysis() {
  const analysis = analyzeGap(resumeInput.value, JOB_DESCRIPTIONS);
  const focus = recommendProjectFocus(analysis);
  const highOrMedium = analysis.filter((item) => item.gapLevel !== "Covered").length;
  const covered = analysis.filter((item) => item.gapLevel === "Covered").length;

  summary.innerHTML = `
    <span><strong>${covered}</strong> covered signals</span>
    <span><strong>${highOrMedium}</strong> growth areas</span>
    <span><strong>${JOB_DESCRIPTIONS.length}</strong> researched roles</span>
  `;

  analysisBody.innerHTML = analysis
    .map(
      (item) => `
        <tr>
          <td>
            <strong>${item.label}</strong>
            <span>${item.category}</span>
          </td>
          <td>${item.demandScore}%</td>
          <td>${item.resumeMentions}</td>
          <td><span class="badge ${item.gapLevel.toLowerCase()}">${item.gapLevel}</span></td>
          <td>${item.recommendation}</td>
        </tr>
      `
    )
    .join("");

  focusList.innerHTML = focus
    .map(
      (item) => `
        <article class="focus-card">
          <p class="kicker">${item.gapLevel} priority</p>
          <h3>${item.label}</h3>
          <p>${item.recommendation}</p>
        </article>
      `
    )
    .join("");
}

renderJobs();
renderAnalysis();
analyzeButton.addEventListener("click", renderAnalysis);
