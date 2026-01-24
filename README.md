# U2U - Ukrainian YouTube Channels Platform

U2U is a web platform for finding Ukrainian-language YouTube channels. The project has a catalog of Ukrainian content creators sorted by categories.

## What is done

### More Than One Page

The application has eight pages connected with React Router. The main page shows featured channels and links to categories. There are pages for viewing channel details, browsing channels by category, saved channels list, user profile, adding new channels, and about page.

### User-Friendly UI

Design was taken from Figma given to us in task details.

The interface is styled with custom CSS. Each page has similar or reused layout and design. Header and Footer components are present on all pages. The design uses transitions, hover effects, and visual hierarchy for better navigation.

### Components and Props

The project has more than seven React components. Header handles navigation and search, Footer shows links.

ChannelCard gets channel data via props and displays it. Pagination component gets page numbers through props for browsing lists. SearchModal opens as overlay and sends search data to parent. BurgerMenu gets navigation items as props. AIChat component gets open state and close function via props.

### Form

Form is valid and can add new elements to db.json database if all entered data is valid.

The Add Channel page has a form for adding new channels. Form state uses useState hook with five fields: channel name, URL, category, description, and email. The handleChange function updates formData state when users type. Form validates data and shows feedback during submission. After successful submit, data goes to API and user gets redirected to home page.

### User Interaction

The application has several interactive features. Search lets users filter channels by name or category. Users can save favorite channels for later. AI Chat gives channel recommendations based on user input. Pagination helps browse through channel lists. Category filters help find channels by interests. Hover effects and clickable cards give visual feedback.

### Working with API

Channel data comes from REST API using fetch function. The project uses json-server as backend with data stored in db.json file. Home page and channels list fetch data when components load using useEffect and useState hooks. Add Channel page sends POST requests to create new entries. Fetch operations have error handling. API runs on localhost:3000 with endpoints for channels, saved channels, and profiles.

## How to Run the Project

You need Node.js installed (version 14 or higher).

Clone the repository and open project folder in terminal
```bash
git clone https://github.com/SmaugSatou/Web-Project-Prokhorov-Pasichnyk.git
```

Install dependencies:
```bash
npm install
```

Start development server and JSON server together:
```bash
npm start
```

Or run them separately in different terminals:
```bash
npm run dev
```
```bash
npm run server
```

Open browser at http://localhost:5173 to see the app.

API runs at http://localhost:3000 and serves data from db.json.

For production build:
```
npm run build
```