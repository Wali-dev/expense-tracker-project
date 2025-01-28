const express = require('express');
const Router = express.Router();

const userRouter = require('./user.route');
const expenseRouter = require('./expense.route');


const routes = [
    {
        path: '/users',
        router: userRouter
    },

    {
        path: '/expense',
        router: expenseRouter
    },

    //Rest of the routes goes here..
];

routes.forEach((routeObject) => {
    Router.use(routeObject.path, routeObject.router);
});

module.exports = Router;