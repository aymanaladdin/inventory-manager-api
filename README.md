# Inventory Manager API

This app relies on node.js version 14.15.3 and mysql 5.7 or above. 

## Development server

Run `npm start` then `npm start` for a dev server. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## Prerequisites 

Before beign able to start server locally. you should first make the following steps
- Run `npm install` [ to install project dependecies]
- Run `npm migrate:db` [to migrate project db tables - create products, auth, and token tables -]
- Run `npm seed:db` [seed initail data to db tables] 
- finally build and start your server

### Notice before running `npm migrate:db` 
- make sure that first you have mysql client up and running on your machine with a db created on it `inventory_manager`,
- instead if you have `docker` & `docker-compose` installed on your machine then you could clone this project [inventory-manager-devops](https://github.com/aymanaladdin/inventory-manager-devops) 
- from the cloned directory on your machine Run `docker-compose up`  

## Accomplised

### Authentication 
- [x] handle user authentication [ basic auth with user and password ]
- [x] add auth middleware to verify authorization header and decode found token
- [x] apply middleware for all routes except login
- [x] generate `refresh-token` endpoint that will be used to generate a new `access-token` using previously generated refresh token


### Products
- [x] List all products view 
- [x] view a product details on click
- [x] create new product
- [ ] delete product functionality and endpoint
