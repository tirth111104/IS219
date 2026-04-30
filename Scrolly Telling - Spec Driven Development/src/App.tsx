import React, { useEffect, useRef, useState } from 'react';
import Calculator from './components/Calculator';
import Chatbot from './components/Chatbot';
import CityChart from './components/CityChart';
import { storySteps, supportPages } from './lib/storyContent';

type Slide = {
  id: string;
  variant: 'background' | 'standard';
  scrollSpan: number;
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function App() {
  const [reelPosition, setReelPosition] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const baseUrl = import.meta.env.BASE_URL;

  const slides: Slide[] = [
    {
      id: 'step-1',
      variant: 'background',
      scrollSpan: 2,
      eyebrow: 'Graduate Housing Story',
      title: 'Can a new graduate build a path to homeownership?',
      body:
        'This project reframes a housing-affordability app as a scrollytelling presentation. The story starts with pressure, sharpens into a claim, and then opens the live tools.',
      background: `${baseUrl}media/portfolio-board.png`,
      backgroundAlt: 'Portfolio mood board used as the opening presentation background.',
      links: [
        { href: '#step-2', label: 'Start the story' },
        { href: `${baseUrl}why-this-project.html`, label: 'Open the context page' }
      ]
    },
    ...storySteps.map((step, index) => ({
      id: `step-${index + 2}`,
      variant: 'background' as const,
      scrollSpan: 1.9,
      eyebrow: step.kicker,
      title: step.title,
      body: `${step.body} ${step.visualCopy}`,
      background: `${baseUrl}${step.image}`,
      backgroundAlt: step.imageAlt,
      bullets: step.points,
      quote: `${step.statLabel}: ${step.statValue}`,
      links: [
        { href: buildReturnLink(baseUrl, step.linkPath, `step-${index + 2}`), label: step.linkLabel }
      ]
    })),
    {
      id: 'step-8',
      variant: 'standard',
      scrollSpan: 1.7,
      eyebrow: 'Regular Content Pages',
      title: 'The story branches into slower reading pages',
      body:
        'Like the reference site, the scrollytelling homepage points into regular content pages that keep the same project voice while giving more room for detail.',
      background: `${baseUrl}media/museum-board.png`,
      backgroundAlt: 'Editorial board background for the content-page transition step.',
      links: supportPages.map((page) => ({
        href: buildReturnLink(baseUrl, page.path, 'step-8'),
        label: page.title
      }))
    },
    {
      id: 'step-9',
      variant: 'background',
      scrollSpan: 1.85,
      eyebrow: 'Spec-Driven Development',
      title: 'The process now lives in files, not just in prompts',
      body:
        'This redesign uses references, specs, and phases so the AI workflow stays controlled. That process is part of the assignment deliverable, not hidden background work.',
      background: `${baseUrl}media/systems-board.png`,
      backgroundAlt: 'Systems board used as the process step background.',
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
    let frameId = 0;

    const update = () => {
      const elements = stepRefs.current.filter((element): element is HTMLElement => Boolean(element));
      if (!elements.length) {
        return;
      }

      const viewportHeight = window.innerHeight;
      let nextPosition = 0;
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const progress = clamp((viewportHeight - rect.top) / rect.height, 0, 1);
        const contentProgress = clamp((progress - 0.15) / 0.55, 0, 1);

        if (index > 0 && rect.top <= viewportHeight) {
          const normalizedTop = clamp(rect.top, 0, viewportHeight);
          nextPosition = Math.max(nextPosition, index - normalizedTop / viewportHeight);
        }

        element.style.setProperty('--slide-progress', progress.toFixed(4));
        element.style.setProperty('--content-progress', contentProgress.toFixed(4));
      });

      setReelPosition((current) => (Math.abs(current - nextPosition) < 0.01 ? current : nextPosition));
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const activeSlide = Math.round(reelPosition);
  const visibleDots = Math.min(6, slides.length);
  const viewportOffset = (visibleDots - 1) / 2;
  const maxWindowStart = Math.max(0, slides.length - visibleDots);
  const clampedWindowStart = clamp(reelPosition - viewportOffset, 0, maxWindowStart);
  const renderedWindowStart = Math.floor(clampedWindowStart);
  const fractionalOffset = clampedWindowStart - renderedWindowStart;
  const markerOffset = reelPosition - clampedWindowStart;
  const visibleDotIndices = Array.from({ length: visibleDots }, (_, index) => renderedWindowStart + index);

  return (
    <div className="presentation-page">
      <aside className="slide-rail" aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}>
        <button type="button" className="slide-rail__status" onClick={() => window.location.assign(`#slide-${activeSlide + 1}`)}>
          <span>{String(activeSlide + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </button>
        <div className="slide-rail__window">
          <div
            className="slide-rail__track"
            style={{
              transform: `translate(-50%, calc(${fractionalOffset * -1} * var(--slide-rail-pitch)))`
            }}
          >
            {visibleDotIndices.map((index) => {
              const distance = Math.abs(index - reelPosition);
              const opacity = Math.max(0.42, 1 - distance * 0.18);
              const scale = Math.max(0.82, 1.12 - distance * 0.06);
              const isLocked = Math.abs(index - reelPosition) < 0.04;

              return (
                <a
                  key={slides[index].id}
                  href={`#slide-${index + 1}`}
                  className={`slide-rail__dot${isLocked ? ' is-active' : ''}`}
                  style={{ opacity, transform: `scale(${scale})` }}
                  aria-label={`Go to ${slides[index].title}`}
                />
              );
            })}
          </div>
          <div
            className="slide-rail__marker"
            aria-hidden="true"
            style={{
              transform: `translate(-50%, calc(${markerOffset} * var(--slide-rail-pitch)))`
            }}
          >
            <div className="slide-rail__active-dot" />
          </div>
        </div>
      </aside>

      <main className="slide-deck">
        {slides.map((slide, index) => (
          <section
            key={slide.id}
            id={`slide-${index + 1}`}
            data-step-index={index}
            ref={(element) => {
              stepRefs.current[index] = element;
            }}
            className={`slide-section slide-section--${slide.variant}${activeSlide === index ? ' is-active' : ''}`}
            style={
              {
                '--slide-span': slide.scrollSpan,
                '--slide-progress': 0,
                '--content-progress': 0
              } as React.CSSProperties
            }
            aria-labelledby={index === 0 ? 'scrolly-heading' : undefined}
          >
            <div className="slide-section__stage">
              <div className="slide-scene__image-wrap" aria-hidden="true">
                <img className="slide-scene__image" src={slide.background} alt="" />
              </div>
              <div className="slide-scene__scrim" />
              <div className="slide-section__content">
                <div className={`slide-panel slide-panel--${slide.variant}`}>
                  <p className="slide-section__ordinal">
                    {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </p>
                  <p className="slide-scene__eyebrow">{slide.eyebrow}</p>
                  <h1 className="slide-scene__title" id={index === 0 ? 'scrolly-heading' : undefined}>
                    {slide.title}
                  </h1>
                  <p className="slide-scene__body">{slide.body}</p>
                  {slide.bullets ? (
                    <ul className="slide-scene__list">
                      {slide.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {slide.quote ? <blockquote className="slide-scene__quote">{slide.quote}</blockquote> : null}
                  {slide.id === 'step-8' ? (
                    <div className="support-page-grid">
                      {supportPages.map((page) => (
                        <a
                          key={page.path}
                          href={buildReturnLink(baseUrl, page.path, 'slide-8')}
                          className="support-page-card"
                        >
                          <span className="support-page-card__eyebrow">{page.eyebrow}</span>
                          <strong className="support-page-card__title">{page.title}</strong>
                          <span className="support-page-card__summary">{page.summary}</span>
                        </a>
                      ))}
                    </div>
                  ) : null}
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
              </div>
            </div>
          </section>
        ))}

        <section className="tool-stage" id="interactive-lab" aria-labelledby="interactive-lab-heading">
          <div className="tool-stage__shell">
            <div className="tool-stage__intro">
              <p className="slide-scene__eyebrow">Interactive Lab</p>
              <h2 id="interactive-lab-heading">Test the claim with the actual project tools</h2>
              <p>
                The scrollytelling sequence ends in a working analysis space. Start with the regional chart, test your
                assumptions in the calculator, and then use the chatbot to ask direct affordability questions.
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
