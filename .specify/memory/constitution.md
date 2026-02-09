<!--
  ============================================================================
  SYNC IMPACT REPORT
  ============================================================================
  Version Change: 0.0.0 → 1.0.0 (MAJOR: Initial constitution adoption)
  
  Modified Principles: N/A (initial creation)
  
  Added Sections:
  - Core Principles (7 principles)
  - Technology Stack & Constraints
  - Development Workflow & Quality Gates
  - Governance
  
  Removed Sections: N/A
  
  Templates Requiring Updates:
  - plan-template.md: ✅ Compatible (Constitution Check section present)
  - spec-template.md: ✅ Compatible (Requirements and Success Criteria align)
  - tasks-template.md: ✅ Compatible (Phase structure supports workflow)
  
  Follow-up TODOs: None
  ============================================================================
-->

# AEM Labs Elkin Constitution

## Core Principles

### I. Content-First Development (NON-NEGOTIABLE)

All development MUST start with content modeling before writing any code. The content structure is the contract between authors and developers.

**Requirements:**
- Every block MUST have a defined content model that specifies the expected HTML structure from the AEM backend
- Content changes MUST be evaluated for backward compatibility with existing authored pages
- Use the `content-driven-development` skill for ALL development tasks
- Test content MUST exist before implementation begins (use `drafts/` folder for local testing)

**Rationale:** Edge Delivery Services is content-centric; the markup delivered by aem.live defines what code can do. Understanding content structure prevents misaligned implementations.

### II. Performance Excellence (NON-NEGOTIABLE)

All code MUST maintain a Lighthouse score of 100 across all Core Web Vitals. Performance is not optional—it's the foundation of Edge Delivery Services.

**Requirements:**
- Follow the three-phase loading model: Eager → Lazy → Delayed
- Eager phase loads ONLY what is required for LCP (Largest Contentful Paint)
- No render-blocking resources in the critical path
- All blocks MUST be self-contained with lazy-loaded CSS/JS
- Cumulative Layout Shift (CLS) MUST be zero or near-zero
- All PRs MUST include preview links for PSI (PageSpeed Insights) checks

**Rationale:** Edge Delivery Services promises sub-second page loads; violating performance degrades the entire platform's value proposition.

### III. Vanilla JavaScript & CSS Standards

Use pure ES6+ JavaScript and CSS3 without transpilation or build steps for core functionality.

**Requirements:**
- Always include `.js` file extensions in imports
- Use ES6+ features (arrow functions, destructuring, template literals, async/await)
- Follow Airbnb ESLint rules (configured in repository)
- CSS MUST be mobile-first with defined breakpoints: 600px / 900px / 1200px
- All CSS selectors MUST be scoped to their block: `.{blockName} .selector`
- Tailwind CSS is ONLY permitted when explicitly configured or requested

**Rationale:** No build step ensures instant deployment through AEM Code Sync; vanilla code is debuggable in production without source maps.

### IV. Block Encapsulation

Each block MUST be a self-contained, independently testable unit with clear boundaries.

**Requirements:**
- Block files live in `blocks/{blockname}/{blockname}.js` and `{blockname}.css`
- Blocks MUST NOT depend on other block implementations (use shared utilities in `scripts/`)
- Blocks MUST handle their own responsive behavior
- Blocks MUST be accessible (ARIA labels, proper heading hierarchy, WCAG 2.1 AA)
- Never modify `scripts/aem.js` (core library)

**Rationale:** Blocks are the compositional units of AEM pages; tight coupling prevents reuse and creates fragile pages.

### V. Skills-Driven Development

All development work MUST follow the established skills workflow defined in `.skills/` directory.

**Requirements:**
- Run `./.agents/discover-skills` at conversation start to identify available skills
- Use `building-blocks` skill for block implementation patterns
- Use `testing-blocks` skill before any PR submission
- Use `docs-search` skill for AEM documentation queries
- Use `block-collection-and-party` skill for reference implementations
- Announce skill usage: "Using Skill: {Skill Name}"

**Rationale:** Skills codify expert knowledge and ensure consistent implementation across agents and developers.

### VI. Linting & Code Quality

All code MUST pass linting before commit. No exceptions.

**Requirements:**
- Run `npm run lint` before every commit
- Use `npm run lint:fix` to auto-fix issues when possible
- Follow Stylelint standard configuration for CSS
- Unix line endings (LF) required
- No trailing whitespace

**Rationale:** Consistent code style reduces cognitive load and merge conflicts; linting catches errors before they reach production.

### VII. Secure by Default

All code runs client-side on the public web. Security is everyone's responsibility.

**Requirements:**
- NEVER commit sensitive information (API keys, passwords, tokens)
- Use `.hlxignore` to prevent files from being served
- Follow Adobe security guidelines
- Regularly update dependencies
- Sanitize all user inputs (see `scripts/dompurify.min.js` for HTML sanitization)

**Rationale:** Client-side code is visible to everyone; any exposed secret is immediately compromised.

## Technology Stack & Constraints

### Language & Runtime
- **JavaScript**: ES6+ (no transpilation, no TypeScript in production code)
- **CSS**: CSS3 with custom properties, Tailwind CSS only when explicitly configured
- **HTML**: Semantic HTML5 generated by aem.live backend
- **Node.js**: v18.3.x or newer for tooling only

### Primary Dependencies
- **Edge Delivery Services**: aem.live backend (documentation at https://www.aem.live/)
- **AEM CLI**: `@adobe/aem-cli` for local development
- **Preact/HTM**: Available in `scripts/preact/` and `scripts/htm/` for reactive components

### Target Platform
- Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- Mobile-first responsive design
- AEM Cloud Service release 2024.8 or newer (>= 17465)

### Performance Goals
- Lighthouse score: 100 on all Core Web Vitals
- Time to LCP: < 2.5 seconds
- CLS: < 0.1
- No render-blocking resources

### Constraints
- No build steps for production code (transpilation, bundling, minification handled by CDN)
- No server-side rendering (Edge Delivery is static + client hydration)
- Preview link REQUIRED in all PRs for PSI validation

## Development Workflow & Quality Gates

### Local Development Process
1. Install dependencies: `npm install`
2. Start dev server: `npx -y @adobe/aem-cli up --no-open --forward-browser-logs`
3. Access at `http://localhost:3000`
4. Changes auto-reload

### Pre-Commit Quality Gates
- [ ] `npm run lint` passes with zero errors
- [ ] Block is responsive across all breakpoints
- [ ] Accessibility checked (heading hierarchy, ARIA labels)
- [ ] No console errors or warnings
- [ ] Content model documented if new block

### PR Requirements
- [ ] Feature branch with descriptive name
- [ ] Preview link included: `https://{branch}--aem-labs-elkin--elkinomnipro.aem.page/{path}`
- [ ] PSI checks pass (automated)
- [ ] Code reviewed by human
- [ ] Tests pass (if applicable)

### Environments
- **Local**: `http://localhost:3000` (uncommitted code + previewed content)
- **Preview**: `https://main--aem-labs-elkin--elkinomnipro.aem.page/` (main branch)
- **Live**: `https://main--aem-labs-elkin--elkinomnipro.aem.live/` (production)
- **Feature Preview**: `https://{branch}--aem-labs-elkin--elkinomnipro.aem.page/`

## Governance

This constitution supersedes all other development practices for this repository. All code contributions MUST comply with these principles.

### Amendment Process
1. Propose changes via PR with justification
2. Document impact on existing codebase
3. Update dependent templates if needed
4. Increment version according to semantic versioning

### Compliance Verification
- All PRs MUST verify compliance with Core Principles
- Violations require explicit justification in the Complexity Tracking section of plan.md
- When in doubt, consult AGENTS.md for authoritative guidance
- For AI agent issues, refer to https://www.aem.live/developer/ai-coding-agents

### Version Policy
- **MAJOR**: Backward-incompatible principle changes or removals
- **MINOR**: New principles or materially expanded guidance
- **PATCH**: Clarifications, wording improvements, typo fixes

**Version**: 1.0.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-09
