# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> has title
- Location: e2e/example.spec.ts:3:5

# Error details

```
Error: page.goto: NS_ERROR_CONNECTION_REFUSED
Call log:
  - navigating to "http://localhost:4200/", waiting until "load"

```

# Page snapshot

```yaml
- article [ref=e3]:
  - generic [ref=e6]:
    - heading "Unable to connect" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - text: Nightly can’t connect to the server at
      - strong [ref=e9]: localhost:4200
    - generic [ref=e10]:
      - heading "What can you do about it?" [level=3] [ref=e11]
      - list [ref=e12]:
        - listitem [ref=e13]: The site could be temporarily unavailable or too busy. Try again in a few moments.
        - listitem [ref=e14]: If you are unable to load any pages, check your computer’s network connection.
        - listitem [ref=e15]: If your computer or network is protected by a firewall or proxy, make sure that Nightly is permitted to access the web.
        - listitem [ref=e16]: If you are trying to load a local network page, please check that Nightly has been granted Local Network permissions in the macOS Privacy & Security settings.
    - button "Try Again" [ref=e19]
```

# Test source

```ts
  1 | import { expect, test } from "@playwright/test";
  2 | 
  3 | test("has title", async ({ page }) => {
> 4 |   await page.goto("/");
    |              ^ Error: page.goto: NS_ERROR_CONNECTION_REFUSED
  5 | 
  6 |   // Expect a title "to contain" a substring.
  7 |   await expect(page).toHaveTitle(/Angular Jenkins Hello World Reporting/);
  8 | });
  9 | 
```