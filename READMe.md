# idle-session-logout

[![npm version](https://img.shields.io/npm/v/idle-session-logout?label=npm)](https://www.npmjs.com/package/idle-session-logout) [![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

A tiny, dependency-free utility that automatically logs users out after inactivity — perfect for security-minded web apps.

---

## Table of contents

* [Why use this](#why-use-this)
* [Install](#install)
* [Usage](#usage)
* [Helpers](#helpful-helpers)
* [API](#api)
* [Recommended practices & tips](#recommended-practices--tips)
* [Contributing](#contributing)
* [License](#license)

---

## Why use this

* Minimal and focused — does one thing well.
* Tiny footprint, zero runtime dependencies.
* Easy to plug into any frontend (plain JS, React, Vue, etc.).

---

## Install

Single-line install command with quick-copy affordance (emoji shown as lightweight visual affordance):


```bash
# install from npm
npm install idle-session-logout
```




---

## Usage

```js
import IdleSessionLogout from 'idle-session-logout';

const idle = new IdleSessionLogout({
  timeout: 30 * 60 * 1000, // 30 minutes in ms
  onTimeout: () => {
    alert('You were idle for 30 minutes.');
    window.location.href = '/login';
  }
});

idle.start();
```

This example uses the default 30‑minute timeout. See helpers below for nicer time helpers.

---

## Helpful helpers

If you prefer minutes for readability, include a tiny helper:

```js
const minutes = (m) => m * 60 * 1000;

// 30 minutes (explicit)
const idle = new IdleSessionLogout({
  timeout: minutes(30),
  onTimeout: () => { /* ... */ }
});

// 1 minute (for quick tests)
const testIdle = new IdleSessionLogout({
  timeout: minutes(1),
  onTimeout: () => { /* ... */ }
});
```

---

## API

### new IdleSessionLogout(options)

`options` (object):

* `timeout` **(required)** — Number. milliseconds until timeout.
* `onTimeout` **(required)** — Function called when timeout occurs.
* `events` — Optional array of DOM events to listen for (defaults: `['mousemove','keydown','mousedown','touchstart']`).
* `warningBefore` — Optional number (ms) to fire a warning callback before the final timeout.
* `onWarning` — Optional function called when the warning is triggered.

### Instance methods

* `start()` — Start listening for activity and begin the timer.
* `stop()` — Stop listening and clear timers.
* `reset()` — Reset the inactivity timer (useful if you manually detect activity).

---

## Copy button for docs (example)

> This snippet is intended for docs sites (Docusaurus, VitePress, Next.js) that allow adding client-side JS. GitHub README pages **do not** run embedded JS — you'll still get the visual code block but not the interactive copy button on GitHub.

```html
<!-- simple copy button for a docs page -->
<div style="display:flex; gap:8px; align-items:center">
  <pre id="install-cmd">npm install idle-session-logout</pre>
  <button id="copy-btn" aria-label="Copy install command">📋 Copy</button>
</div>

<script>
  document.getElementById('copy-btn').addEventListener('click', async () => {
    const text = document.getElementById('install-cmd').innerText;
    try {
      await navigator.clipboard.writeText(text);
      // briefly show feedback
      const original = document.getElementById('copy-btn').innerText;
      document.getElementById('copy-btn').innerText = 'Copied!';
      setTimeout(() => (document.getElementById('copy-btn').innerText = original), 1200);
    } catch (err) {
      console.error('Copy failed', err);
      alert('Copy failed — please select and copy manually');
    }
  });
</script>
```

---

## Recommended practices & tips

* **Default:** 30 minutes (1\_800\_000 ms).
* **Units:** always pass `timeout` in milliseconds.
* **Reasonable ranges:**

  * security-sensitive apps: `5–30 minutes`.
  * less-sensitive apps: longer timeouts as appropriate.
* **Testing:** set `timeout` to `minutes(1)` or `60000` during local development to validate flows quickly.
* **Warning UX:** if you display a “You’ll be logged out soon” modal, trigger it before the timeout (e.g., `warningBefore = 60_000` for a 1-minute warning) and allow the user to extend the session.
* **Resetting:** make sure the library resets the inactivity timer on the activity events you care about (mouse, keyboard, touch). If you customize event handling, ensure you still call `reset()`.

---

## Contributing

Contributions welcome — please open issues or PRs. Keep PRs small and focused. If you add features, include tests and documentation updates.

---

## License

MIT © Silas T.

---
