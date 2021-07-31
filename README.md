# <div align="center"> EDEXA Dashboard

<div align="center">

This project Is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and using tailwindcss for UI library. Backend is built with node.js on top of NestJS and MongoDB. Development enviornment is 64bit Windows 10.

</div>

> *project color theme can be changed from `src/data/ProjectTheme.js`*

## <p>Available Scripts :helicopter:</p>

This project usages Yarn as package manager and in the project directory, you can run:

### Root scripts

| Script            | Description                                              |
|--------------------------|----------------------------------------------------------|
| `start:client`           | Starts the development server of client                  |
| `start:server`           | Starts the development server of server                  |
| `start:all`              | Starts the development server of client and server both  |
| `install:server`         | Install server's npm packages                              |
| `install:client`         | Install client's npm packages                              |
| `install:server:client`  | Install server and client's npm packages                   |
| `build:server`           | build client production                                  |
| `build:client`           | build server production                                  |

<details>
  <summary># <b>Individual scripts</b></summary>

| Client Script      | Description                               | Server Script      | Description                         |
|--------------------|-------------------------------------------|--------------------|-------------------------------------|
| `start:dev`        | Starts the development server             | `start`             | Starts the server                   |
| `build`            | Production build                          | `start:dev`         | Starts the server in watch mode     |
|  `test`            | Runs unit tests                           | `start:debug`       | Starts the server in debug mode     |
|  `eject`           | [React Eject](https://bit.ly/2TOYE0A)     | `start:prod`        | Runs prod server, run `build` first |
| `lint`             | Shows all the linting errors in codebase  | `lint`              | Fix all the liting errors           |
| `lint:fix`         | Fix all the liting errors                 | `build`            | Production build                     |

</details>

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in this project.

<details>
  <summary>Client</summary>

    ├── .vscode
    ├── node_modules
    ├── public
    ├── src
        ├── assets
        ├── components
        ├── container
        ├── pages
        ├── routes
        ├── util
    ├── .eslintrc.json
    ├── .gitignore
    ├── craco.config.js
    ├── package.json
    ├── README.md
    ├── tailwind.config.js
    └── yarn.lock
</details>
<details>
  <summary>server</summary>

    ├── .vscode
    ├── node_modules
    ├── dist
    ├── src
        ├── app
          ├── auth
          ├── userProfile
          ├── shared
          ├── app.module.ts
        ├── main.ts
    ├── nest-cli.json
    ├── .eslintrc.json
    ├── .gitignore
    ├── package.json
    ├── README.md
    ├── schema.gql
    ├── tsconfig.build.json
    ├── tsconfig.json
    └── yarn.lock
</details>

> `.vscode/`: This directory contains all of the workspace setting for vscode.

- <b>Client</b> application will run at port 3000 if available otherwise it will pick any available port.
- <b>Server</b> will be running at port 4000. <b>GraphQL</b> playground is available at `URL:4000/graphql`
- Server usages default mongoDB port which is `27017`, check `server/src/app/app.module.ts` for details.
- DATABASE-NAME will be edexa

>Added ToDo for unfinished features
