# Engineering Review — Momentum Logistics

## Scope
Review of the Momentum Logistics web application with focus on functional quality, automation, accessibility, performance, maintainability, CI/CD, and production readiness.

## Findings

### Functional & Regression
1. Automated regression coverage was initially absent for major application workflows.
2. Comprehensive Playwright coverage was required across the application's major routes.
3. Regression execution was not previously centralized into a single automated command.
4. Business modules require repeatable automated verification after changes.
5. Route-level navigation requires automated regression coverage.

### Accessibility
6. Critical accessibility violation: buttons without discernible accessible names were detected.
7. Serious accessibility violation: insufficient color contrast was detected.
8. Search/placeholder text contains low-contrast elements.
9. Secondary dashboard text contains contrast issues.
10. Accessibility auditing was not previously integrated into the application's test suite.
11. WCAG 2A/2AA automated auditing should be maintained as part of regression testing.

### Performance
12. Performance testing required a dedicated load-testing tool.
13. k6 was added for automated performance testing.
14. A 50-VU load profile was executed against the deployed application.
15. The test generated 3,880 HTTP requests.
16. HTTP failure rate was 0%.
17. p95 HTTP response time was 103.05 ms.
18. All 7,760 automated performance checks passed.
19. Performance thresholds were defined for HTTP failure rate and p95 response time.
20. Performance evidence is now stored as machine-readable JSON.

### CI/CD
21. GitHub Actions automation was added for Playwright execution.
22. CI installs dependencies using npm ci.
23. CI installs the required Playwright browser dependencies.
24. CI executes the automated Playwright regression suite.
25. Playwright reports are uploaded as CI artifacts.
26. Tests execute automatically on pushes to main.
27. Tests execute automatically on pull requests targeting main.

### Test Automation
28. Playwright was selected for browser-level end-to-end automation.
29. The regression suite contains 136 automated tests.
30. Tests are configured for repeatable execution.
31. Failure screenshots are enabled.
32. Failure videos are enabled.
33. Failure traces are enabled.
34. Automated test evidence is retained through Playwright reports.

### Tooling & Quality Gates
35. npm dependency auditing showed no vulnerabilities during dependency installation.
36. Lighthouse was executed against the deployed application.
37. Lighthouse generated an HTML audit report.
38. Accessibility findings require remediation before claiming full WCAG compliance.
39. Security testing with OWASP ZAP was not executed because Docker and Java were unavailable in the environment.
40. No separate backend/API implementation was identified in the reviewed repository, so API testing was not fabricated.

## Priority Remediation

### High Priority
- Fix critical button accessible-name violations.
- Fix serious color-contrast violations.
- Maintain automated regression execution in CI.
- Continue monitoring performance thresholds.

### Medium Priority
- Expand accessibility auditing across additional routes.
- Expand k6 scenarios beyond the homepage.
- Add security scanning when an appropriate runtime is available.

### Current Quality Evidence
- 136 Playwright tests passed.
- 50 VU k6 performance test passed.
- 0% HTTP failures.
- p95 response time: 103.05 ms.
- Accessibility audit identified actionable violations.
- Lighthouse HTML report generated.
- GitHub Actions CI configured.
## API Testing Assessment

No application API endpoints, backend implementation, Postman/Bruno collection, or OpenAPI/Swagger specification were identified in the reviewed repository. API tests were therefore not fabricated. API testing should be added when an actual backend/API contract is available.

### F-041 — RRR submission does not create a Job
- **Severity:** High
- **Status:** Confirmed
- **Evidence:** Automated Playwright test 	ests/hr-new-job-workflow.spec.ts passes while confirming that a newly submitted RRR does not appear in the Jobs module.
- **Impact:** HR cannot complete the expected New Job workflow from an RRR; submitted requests are not persisted/converted into Jobs.
- **Root cause:** RRR submission uses client-side toast/navigation behavior and there is no backend/database persistence or Job creation flow.
- **Recommendation:** Implement persistent RRR storage and an explicit RRR-to-Job creation workflow backed by the application API/database, then add an end-to-end test asserting the created Job persists after page reload.

