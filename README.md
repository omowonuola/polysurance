SALES SOFTWARE APP


API

- REST API With Nestjs
- Swagger documentation,
- Folder Structure

## 1. Getting started
## Project goals

The goal of this project is to build a sales application that has a function that calculates the Total sales before discount, Total sales after discount, Total amount of money lost via Discount Codes, and finally the average discount per customer for the day as a percentage using NestJS.

### 1.1 Requirements

Before starting, make sure you have these components on your local machine:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM

### 1.2 Project configuration

Start by cloning this project on your local machine.

``` sh
git clone https://github.com/omowonuola/polysurance.git
npm install to install dependencies
NOTE: The main branch is the updated branch for the codebase

RUN WITH SERVER(npm)

The next step will be to install all the dependencies of the project.

```sh
use npm install for the server dependencies installation
```

For a standard development configuration, you can leave the default values for PORT, which has the default value of 3000.

### 1.3 Launch and discover with NPM

You are now ready to launch the NestJS application using the command below.

```sh

# Launch the development server with npm command
npm run start:dev
```

You can now head to `http://localhost:3000/api/#/` and see the API Swagger docs. 
The example sales API that runs the fuction is located at the `http://localhost:3000/api/#/sales/SalesController_calculateSales` endpoint in the swagger documentation.

## 2. Design Decisions

```sh

The design decisions were implemented to create a sales application that is scalable, secure, and efficient. Using the model that helps to accommodate a large number of sales records, the application efficiently calculates the total sales before discount, total sales after discount, the total amount of money lost via Discount Codes, and finally the average discount per customer for the day as a percentage.
```
## 3. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├── sales  # The sales folder contains the implementations of queries, API for the sales function
│   ├── model  # The model folder contains the database structure implementations for the sale app
│   ├──├──sales.interface.ts # The interface file contains the product, order and discount interface.
│   ├──sales.controller.ts # The sales controller file contains the sales routes for the APIs.
│   ├──sales.module.ts # The sales module file contains the import of the sales services and controller
│   ├──sales.service.spec.ts # The sales service spec file contains the unit test for sales service APIs
│   ├──sales.service.ts # The sales service file contains the data storage and retrieval queries for sales
├── app.module.ts # The sales service file contains the data storage and retrieval queries for sales
├── package.json # The file contains the dependencies used in the codebase.
└── main.ts
```

## 4. Default NPM commands

The NPM commands below are already included with this template and can be used to quickly run, build and test the project.

```sh
# Start the application using yarn NodeJS in development
npm run start:dev (use this to start the application locally)

# Run the project' UNIT TESTS
npm run test:watch(use this to start the unit testing locally)
```


## 6. Future Improvements
```sh

Additionally, the optimization of the function can be improved to accommodate heavy data from the sales database.

```
