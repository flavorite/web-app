<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/flavorite/web-app">
    <img src="public/logo192.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Flavorite</h3>

  <p align="center">
    We introduce the most powerful way of food recommendation. Your network! 
    <br />
    <br />
  
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Tech Used</a></li>
        <li><a href="#built-with">Folder Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <!-- <li><a href="#wireframes">Wireframes</a></li>
    <li><a href="#roadmap">Snapshot</a></li> -->
    <!-- <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>
  <!-- Link the Google Doc -->
    <!-- <a href="https://github.com/flavorite/web-app"><strong>Project Idea and User Stories »</strong></a> -->
    Flavorite helps users discover reliable food and restaurant recommendations from their personal network. We know that recommendations from close friends and family can have a powerful impact on our decision-making, especially when it comes to food. That's why Flavorite is designed to help you find the best dining options based on recommendations from people you trust. With a focus on cultural flavor and preference, Flavorite makes it easy to find meals that are sure to meet your satisfaction.
</p>

### Tech Used

- React.js
- Typescript
- MaterialUI

### Folder Structure

```
.
├── README.md          # project description
├── client             # OpenAPI generated files containing models and API
├── public             # contains static files
├── src                # source files including components, tests, css files

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Get a Google Maps API Key at [https://mapsplatform.google.com/](https://mapsplatform.google.com/)
2. Clone the repo
   ```
   git clone https://github.com/flavorite/web-app.git
   ```
3. touch `.env.local` file and add the API Key as follows:
   ```
   REACT_APP_API_KEY=<YOUR API KEY HERE>
   ```
4. Install NPM packages
   ```
   npm install
   ```
5. Run this script to update Client model from OAS
   ```
   npm run generate
   ```

### Available Scripts

In the project directory, you can run:

1. Runs the app in the development mode.\
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

   ```
   npm start
   ```

2. Launches the test runner in the interactive watch mode.\
   See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

   ```
   npm test
   ```

3. Builds the app for production to the `build` folder.
   See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

   ```
   npm run build
   ```

4. If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
   **Note: this is a one-way operation. Once you `eject`, you can't go back!**

   ```
   npm run eject
   ```

5. Run ESLint

   ```
   npm run lint
   ```

6. Run ESLint --fix

   ```
   npm run lint:fix
   ```

7. Run Prettier

   ```
   npm run format
   ```

8. Run OpenAPI generator to generate/update client models

   ```
   npm run generate
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- ## Wireframes

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

<!-- ## Snapshot -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- ## Contact

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
<!--
## Acknowledgments

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->
