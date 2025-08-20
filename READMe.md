# idle-session-logout

A lightweight utility to automatically log users out after inactivity. Useful for security-sensitive apps.

## Installation

`
npm install idle-session-logout
`

Customizing the default logout time

By default the library logs users out after 30 minutes of inactivity (30 × 60 × 1000 = 1_800_000 ms). You can override this by passing a timeout option (in milliseconds) when you initialize the library.

## Usage

`import IdleSessionLogout from 'idle-session-logout';

const idle = new IdleSessionLogout({
  timeout: 30 * 60 * 1000,
  onTimeout: () => {
    alert("You were idle for 30 minutes.");
    window.location.href = '/login';
  }
});
idle.start();`

## Helpful helpers
If you prefer to specify time in minutes for readability, use a small helper:

`const minutes = m => m * 60 * 1000;

// 30 minutes (explicit)
IdleSessionLogout({
  timeout: minutes(30),
  onTimeout: () => { /* ... */ }
});

// 1 minute (for quick tests)
IdleSessionLogout({
  timeout: minutes(1),
  onTimeout: () => { /* ... */ }
});
``

## Recommended practices & tips

Default: 30 minutes (1_800_000 ms).
Units: always pass timeout in milliseconds.
Reasonable range: for security-sensitive apps consider 5–30 minutes; for less sensitive apps you may allow longer.
Testing: set the timeout to minutes(1) or 60000 ms during development to quickly verify behavior.
Warning UX: if you show a “you’ll be logged out soon” warning, trigger it before the timeout (e.g., 1 minute before) and allow the user to extend the session.
Resetting: make sure the library resets the inactivity timer on user activity (mouse, keyboard, touch). If you customize event handling, ensure you still reset the timer.
