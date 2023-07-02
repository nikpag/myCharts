# FRONTEND

The frontend is built on Next.js. A brief explanation of the directories involved:

- `components`: The React components that comprise the application. Some of them describe whole pages of the app (`page-components` directory), while the others are components that are reused throughout the application.
- `pages`: The routable pages of the application. We only have `index.js` in this directory, since we wanted to give a single-page experience to the user. This means the user only sees the root URL, and all the rendering is done inside this one page, hiding some implementation details.
- `public`: Public assets, such as the favicon and the app's logo.
- `utils`: Client-side logic and object definitions that get reused throughout the app.

In more detail:

## Components

### Page components

- `AboutUs.js`: Describes the product, as well as pricing details.
- `Account.js`: Shows data about the currently signed-in user, such as available credits and number of charts.
- `Credits.js`: Allows the user to buy chart credits.
- `MyCharts.js`: Shows a list of the user's charts, where the user can see chart previews, and download his charts in png, pdf, svg or html form.
- `MyChartsLanding.js`: Landing page, shows some dummy chart previews and prompts the user to sign in.
- `NewChart.js`: Here, the user can download description templates for the different chart types, edit them, and upload them in order to create his own custom chart.
- `NewChartDone.js`: Shows a preview of the newly-created chart, and allows the user to save it to his account.
- `NewUser.js`: Shows up when the user is signing in for the first time, to make sure he wants his account info to be stored in the app's database.

### Other components

- `AccountItem.js`: Each piece of account info (chart credits, created charts, last login), is represented by this React component.
- `ChartCard.js`: Bootstrap card showing a specific chart's preview, its title and (optionally) it's price.
- `ChartComponent.js`: Given the chart's data and type, this component renders and interactive chart.js chart.
- `CreditsCard.js`: Bootstrap card that contains an amount of credits, as well as a "Buy" button.
- `ErrorModal.js`: Bootstrap modal element that shows up in case of an error. Examples of errors are:

	- Not enough credits
	- Chart template errors
	- File to be uploaded doesn't exist
- `Footer.js`: Page footer, with a link to the site's "About" page.
- `Header.js`: Page header, placed on the top part of the page, containing the app's logo.
- `SideHeader.js`: Same as above, but placed on the left side of the page.

## Pages

- `api/auth/[...nextauth.js]`: Dynamic route used when signing-in/out.
- `_app.js`: Next.js-specific page used to wrap all other routable pages. In our case, only one page, `index.js` is present, for the reasons explained above.
- `index.js`: The one actual page of the application. All pages are derived from this one through React conditional rendering.

## Public

- `favicon.ico`: App favicon
- `logo.png`: App logo

## Utils

- `chartCredits.js`: Exports a JSON object that maps chart types to chart credits.
- `chartTemplates.js`: Exports the chart description templates as CSV files ready to be downloaded, as well as JSON objects ready to be rendered.
- `chartToHTML.js`: Given a chart.js configuration object, it returns an HTML page that renders the desired chart. Used for implementing the "Download as HTML" button on the client side.
- `colorPalette.js`: Chart.js default color palette, used wherever backgroundColor needs to be specified in the chart description.
- `csvToJSON.js`: Using the CSV file uploaded by the user, as well as the desired chart's type, returns a JSON chart description that can be later used to render the chart on the frontend, or send it to the backend (for conversion to png, pdf or svg).
