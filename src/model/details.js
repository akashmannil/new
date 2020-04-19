const dbModel = require('../utilities/connection');

const detailsDb = {}

detailsDb.getData = (id, test) => {
    return dbModel.getDetailsCollection(test).then(model => {
        return model.findOne({ $or: [{ employeeId: id }, { employeeName: id }, { employeeEmail: id }] }
            , { _id: false }).then(value => {
                if (value)
                    return value;
                else
                    return null;
            })
    })
}


detailsDb.addDetails = (details, test) => {
    return dbModel.getDetailsCollection(test).then(model => {
        return model.findOne({ employeeId: details.employeeId }, { _id: false }).then(value => {
            if (value) {
                let err = new Error('Employee details Exists. Please use Update option.');
                err.status = 501;
                throw err;
            }
            else {
                return model.create(details).then(value => {
                    console.log(value)
                    if (value)
                        {
                            detailsDb.setupDynamicData(test);
                            return value;
                        }
                    else
                        return null;
                })
            }
        })
    })
}


detailsDb.updateDetails = (details, test) => {
    return dbModel.getDetailsCollection(test).then(model => {
        return model.findOne({ employeeId: details.employeeId }).then(pDetails => {
            if (pDetails) {
                return model.deleteOne({ employeeId: details.employeeId }).then(() => {
                    return model.create(details).then(value => {
                        if (value)
                            {
                                detailsDb.setupDynamicData(test);
                                return value;
                            }
                        else
                            return null;
                    })
                })
            }
            else
                return null;
        })
    })
}

detailsDb.removeDetails=(id,test)=>{
    return dbModel.getDetailsCollection(test).then(model=>{
        return model.deleteOne({employeeId:id}).then(deleted=>{
            if(deleted.deletedCount>0)
            {
                detailsDb.setupDynamicData(test);
                return true;
            }
            else
            return null;
        })
    })
}

detailsDb.getDynamicData = (test) => {
    return dbModel.getDynamicDataCollection(test).then(model => {
        return model.findOne({}, { _id: 0, __v: 0 }).then(value => {
            if (value)
                return value;
            else
                return null;
        })
    })
}



detailsDb.setupDynamicData = (test) => {
    let a = {};
    a.domain = []; a.domainAverage = {};
    a.plcSkills = []; a.plcAverage = {};
    a.scadaSkills = []; a.scadaAverage = {};
    a.dcsSkills = []; a.dcsAverage = {};
    a.hmiSkills = []; a.hmiAverage = {};
    a.otherSkills = [];
    a.totalEmployees = null;
    a.jobLevelPlusRole = [];
    a.projectAllocation = {};
    return dbModel.getDetailsCollection(test).then(model => {
        return model.find({}, {
            employeeId: 0, employeeName: 0, employeeEmail: 0, contactNo: 0,
            totalExperience: 0, infosysExperience: 0, controlSystemExperience: 0, __v: 0
        }).then(value => {
            if (value.length < 1)
                return null;
            else {
                value.forEach(val => {
                    let t1 = t2 = t3 = t4 = t5 = t6 = 0;
                    if (val.allocatedToProject.allocation) {
                        if (a.projectAllocation[val.allocatedToProject.projectName]) {
                            if (a.projectAllocation[val.allocatedToProject.projectName] < val.allocatedToProject.percentageAllocation)
                                a.projectAllocation[val.allocatedToProject.projectName] = val.allocatedToProject.percentageAllocation;
                        }
                        else {
                            a.projectAllocation[val.allocatedToProject.projectName] = val.allocatedToProject.percentageAllocation;
                        }
                        //    console.log( val.allocatedToProject.projectName,val.allocatedToProject.percentageAllocation,a.projectAllocation[val.allocatedToProject.projectName])
                    }
                    val.domain.forEach(dom => {
                        t1 = 0;
                        a.domain.forEach(v => {
                            if (dom.domain == v)
                                t1 = 1;
                        })
                        if (t1 == 0) { a.domain.push(dom.domain) }
                    })
                    val.plcSkills.forEach(plcSkills => {
                        t2 = 0
                        a.plcSkills.forEach(v => {
                            if (plcSkills.plcSkill == v)
                                t2 = 1;
                        })
                        if (t2 == 0) { a.plcSkills.push(plcSkills.plcSkill) }
                    })
                    val.scadaSkills.forEach(scadaSkills => {
                        t3 = 0
                        a.scadaSkills.forEach(v => {
                            if (scadaSkills.scadaSkill == v)
                                t3 = 1;
                        })
                        if (t3 == 0) { a.scadaSkills.push(scadaSkills.scadaSkill) }
                    })
                    val.dcsSkills.forEach(dcsSkills => {
                        t4 = 0
                        a.dcsSkills.forEach(v => {
                            if (dcsSkills.dcsSkill == v)
                                t4 = 1;
                        })
                        if (t4 == 0) { a.dcsSkills.push(dcsSkills.dcsSkill) }
                    })
                    val.hmiSkills.forEach(hmiSkills => {
                        t5 = 0
                        a.hmiSkills.forEach(v => {
                            if (hmiSkills.hmiSkill == v)
                                t5 = 1;
                        })
                        if (t5 == 0) { a.hmiSkills.push(hmiSkills.hmiSkill) }
                    })
                    val.otherSkills.forEach(otherSkills => {
                        t6 = 0
                        a.otherSkills.forEach(v => {
                            if (otherSkills.otherSkill == v)
                                t6 = 1;
                        })
                        if (t6 == 0) { a.otherSkills.push(otherSkills.otherSkill) }
                    })
                })


                a.domain.forEach(da => { a.domainAverage[da] = { avg: 0, count: 0, sum: 0 } })
                a.plcSkills.forEach(da => { a.plcAverage[da] = { avg: 0, count: 0, sum: 0 } })
                a.scadaSkills.forEach(da => { a.scadaAverage[da] = { avg: 0, count: 0, sum: 0 } })
                a.dcsSkills.forEach(da => { a.dcsAverage[da] = { avg: 0, count: 0, sum: 0 } })
                a.hmiSkills.forEach(da => { a.hmiAverage[da] = { avg: 0, count: 0, sum: 0 } })
                value.forEach(v => {
                    a.jobLevelPlusRole.push(String(v.jobLevel) + v.currentRole)
                    v.domain.forEach(asd => {
                        a.domainAverage[asd.domain].count += 1;
                        a.domainAverage[asd.domain].sum += asd.experience;
                    })
                    v.plcSkills.forEach(asd => {
                        a.plcAverage[asd.plcSkill].count += 1;
                        a.plcAverage[asd.plcSkill].sum += asd.experience;
                    })
                    v.scadaSkills.forEach(asd => {
                        a.scadaAverage[asd.scadaSkill].count += 1;
                        a.scadaAverage[asd.scadaSkill].sum += asd.experience;
                    })
                    v.dcsSkills.forEach(asd => {
                        a.dcsAverage[asd.dcsSkill].count += 1;
                        a.dcsAverage[asd.dcsSkill].sum += asd.experience;
                    })
                    v.hmiSkills.forEach(asd => {
                        a.hmiAverage[asd.hmiSkill].count += 1;
                        a.hmiAverage[asd.hmiSkill].sum += asd.experience;
                    })
                })
                a.domainAverage = Object.keys(a.domainAverage).map(asd => {
                    return { [asd]: Number((a.domainAverage[asd].sum / a.domainAverage[asd].count).toFixed(2)) }
                })
                a.plcAverage = Object.keys(a.plcAverage).map(asd => {
                    return { [asd]: Number((a.plcAverage[asd].sum / a.plcAverage[asd].count).toFixed(2)) }
                })
                a.scadaAverage = Object.keys(a.scadaAverage).map(asd => {
                    return { [asd]: Number((a.scadaAverage[asd].sum / a.scadaAverage[asd].count).toFixed(2)) }
                })
                a.dcsAverage = Object.keys(a.dcsAverage).map(asd => {
                    return { [asd]: Number((a.dcsAverage[asd].sum / a.dcsAverage[asd].count).toFixed(2)) }
                })
                a.hmiAverage = Object.keys(a.hmiAverage).map(asd => {
                    return { [asd]: Number((a.hmiAverage[asd].sum / a.hmiAverage[asd].count).toFixed(2)) }
                })
                // console.log(a);
                a.jobLevelPlusRole.sort();
                let b = [];
                a.jobLevelPlusRole.forEach(value => {
                    let count = 0;
                    a.jobLevelPlusRole.forEach(v => {
                        if (v == value)
                            count += 1;
                    })
                    b.forEach(v => { if (v.jobLevelPlusRole == value) count = 0 })
                    if (count)
                        b.push({ jobLevelPlusRole: value, count: count })
                });
                // console.log(b);

                a.jobLevelPlusRole = b;
                a.totalEmployees = value.length;
                console.log(a);
                return dbModel.getDynamicDataCollection(test).then(dynamicData => {
                    return dynamicData.deleteMany().then(() => {
                        return dynamicData.create(a).then(data => {
                            if (data)
                                return data;
                            else
                                return null;
                        })
                    })
                })
            }
        })
    })
}


detailsDb.generateReportData = (test) => {
    return dbModel.getDetailsCollection(test).then(model => {
        return model.find({}, { _id: false, __v: false }).then(data => {
            if (data) {
                return dbModel.getDynamicDataCollection(test).then(dynamicDataModel => {
                    return dynamicDataModel.find({}, { _id: 0, __v: 0 }).then(dynamicData => {

                    })
                })
            }
            else
                return null;
        })
    })
}


detailsDb.updateData = (test) => {
    return dbModel.getDynamicData(test).then(model => {
        return
    })
}

detailsDb.getDashboardData = (empId, test) => {
    return dbModel.getAccessCollection(test).then(model => {
        return model.find({}, { _id: false, __v: false }).then(access => {
            if (access.length < 0) {
                let err = new Error("Some Error Occured!");
                err.status = 500;
                throw err;
            }
            else {
                return dbModel.getDynamicDataCollection(test).then(model => {
                    return model.findOne({}, { __v: false, _id: false }).then(dynamicData => {
                        let data = {};
                        data.front = {}
                        // console.log(dynamicData);
                        if (dynamicData) {
                            // console.log(dynamicData.projectAllocation)
                            data.jobLevelPlusRole = dynamicData.jobLevelPlusRole;
                            data.projectAllocation = dynamicData.projectAllocation;
                            data.domainAverage = dynamicData.domainAverage;
                            data.plcAverage = dynamicData.plcAverage;
                            data.scadaAverage = dynamicData.scadaAverage;
                            data.dcsAverage = dynamicData.dcsAverage;
                            data.hmiAverage = dynamicData.hmiAverage;
                            data.front.Total_Entries = dynamicData.totalEmployees;
                            data.front.App_Super_Admin = data.front.App_Admins = data.front.App_Users = 0;
                            access.forEach(sample => {
                                if (sample.accessType == "User")
                                    data.front.App_Users += 1;
                                else if (sample.accessType == "Admin")
                                    data.front.App_Admins += 1;
                                else if (sample.accessType == "SuperAdmin")
                                    data.front.App_Super_Admin += 1;
                            })
                            console.log(data);
                            if (empId != 'null') {
                                return dbModel.getDetailsCollection(test).then(model => {
                                    return model.findOne({ employeeId: empId }, { __v: 0, _id: 0 }).then(emp => {
                                        if (emp) {
                                            data.employee = emp;
                                            return data;
                                        }
                                        else
                                            return null;
                                    })
                                })
                            }
                            else
                                return data;
                        }
                        else {
                            let err = new Error("Setup Dynamic Data");
                            err.status = 500;
                            throw err;
                        }
                    })
                })
            }
        })
    })
}

detailsDb.getNotifications = (id, test) => {
    return dbModel.getActionCollection(test).then(model => {
        if (id == "Admin")
            return model.find({ $or: [{accessType: "Admin"},{accessType: "User"}] }, { _id: 0, __v: 0 }).then(value => {
                if (value.length > 0)
                    return value;
                else
                    return null;
            })
        else if (id == "SuperAdmin")
            return model.find({ $or: [{ accessType: "Admin" }, { accessType: "SuperAdmin" },
            {accessType: "User"}] }, { _id: 0, __v: 0 }).then(value => {
                if (value.length > 0)
                    return value;
                else
                    return null;
            })
    })
}


detailsDb.addRequest = (data, test) => {
    return dbModel.getActionCollection(test).then(model => {
        return model.create(data).then(value => {
            if (value)
                return value;
            else
                return null;
        })
    })
}


detailsDb.resolveRequest = (id, act, test) => {
    return dbModel.getActionCollection(test).then(model => {
        return model.findOne({ employeeId: id }).then(id => {
            return model.deleteOne({ employeeId: id.employeeId }).then(() => {
                if (act == 'approve') {
                    return dbModel.getAccessCollection(test).then(model => {
                        return model.deleteOne({ employeeId: id.employeeId }).then(() => {
                            return model.create({employeeId:id.employeeId,employeeName:id.employeeName,
                                emailId:id.emailId,accessType:id.accessType}).then(value => {
                                if (value)
                                    {
                                        detailsDb.setupDynamicData(test);
                                        return value;
                                    }
                                else
                                    return null;
                            });
                        })
                    })
                }
                else
                return true;
            })
        })
    })
}

detailsDb.getAccessData=(id,test)=>{
    return dbModel.getAccessCollection(test).then(model=>{
        return model.find({accessType:id}).then(value=>{
            if(value.length>0)
            return value;
            else
            return null;
        })
    })
}

detailsDb.removeAccessData=(id,test)=>{
    return dbModel.getAccessCollection(test).then(model=>{
        return model.deleteOne({employeeId:id}).then(deleted=>{
            console.log(id,deleted)
            if(deleted.deletedCount>0)
            {
                detailsDb.setupDynamicData(test);
                return true;
            }
            return null;
        })
    })
}

detailsDb.getAllUsers=(test)=>{
    return dbModel.getDetailsCollection(test).then(model=>{
        return model.find({},{__v:0,_id:0}).then(value=>{
            if(value.length>0)
            return value;
            else
            return null;
        })
    })
}

detailsDb.getUser=(type,id,test)=>{
    if(type=="domain")
    type='domain.domain';
    else if(type=="plcSkills")
    type='plcSkills.plcSkill';
    else if(type=="scadaSkills")
    type='scadaSkills.scadaSkill';
    else if(type=="dcsSkills")
    type='dcsSkills.dcsSkill';
    else if(type=="hmiSkills")
    type='hmiSkills.hmiSkill';
    else if(type=="otherSkills")
    type='otherSkills.otherSkill';
    else if(type=="project")
    type='allocatedToProject.projectName';
    else if(type=="role")
    type='currentRole';
    else{
        return dbModel.getDetailsCollection(test).then(model=>{
            return model.find({$or:[{'scadaSkills.scadaSkill':id},{'plcSkills.plcSkill':id},
        {'dcsSkills.dcsSkill':id},{'hmiSkills.hmiSkill':id},{'otherSkills.otherSkill':id}]},{__v:0,_id:0}).then(value=>{
                console.log(value,id);
                if(value.length>0)
                return value;
                else
                return null;
            })
        })
    }
    return dbModel.getDetailsCollection(test).then(model=>{
        return model.find({[type]:id},{__v:0,_id:0}).then(value=>{
            console.log(value,id);
            if(value.length>0)
            return value;
            else
            return null;
        })
    })
}

detailsDb.login=(id,ip,access,test)=>{
    return dbModel.getAccessCollection(test).then(model=>{
        return model.findOne({emailId:id+"@infosys.com"},{__v:0,_id:0}).then(value=>{
            console.log(value,ip);
            if(!value){value={accessType:access}}
            return dbModel.getCurrentUserCollection(test).then(model=>{
                return model.deleteMany().then(()=>{
                    console.log("asdasd")
                    return model.create({employeeId:id,emailId:id+"@infosys.com",accessType:value.accessType,
                ip:ip}).then(v=>{
                    console.log("asdasd")
                        if(v)
                        return v;
                    })
                })
            })
        })
    })
}

detailsDb.login1=(id,ip,access,test)=>{
    return dbModel.getAccessCollection(test).then(model=>{
        return model.findOne({emailId:id+"@infosys.com"},{__v:0,_id:0}).then(value=>{
            console.log(value,ip);
            return dbModel.getCurrentUserCollection(test).then(model=>{
                return model.deleteMany().then(()=>{
                    console.log("asdasd")
                    return model.create({employeeId:id,emailId:id+"@infosys.com",accessType:access,
                ip:ip}).then(v=>{
                    console.log("asdasd")
                        if(v)
                        return v;
                    })
                })
            })
        })
    })
}

detailsDb.getCurrentUser=(ip,test)=>{
    return dbModel.getCurrentUserCollection(test).then(model=>{
        return model.findOne({},{_id:0,__v:0}).then(value=>{
            console.log('asd')
            if(value&&value.ip==ip)
            return model.deleteMany({}).then(()=>{
                return value;
            })
        })
    })
}

module.exports = detailsDb;