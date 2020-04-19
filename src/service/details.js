const db = require('../model/details');
const validator = require('../utilities/validator');
const hashing=require('../utilities/hashing')

let detailsService = {}


detailsService.getData = (id, test = false) => {
    return db.getData(id, test).then(obj => {
        if (obj) {
            return obj;
        }
        else {
            let err = new Error('User not Found');
            err.status = 404;
            throw err;
        }
    })
}


detailsService.addDetails = (details, test = false) => {
    return db.addDetails(details, test).then(value => {
        if (value)
            return value;
        else {
            let err = new Error('Data Write Error.Try Again Later');
            err.status = 500;
            throw err;
        }
    })
}

detailsService.removeDetails = (id, test = false) => {
    return db.removeDetails(id, test).then(value => {
        if (value)
            return value;
        else {
            let err = new Error('Deletion Failed');
            err.status = 500;
            throw err;
        }
    })
}

detailsService.updateDetails = (details, test = false) => {
    return db.updateDetails(details, test).then(value => {
        if (value)
            return value;
        else {
            let err = new Error('Updation Failed');
            err.status = 500;
            throw err;
        }
    })
}


detailsService.getDynamicData = (test = false) => {
    return db.getDynamicData(test).then(value => {
        if (value)
            return value;
        else {
            let err = new Error('Couldnt Fetch data');
            err.status = 500;
            throw err;
        }
    })
}


detailsService.getDashboardData = (empId = null, test = false) => {
    return db.getDashboardData(empId,test).then(value => {
        if (value)
            {
                return value;
            }
        else {
            let err = new Error("Some error Occured!");
            err.status=500;
            throw err;
        }
    })
}

detailsService.getNotifications=(id,test=false)=>{
    return db.getNotifications(id,test).then(value=>{
        if(value)
        return value;
        else{
            return [];
        }
    })
}


detailsService.addRequest=(data,test=false)=>{
    return db.addRequest(data,test).then(value=>{
        if(value)
        return value;
        else{
            let err=new Error("Error occured in adding");
            err.status=500;
            throw err;
        }
    }).catch(()=>{
        let err=new Error("Request already sent");
            err.status=402;
            throw err;
    })
}


detailsService.resolveRequest=(id,act,test=false)=>{
    return db.resolveRequest(id,act,test).then(value=>{
        if(value)
        return value;
        else{
            let err=new Error("Some Error");
            err.status=500;
            throw err;
        }
    })
}

detailsService.getAccessData=(id,test=false)=>{
    return db.getAccessData(id,test).then(value=>{
        if(value)
        return value;
        else{
            let err=new Error("No data available");
            err.status=402;
            throw err;
        }
    })
}

detailsService.removeAccessData=(id,test=false)=>{
    return db.removeAccessData(id,test).then(value=>{
        if(value)
        return value;
        else{
            let err=new Error("No data found");
            err.status=404;
            throw err;
        }
    })
}

detailsService.getAllUsers=(test=false)=>{
    return db.getAllUsers(test).then(value=>{
        if(value)
        return value;
        else{
            let err=new Error("No data found");
            err.status=404;
            throw err;
        }
    })
}
//used sLaSh hasing for / in url encoding
detailsService.getUser=(type,id,test=false)=>{
    id=decodeURI(id).replace(/sLaSh/g,'/');
    console.log(id);
    return db.getUser(type,id,test).then(value=>{
        if(value)
        return value;
        else{
            let err=new Error("No data found");
            err.status=404;
            throw err;
        }
    })
}

detailsService.login=(id,ip,access='User',test=false)=>{
    return db.login(id,ip,access,test).then(value=>{
        if(value)
        return value.accessType;
        else
        return 'User';
    })
}

detailsService.login1=(id,ip,access='User',test=false)=>{
    return db.login1(id,ip,access,test).then(value=>{
        if(value)
        return value.accessType;
        else
        return 'User';
    })
}

detailsService.getCurrentUser=(ip,test=false)=>{
    return db.getCurrentUser(ip,test).then(value=>{
        if(value)
        {
            console.log(value)
            return {employeeId:hashing.hash(String(value.employeeId)),
                emailId:hashing.hash(String(value.emailId)),
            accessType:hashing.hash (String(value.accessType))} 
        }
        else{
            let err=new Error("Please Login to continue");
            err.status=401;
            throw err;
        }
    })
}

module.exports = detailsService;