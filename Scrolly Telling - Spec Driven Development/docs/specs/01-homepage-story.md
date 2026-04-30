# Spec 01: Homepage Story

## Goal

Turn the existing housing-affordability project into a scrollytelling homepage that guides a visitor from the problem to the evidence to the interactive tool.

## Audience

- Instructor reviewing the assignment
- Classmates comparing approaches
- Visitors who need to understand the project before using the tool

## Required behavior

1. The page must open with a high-clarity hero that frames the question of graduate home affordability.
2. The main body must use step-based scrolling with a sticky visual panel or equivalent scene treatment.
3. Each step must advance a different part of the argument:
   - housing pressure
   - project question
   - evidence and method
   - key finding
   - what the tool does
   - what spec-driven development changed
4. The page must include clear links to supporting content pages.
5. The page must keep the existing project utility visible by exposing the affordability chatbot/tool on the homepage.

## Exit checks

- `npm run build` succeeds.
- The built homepage contains the scrollytelling narrative and at least three links to supporting pages.
