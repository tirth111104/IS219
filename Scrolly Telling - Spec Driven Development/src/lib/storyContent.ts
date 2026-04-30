export type StoryStep = {
  kicker: string;
  title: string;
  body: string;
  points: string[];
  visualCopy: string;
  statLabel: string;
  statValue: string;
  image: string;
  imageAlt: string;
  linkPath: string;
  linkLabel: string;
};

export type SupportPage = {
  eyebrow: string;
  title: string;
  summary: string;
  path: string;
  image: string;
  imageAlt: string;
};

export const storySteps: StoryStep[] = [
  {
    kicker: 'The pressure',
    title: 'Starting adult life now means entering an expensive housing market',
    body: 'The emotional hook of this project is simple: new graduates are trying to plan a future in a market that often feels out of scale with their salaries.',
    points: [
      'Home prices, rents, and mortgage rates shape the decision before a person ever opens a spreadsheet.',
      'A scrollytelling homepage works well here because the project begins with a lived problem, not a table.'
    ],
    visualCopy: 'The story opens with the human pressure first so the data has a reason to matter.',
    statLabel: 'Narrative move',
    statValue: 'Problem before tool',
    image: 'media/tool-snapshot.png',
    imageAlt: 'A snapshot of the earlier version of the housing affordability tool.',
    linkPath: 'why-this-project.html',
    linkLabel: 'Read why this question matters'
  },
  {
    kicker: 'The question',
    title: 'The project narrows a broad anxiety into one testable claim',
    body: 'Instead of saying housing is hard in a vague way, the site asks whether a graduate could reach a median-priced home within five years under explicit assumptions.',
    points: [
      'That keeps the project arguable instead of generic.',
      'It also gives the tool a clear job: calculate, compare, and explain.'
    ],
    visualCopy: 'Scrollytelling works best when each scene sharpens the claim rather than repeating it.',
    statLabel: 'Target window',
    statValue: '5 years',
    image: 'media/portfolio-board.png',
    imageAlt: 'A portfolio reference board used to anchor the redesign visually.',
    linkPath: 'why-this-project.html',
    linkLabel: 'Open the project rationale'
  },
  {
    kicker: 'The method',
    title: 'The evidence comes from combining prices, income, and mortgage assumptions',
    body: 'The supporting logic is not magic. It is a compact system that merges regional housing prices, median incomes, and financing assumptions into readable affordability signals.',
    points: [
      'That makes the story credible enough to inspect instead of merely admire.',
      'It also gives the content pages something concrete to explain.'
    ],
    visualCopy: 'The sticky panel shifts from emotion to method so the visitor can trust what comes next.',
    statLabel: 'Inputs',
    statValue: 'Prices + incomes + rates',
    image: 'media/systems-board.png',
    imageAlt: 'A systems-oriented board that reinforces the method section of the story.',
    linkPath: 'how-it-works.html',
    linkLabel: 'See how the data layer works'
  },
  {
    kicker: 'The finding',
    title: 'Affordability is not one answer. It changes by metro and by assumption',
    body: 'The project does not force one dramatic conclusion. It shows that the answer depends on location, salary, rates, and down-payment discipline, which is exactly why the interactive layer matters.',
    points: [
      'The chart gives regional spread.',
      'The calculator lets a visitor test their own assumptions.'
    ],
    visualCopy: 'The visual state becomes more analytical once the story has earned that complexity.',
    statLabel: 'Interpretation',
    statValue: 'Compare, do not guess',
    image: 'media/museum-board.png',
    imageAlt: 'An editorial board image used as a visual bridge into the evidence section.',
    linkPath: 'how-it-works.html',
    linkLabel: 'Read the method page'
  },
  {
    kicker: 'The interface',
    title: 'The chatbot turns the dataset into a conversation',
    body: 'After the narrative setup, visitors can ask plain-English questions instead of decoding a rigid menu. That lowers the friction of exploring the data.',
    points: [
      'The local-first chatbot still works when the deployed site has no live server.',
      'That makes it a practical GitHub Pages feature, not just a nice local demo.'
    ],
    visualCopy: 'The story now ends at a useful interface instead of leaving the reader outside the tool.',
    statLabel: 'Interaction style',
    statValue: 'Plain-English prompts',
    image: 'media/tool-snapshot.png',
    imageAlt: 'A screenshot from the housing affordability project.',
    linkPath: 'how-it-works.html',
    linkLabel: 'Explore the tool details'
  },
  {
    kicker: 'The process',
    title: 'Spec-driven development made the redesign more deliberate',
    body: 'The assignment is not only about a prettier site. It is about directing AI with references, specs, phases, and explicit exit checks so the work stays under control.',
    points: [
      'The docs folder now records the reasoning that the chat history would otherwise lose.',
      'That makes the redesign easier to explain, verify, and extend.'
    ],
    visualCopy: 'This final scene names the process itself as part of the project outcome.',
    statLabel: 'Workflow shift',
    statValue: 'Docs before drift',
    image: 'media/systems-board.png',
    imageAlt: 'A systems image used to represent the spec-driven workflow.',
    linkPath: 'spec-driven-process.html',
    linkLabel: 'Read the process page'
  }
];

export const supportPages: SupportPage[] = [
  {
    eyebrow: 'Context page',
    title: 'Why this project matters',
    summary: 'A regular content page that expands the human problem behind the affordability question and explains why the scrollytelling homepage begins there.',
    path: 'why-this-project.html',
    image: 'media/tool-snapshot.png',
    imageAlt: 'Screenshot of the affordability project used in the context page.'
  },
  {
    eyebrow: 'Method page',
    title: 'How the data and tool work',
    summary: 'A calmer walkthrough of the dataset, the chart, the calculator, and the local-first chatbot behavior.',
    path: 'how-it-works.html',
    image: 'media/museum-board.png',
    imageAlt: 'An editorial board image used on the method page card.'
  },
  {
    eyebrow: 'Process page',
    title: 'How spec-driven development helped',
    summary: 'A short explanation of how references, specs, phases, and build checks focused the redesign and made the AI workflow steadier.',
    path: 'spec-driven-process.html',
    image: 'media/systems-board.png',
    imageAlt: 'A systems-oriented board image used on the process page card.'
  }
];
