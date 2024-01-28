<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> A mobile app for getting recipes, making it easier for food lovers to get their favorite recipes without the hassle of searching online.
>
> ReciPal aims to streamline the cooking process by providing a user-friendly platform for customers to search for recipes and get recipes based on the ingrdients they have at home. We believe in enhancing the cooking experience by saving time and ensuring user satisfaction.

### User Stories
**User**:
- As a user, I want to be able to get recipes based on the ingredients that I have at home.
- As a user, I want to have multiple languages, so I can translate the ingredients that I don't understand.
- As a user, I want to be able to save Recipes, so I that I don't have to search for the same recipe again.

**Admin**:
- As a admin, I want to be able to see the statistics for the number of users and saved recipes .
- As a admin, I want to be able to add and remove recipes.
- As a admin, I want to be able to check user feedback so that I can offer a better user experience.

<br><br>
<!-- Tech stack -->
<img src="./readme/title3.svg"/>

###  Recipal is built using the following technologies:

- This project uses the React Native framework. React native is an open-source JavaScript framework, designed for building apps on multiple platforms like iOS, Android, and also web applications, utilizing the very same code base. It is based on React, and it brings all its glory to mobile app development.
- For persistent storage (database), the app uses the MongoDB package which allows storing data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time.
- The app uses the Imagga technologie for image recognition. Imagga offers powerful image recognition and tagging capabilities, allowing the application to analyze and understand the content of images with precision.
- For translation, the app uses i18n (internationalization). i18n provides a robust framework for managing translations and localizations within the application.

<br><br>
<!-- UI UX -->
<img src="./readme/title4.svg"/>


> We designed ReciPal using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

- Project Figma design [figma](https://www.figma.com/file/77x4fDfFQlj0g2biaUPTjJ/Untitled?type=design&node-id=114%3A621&mode=design&t=sNpH2jnBRthMJnpY-1)


### Mockups
| Home screen  | Settings Screen | Recipe Details Screen |
| ---| ---| ---|
| ![Home](/readme/screenshots/home-mock.jpg) | ![Settings](/readme/screenshots/settings-mock.jpg) | ![Details](/readme/screenshots/details-mock.jpg) |

<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

###  Architecting Data Excellence: Innovative Database Design Strategies:

-![Database](/readme/screenshots/db.jpg)


<br><br>


<!-- Implementation -->
<img src="./readme/title6.svg"/>


### User Screens (Mobile)
| Login screen  | Register screen | Landing screen |
| ---| ---| ---|
| ![Login](/readme/screenshots/login.jpg) | ![Register](/readme/screenshots/signin.jpg) | ![Landing](/readme/screenshots/landing.jpg) |

| Recipe Details screen  | Saved Screen | Awards Screen | 
| ---| ---| ---|
| ![Details](/readme/screenshots/recipedetails.jpg) | ![Saved](/readme/screenshots/saved.jpg) | ![Awards](/readme/screenshots/awards.jpg) |

| Recommendation Screen | Languages Screen |
| ---| ---|
| ![Recommendation](/readme/gifs/suggestion.gif) | ![Languages](/readme/gifs/languages.gif) |

### Admin Screens (Mobile)
| Home screen  | Feedback Screen |
| ---| ---|
| ![Landing](/readme/screenshots/home.jpg) | ![Landing](/readme/screenshots/feedback.jpg) | 
<br><br>


<!-- AWS Deployment -->
<img src="./readme/title7.svg"/>

###  Efficient AI Deployment: Unleashing the Potential with AWS Integration:

- This project leverages AWS deployment strategies to seamlessly integrate and deploy natural language processing models. With a focus on scalability, reliability, and performance, we ensure that AI applications powered by these models deliver robust and responsive solutions for diverse use cases.

<br><br>

<!-- Unit Testing -->
<img src="./readme/title8.svg"/>

###  Precision in Development: Harnessing the Power of Unit Testing:

- This project employs rigorous unit testing methodologies to ensure the reliability and accuracy of code components. By systematically evaluating individual units of the software, we guarantee a robust foundation, identifying and addressing potential issues early in the development process.

| Feature Test 1  | Feature Test 2 |
| ---| ---|
| ![Landing](/readme/screenshots/test1.jpg) | ![Landing](/readme/screenshots/test2.jpg) | 

| Feature Test 3  | Feature Test 4 |
| ---| ---|
| ![Landing](/readme/screenshots/test3.jpg) | ![Landing](/readme/screenshots/test4.jpg) | 

| Feature Test 5  | Feature Test 6 |
| ---| ---|
| ![Landing](/readme/screenshots/test5.jpg) | ![Landing](/readme/screenshots/test6.jpg) | 


<br><br>


<!-- How to run -->
<img src="./readme/title9.svg"/>

> To set up Recipal locally, follow these steps:

### Prerequisites

* install npm
* install Mongodb
* install nodemon

### Installation

1. Get a free API Key at [example](https://imagga.com/auth/signin)
2. Clone the repo
   git clone [github](https://github.com/DinaBader/ReciPal.git)
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `.env`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

Now, you should be able to run ReciPal locally and explore its features.
