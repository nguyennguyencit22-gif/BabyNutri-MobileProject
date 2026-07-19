# BabyNutri Mobile

## Project Overview

BabyNutri Mobile is a mobile application developed using React Native to help parents manage their children's nutrition. The application allows users to manage child profiles, browse healthy recipes, read nutrition articles, and create meal plans. The project is developed for the Mobile Programming course.

---

## Main Features

- User Login & Register
- Manage User Profile
- Manage Child Profile
- Browse Nutrition Recipes
- Read Nutrition Articles
- Create Meal Plans
- Search Recipes
- FAQ

---

## Technologies

- React Native
- TypeScript
- Node.js + Express
- MySQL
- REST API

---

## Project Structure

```
MobileProject/
│
├── backend/          # Backend API
├── docs/             # Documentation
├── MobieReport#/     # React Native project
├── sql/              # Database script
└── README.md
```

---

## Folder Description

### backend/
Contains the RESTful APIs developed using Node.js and Express.

### MobieReport#/
Contains the React Native mobile application.

### docs/
Contains project reports and presentation files.

### sql/
Contains the database script.

---

## Team Assignment

| Member | Responsibility |
|---------|----------------|
| Member A | Authentication, Navigation, Home, Profile |
| Member B | Recipes and Nutrition Articles |
| Member C | Child Profile, Meal Plan, FAQ |

---

## Installation

```bash
cd MobieReport#
npm install
npm start
```

---

## Contributors

- Member A
- Member B
- Member C

---

## Team Workflow

- Create a feature branch before developing.
- Do not push directly to the `main` branch.
- Create a Pull Request before merging.
- Each member is responsible for their assigned module and participates in testing, documentation, and integration.

---

##NOTE FROM B
-1. Thêm 2 dòng import ở đầu file:
import RecipeStack from './RecipeStack';
import ArticleStack from './ArticleStack';

-2. Thêm 2 dòng Tab.Screen (sau dòng Tab.Screen name="Explore"):
-<Tab.Screen name="Recipes" component={RecipeStack} options={{ headerShown: false }} />
-<Tab.Screen name="Articles" component={ArticleStack} options={{ headerShown: false }} />

-3. Trong hàm tabBarIcon (chỗ đang if/else if theo route.name), thêm:
} else if (route.name === 'Recipes') {
  iconSource = require('@/assets/images/tabIcons/recipes.png');
} else if (route.name === 'Articles') {
  iconSource = require('@/assets/images/tabIcons/articles.png');
}

Cần A gửi/tạo giúp 2 icon: recipes.png và articles.png bỏ vào assets/images/tabIcons/ (cùng size với home.png, explore.png đang có sẵn). Nếu chưa có icon ngay thì báo B, B tạm dùng icon có sẵn thay thế để test trước.

Route param nếu A cần biết:
- RecipeDetail cần { id: number }
- EditRecipe cần { id: number }
- ArticleDetail cần { id: number }
- Còn lại (RecipeList, AddRecipe, SearchRecipe, ArticleList) không cần param.