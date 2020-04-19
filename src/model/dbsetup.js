const collection = require('../utilities/connection');
const dataGenerator=require('./generateData')
const detailsFile=require('./details')
const dynamicDatadb = [{

},]
const actionData=[{
    employeeId: '1010',
    employeeName: 'User 11',
    emailId: 'user11@gmail.com',
    accessType: 'Admin'  
},
{
    employeeId: '1011',
    employeeName: 'User 12',
    emailId: 'user12@gmail.com',
    accessType: 'SuperAdmin' 
},
{
    employeeId: '1012',
    employeeName: 'User 13',
    emailId: 'user13@gmail.com',
    accessType: 'Admin' 
},
{
    employeeId: '1013',
    employeeName: 'User 14',
    emailId: 'user14@gmail.com',
    accessType: 'SuperAdmin' 
},
{
    employeeId: '1014',
    employeeName: 'User 15',
    emailId: 'user15@gmail.com',
    accessType: 'Admin' 
},{
    employeeId: '1015',
    employeeName: 'User 16',
    emailId: 'user16@gmail.com',
    accessType: 'Admin' 
},{
    employeeId: '1016',
    employeeName: 'User 17',
    emailId: 'user17@gmail.com',
    accessType: 'Admin' 
}]

generateData=()=>{}

exports.setupDb = (no,test=false) => {
    let accessDb=dataGenerator.readUsers()
    let detailsDb=dataGenerator.generateData(no);
    return collection.getAccessCollection(test).then((access) => {
        return access.deleteMany().then(() => {
            return access.insertMany(accessDb).then(() => {
                return collection.getDetailsCollection(test).then((details) => {
                    return details.deleteMany().then(() => {
                        return details.insertMany(detailsDb).then((data) => {
                            return collection.getDynamicDataCollection(test).then(dynamicData => {
                                return dynamicData.deleteMany().then(() => {
                                    return dynamicData.insertMany().then(data => {
                                        if (data) {
                                            detailsFile.setupDynamicData(test);
                                            return collection.getActionCollection(test).then(action=>{
                                                return action.deleteMany().then(()=>{
                                                    return action.insertMany(test?actionData:actionData).then(()=>{
                                                        return {message:"Insertion Successful"}
                                                    })
                                                })
                                            })
                                        }
                                        else {
                                            let err = new Error("Insertion failed");
                                            err.status = 400;
                                            throw err;
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}