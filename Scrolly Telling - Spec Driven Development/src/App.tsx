import React, { useEffect, useRef, useState } from 'react';
import Calculator from './components/Calculator';
import Chatbot from './components/Chatbot';
import CityChart from './components/CityChart';
import { storySteps, supportPages } from './lib/storyContent';

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  background: string;
  backgroundAlt: string;
  bullets?: string[];
  quote?: string;
  links?: Array<{
    href: string;
    label: string;
  }>;
};

function buildReturnLink(baseUrl: string, pagePath: string, stepId: string) {
  const returnTo = `${baseUrl}#${stepId}`;
  return `${baseUrl}${pagePath}?returnTo=${encodeURIComponent(returnTo)}`;
}

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const baseUrl = import.meta.env.BASE_URL;

  const slides: Slide[] = [
    {
      id: 'slide-1',
      eyebrow: 'Graduate Housing Story',
      title: 'Can a new graduate build a path to homeownership?',
      body:
        'This project reframes a housing-affordability app as a scrollytelling presentation. It starts with the pressure, moves into the method, and then opens the live tool section.',
      background: `${baseUrl}media/portfolio-board.png`,
      backgroundAlt: 'Portfolio mood board used as the opening presentation background.',
      links: [
        { href: '#slide-2', label: 'See why this project matters' },
        { href: `${baseUrl}why-this-project.html`, label: 'Open the context page' }
      ]
    },
    ...storySteps.map((step, index) => ({
      id: `slide-${index + 2}`,
      eyebrow: step.kicker,
      title: step.title,
      body: `${step.body} ${step.visualCopy}`,
      background: `${baseUrl}${step.image}`,
      backgroundAlt: step.imageAlt,
      bullets: step.points,
      quote: `${step.statLabel}: ${step.statValue}`,
      links: [
        { href: buildReturnLink(baseUrl, step.linkPath, `slide-${index + 2}`), label: step.linkLabel }
      ]
    })),
    {
      id: 'slide-8',
      eyebrow: 'Regular Content Pages',
      title: 'The story branches into slower reading pages',
      body:
        'Like the reference site, the homepage points into regular content pages that preserve the same visual language while giving more breathing room for method and reflection.',
      background: `${baseUrl}media/museum-board.png`,
      backgroundAlt: 'Editorial board background for the content-page transition slide.',
      links: supportPages.map((page) => ({
        href: buildReturnLink(baseUrl, page.path, 'slide-8'),
        label: page.title
      }))
    },
    {
      id: 'slide-9',
      eyebrow: 'Spec-Driven Development',
      title: 'The process now lives in files, not just in prompts',
      body:
        'This redesign uses references, specs, and phases so the AI workflow stays controlled. That process is part of the assignment deliverable, not hidden background work.',
      background: `${baseUrl}media/systems-board.png`,
      backgroundAlt: 'Systems board used as the process slide background.',
      bullets: [
        'References captured what to borrow from the teacher example.',
        'Specs defined the homepage, content pages, and visual system.',
        'Phases recorded progress and gave the build explicit exit checks.'
      ],
      links: [
        { href: `${baseUrl}spec-driven-process.html`, label: 'Read the process page' },
        { href: '#interactive-lab', label: 'Open the live tool section' }
      ]
    }
  ];

  useEffect(() => {
    const elements = slideRefs.current.filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (!visible.length) {
          return;
        }

        const nextIndex = Number(visible[0].target.getAttribute('data-slide-index'));
        if (Number.isFinite(nextIndex)) {
          setActiveSlide(nextIndex);
        }
      },
      {
        threshold: [0.45, 0.7]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="presentation-page">
      <aside className="slide-rail" aria-label="Slide progress">
        <div className="slide-rail__status">
          <span>{String(activeSlide + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
        <nav className="slide-rail__nav">
          {slides.map((slide, index) => (
            <a
              key={slide.id}
              href={`#${slide.id}`}
              className={`slide-rail__dot${activeSlide === index ? ' is-active' : ''}`}
              aria-label={`Go to ${slide.title}`}
            />
          ))}
        </nav>
      </aside>

      <main className="slide-deck">
        {slides.map((slide, index) => (
          <section
            key={slide.id}
            id={slide.id}
            data-slide-index={index}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            className="slide-scene"
          >
            <div className="slide-scene__image-wrap">
              <img className="slide-scene__image" src={slide.background} alt={slide.backgroundAlt} />
            </div>
            <div className="slide-scene__scrim" />
            <div className="slide-scene__content">
              <p className="slide-scene__eyebrow">{slide.eyebrow}</p>
              <h1 className="slide-scene__title">{slide.title}</h1>
              <p className="slide-scene__body">{slide.body}</p>
              {slide.bullets ? (
                <ul className="slide-scene__list">
                  {slide.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {slide.quote ? <blockquote className="slide-scene__quote">{slide.quote}</blockquote> : null}
              {slide.links ? (
                <div className="slide-scene__links">
                  {slide.links.map((link) => (
                    <a key={link.href} href={link.href} className="slide-link">
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ))}

        <section className="tool-stage" id="interactive-lab" aria-labelledby="interactive-lab-heading">
          <div className="tool-stage__shell">
            <div className="tool-stage__intro">
              <p className="slide-scene__eyebrow">Interactive Lab</p>
              <h2 id="interactive-lab-heading">Test the claim with the actual project tools</h2>
              <p>
                The presentation ends in a working analysis space. Start with the regional chart, test your assumptions
                in the calculator, and then use the chatbot to ask direct affordability questions in plain English.
              </p>
              <div className="tool-stage__highlights" aria-label="Tool highlights">
                <div className="tool-stage__highlight">
                  <span className="tool-stage__highlight-label">Compare</span>
                  <strong>Regions by year</strong>
                </div>
                <div className="tool-stage__highlight">
                  <span className="tool-stage__highlight-label">Adjust</span>
                  <strong>Income, rate, down payment</strong>
                </div>
                <div className="tool-stage__highlight">
                  <span className="tool-stage__highlight-label">Ask</span>
                  <strong>Questions in plain English</strong>
                </div>
              </div>
            </div>

            <div className="tool-stage__grid">
              <section className="tool-stage__panel tool-stage__panel--wide" aria-labelledby="lab-chart-heading">
                <div className="tool-stage__panel-head">
                  <p className="tool-stage__panel-kicker">Regional comparison</p>
                  <h3 id="lab-chart-heading">Where the pressure changes most</h3>
                </div>
                <CityChart />
              </section>

              <section className="tool-stage__panel" aria-labelledby="lab-calculator-heading">
                <div className="tool-stage__panel-head">
                  <p className="tool-stage__panel-kicker">Scenario testing</p>
                  <h3 id="lab-calculator-heading">Personalize the affordability math</h3>
                </div>
                <Calculator />
              </section>

              <section className="tool-stage__panel" aria-labelledby="lab-chat-heading">
                <div className="tool-stage__panel-head">
                  <p className="tool-stage__panel-kicker">Question-driven view</p>
                  <h3 id="lab-chat-heading">Interrogate the dataset directly</h3>
                </div>
                <Chatbot />
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
