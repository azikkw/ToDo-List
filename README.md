# To-Do List

![Banner](/assets/images/readme-banner.png)

> Stay organized and boost your productivity with intuitive `To-Do List` web application. Easily manage tasks, edit them and track your progress all in one place. Whether you're planning your day, working on a project, or managing a team, `To-Do List` helps you stay on top of your tasks and achieve your goals efficiently.

---

## 🌐 BASE URL
You can access `To-Do List` by this link:
> https://to-do-list-d75q.onrender.com/

---

## 📝 PREPARING FOR IMPORTING
#### To start importing a project `If you want to run it without docker`, you need to:
[Node.js](https://nodejs.org/en) version 18.0.0 [min] and more.

## 📤 IMPORTING
Step-by-step instructions for importing the `To-Do List` project.

#### 1. Downloading

Clone project using the `git clone` command. To do this, you need to go to the command prompt and specify the path to the folder where you will import the project.

Next you will need to enter the following:
```bash
git clone https://github.com/azikkw/ToDo-List.git
```

You can also [download ZIP archive](https://github.com/azikkw/ToDo-List/archive/refs/heads/main.zip) and unpack it to the folder you want.

#### 2. Building the project with `Docker 🐋`
```bash
make build
```

#### 3. Building the project with `Package Manager`
Since the project does not contain all the necessary dependencies, you will need to install them.

To do this, you need to enter the following command:
```bash
# For npm package manager
npm install
# For pnpm package manager
pnpm install
# For yarn package manager
yarn install
# For bun package manager
bun install
```

---

## ▶️ PROJECT START

After completing all the steps described in the instructions, you can run the project in two ways:

#### 1. Using Docker 🐋
```bash
# To run:
make run
```
```bash
# To stop
make stop
```

#### 2. Using package manager
```bash
# For npm package manager
npm run dev
# For pnpm package manager
pnpm run dev
# For yarn package manager
yarn dev
# For bun package manager
bun run dev
```

#### 3. Once project is running you can access it at:
> http://localhost:3000