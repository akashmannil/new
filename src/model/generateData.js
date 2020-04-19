
var fs = require('fs');
dataArray=[]
exports.readUsers=()=>{
    dataArray=[]
    let a=[];
    let accessDb = [
        {
            employeeId: "P1001",
            employeeName: "Tom",
            emailId: 'tom@gmail.com',
            accessType: "SuperAdmin"
        },
        {
            employeeId: "G1001",
            employeeName: "John",
            emailId: 'john@gmail.com',
            accessType: "Admin"
        },
        {
            employeeId: "S1001",
            employeeName: "Steve",
            emailId: 'steve@gmail.com',
            accessType: "User"
        }
    ]
    fs.readFile('./data/users.csv','utf-8',function(err,data) {
        if(err){
            accessDb.forEach(value=>{
                let e="";
                Object.values(value).forEach(v=>e+=v+",")
                e=e.substring(0,e.length-1);
                dataArray.push(e);
            });
            exports.writeUsers();
            a=accessDb
        }
        else{
            dataArray=data.split('\r\n')
            dataArray.forEach(data=>{
                let b={};
                b.employeeId=data.split(',')[0];
                b.employeeName=data.split(',')[1];
                b.emailId=data.split(',')[2];
                b.accessType=data.split(',')[3];
                a.push(b);
            })
        }
    })
    return a;
}

exports.writeUsers=()=>{
    fs.writeFile('./data/users.csv',dataArray.join('\r\n'),function (err) {
        if(err)throw err;
    })
}

dataArrayDCS = [
    'PCS-7, Siemens',
    'MARK-VI, GE',
    'ALSPA, Alstom',
    '800XA, ABB',
    'PlantPAx DCS, Rockwell',
    'ControlEdge UOC, Honeywell',
    'TDC2000/TDC3000- Experion, Honeywell',
    'FoxBoro, EcoStuxure, Schneider',
    'PMSM pro (DCS), Mitshubishi',
    'OpreX Control, YOKOGAWA',
    'DeltaV DCS, EMERSON',
    'Ovation DCS, EMERSON',
    'nv series DCS, TOSHIBA',
    'V series DCS, TOSHIBA',
    'Other',
    'NA'
]
dataArrayDomain = [
    'Oil and Gas',
    'BMS',
    'MES',
    'Energy',
    'Pharmaceutical',
    'Healthcare',
    'Manufacturing'
]
dataArrayHMI = [
    'Wonderware inTouch',
    'Wonderware OMI',
    'AzeoTech DAQFactory',
    '800XA, ABB'
]
dataArrayPLC = [
    'AC500, ABB',
    'S7 200 XXX- MicroWIN/SMART, Siemens',
    'S3 300, S7 400 - SIMATIC Manager, Siemens',
    'S7 1200, S7 1500 - TIA Portal, Siemens',
    'SIEMENS LOGO - LogoSoft Comfort',
    'SLC/MicroLogix-RSLogix5, RsLogix500, Rockwell',
    'Compact/ControlLogix-RSLogix5000-Studio 5000, Rockwell',
    'MicroLogix Control Systems- Micro 800, Rockwell',
    'ControlEdge PLC, Honeywell',
    'MasterLogic-200, Honeywell',
    'M200,M218-SoMachine, Schneider',
    'M340,M580-EcoStruxure (UnityPro XL), Schneider',
    'Momentum Series-EcoStruxure (UnityPro XL), Schneider',
    'Quantam Series-EcoStruxure (UnityPro XL), Schneider',
    'Premium Series-EcoStruxure (UnityPro XL), Schneider',
    'X20,X90-Automation Studio, B&R',
    'Fx,Gx,Qx,QnA,L Series-GX Developer, Mitshubishi',
    'Fx,Gx,Qx,QnA,L Series-GX Works, Mitshubishi',
    'VersaMax/RX3i-Proficy ME, GE',
    'GE IP Series (90-30) -Proficy Machine Edition, GE',
    'GE IP Series (90-70) -Proficy Machine Edition, GE',
    'TwinCAT 2, TwinCAT 3, BECKHOFF',
    'FA-M3, YOKOGAWA',
    'ControlWave Micro, EMERSON',
    'VersaMax Micro, EMERSON',
    'V Series PLC, TOSHIBA',
    'CS Series PLC, Omron',
    'NX Series PLC, Omron'
]
dataArraySCADA = [
    'Cimplicity, GE',
    'iFix, GE',
    'Proficy, GE',
    'Factory Talk View, Rockwell',
    'RSView, Rockwell',
    'Citect Scada, Schneider',
    'Intouch, Wonderware',
    'FoxBoro, Schneider',
    'Indusoft Webstudio',
    'WinCC, Siemens',
    'DigiVis 500, ABB',
    'AdvantABB 500 xA, ABB',
    'FAST/TOOLS, YOKOGAWA',
    'ALSTOM GRID',
    'Zenon, COPADATA',
    'GENESYS32, GENESYS64, iconics',
    'Experion, Honeywell',
    'OpenEnterprise SCADA, EMERSON',
    'Custom SCADA'
]

roleData = {
    '2B': 'Operations Executive',
    '2A': 'Senior Operations Executive',
    '3B': 'Systems Engineer',
    '3A': 'Senior Systems Engineer',
    '4': 'Technology Analyst',
    '5': 'Technology Lead',
    '6B': 'Project Manager',
    '6A': ['Senior Project Manager', 'Group Project Manager'],
    '7': 'Delivery Manager',
    '8': ['AVP', 'VP', 'SVP', 'EVP']
}

function writeGeneratedData() {
    fs.writeFile('../generatedData/DCSSkills.csv', dataArrayDCS.join('\r\n'), function (err) {
        if (err)
            console.log(err);
    })
    fs.writeFile('../generatedData/DomainSkills.csv', dataArrayDomain.join('\r\n'), function (err) {
        if (err) console.log(err);
    })
    fs.writeFile('../generatedData/HMISkills.csv', dataArrayHMI.join('\r\n'), function (err) {
        if (err) console.log(err);
    })
    fs.writeFile('../generatedData/PLCSkills.csv', dataArrayPLC.join('\r\n'), function (err) {
        if (err) console.log(err);
    })
    fs.writeFile('../generatedData/SCADASkills.csv', dataArraySCADA.join('\r\n'), function (err) {
        if (err) console.log(err);
    })
}
exports.generateData = (noOfData=1) => {
    let detailsdb1=[
    {
        employeeId: "1000",
        employeeName: "User 1",
        employeeEmail: "user1@gmail.com",
        contactNo: 9999999999,
        allocatedToProject: { allocation: true,projectName:"2RAND" , percentageAllocation: 7 },
        totalExperience: 2.0,
        infosysExperience: 1.2,
        controlSystemExperience: 1.2,
        jobLevel: 3,
        currentRole: 'Senior Systems Engineer',
        domain: [{ domain: 'Oil and Gas', experience: 1.5 }],
        plcSkills: [{ plcSkill: 'S7 200 XXX- MicroWIN/SMART, Siemens', experience: 0.5 },
        { plcSkill: 'S7 1200, S7 1500 - TIA Portal, Siemens', experience: 1.0 }],
        scadaSkills: [],
        dcsSkills: [{ dcsSkill: 'PCS-7, Siemens', experience: 0.5 },
        { dcsSkill: 'MARK-VI, GE', experience: 1.0 },
        { dcsSkill: 'ASPA, Alstom', experience: 0.2 },
        { dcsSkill: '800XA, ABB', experience: 0.8 }],
        hmiSkills: [],
        otherSkills: [],
    },
]
    for (let myVar = 0; myVar < noOfData; myVar++) {
        let a = [], b = [];
        let test = {}
        min = 0;
        detailsdb1.forEach(v => { a.push(Number(v.employeeId)); b.push(v.contactNo) })
        t = Math.max(...a) + 1, t1 = Math.min(...b) - 1;
        test.employeeId = String(t);
        test.contactNo = t1;
        test.employeeName = "User " + (test.employeeId - 999);
        test.employeeEmail = 'user' + (test.employeeId - 999) + '@gmail.com'
        let probability=[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,5,5,6,6,7,8]
        test.jobLevel = probability[Math.floor(Math.random()*probability.length)];
        min = test.jobLevel;
        max = min * min / 1.6;
        if (max > 30)
            max = 30;
        if (min == 3 || min == 2)
            min = 0;
        if (min > 6)
            min = min * 2;
        role = []
        Object.keys(roleData).forEach(v => {
            if (v.includes(String(test.jobLevel))) {
                if (typeof (roleData[v]) == 'object')
                    roleData[v].forEach(val => role.push(val))
                else
                    role.push(roleData[v])
            }

        })
        test.currentRole = role[Math.floor(Math.random() * (role.length - 1 - 0 + 1))];

        test.allocatedToProject = { allocation: (Math.floor(Math.random() * (1 - 0 + 1))) ? true : false }
        if (test.allocatedToProject.allocation)
            {
                test.allocatedToProject.projectName=(Math.floor(Math.random() * (9 - 1 + 1)) + 1)+"RAND";
                test.allocatedToProject.percentageAllocation = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
            }
        test.totalExperience = (Number(((Math.random() * (max - min + 1)) + min).toFixed(1)));
        test.infosysExperience = (Number(((Math.random() * (test.totalExperience - 0 + 1)) + 0).toFixed(1)))
        test.controlSystemsExperience = Number((((Math.random() * (test.totalExperience - 0 + 1)) + 0).toFixed(1)))
        max = dataArrayDomain.length - 1;
        min = 0; test.domain = [];
        test.plcSkills = [];
        test.scadaSkills = [];
        test.dcsSkills = [];
        test.hmiSkills = [];
        for (let i = 0; i < Math.floor(Math.random() * (dataArrayDomain.length - min + 1)) + min; i++) {
            max = dataArrayDomain.length - 1;
            let tt = 0;
            t = Math.floor(Math.random() * (max - min + 1)) + min;
            test.domain.forEach(v => {
                if (v.domain == dataArrayDomain[t])
                    tt = 1;
            });
            if (!tt)
                test.domain.push({
                    domain: dataArrayDomain[t],
                    experience: Number((Math.random() * (test.totalExperience - min + 1) + min).toFixed(1))
                })
        }
        for (let i = 0; i < Math.floor(Math.random() * (dataArrayPLC.length - min + 1)) + min; i++) {
            max = dataArrayPLC.length - 1;
            let tt = 0;
            t = Math.floor(Math.random() * (max - min + 1)) + min;
            test.plcSkills.forEach(v => {
                if (v.plcSkill == dataArrayPLC[t])
                    tt = 1;
            });
            if (!tt)
                test.plcSkills.push({
                    plcSkill: dataArrayPLC[t],
                    experience: Number((Math.random() * (test.totalExperience - min + 1) + min).toFixed(1))
                })
        }
        for (let i = 0; i < Math.floor(Math.random() * (dataArraySCADA.length - min + 1)) + min; i++) {
            max = dataArraySCADA.length - 1;
            let tt = 0;
            t = Math.floor(Math.random() * (max - min + 1)) + min;
            test.scadaSkills.forEach(v => {
                if (v.scadaSkill == dataArraySCADA[t])
                    tt = 1;
            });
            if (!tt)
                test.scadaSkills.push({
                    scadaSkill: dataArraySCADA[t],
                    experience: Number((Math.random() * (test.totalExperience - min + 1) + min).toFixed(1))
                })
        }
        for (let i = 0; i < Math.floor(Math.random() * (dataArrayDCS.length - min + 1)) + min; i++) {
            max = dataArrayDCS.length - 1;
            let tt = 0;
            t = Math.floor(Math.random() * (max - min + 1)) + min;
            test.dcsSkills.forEach(v => {
                if (v.dcsSkill == dataArrayDCS[t])
                    tt = 1;
            });
            if (!tt)
                test.dcsSkills.push({
                    dcsSkill: dataArrayDCS[t],
                    experience: Number((Math.random() * (test.totalExperience - min + 1) + min).toFixed(1))
                })
        }
        for (let i = 0; i < (Math.floor(Math.random() * (dataArrayHMI.length - min + 1)) + min); i++) {
            max = dataArrayHMI.length - 1;
            let tt = 0;
            t = Math.floor(Math.random() * (max - min + 1)) + min;
            test.hmiSkills.forEach(v => {
                if (v.hmiSkill == dataArrayHMI[t])
                    tt = 1;
            });
            if (!tt)
                test.hmiSkills.push({
                    hmiSkill: dataArrayHMI[t],
                    experience: Number((Math.random() * (test.totalExperience - min + 1) + min).toFixed(1))
                })
        }
        detailsdb1.push(test)
    }
    return detailsdb1;
}
// exports.readUsers();