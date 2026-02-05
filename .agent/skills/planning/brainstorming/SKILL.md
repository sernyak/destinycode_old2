---
name: brainstorming
description: "Process for transforming ideas into designs through dialogue and iterative validation. MUST be used before creative work."
---

# Brainstorming Ideas Into Designs

## Overview
Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design in small sections (200-300 words), checking after each section whether it looks right so far.

## The Process

### 1. Understanding the idea
- Check out the current project state first (files, docs, recent commits).
- Ask questions one at a time to refine the idea.
- Prefer multiple choice questions when possible.
- **Only one question per message** - break complex topics into multiple steps.
- Focus on understanding: purpose, constraints, success criteria.

### 2. Exploring approaches
- Propose 2-3 different approaches with trade-offs.
- Present options conversationally with your recommendation and reasoning.
- Lead with your recommended option and explain why.

### 3. Presenting the design
- Present the design in sections (200-300 words).
- Ask after each section whether it looks right so far.
- Cover: architecture, components, data flow, error handling, testing.
- Be ready to go back and clarify if something doesn't make sense.

## After the Design

### Documentation
- Write the validated design to the project's planning directory (e.g., `docs/plans/`).
- Commit the design document to version control.

### Implementation Setup
- Ask: "Ready to set up for implementation?"
- Create an isolated workspace (e.g., via git worktrees) to avoid pollution.
- Create a detailed implementation plan.

## Key Principles
- **One question at a time** - Don't overwhelm with multiple questions.
- **YAGNI ruthlessly** - Remove unnecessary features from all designs.
- **Explore alternatives** - Always propose 2-3 approaches before settling.
- **Incremental validation** - Present design in sections, validate each.
- **Be flexible** - Go back and clarify when something doesn't make sense.
