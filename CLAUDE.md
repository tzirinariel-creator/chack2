# CLAUDE.md — Project Guide for AI Assistants

## Project Overview

**Repository:** chack2
**Project:** "מוביל" — משחק החלטות אסטרטגי בדפדפן
**Owner:** tzirinariel-creator
**Tech stack:** HTML, CSS, JavaScript (vanilla — no frameworks)
**Language:** Hebrew (RTL)

A browser-based strategy/decision game where the player leads a small team through a survival journey. Each round presents a dilemma with meaningful choices that affect team resources (people, food, morale, supplies). The game runs 10 rounds.

## Repository Structure

```
chack2/
├── CLAUDE.md       # This file — AI assistant guide
├── index.html      # Main game page (entry point)
├── style.css       # All styling — earth/nature color palette, RTL
└── game.js         # Game logic — state, events, choices, rendering
```

## How to Run

Open `index.html` in any browser. No build step, no server needed.

## Architecture

### index.html
Three screens managed by toggling the `.active` class:
- `#start-screen` — intro and start button
- `#game-screen` — resource bar, event area, choices, results
- `#end-screen` — final stats and restart

### style.css
- CSS variables in `:root` for the color palette (earth tones: greens, sand, cream)
- RTL layout with `direction: rtl`
- Responsive grid for resources and stats
- Flash animations for resource changes

### game.js
- `state` object holds round number, resources, and used events
- `events` array contains all dilemmas with choices and effects
- Key functions: `getRandomEvent()`, `applyEffects()`, `startRound()`, `handleChoice()`, `endGame()`
- Game over conditions: no people, no food+morale, or survived 10 rounds

## Adding Content

To add a new event/dilemma, add an object to the `events` array in `game.js`:
```js
{
    title: "שם האירוע",
    description: "תיאור המצב...",
    choices: [
        {
            label: "שם הבחירה",
            desc: "תיאור קצר",
            result: "מה קורה אחרי הבחירה",
            effects: { food: -10, morale: 5 }
        }
    ]
}
```

## Conventions

- All user-facing text is in Hebrew
- Keep code vanilla JS — no frameworks or build tools
- Color palette: earth tones (see CSS variables)
- Game balance: effects should typically range from -20 to +25
- Each event should have 2-3 meaningful choices with real trade-offs

## Instructions for AI Assistants

- Always read relevant files before making changes
- Keep solutions simple — this is a learning project
- Maintain the Hebrew language for all UI text
- When adding events, ensure choices present genuine dilemmas (no "obviously correct" answer)
- Update this file when project structure changes
