const express = require('express');
const router = express();
const user_router = require('./user.router');
const auth_router = require('./auth.router');
 const appRouter = (app) =>{
     router.use('/user', user_router);
     router.use('/auth', auth_router);
    return app.use('/api/v1',router);
}
module.exports = appRouter;
