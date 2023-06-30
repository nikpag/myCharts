# FRONTEND

The frontend is built on Next.js. A brief explanation of the directories involved:

- `components`: The React components that comprise the application. Some of them describe whole pages of the app (`page-components` directory), while the others are components that are reused throughout the application.
- `pages`: The routable pages of the application. We only have `index.js` in this directory, since we wanted to give a single-page experience to the user. This means the user only sees the root URL, and all the rendering is done inside this one page, hiding some implementation details.
- `public`: Public assets, such as the favicon and the app's logo.
- `utils`: Client-side logic and object definitions that get reused throughout the app.
