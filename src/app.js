const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routing');
const myErrorLogger = require('./utilities/errorLogger');
const myRequestLogger = require('./utilities/requestLogger');
const cors = require("cors")
const app = express();
const test= require('./routes/testRouting');
let login;
app.use(cors())
app.use(bodyParser.json());
// app.use(myRequestLogger);

app.use('/login',function (req, res, next) {
  // console.log(nodeSSPIObj.opts);
  next();
    // var nodeSSPI = require('node-sspi')
    // var nodeSSPIObj = new nodeSSPI({
    //   retrieveGroups: true,
    //   domain:true
    // })
    // console.log(nodeSSPIObj.opts);
    // nodeSSPIObj.authenticate(req, res, function(err){
    //   res.finished || next()
    // })
    // nodeSSPIObj.opts
    // console.log(nodeSSPIObj.opts);
})
// app.use('/login',function(req, res, next) {
//     var out =
//       req.connection.user;
//       next();
    
// })
app.use('/login', router);

app.use('/test/',test);
app.use('/', router);
// app.use(myErrorLogger);


// app.listen(1050);
// console.log("Server listening in port 1050");


module.exports = app;