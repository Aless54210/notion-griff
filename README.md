# Launch the frontend separately from backend

- npm run front

The frontend is on the url: http://localhost:8081

# Launch backend

- npm start

The api call is made on the url: ${environment.URL_API}

The first time call backend will create the database with mysql with env params:
DB_HOST
DB_PASSWORD
DB_USER
DB_NAME
DB_PORT

Actually the db is created on first call but not the tables with sequelize.
So we have to create firstly the db (manually or launch the backend, stop and relaunch it).


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
