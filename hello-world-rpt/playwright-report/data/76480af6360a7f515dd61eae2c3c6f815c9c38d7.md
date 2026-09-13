# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> has title
- Location: e2e/example.spec.ts:3:5

# Error details

```
Error: page.goto: Could not connect to the server.
Call log:
  - navigating to "http://localhost:4200/", waiting until "load"

```

# Test source

```ts
  1 | import { expect, test } from "@playwright/test";
  2 | 
  3 | test("has title", async ({ page }) => {
> 4 |   await page.goto("/");
    |              ^ Error: page.goto: Could not connect to the server.
  5 | 
  6 |   // Expect a title "to contain" a substring.
  7 |   await expect(page).toHaveTitle(/Angular Jenkins Hello World Reporting/);
  8 | });
  9 | 
```