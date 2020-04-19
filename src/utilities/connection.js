const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true)
let databaseUrl="mongodb+srv://talentcapture:talentcapture@talentcapture-fsjbx.gcp.mongodb.net/"
var url;
const url1 = databaseUrl+"TalentCapture_DB";
const testUrl = databaseUrl+"Test_TalentCapture_DB";
const accessSchema = Schema({
    employeeId: { type: String,  unique: true },
    employeeName: { type: String, },
    emailId: { type: String,  unique: true },
    accessType: { type: String, enum: ['SuperAdmin', 'Admin', 'User'], }
}, { collection: "Access" });

const actionSchema = Schema({
    employeeId: { type: String,  unique: true },
    employeeName: { type: String, },
    emailId: { type: String,  unique: true },
    accessType: { type: String, enum: ['SuperAdmin', 'Admin', 'User'], }
}, { collection: "Action" });

const currentUserSchema = Schema({
    employeeId: { type: String,  unique: true },
    emailId: { type: String,  unique: true },
    accessType: { type: String, enum: ['SuperAdmin', 'Admin', 'User'], },
    ip:{}
}, { collection: "currentUser" });

const dynamicDataSchema = Schema({
    domain: { type: Array, default: [] },
    plcSkills: { type: Array, default: [] },
    scadaSkills: { type: Array, default: [] },
    dcsSkills: { type: Array, default: [] },
    hmiSkills: { type: Array, default: [] },
    otherSkills: { type: Array, default: [] },
    totalEmployees:Number,
    projectAllocation:{type:Object,default:{}},
    jobLevelPlusRole:{type:Array,default:[]},
    domainAverage:{type:Array,default:[]},
    plcAverage:{type:Array,default:[]},
    scadaAverage:{type:Array,default:[]},
    dcsAverage:{type:Array,default:[]},
    hmiAverage:{type:Array,default:[]},
}, { collection: 'DynamicData' })
const detailsSchema = Schema({
    employeeId: { type: String, unique: true, },
    employeeName: { type: String, },
    employeeEmail: { type: String, unique: true, },
    contactNo: { type: Number, min: 1000000000, max: 9999999999, unique: true, },
    jobLevel: { type: Number, min: 1, max: 9, },
    currentRole: { type: String }, 
    allocatedToProject: { type: Object, default: { allocation: false, percentageAllocation: 0 ,projectName:null} },
    totalExperience: { type: Number, },
    infosysExperience: { type: Number, },
    controlSystemExperience: { type: Number, },
    domain: { type: Array, default: [] },
    plcSkills: { type: Array, default: [] },
    scadaSkills: { type: Array, default: [] },
    dcsSkills: { type: Array, default: [] },
    hmiSkills: { type: Array, default: [] },
    otherSkills: { type: Array, default: [] },
}, { collection: "Details" })

let collection = {};

collection.getAccessCollection = (test=false) => {
    if(test)
    url=testUrl;
    else
    url=url1;
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Access', accessSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getDetailsCollection = (test=false) => {
    if(test)
    url=testUrl;
    else
    url=url1;
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Details', detailsSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getDynamicDataCollection = (test=false) => {
    if(test)
    url=testUrl;
    else
    url=url1;
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('DynamicData', dynamicDataSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getActionCollection = (test=false) => {
    if(test)
    url=testUrl;
    else
    url=url1;
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Action', actionSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collection.getCurrentUserCollection = (test=false) => {
    if(test)
    url=testUrl;
    else
    url=url1;
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('CurrentUser', currentUserSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = collection;