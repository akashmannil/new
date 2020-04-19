const express = require('express');
const routing = express.Router();
const create = require('../model/dbsetup');
const detailsService = require('../service/details');
const model=require('../model/details');

// DO NOT REMOVE THIS IMPORT STATEMENT
// const tester = require('../parser').reportGenerator

// setup db mongoose db
routing.get('/setupDb/:no', (req, res, next) => {
    create.setupDb(req.params.no,true).then((data) => {
        console.log("1234")
        res.send(data)
    }).catch((err) => {
        console.log("123")
        next(err)
    })
})

//test
routing.get('/setup/dynamicdata', (req, res, next) => {
    model.setupDynamicData(true).then(_=>{
        res.send('Done');
    }).catch(err=>next(err))
})

//get dashboard details
routing.get('/details/dashboardData/:id',(req,res,next)=>{
    detailsService.getDashboardData(req.params.id,true).then(data=>{
        res.status(200);
        res.json(data);
    }).catch(err=>{next(err)})
})


//to get dynamic data for UserDetails page 
routing.get('/details/getdynamicdata',(req,res,next)=>{
    detailsService.getDynamicData(true).then(data=>{
        res.status(200);
        res.json(data);
    }).catch(err=>next(err))    
})


//search for user details based on employeeId,employeeName,contactNo
routing.get('/details/:id',(req,res,next)=>{
    detailsService.getData(req.params.id,true).then(data=>{
        res.status(200);
        res.json(data);
    }).catch(err=>{next(err)})
})


//add details of user to details collection
routing.post('/details/add',(req,res,next)=>{
    detailsService.addDetails(req.body,true).then((empId)=>{
        res.status(200);
        res.json({message:`Data Successfully added of Employee ${empId}`})
    }).catch(err=>next(err))
})


//updating details of employees in details collection
routing.put('/details/update',(req,res,next)=>{
    detailsService.updateDetails(req.body,true).then(empId=>{
        res.status(200);
        res.json({message:`Data successfully updated of Employee ${empId.employeeId}`})
    }).catch(err=>next(err))
})


//deleting particular employee detail in details collection
routing.delete('/details/:id',(req,res,next)=>{
    detailsService.removeDetails(req.params.id,true).then(()=>{
        res.status(200);
        res.json({message:`Data successfully Deleted`})
    }).catch(err=>next(err))
})

//get notifications for particular user
routing.get('/action/getnotifications/:id',(req,res,next)=>{
    detailsService.getNotifications(req.params.id,true).then((data)=>{
        res.status(200);
        res.json(data);
    }).catch(err=>next(err));
})

//add request to pending actions collection
routing.post('/action/add',(req,res,next)=>{
    detailsService.addRequest(req.body,true).then(()=>{
        res.status(200);
        res.json({message:`Request successfully submitted`});
    }).catch(err=>next(err));
})

//resolving access request
routing.delete('/action/resolve/:id/:act',(req,res,next)=>{
    detailsService.resolveRequest(req.params.id,req.params.act,true).then(()=>{
        res.status(200);
        res.json({message:`Request Resolved`});
    }).catch(err=>next(err));
})

//get users,superAdmin,admin 
routing.get('/accessData/:id',(req,res,next)=>{
    detailsService.getAccessData(req.params.id,true).then(data=>{
        console.log(data);
        res.status(200);
        res.json(data);
    }).catch(err=>{next(err)})
})

routing.delete('/accessData/:id',(req,res,next)=>{
    detailsService.removeAccessData(req.params.id,true).then(()=>{
        res.status(200);
        res.json({message:`Successfully Removed User!`});
    }).catch(err=>next(err));
})

//get all entered Data
routing.get('/getAllUsers/getAll',(req,res,next)=>{
    detailsService.getAllUsers(true).then(data=>{
        res.status(200);
        res.json(data);
    }).catch(err=>{next(err)})
})

//login
routing.get('/', (req, res, next) => {
    let a = req.connection.user.split('\\');
    console.log(a);
    detailsService.login(a[1],req.ip,true).then((data) => {
        // if(a[1].toLower()!='itlinfosys'){res.json({message:'Login Unsuccessful'})}
        res.send(`
        <h5>Done</h5>
        `);
    }).catch((err) => {
        next(err)
    })
})

routing.get('/getCurrentUser', (req, res, next) => {
    detailsService.getCurrentUser(req.ip,true).then((data) => {
        res.status(200);
        res.json(data);
    }).catch((err) => {
        next(err)
    })
})

//get users based on selection (project , skill)
routing.get('/getUser/:type/:id', (req, res, next) => {
    detailsService.getUser(req.params.type, req.params.id,true).then(data => {
        res.status(200);
        res.json(data);
    }).catch(err => { next(err) })
})

module.exports = routing;