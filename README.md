# ReciPal
![title1](https://github.com/DinaBader/ReciPal/assets/131765110/a5913c84-68ac-4831-9147-7d9941ecfe73)
<br><br>

![title2](https://github.com/DinaBader/ReciPal/assets/131765110/34faaa2b-874d-4146-a0a5-3340f23833cf)
> A mobile app for getting recipes, making it easier for food lovers to get their favorite recipes without the hassle of searching online.

### User Stories
#User:
- As a user, I want to be able to get recipes based on the ingredients that I have at home.
- As a user, I want cooking to be more fun, so that I get excited to save money and make home cooked meals more often.
- As a user, I want to be able to save my recipes so that I can access them whenever without having to look for it in a field of other recipes.
<br><br>

#Admin:
- As an admin, I want to be able to add new recipes based on the dieteray restrictions of each user.
- As an admin, I want to be able to receive feedback to ensure a smooth user experience.

![title3](https://github.com/DinaBader/ReciPal/assets/131765110/04db1aa7-1f5e-4482-aa9a-2fab6fd3de50)
> We designed ReciPal using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

### Wireframes
| Login screen  | Register screen |  Landing screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

### Mockups
| Home screen  | Menu Screen | Order Screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

![title4](https://github.com/DinaBader/ReciPal/assets/131765110/25b8cf31-424d-4403-add6-7f0d06fcb808)
> Using the wireframes and mockups as a guide, we implemented the Coffee Express app with the following features:

### User Screens (Mobile)
| Login screen  | Register screen | Landing screen | Loading screen |
| ---| ---| ---| ---|
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |
| Home screen  | Menu Screen | Order Screen | Checkout Screen |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |

### Admin Screens (Web)
| Login screen  | Register screen |  Landing screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen  | Menu Screen | Order Screen |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

![title5](https://github.com/DinaBader/ReciPal/assets/131765110/d24b798d-0485-4c78-821a-772291a74352)
###  Coffee Express is built using the following technologies:

- This project uses the [Flutter app development framework](https://flutter.dev/). Flutter is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses the [Hive](https://hivedb.dev/) package which allows the app to create a custom storage schema and save it to a local database.
- To send local push notifications, the app uses the [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) package which supports Android, iOS, and macOS.
  - 🚨 Currently, notifications aren't working on macOS. This is a known issue that we are working to resolve!
- The app uses the font ["Work Sans"](https://fonts.google.com/specimen/Work+Sans) as its main font, and the design of the app adheres to the material design guidelines.

<br><br>


![title6](https://github.com/DinaBader/ReciPal/assets/131765110/457799c8-44c3-42e4-92eb-f6a0b993c2a6)
> To set up Coffee Express locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

Now, you should be able to run Coffee Express locally and explore its features.
