# QA Strategy — Momentum Logistics

## 1. Objective
Ensure the Momentum Logistics application is reliable, functional, accessible, and performant through automated quality engineering.

## 2. Test Strategy

### Functional / E2E
- Tool: Playwright
- Coverage: 136 automated tests
- Scope: application routes and major business modules
- Execution: automated through npm / GitHub Actions
- Result: 136/136 tests passed

### Accessibility
- Tool: axe-core with Playwright
- Standard: WCAG 2A / 2AA
- Scope: application homepage
- Result: accessibility violations detected
- Findings include critical button naming issues and serious color-contrast issues.

### Performance
- Tool: k6
- Maximum load: 50 concurrent virtual users
- Requests: 3,880
- HTTP failure rate: 0%
- p95 response time: 103.05 ms
- Thresholds: passed

### Web Quality
- Tool: Lighthouse
- Scope: deployed application
- Evidence: performance/lighthouse-report.html

## 3. CI/CD
GitHub Actions automatically runs the Playwright test suite on pushes and pull requests targeting main.

## 4. Test Principles
- Automation-first
- Repeatable execution
- Regression coverage
- Evidence-based defect reporting
- Failures should be reproducible
- Quality checks should run continuously in CI

## 5. Known Risks
- Accessibility violations require remediation.
- No backend/API test suite was added because the reviewed repository does not expose a separate backend/API implementation.
- Security testing with OWASP ZAP was not executed because Docker and Java were unavailable in the test environment.

## 6. Evidence
- tests/
- performance/load-test.js
- performance/k6-results.json
- performance/accessibility-results.md
- performance/lighthouse-report.html
- .github/workflows/playwright.yml
