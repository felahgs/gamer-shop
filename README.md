<p align="left">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/felahgs/gamer-shop">

  <a href="https://github.com/tgmarinho/README-ecoleta/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/felahgs/gamer-shop">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

</p>
<h1 align="center">
  Gamer Shop Challenge
</h1>

<p align="center">
 <a href="#-about">About</a> •
 <a href="#%EF%B8%8F-features">Features</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-installing-and-running">Installing</a> • 
 <a href="#-libraries">Libraries</a> • 
 <a href="#-deploy">Deploy</a> • 
 <a href="#-scripts">Scripts</a> 
</p>

## 💻 About

**Front-end Challenge from [Apply Digital](https://github.com/felahgs/ad-frontend-test/tree/main)**  

The goal of this challenge was to implement an responsive application page using NextJS and Tailwind. The application consists in a game shop page, that allows the user to filter and add games to a shopcard. 
The application has an checkout page where all the cart itens are listed and can be removed.

The development was done using [React](https://react.dev/), [NextJS](https://nextjs.org/docs), [TypeScript](https://www.typescriptlang.org/) and [TawilwindJS](https://tailwindcss.com/).

Code quality tools like ESLint and Prettier have been integrated, along with Husky to enforce pre-commit and pre-push checks. These checks ensure compliance with formatting rules, verify package versions, validate test consistency, and identify vulnerable dependencies.

The project includes [Storybook](https://storybook.js.org/) for inspecting each component in the application and understanding how they function.  

The functional page can be accessed at: [https://gamer-shop-theta.vercel.app](https://gamer-shop-theta.vercel.app/)

---

## ⚙️ Features

**Catalog Page**

- Show a list of available games for "purchase".
- The games can be filtered by category from the select input.
- Initially a limit of 12 games are rendered on the screen and 6 more games can be loaded when clicking the button see more at the bottom.
- Games can be added to a cart when clicking on the button.

**Cart Page**

- List items on the shop cart.
- Show the purchase total.
- Allow items to be removed from cart.


## 🎨 Layout

### Screenshots
#### Catalog
![image](https://github.com/user-attachments/assets/5249dfa0-6288-4b0b-a2e2-0e7250e38f9e)

#### Cart
![image](https://github.com/user-attachments/assets/c6c77e84-8e96-4c01-9893-cbdd6f0e67da)

### Capture

#### Desktop
https://github.com/user-attachments/assets/cac3cda6-a258-470f-9fbf-fca5f0d160ca

#### Mobile
https://github.com/user-attachments/assets/c703c508-2e27-4359-81c5-61315418cf04


---

## 🚗 Installing and Running

### Pre-requisites

First of all be certain to have the following applications installed.
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable).

#### ▶️ Running application 

```bash

# Clone repository
$ git clone git@github.com:felahgs/gamer-shop.git

# Access the application folder
$ cd gamer-shop

# Install dependencies
$ yarn install

# Start the application
$ yarn dev

# The application will start as default on the port:3000 - access http://localhost:3000
```

#### 🧭 Starting Storybook


```bash

$ git clone git@github.com:felahgs/gamer-shop.git

$ cd gamer-shop

$ yarn install

$ yarn run storybook

# The application will be accessible as default on the port:3000 - access  http://localhost:6006/

```

---

## 📚 Libraries

- [Jest](https://jestjs.io/pt-BR/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) Creation of unity tests.
- [axios](https://axios-http.com/ptbr/docs/intro)  HTTP Client.
- [tailwind](https://tailwindcss.com/)  Styling.
- [clsx](https://www.npmjs.com/package/clsx)  Class name constructors.
- [hero icons](https://heroicons.com/outline) Icons from tailwind makers.
  ***

## 🚀 Deploy

The deploy is made using the vercel application for commits made into the main branch.

## 📜 Scripts

The scripts can be executed using the command `yarn [script name]`.  
The following scripts are configured in the project:

- **dev**: Starts the application in development mode at "http://localhost:3000".
- **build**: Builds the script for deployment.
- **start**: Starts an application in production mode at "http://localhost:3000".
- **lint**: Runs lint tests on the project and outputs files with code standard errors.
- **prepare**: Sets up pre-hooks for Husky.
- **test**: Run tests with coverage.
- **test:watch**: Run all tests in watch mode.
- **test:unit**: Run only unit tests.
- **test:integration**: Run only integration tests.
- **storybook**: Starts Storybook at "http://localhost:6000".
- **build-storybook**: Builds Storybook for deployment.
- **check-outdated**: Check if every package used in production is updated.
- **prepare**: Setup husky hooks

---

## 🐹 Author

<a href="https://https://github.com/felahgs">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/felahgs" width="100px;" alt=""/>
 <br />
 <b>Felipe Souza</b></a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Felipe-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/felipe-garcia-de-souza-aa9aa773/)](https://www.linkedin.com/in/felipe-garcia-de-souza-aa9aa773/)
[![Gmail Badge](https://img.shields.io/badge/-fgsouza93@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:fgsouza93@gmail.com)](mailto:fgsouza93@gmail.com)

---
