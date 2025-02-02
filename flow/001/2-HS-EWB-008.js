const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var mongodbINS = require('../../function/mongodbINS');
var mssql = require('../../function/mssql');
var request = require('request');
const axios = require("../../function/axios");

//----------------- date

const d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });;
let day = d;

function evil(fn) {
  return new Function('return ' + fn)();
}

//----------------- SETUP

let NAME_INS = 'HS-EWB-008'

//----------------- DATABASE

let MAIN_DATA = 'MAIN_DATA';
let MAIN = 'MAIN';

let PATTERN = 'PATTERN';
let PATTERN_01 = 'PATTERN_01';
let GRAPH_TABLE = 'GRAPH_TABLE';
let master_FN = 'master_FN';
let ITEMs = 'ITEMs';
let METHOD = 'METHOD';
let MACHINE = 'MACHINE';
let UNIT = 'UNIT';
let CAL1 = 'CALCULATE';

let HSEWB008 = "HSEWB008";

//----------------- dynamic

let finddbbuffer = [{}];

let HSEWB008db = {
  "INS": NAME_INS,
  "PO": "",
  "CP": "",
  "MATCP": '',
  "QTY": "",
  "PROCESS": "",
  "CUSLOT": "",
  "TPKLOT": "",
  "FG": "",
  "CUSTOMER": "",
  "PART": "",
  "PARTNAME": "",
  "MATERIAL": "",
  //---new
  "QUANTITY": '',
  // "PROCESS": '',
  "CUSLOTNO": '',
  "FG_CHARG": '',
  "PARTNAME_PO": '',
  "PART_PO": '',
  "CUSTNAME": '',
  //-------
  "ItemPick": [],
  "ItemPickcode": [],
  "POINTs": "",
  "PCS": "",
  "PCSleft": "",

  "SPEC": "",

  "UNIT": "",
  "INTERSEC": "",
  "RESULTFORMAT": "",
  "GRAPHTYPE": "",
  "GAP": "",
  "GAPname": '',
  "GAPnameList": [],
  "GAPnameListdata": ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  //---------
  "preview": [],
  "confirmdata": [],
  "ITEMleftUNIT": [],
  "ITEMleftVALUE": [],
  //
  "MeasurmentFOR": "FINAL",
  "inspectionItem": "", //ITEMpice
  "inspectionItemNAME": "",
  "tool": NAME_INS,
  "value": [],  //key: PO1: itemname ,PO2:V01,PO3: V02,PO4: V03,PO5:V04,P06:INS,P9:NO.,P10:TYPE, last alway mean P01:"MEAN",PO2:V01,PO3:V02-MEAN,PO4: V03,PO5:V04-MEAN
  "dateupdatevalue": day,
  "INTERSEC_ERR": 0,
  "K1b": '',
  "K1v": '',
  "FORMULA": '',
  "ANSCAL2": '',
  "confirmdataCW": [
    {
      "VAL1": "",
      "VAL2": "",
      "VAL3": "",
      "VAL4": "",
      "Aear": "",
      "FORMULA": "",
      "ANSCAL2": '',
      "var": "",
    },

  ],
  //----------------------
  "USER": '',
  "USERID": '',
  "FREQUENCY": "",

  "REFLOT": "",
}



router.get('/FINAL/CHECK-HSEWB008', async (req, res) => {

  return res.json(HSEWB008db['PO']);
});


router.post('/FINAL/HSEWB008db', async (req, res) => {
  //-------------------------------------
  // console.log('--HSEWB008db--');
  // console.log(req.body);
  //-------------------------------------
  let finddb = [{}];
  try {

    // "PCS": "",
    // "PCSleft": "",
    //


    // console.log(HSEWB008db['inspectionItem'])

    // if(HSEWB008db['FREQUENCY'].includes('/6M')){
    //   if (HSEWB008db['RESULTFORMAT'] === 'CAL1' || HSEWB008db['RESULTFORMAT'] === 'CAL2') {
    //     let feedbackLast = await mongodb.find("BUFFERCAL", HSEWB008, { "CP": HSEWB008db['CP'] });
    //     if (feedbackLast.length > 0) {
    //       HSEWB008db['confirmdataCW'][0]['VAL1'] = feedbackLast[0]['VAL1'];
    //       HSEWB008db['confirmdataCW'][0]['VAL2'] = feedbackLast[0]['VAL2'];
    //       HSEWB008db['confirmdataCW'][0]['VAL3'] = feedbackLast[0]['VAL3'];
    //       HSEWB008db['confirmdataCW'][0]['VAL4'] = feedbackLast[0]['VAL4'];
    //       HSEWB008db['confirmdataCW'][0]['Area'] = feedbackLast[0]['Area'];
    //       HSEWB008db['confirmdataCW'][0]['FORMULA'] = feedbackLast[0]['FORMULA'];

    //     }
    //   } else {
    //     HSEWB008db['confirmdataCW'][0]['VAL1'] = "";
    //     HSEWB008db['confirmdataCW'][0]['VAL2'] = "";
    //     HSEWB008db['confirmdataCW'][0]['VAL3'] = "";
    //     HSEWB008db['confirmdataCW'][0]['VAL4'] = "";
    //     HSEWB008db['confirmdataCW'][0]['Area'] = "";
    //     HSEWB008db['confirmdataCW'][0]['FORMULA'] = "";
    //   }
    // }else{
    if (HSEWB008db['RESULTFORMAT'] === 'CAL1' || HSEWB008db['RESULTFORMAT'] === 'CAL2') {
      let feedbackLast = await mongodb.find("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'] });
      if (feedbackLast.length > 0) {
        HSEWB008db['confirmdataCW'][0]['VAL1'] = feedbackLast[0]['VAL1'];
        HSEWB008db['confirmdataCW'][0]['VAL2'] = feedbackLast[0]['VAL2'];
        HSEWB008db['confirmdataCW'][0]['VAL3'] = feedbackLast[0]['VAL3'];
        HSEWB008db['confirmdataCW'][0]['VAL4'] = feedbackLast[0]['VAL4'];
        HSEWB008db['confirmdataCW'][0]['Area'] = feedbackLast[0]['Area'];
        HSEWB008db['confirmdataCW'][0]['FORMULA'] = feedbackLast[0]['FORMULA'];

      }
    } else {
      HSEWB008db['confirmdataCW'][0]['VAL1'] = "";
      HSEWB008db['confirmdataCW'][0]['VAL2'] = "";
      HSEWB008db['confirmdataCW'][0]['VAL3'] = "";
      HSEWB008db['confirmdataCW'][0]['VAL4'] = "";
      HSEWB008db['confirmdataCW'][0]['Area'] = "";
      HSEWB008db['confirmdataCW'][0]['FORMULA'] = "";
    }
    // }



    finddb = HSEWB008db;
    finddbbuffer = finddb;
  }
  catch (err) {
    finddb = finddbbuffer;
  }
  //-------------------------------------
  return res.json(finddb);
});

router.post('/FINAL/GETINtoHSEWB008', async (req, res) => {
  //-------------------------------------
  console.log('--GETINtoHSEWB008--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  check = HSEWB008db;
  if (input['PO'] !== undefined && input['CP'] !== undefined && check['PO'] === '' && input['USER'] !== undefined && input['USERID'] !== undefined) {
    // let dbsap = await mssql.qurey(`select * FROM [SAPData_GW_GAS].[dbo].[tblSAPDetail] where [PO] = ${input['PO']}`);

    let findPO = await mongodb.findSAP('mongodb://172.23.10.39:12020', "ORDER", "ORDER", {});

    let cuslot = '';

    //&& findPO[0][`DATA`].length > 0
    if (findPO[0][`DATA`] != undefined) {
      let dbsap = ''
      for (i = 0; i < findPO[0][`DATA`].length; i++) {
        if (findPO[0][`DATA`][i][`PO`] === input['PO']) {
          dbsap = findPO[0][`DATA`][i];
          // break;
          cuslot = cuslot + findPO[0][`DATA`][i][`CUSLOTNO`] + ','
        }
      }

      if (dbsap === '') {
        // try {
        //   let resp = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_QC_INTERFACE', {
        //     "BAPI_NAME": "ZPPIN011_OUT",
        //     "IMP_TEXT02": input['PO'] ,
        //     "TABLE_NAME": "PPORDER"
        //   });
        //   // if (resp.status == 200) {
        //     let returnDATA = resp;
        //     // output = returnDATA["Records"] || []
        //      console.log(returnDATA["Records"])
        //      if(returnDATA["Records"].length>0){


        //       dataout = {
        //       'PO':`${parseInt(returnDATA["Records"][0]['PO'])}`,
        //       'SEQUENCE':returnDATA["Records"][0]['SEQ'],
        //       'CP':`${parseInt(returnDATA["Records"][0]['CPMAT'])}`,
        //       'FG': `${parseInt(returnDATA["Records"][0]['FGMAT'])}`,
        //       'STATUS': returnDATA["Records"][0]['STA'],
        //       'QUANTITY': returnDATA["Records"][0]['QTYT'],
        //       'UNIT': returnDATA["Records"][0]['UNIT'],
        //       'COSTCENTER': returnDATA["Records"][0]['CUSTNA'],

        //       'PART': returnDATA["Records"][0]['PARTNO'],
        //       'PARTNAME': returnDATA["Records"][0]['PARTNA'],
        //       'MATERIAL': returnDATA["Records"][0]['MATNA'],
        //       'CUSTOMER': returnDATA["Records"][0]['CUSLOTNO'],
        //       'PROCESS': returnDATA["Records"][0]['PROC'],
        //       'WGT_PC':returnDATA["Records"][0]['WEIGHT_PC'],
        //       'WGT_JIG': returnDATA["Records"][0]['WEIGHT_JIG'],
        //       'ACTQTY': returnDATA["Records"][0]['ACT_QTY'],
        //       'CUSLOTNO': returnDATA["Records"][0]['CUSLOTNO'],
        //       'FG_CHARG': returnDATA["Records"][0]['FG_CHARG'],
        //       'CUSTNAME':returnDATA["Records"][0]['CUST_FULLNM'],
        //     };


        //       dbsap = dataout
        //      }
        //   // }
        // } catch (err) {
        //   output = [];
        // }
        try {
          let resp = await axios.post('http://172.23.10.40:16700/RAWDATA/sapget', {
            "ORDER": input['PO'],
          });
          let returnDATA = resp;
          // output = returnDATA["Records"] || []
          if (returnDATA.length > 0) {


            dataout = {
              'PO': `${parseInt(returnDATA[0]['PO'])}`,
              'SEQUENCE': returnDATA[0]['SEQ'],
              'CP': `${parseInt(returnDATA[0]['CPMAT'])}`,
              'FG': `${parseInt(returnDATA[0]['FGMAT'])}`,
              'STATUS': returnDATA[0]['STA'],
              'QUANTITY': returnDATA[0]['QTYT'],
              'UNIT': returnDATA[0]['UNIT'],
              'COSTCENTER': returnDATA[0]['CUSTNA'],

              'PART': returnDATA[0]['PARTNO'],
              'PARTNAME': returnDATA[0]['PARTNA'],
              'MATERIAL': returnDATA[0]['MATNA'],
              'CUSTOMER': returnDATA[0]['CUSLOTNO'],
              'PROCESS': returnDATA[0]['PROC'],
              'WGT_PC': returnDATA[0]['WEIGHT_PC'],
              'WGT_JIG': returnDATA[0]['WEIGHT_JIG'],
              'ACTQTY': returnDATA[0]['ACT_QTY'],
              'CUSLOTNO': returnDATA[0]['CUSLOTNO'],
              'FG_CHARG': returnDATA[0]['FG_CHARG'],
              'CUSTNAME': returnDATA[0]['CUST_FULLNM'],
            };

            dbsap = dataout
          }
        } catch (err) {
          output = [];
        }
      }


      if (dbsap !== '') {

        let findcp = await mongodb.find(PATTERN, PATTERN_01, { "CP": input['CP'] });
        let masterITEMs = await mongodb.find(master_FN, ITEMs, {});
        let MACHINEmaster = await mongodb.find(master_FN, MACHINE, {});

        let ItemPickout = [];
        let ItemPickcodeout = [];

        for (i = 0; i < findcp[0]['FINAL'].length; i++) {
          for (j = 0; j < masterITEMs.length; j++) {
            if (findcp[0]['FINAL'][i]['ITEMs'] === masterITEMs[j]['masterID']) {
              ItemPickout.push(masterITEMs[j]['ITEMs']);
              ItemPickcodeout.push({ "key": masterITEMs[j]['masterID'], "value": masterITEMs[j]['ITEMs'], "METHOD": findcp[0]['FINAL'][i]['METHOD'] });
            }
          }
        }

        let ItemPickoutP2 = []
        let ItemPickcodeoutP2 = [];
        for (i = 0; i < ItemPickcodeout.length; i++) {
          for (j = 0; j < MACHINEmaster.length; j++) {
            if (ItemPickcodeout[i]['METHOD'] === MACHINEmaster[j]['masterID']) {
              if (MACHINEmaster[j]['MACHINE'].includes(NAME_INS)) {
                ItemPickoutP2.push(ItemPickout[i]);
                ItemPickcodeoutP2.push(ItemPickcodeout[i]);
              }
            }
          }
        }



        HSEWB008db = {
          "INS": NAME_INS,
          "PO": input['PO'] || '',
          "CP": input['CP'] || '',
          "MATCP": input['CP'] || '',
          "QTY": dbsap['QUANTITY'] || '',
          "PROCESS": dbsap['PROCESS'] || '',
          // "CUSLOT": dbsap['CUSLOTNO'] || '',
          "CUSLOT": cuslot,
          "TPKLOT": dbsap['FG_CHARG'] || '',
          "FG": dbsap['FG'] || '',
          "CUSTOMER": dbsap['CUSTOMER'] || '',
          "PART": dbsap['PART'] || '',
          "PARTNAME": dbsap['PARTNAME'] || '',
          "MATERIAL": dbsap['MATERIAL'] || '',
          //---new
          "QUANTITY": dbsap['QUANTITY'] || '',
          // "PROCESS":dbsap ['PROCESS'] || '',
          // "CUSLOTNO": dbsap['CUSLOTNO'] || '',
          "CUSLOTNO": cuslot,
          "FG_CHARG": dbsap['FG_CHARG'] || '',
          "PARTNAME_PO": dbsap['PARTNAME_PO'] || '',
          "PART_PO": dbsap['PART_PO'] || '',
          "CUSTNAME": dbsap['CUSTNAME'] || '',
          //----------------------
          "ItemPick": ItemPickoutP2, //---->
          "ItemPickcode": ItemPickcodeoutP2, //---->
          "POINTs": "",
          "PCS": "",
          "PCSleft": "",

          "SPEC": "",

          "UNIT": "",
          "INTERSEC": "",
          "RESULTFORMAT": "",
          "GRAPHTYPE": "",
          "GAP": "",
          "GAPname": '',
          "GAPnameList": [],
          "GAPnameListdata": ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          //----------------------
          "preview": [],
          "confirmdata": [],
          "ITEMleftUNIT": [],
          "ITEMleftVALUE": [],
          //
          "MeasurmentFOR": "FINAL",
          "inspectionItem": "", //ITEMpice
          "inspectionItemNAME": "",
          "tool": NAME_INS,
          "value": [],  //key: PO1: itemname ,PO2:V01,PO3: V02,PO4: V03,PO5:V04,P06:INS,P9:NO.,P10:TYPE, last alway mean P01:"MEAN",PO2:V01,PO3:V02-MEAN,PO4: V03,PO5:V04-MEAN
          "dateupdatevalue": day,
          "INTERSEC_ERR": 0,
          "K1b": '',
          "K1v": '',
          "FORMULA": '',
          "ANSCAL2": '',
          "confirmdataCW": [{
            "VAL1": "",
            "VAL2": "",
            "VAL3": "",
            "VAL4": "",
            "Aear": "",
            "FORMULA": "",
            "var": "",
          }],
          //----------------------
          "USER": input['USER'],
          "USERID": input['USERID'],
          "FREQUENCY": "",

          "REFLOT": "",
        }

        output = 'OK';


      } else {
        output = 'NOK';
      }

    } else {
      output = 'NOK';
    }

  } else {
    output = 'NOK';
  }


  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSEWB008-geteachITEM', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-geteachITEM--');
  console.log(req.body);
  let inputB = req.body;

  let ITEMSS = '';
  let output = 'NOK';

  for (i = 0; i < HSEWB008db['ItemPickcode'].length; i++) {
    if (HSEWB008db['ItemPickcode'][i]['value'] === inputB['ITEMs']) {
      ITEMSS = HSEWB008db['ItemPickcode'][i]['key'];
    }
  }


  if (ITEMSS !== '') {

    //-------------------------------------
    HSEWB008db['inspectionItem'] = ITEMSS;
    HSEWB008db['inspectionItemNAME'] = inputB['ITEMs'];
    let input = { 'PO': HSEWB008db["PO"], 'CP': HSEWB008db["CP"], 'ITEMs': HSEWB008db['inspectionItem'] };
    //-------------------------------------
    if (input['PO'] !== undefined && input['CP'] !== undefined && input['ITEMs'] !== undefined) {
      let findcp = await mongodb.find(PATTERN, PATTERN_01, { "CP": input['CP'] });
      let UNITdata = await mongodb.find(master_FN, UNIT, {});
      let masterITEMs = await mongodb.find(master_FN, ITEMs, { "masterID": HSEWB008db['inspectionItem'] });

      for (i = 0; i < findcp[0]['FINAL'].length; i++) {
        if (findcp[0]['FINAL'][i]['ITEMs'] === input['ITEMs']) {

          // output = [{
          //   "RESULTFORMAT": findcp[0]['FINAL'][i]['RESULTFORMAT'],
          //   "GRAPHTYPE": findcp[0]['FINAL'][i]['GRAPHTYPE'],
          //   "INTERSECTION": findcp[0]['FINAL'][i]['INTERSECTION'],
          //   "DOCUMENT": findcp[0]['FINAL'][i]['DOCUMENT'],
          //   "SPECIFICATION": findcp[0]['FINAL'][i]['SPECIFICATION'],
          //   "POINTPCS": findcp[0]['FINAL'][i]['POINTPCS'],
          //   "POINT": findcp[0]['FINAL'][i]['POINT'],
          //   "PCS": findcp[0]['FINAL'][i]['PCS'],
          //   "FREQUENCY": findcp[0]['FINAL'][i]['FREQUENCY'],
          //   "MODE": findcp[0]['FINAL'][i]['MODE'],
          //   "REMARK": findcp[0]['FINAL'][i]['REMARK'],
          //   "LOAD": findcp[0]['FINAL'][i]['LOAD'],
          //   "CONVERSE": findcp[0]['FINAL'][i]['CONVERSE'],
          // }]







          if (masterITEMs.length > 0) {
            //

            HSEWB008db["RESULTFORMAT"] = masterITEMs[0]['RESULTFORMAT']
            HSEWB008db["GRAPHTYPE"] = masterITEMs[0]['GRAPHTYPE']
            //------------------------------------

            let graph = await mongodb.find(PATTERN, GRAPH_TABLE, {});
            HSEWB008db['GAPnameList'] = [];
            for (k = 0; k < graph.length; k++) {
              HSEWB008db['GAPnameList'].push(graph[k]['NO']);
            }
          }

          for (j = 0; j < UNITdata.length; j++) {
            if (findcp[0]['FINAL'][i]['UNIT'] == UNITdata[j]['masterID']) {
              HSEWB008db["UNIT"] = UNITdata[j]['UNIT'];
            }
          }

          console.log(findcp[0]['FINAL'][i]['POINT']);
          console.log(findcp[0]['FINAL'][i])


          HSEWB008db["POINTs"] = findcp[0]['FINAL'][i]['POINT'];
          HSEWB008db["PCS"] = findcp[0]['FINAL'][i]['PCS'];
          HSEWB008db["PCSleft"] = findcp[0]['FINAL'][i]['PCS'];
          HSEWB008db["shape"] = findcp[0]['FINAL'][i]['shape']

          HSEWB008db["SPEC"] = '';
          if (findcp[0]['FINAL'][i]['SPECIFICATIONve'] !== undefined) {
            if (findcp[0]['FINAL'][i]['SPECIFICATIONve']['condition'] === 'BTW') {
              HSEWB008db["SPEC"] = `${findcp[0]['FINAL'][i]['SPECIFICATIONve']['BTW_LOW']}-${findcp[0]['FINAL'][i]['SPECIFICATIONve']['BTW_HI']}`;
            } else if (findcp[0]['FINAL'][i]['SPECIFICATIONve']['condition'] === 'HIM(>)') {
              HSEWB008db["SPEC"] = `>${findcp[0]['FINAL'][i]['SPECIFICATIONve']['HIM_L']}`;
            } else if (findcp[0]['FINAL'][i]['SPECIFICATIONve']['condition'] === 'LOL(<)') {
              HSEWB008db["SPEC"] = `<${findcp[0]['FINAL'][i]['SPECIFICATIONve']['LOL_H']}`;
            } else if (findcp[0]['FINAL'][i]['SPECIFICATIONve']['condition'] === 'Actual') {
              HSEWB008db["SPEC"] = 'Actual';
            }
          }

          HSEWB008db["K1b"] = findcp[0]['FINAL'][i]['K1b'];
          HSEWB008db["K1v"] = findcp[0]['FINAL'][i]['K1v'];
          // "FREQUENCY":"",
          HSEWB008db["FREQUENCY"] = findcp[0]['FINAL'][i]['FREQUENCY'];
          console.log(HSEWB008db["FREQUENCY"])

          HSEWB008db["INTERSEC"] = masterITEMs[0]['INTERSECTION'];

          let masterITEMsC = await mongodb.find(master_FN, ITEMs, { "masterID": HSEWB008db['inspectionItem'] });
          console.log(masterITEMsC);
          if (masterITEMsC.length > 0) {

            if (masterITEMsC[0]['CALCULATE'] !== '') {

              let masterCALCULATE = await mongodb.find(master_FN, CAL1, { "masterID": masterITEMsC[0]['CALCULATE'] });
              if (masterCALCULATE.length > 0) {
                console.log(masterCALCULATE[0]);

                HSEWB008db["FORMULA"] = masterCALCULATE[0]["FORMULA"]
              }
            }
          }

          HSEWB008db["ANSCAL2"] = '';

          let date =  Date.now()
          let REFLOT = await mongodb.find(PATTERN, "referdata", { "MATCP": HSEWB008db['MATCP'], "ITEMS": ITEMSS,"EXP":{$gt:date} });

          console.log(REFLOT)

          if (REFLOT.length > 0) {
            HSEWB008db["REFLOT"] = REFLOT[0]['TPKLOT'];
          }




          output = 'OK';
          let findpo = await mongodb.find(MAIN_DATA, MAIN, { "PO": input['PO'] });
          if (findpo.length > 0) {
            request.post(
              'http://127.0.0.1:16090/FINAL/HSEWB008-feedback',
              { json: { "PO": HSEWB008db['PO'], "ITEMs": HSEWB008db['inspectionItem'] } },
              function (error, response, body2) {
                if (!error && response.statusCode == 200) {
                  // console.log(body2);
                  if (body2 === 'OK') {
                    // output = 'OK';
                  }
                }
              }
            );


          }
          break;
        }
      }
    }

  } else {
    HSEWB008db["POINTs"] = '';
    HSEWB008db["PCS"] = '';
    HSEWB008db["ANSCAL2"] = '';

    HSEWB008db["SPEC"] = '';

    HSEWB008db["PCSleft"] = '';
    HSEWB008db["UNIT"] = "";
    HSEWB008db["INTERSEC"] = "";
    HSEWB008db["RESULTFORMAT"] = "";
    HSEWB008db["K1b"] = "";
    HSEWB008db["K1v"] = "";
    HSEWB008db["FORMULA"] = "";
    output = 'NOK';
    HSEWB008db["FREQUENCY"] = '';
    HSEWB008db["REFLOT"] = '';
  }

  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSEWB008-geteachGRAPH', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-geteachGRAPH--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  try {
    let graph = await mongodb.find(PATTERN, GRAPH_TABLE, { "NO": input['GAPname'] });
    console.log(graph);
    HSEWB008db['GAPnameListdata'] = graph[0];//confirmdata
    HSEWB008db['GAP'] = HSEWB008db['GAPnameListdata'][`GT${HSEWB008db['confirmdata'].length + 1}`]
  }
  catch (err) {

  }
  //-------------------------------------
  return res.json('ok');
});

router.post('/FINAL/HSEWB008-preview', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-preview--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  if (input.length > 0) {
    if (input[0]['V1'] !== undefined) {
      //-------------------------------------
      try {
        HSEWB008db['preview'] = input;
        output = 'OK';
      }
      catch (err) {
        output = 'NOK';
      }
      //-------------------------------------
    } else {
      output = 'NOK';
    }
  } else {
    HSEWB008db['preview'] = [];
    output = 'clear';
  }
  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSEWB008-preview-aear', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-preview--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  if (input.length > 0) {
    if (input[0]['AEAR'] !== undefined) {
      //-------------------------------------
      try {
        console.log(`---------------${input[0]['AEAR']}`);
        HSEWB008db['K1v'] = input[0]['AEAR'];
        output = 'OK';
      }
      catch (err) {
        output = 'NOK';
      }
      //-------------------------------------
    } else {
      output = 'NOK';
    }
  } else {
    HSEWB008db['preview'] = [];
    output = 'clear';
  }
  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSEWB008-confirmdata', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-confirmdata--');
  console.log(req.body);
  // let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  try {
    // let datapush = HSEWB008db['preview'][0]

    // if (HSEWB008db['RESULTFORMAT'] === 'Graph') {
    //   let pushdata = HSEWB008db['preview'][0]

    //   pushdata['V5'] = HSEWB008db['GAP'];
    //   pushdata['V1'] = `${HSEWB008db['confirmdata'].length + 1}:${pushdata['V1']}`;

    //   if(HSEWB008db['GAP'] !=''){

    //     HSEWB008db['confirmdata'].push(pushdata);
    //     HSEWB008db['preview'] = [];
    //     output = 'OK';
    //     HSEWB008db['GAP'] = HSEWB008db['GAPnameListdata'][`GT${HSEWB008db['confirmdata'].length + 1}`]
    //   }else{
    //     output = 'NOK';
    //   }


    // } else if (HSEWB008db['RESULTFORMAT'] === 'Number') {

    //   let pushdata = HSEWB008db['preview'][0]

    //   pushdata['V5'] = HSEWB008db['confirmdata'].length + 1
    //   pushdata['V1'] = `${HSEWB008db['confirmdata'].length + 1}:${pushdata['V1']}`

    //   HSEWB008db['confirmdata'].push(pushdata);
    //   HSEWB008db['preview'] = [];
    //   output = 'OK';
    // }

    if (HSEWB008db['RESULTFORMAT'] === 'CAL1') {

      let pushdata = HSEWB008db['preview'][0]
      // pushdata['V5'] = HSEWB008db['confirmdata'].length + 1
      // pushdata['V1'] = `${HSEWB008db['confirmdata'].length + 1}:${pushdata['V1']}`

      // HSEWB008db['confirmdata'].push(pushdata);
      // HSEWB008db['preview'] = [];
      console.log(pushdata);


      let feedback = await mongodb.find("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'] });

      console.log(feedback);
      if (feedback.length > 0) {
        console.log("-----------------1");
        if (feedback[0]['VAL1'] != '' && feedback[0]['VAL2'] == '') {
          console.log("-----------------2");
          let feedbackupdate = await mongodb.update("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'], "POINTs": HSEWB008db['POINTs'], "PCSleft": HSEWB008db['PCSleft'], 'NO': HSEWB008db["PCS"] }, { "$set": { 'VAL2': pushdata['V2'] } });
        }

      } else {

        let areadata = ''
        // if (HSEWB008db['K1b'] === '1') {
        areadata = HSEWB008db['K1v']
        // }
        var ins = await mongodb.insertMany("BUFFERCAL", HSEWB008, [{ "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'], "POINTs": HSEWB008db['POINTs'], "PCSleft": HSEWB008db['PCSleft'], "FG": HSEWB008db['FG'], 'VAL1': pushdata['V2'], 'VAL2': "", 'VAL3': "", 'VAL4': "", 'Area': areadata, 'FORMULA': HSEWB008db["FORMULA"], 'NO': HSEWB008db["PCS"] }]);
      }

      HSEWB008db['preview'] = [];
      let feedbackLast = await mongodb.find("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'], });
      if (feedbackLast.length > 0) {
        HSEWB008db['confirmdataCW'][0]['VAL1'] = feedbackLast[0]['VAL1'];
        HSEWB008db['confirmdataCW'][0]['VAL2'] = feedbackLast[0]['VAL2'];
        HSEWB008db['confirmdataCW'][0]['VAL3'] = feedbackLast[0]['VAL3'];
        HSEWB008db['confirmdataCW'][0]['VAL4'] = feedbackLast[0]['VAL4'];
        HSEWB008db['confirmdataCW'][0]['Area'] = feedbackLast[0]['Area'];

      }
      output = 'OK';
    }
    if (HSEWB008db['RESULTFORMAT'] === 'CAL2') {

      let pushdata = HSEWB008db['preview'][0]
      // pushdata['V5'] = HSEWB008db['confirmdata'].length + 1
      // pushdata['V1'] = `${HSEWB008db['confirmdata'].length + 1}:${pushdata['V1']}`

      // HSEWB008db['confirmdata'].push(pushdata);
      // HSEWB008db['preview'] = [];
      console.log(pushdata);


      let feedback = await mongodb.find("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'] });
      console.log("-----------");
      console.log(feedback);
      if (feedback.length > 0) {
        console.log("-----------------1");
        if (feedback[0]['VAL1'] != '' && feedback[0]['VAL2'] == '') {
          console.log("-----------------2");
          let feedbackupdate = await mongodb.update("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'], "POINTs": HSEWB008db['POINTs'], "PCSleft": HSEWB008db['PCSleft'], 'NO': HSEWB008db["PCS"] }, { "$set": { 'VAL2': pushdata['V2'] } });
        } else if (feedback[0]['VAL1'] != '' && feedback[0]['VAL2'] != '' && feedback[0]['VAL3'] == '') {
          console.log("-----------------2");
          let feedbackupdate = await mongodb.update("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'], "POINTs": HSEWB008db['POINTs'], "PCSleft": HSEWB008db['PCSleft'], 'NO': HSEWB008db["PCS"] }, { "$set": { 'VAL3': pushdata['V2'] } });
        } if (feedback[0]['VAL1'] != '' && feedback[0]['VAL2'] != '' && feedback[0]['VAL3'] != '' && feedback[0]['VAL4'] == '') {
          console.log("-----------------2");
          let feedbackupdate = await mongodb.update("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'], "POINTs": HSEWB008db['POINTs'], "PCSleft": HSEWB008db['PCSleft'], 'NO': HSEWB008db["PCS"] }, { "$set": { 'VAL4': pushdata['V2'] } });
        }

      } else {

        let areadata = ''
        // if (HSEWB008db['K1b'] === '1') {
        areadata = HSEWB008db['K1v']
        // }
        var ins = await mongodb.insertMany("BUFFERCAL", HSEWB008, [{ "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'], "POINTs": HSEWB008db['POINTs'], "PCSleft": HSEWB008db['PCSleft'], 'VAL1': pushdata['V2'], 'VAL2': "", 'VAL3': "", 'VAL4': "", 'Area': areadata, 'FORMULA': HSEWB008db["FORMULA"], 'NO': HSEWB008db["PCS"] }]);
      }

      HSEWB008db['preview'] = [];
      let feedbackLast = await mongodb.find("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'], });
      if (feedbackLast.length > 0) {
        HSEWB008db['confirmdataCW'][0]['VAL1'] = feedbackLast[0]['VAL1'];
        HSEWB008db['confirmdataCW'][0]['VAL2'] = feedbackLast[0]['VAL2'];
        HSEWB008db['confirmdataCW'][0]['VAL3'] = feedbackLast[0]['VAL3'];
        HSEWB008db['confirmdataCW'][0]['VAL4'] = feedbackLast[0]['VAL4'];
        HSEWB008db['confirmdataCW'][0]['Area'] = feedbackLast[0]['Area'];

      }
      output = 'OK';
    }
  }
  catch (err) {
    output = 'NOK';
  }
  //-------------------------------------
  return res.json(output);
});



router.post('/FINAL/HSEWB008-feedback', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-feedback--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';

  //-------------------------------------

  if (input["PO"] !== undefined && input["ITEMs"] !== undefined) {
    let feedback = await mongodb.find(MAIN_DATA, MAIN, { "PO": input['PO'] });
    if (feedback.length > 0 && feedback[0]['FINAL'] != undefined && feedback[0]['FINAL'][NAME_INS] != undefined && feedback[0]['FINAL'][NAME_INS][input["ITEMs"]] != undefined) {
      // console.log(Object.keys(feedback[0]['FINAL'][NAME_INS][input["ITEMs"]]));
      let oblist = Object.keys(feedback[0]['FINAL'][NAME_INS][input["ITEMs"]]);
      let ob = feedback[0]['FINAL'][NAME_INS][input["ITEMs"]];



      let LISTbuffer = [];
      let ITEMleftVALUEout = [];

      for (i = 0; i < oblist.length; i++) {
        LISTbuffer.push(...ob[oblist[i]])
      }

      HSEWB008db["PCSleft"] = `${parseInt(HSEWB008db["PCS"]) - oblist.length}`;
      if (HSEWB008db['RESULTFORMAT'] === 'Number' || HSEWB008db['RESULTFORMAT'] === 'Text' || HSEWB008db['RESULTFORMAT'] === 'Graph') {
        for (i = 0; i < LISTbuffer.length; i++) {
          if (LISTbuffer[i]['PO1'] === 'Mean') {
            ITEMleftVALUEout.push({ "V1": 'Mean', "V2": `${LISTbuffer[i]['PO3']}` })
          } else {
            ITEMleftVALUEout.push({ "V1": `${LISTbuffer[i]['PO2']}`, "V2": `${LISTbuffer[i]['PO3']}` })
          }

        }



        HSEWB008db["ITEMleftUNIT"] = [{ "V1": "FINAL", "V2": `${oblist.length}` }];
        HSEWB008db["ITEMleftVALUE"] = ITEMleftVALUEout;

      } else {

      }
      // output = 'OK';
      if ((parseInt(HSEWB008db["PCS"]) - oblist.length) == 0) {
        //CHECKlist
        
        //input["ITEMs"] 
        let masterITEMs = await mongodb.find(master_FN, ITEMs, { "masterID": input["ITEMs"] });


        if (feedback[0]['FINAL_ANS'] === undefined) {
          feedback[0]['FINAL_ANS'] = {}
        }
        if (masterITEMs.length > 0) {
          let anslist = [];
          let anslist_con = [];


          if (masterITEMs[0]['RESULTFORMAT'] === 'Number') {
            for (i = 0; i < LISTbuffer.length; i++) {
              if (LISTbuffer[i]['PO1'] === 'Mean') {
                anslist.push(LISTbuffer[i]['PO3'])
                anslist_con.push(LISTbuffer[i]['PO5'])
              }
            }

            let sum1 = anslist.reduce((a, b) => a + b, 0);
            let avg1 = (sum1 / anslist.length) || 0;
            let sum2 = anslist_con.reduce((a, b) => a + b, 0);
            let avg2 = (sum2 / anslist_con.length) || 0;

            feedback[0]['FINAL_ANS'][input["ITEMs"]] = avg1;
            feedback[0]['FINAL_ANS'][`${input["ITEMs"]}_c`] = avg2;

            let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedback[0]['FINAL_ANS'] } });


          } else if (masterITEMs[0]['RESULTFORMAT'] === 'Text') {

          } else if (masterITEMs[0]['RESULTFORMAT'] === 'Graph') {

            if (HSEWB008db['GRAPHTYPE'] == 'CDE') {

              //
              let axis_data = [];
              for (i = 0; i < LISTbuffer.length; i++) {
                if (LISTbuffer[i]['PO1'] !== 'Mean') {
                  axis_data.push({ x: parseFloat(LISTbuffer[i].PO8), y: parseFloat(LISTbuffer[i].PO3) });
                }
              }
              //-----------------core

              let core = 0;
              if (HSEWB008db['INTERSEC'] !== '') {
                core = parseFloat(HSEWB008db['INTERSEC'])
              } else {
                core = parseFloat(axis_data[axis_data.length - 1]['y'])
              }

              //-----------------core
              let RawPoint = [];
              for (i = 0; i < axis_data.length - 1; i++) {
                if (core <= axis_data[i].y && core >= axis_data[i + 1].y) {
                  RawPoint.push({ Point1: axis_data[i], Point2: axis_data[i + 1] });
                  break
                }
              }

              try {
                let pointvalue = RawPoint[0].Point2.x - RawPoint[0].Point1.x;
                let data2 = RawPoint[0].Point1.y - core;
                let data3 = RawPoint[0].Point1.y - RawPoint[0].Point2.y;

                let RawData = RawPoint[0].Point1.x + (data2 / data3 * pointvalue);
                let graph_ans_X = parseFloat(RawData.toFixed(2));

                feedback[0]['FINAL_ANS'][input["ITEMs"]] = graph_ans_X;
                feedback[0]['FINAL_ANS'][`${input["ITEMs"]}_point`] = { "x": graph_ans_X, "y": core };

                let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedback[0]['FINAL_ANS'] } });
              }
              catch (err) {
                HSEWB008db[`INTERSEC_ERR`] = 1;
              }

              //
            } else if (HSEWB008db['GRAPHTYPE'] == 'CDT') {

              //
              let axis_data = [];
              for (i = 0; i < LISTbuffer.length; i++) {
                if (LISTbuffer[i]['PO1'] !== 'Mean') {
                  axis_data.push({ x: parseFloat(LISTbuffer[i].PO8), y: parseFloat(LISTbuffer[i].PO3) });
                }
              }
              //-----------------core

              let core = 0;
              if (HSEWB008db['INTERSEC'] !== '') {
                core = parseFloat(HSEWB008db['INTERSEC'])
              } else {
                // core = parseFloat(axis_data[axis_data.length - 1]['y']) 
                core = parseFloat(axis_data[axis_data.length - 1]['y']) + 50
              }

              //-----------------core
              let RawPoint = [];
              for (i = 0; i < axis_data.length - 1; i++) {
                if (core <= axis_data[i].y && core >= axis_data[i + 1].y) {
                  RawPoint.push({ Point1: axis_data[i], Point2: axis_data[i + 1] });
                  break
                }
              }

              try {
                let pointvalue = RawPoint[0].Point2.x - RawPoint[0].Point1.x;
                let data2 = RawPoint[0].Point1.y - core;
                let data3 = RawPoint[0].Point1.y - RawPoint[0].Point2.y;

                let RawData = RawPoint[0].Point1.x + (data2 / data3 * pointvalue);
                let graph_ans_X = parseFloat(RawData.toFixed(2));

                feedback[0]['FINAL_ANS'][input["ITEMs"]] = graph_ans_X;
                feedback[0]['FINAL_ANS'][`${input["ITEMs"]}_point`] = { "x": graph_ans_X, "y": core };

                let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedback[0]['FINAL_ANS'] } });
              }
              catch (err) {
                HSEWB008db[`INTERSEC_ERR`] = 1;
              }

              //
            } else if (HSEWB008db['GRAPHTYPE'] == 'CDT(S)') {

              //
              let axis_data = [];
              for (i = 0; i < LISTbuffer.length; i++) {
                if (LISTbuffer[i]['PO1'] !== 'Mean') {
                  axis_data.push({ x: parseFloat(LISTbuffer[i].PO8), y: parseFloat(LISTbuffer[i].PO3) });
                }
              }
              //-----------------core

              let core = 0;
              if (HSEWB008db['INTERSEC'] !== '') {
                core = parseFloat(HSEWB008db['INTERSEC'])
              } else {
                core = parseFloat(axis_data[axis_data.length - 1]['y']) + 50
              }

              //-----------------core
              let RawPoint = [];
              for (i = 0; i < axis_data.length - 1; i++) {
                if (core <= axis_data[i].y && core >= axis_data[i + 1].y) {
                  RawPoint.push({ Point1: axis_data[i], Point2: axis_data[i + 1] });
                  break
                }
              }

              try {
                let pointvalue = RawPoint[0].Point2.x - RawPoint[0].Point1.x;
                let data2 = RawPoint[0].Point1.y - core;
                let data3 = RawPoint[0].Point1.y - RawPoint[0].Point2.y;

                let RawData = RawPoint[0].Point1.x + (data2 / data3 * pointvalue);
                let graph_ans_X = parseFloat(RawData.toFixed(2));

                feedback[0]['FINAL_ANS'][input["ITEMs"]] = graph_ans_X;
                feedback[0]['FINAL_ANS'][`${input["ITEMs"]}_point`] = { "x": graph_ans_X, "y": core };

                let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedback[0]['FINAL_ANS'] } });
              }
              catch (err) {
                HSEWB008db[`INTERSEC_ERR`] = 1;
              }

              //
            } else {
              try {
                let axis_data = [];
                for (i = 0; i < LISTbuffer.length; i++) {
                  if (LISTbuffer[i]['PO1'] !== 'Mean') {
                    axis_data.push({ x: parseFloat(LISTbuffer[i].PO8), y: parseFloat(LISTbuffer[i].PO3) });
                  }
                }

                let d = []
                for (i = 0; i < axis_data.length - 1; i++) {
                  d.push((axis_data[i].y - axis_data[i + 1].y) / (axis_data[i + 1].x - axis_data[i].x));
                }

                let def = []

                for (i = 0; i < d.length - 1; i++) {
                  if (d[i] > d[i + 1]) {
                    def[i] = (d[i] - d[i + 1])
                  } else {
                    def[i] = (d[i + 1] - d[i])
                  }

                }

                for (j = 0; j < def.length; j++) {
                  if (def[j] === Math.max(...def)) {
                    pos = [j + 1, j + 2]
                  }
                }

                let d1 = -d[pos[0] - 1]
                let d2 = -d[pos[1]]


                let c1 = (axis_data[pos[0]].y - d1 * axis_data[pos[0]].x);
                let c2 = (axis_data[pos[1]].y - d2 * axis_data[pos[1]].x);


                let Xans = 0;
                let Yans = 0;
                let x = (c[1] - c[0]) / (d1 - d2);


                if (x >= 0) {
                  Xans = x
                } else {
                  Xans = -x
                }

                y = d1 * Xans + c[0]
                Yans = y

                let graph_ans_X = parseFloat(Xans.toFixed(2));
                let graph_ans_Y = parseFloat(Yans.toFixed(2));

                feedback[0]['FINAL_ANS'][input["ITEMs"]] = graph_ans_X;
                feedback[0]['FINAL_ANS'][`${input["ITEMs"]}_point`] = { "x": graph_ans_X, "y": graph_ans_Y };

                let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedback[0]['FINAL_ANS'] } });

              }
              catch (err) {
                HSEWB008db[`INTERSEC_ERR`] = 1;
              }
            }

          } else if (masterITEMs[0]['RESULTFORMAT'] === 'Picture') {
            //
          } else if (masterITEMs[0]['RESULTFORMAT'] === 'OCR') {
            //


          } if (masterITEMs[0]['RESULTFORMAT'] === 'CAL1') {

            console.log("---CALCULATEDATA---")
            let feedback = await mongodb.find("BUFFERCAL", HSEWB008, { "PO": HSEWB008db["PO"], "CP": HSEWB008db['CP'] });
            console.log(feedback)
            if (feedback.length > 0) {
              if (feedback[0]['VAL1'] !== '' && feedback[0]['VAL2'] !== '' && feedback[0]['Area'] !== '' && feedback[0]['FORMULA'] !== '') {
                console.log("---CALCULATEDATA---????")
                // console.log( feedback[0]['VAL1'])
                // console.log( feedback[0]['VAL2'])
                // console.log( feedback[0]['Area'])
                // console.log( feedback[0]['FORMULA'])

                // console.log(evil(`12/5*9+9.4*2`));

                // let FORMULAdata = feedback[0]['FORMULA'];
                // let VAL1data = feedback[0]['VAL1'];
                // let VAL2data = feedback[0]['VAL2'];
                // let Areadata = feedback[0]['Area'];

                // //X1+Y1+K1

                // let FORMULAresult = FORMULAdata.replace("X", `${VAL1data}`).replace("Y", `${VAL2data}`).replace("K1", `${Areadata}`)
                // console.log(FORMULAresult)
                // let result = evil(FORMULAresult)
                // let finalresult = result;

                // if (result < 0) {
                //   finalresult = - finalresult;
                // }
                // console.log(finalresult)



                // let feedbackres = await mongodb.find(MAIN_DATA, MAIN, { "PO": input['PO'] });
                // feedbackres[0]['FINAL_ANS'][input["ITEMs"]] = finalresult;
                // console.log(feedbackres)
                // let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedbackres[0]['FINAL_ANS'] } });

                let FORMULAdata = feedback[0]['FORMULA'];
                let VAL1data = feedback[0]['VAL1'];
                let VAL2data = feedback[0]['VAL2'];
                let Areadata = feedback[0]['Area'];

                let FORMULAresult = FORMULAdata.replace("X", `${VAL1data}`).replace("Y", `${VAL2data}`).replace("K1", `${Areadata}`)
                console.log(FORMULAresult)
                let result = evil(FORMULAresult)
                let finalresult = result;
                console.log(finalresult)
                if (result < 0) {
                  finalresult = - finalresult;
                }
                console.log(finalresult)
                HSEWB008db["ANSCAL2"] = finalresult;



                let feedbackres = await mongodb.find(MAIN_DATA, MAIN, { "PO": input['PO'] });
                console.log(feedbackres)
                if (feedbackres[0]['FINAL_ANS'] === undefined) {
                  feedbackres[0]['FINAL_ANS'] = {}
                  feedbackres[0]['FINAL_ANS'][input["ITEMs"]] = finalresult;
                  console.log(feedbackres)
                  let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedbackres[0]['FINAL_ANS'] } });
                } else {
                  feedbackres[0]['FINAL_ANS'][input["ITEMs"]] = finalresult;
                  console.log(feedbackres)
                  let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedbackres[0]['FINAL_ANS'] } });
                }

                output = 'OK'
              }
            }

          } if (masterITEMs[0]['RESULTFORMAT'] === 'CAL2') {
            console.log("---CALCULATEDATA 2---")
            let feedback = await mongodb.find("BUFFERCAL", HSEWB008, { "PO": input["PO"], "CP": HSEWB008db['CP'] });
            if (feedback.length > 0) {
              if (feedback[0]['VAL1'] !== '' && feedback[0]['VAL2'] !== '' && feedback[0]['VAL3'] !== '' && feedback[0]['VAL4'] !== '' && feedback[0]['Area'] !== '' && HSEWB008db['FORMULA'] !== '') {
                console.log("-------------------VV------------------")
                console.log(feedback[0]['VAL1'])
                console.log(feedback[0]['VAL2'])
                console.log(feedback[0]['VAL3'])
                console.log(feedback[0]['VAL4'])
                console.log(feedback[0]['Area'])
                console.log(HSEWB008db['FORMULA'])

                let FORMULAdata = HSEWB008db['FORMULA'];
                let VAL1data = feedback[0]['VAL1'];
                let VAL2data = feedback[0]['VAL2'];
                let VAL3data = feedback[0]['VAL3'];
                let VAL4data = feedback[0]['VAL4'];
                let Areadata = feedback[0]['Area'];

                let FORMULAresult = FORMULAdata.replace("X", `${VAL1data}`).replace("Y", `${VAL2data}`).replace("K1", `${Areadata}`).replace("Z", `${VAL3data}`).replace("I", `${VAL4data}`)
                console.log(FORMULAresult)
                let result = evil(FORMULAresult)
                console.log(result)

                // if (result < 0) {
                //   result = - result;
                // }
                // console.log(result)


                HSEWB008db["ANSCAL2"] = result;



                let feedbackres = await mongodb.find(MAIN_DATA, MAIN, { "PO": input['PO'] });
                console.log(feedbackres)
                if (feedbackres[0]['FINAL_ANS'] === undefined) {
                  feedbackres[0]['FINAL_ANS'] = {}
                  feedbackres[0]['FINAL_ANS'][input["ITEMs"]] = result;
                  console.log(feedbackres)
                  let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedbackres[0]['FINAL_ANS'] } });
                } else {
                  feedbackres[0]['FINAL_ANS'][input["ITEMs"]] = result;
                  console.log(feedbackres)
                  let feedbackupdateRESULTFORMAT = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'FINAL_ANS': feedbackres[0]['FINAL_ANS'] } });
                }

                output = 'OK'

              }
            }
          }
        }

        let CHECKlistdataFINISH = [];

        for (i = 0; i < feedback[0]['CHECKlist'].length; i++) {
          if (feedback[0]['CHECKlist'][i]['FINISH'] !== undefined) {
            if (feedback[0]['CHECKlist'][i]['FINISH'] === 'OK') {
              CHECKlistdataFINISH.push(feedback[0]['CHECKlist'][i]['key'])
            } else {
            }
          }
        }

        for (i = 0; i < feedback[0]['CHECKlist'].length; i++) {
          if (input["ITEMs"] === feedback[0]['CHECKlist'][i]['key']) {
            feedback[0]['CHECKlist'][i]['FINISH'] = 'OK';
            // console.log(feedback[0]['CHECKlist']);
            if (HSEWB008db['FREQUENCY'] === 'time/6M' ||HSEWB008db['FREQUENCY'] === 'pcs/M'||HSEWB008db['FREQUENCY'] === 'time/Year'||HSEWB008db['FREQUENCY'] === 'pcs/Y') {
              let resp = await axios.post('http://127.0.0.1:16090/FINAL/REFLOTSET', {
                "PO": HSEWB008db['PO'],
                "MATCP": HSEWB008db['CP'],
                "FREQUENCY": HSEWB008db['FREQUENCY'],
                "ITEMs": HSEWB008db['inspectionItem'],
                "TPKLOT": HSEWB008db['TPKLOT'],
                "INS": HSEWB008db['INS']
              });
            }
            let feedbackupdate = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'CHECKlist': feedback[0]['CHECKlist'] } });


            break;
          }
        }

        if (CHECKlistdataFINISH.length === feedback[0]['CHECKlist'].length) {
          // feedback[0]['FINAL_ANS']["ALL_DONE"] = "DONE";
          // feedback[0]['FINAL_ANS']["PO_judgment"] ="pass";
          let feedbackupdateFINISH = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { "ALL_DONE": "DONE", "PO_judgment": "pass", } });
        }


        

      }
    } else {
      HSEWB008db["ITEMleftUNIT"] = '';
      HSEWB008db["ITEMleftVALUE"] = '';
    }

  }

  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSEWB008-SETZERO', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008fromINS--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  try {

    HSEWB008db = {
      "INS": NAME_INS,
      "PO": "",
      "CP": "",
      "MATCP": '',
      "QTY": "",
      "PROCESS": "",
      "CUSLOT": "",
      "TPKLOT": "",
      "FG": "",
      "CUSTOMER": "",
      "POINTs": "",
      "PART": "",
      "PARTNAME": "",
      "MATERIAL": "",
      //---new
      "QUANTITY": '',
      // "PROCESS": '',
      "CUSLOTNO": '',
      "FG_CHARG": '',
      "PARTNAME_PO": '',
      "PART_PO": '',
      "CUSTNAME": '',
      //-----
      "ItemPick": [],
      "ItemPickcode": [],
      "PCS": "",
      "PCSleft": "",

      "SPEC": "",

      "UNIT": "",
      "INTERSEC": "",
      "RESULTFORMAT": "",
      "GRAPHTYPE": "",
      "GAP": "",
      "GAPname": '',
      "GAPnameList": [],
      "GAPnameListdata": ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      //---------
      "preview": [],
      "confirmdata": [],
      "ITEMleftUNIT": [],
      "ITEMleftVALUE": [],
      //
      "MeasurmentFOR": "FINAL",
      "inspectionItem": "", //ITEMpice
      "inspectionItemNAME": "",
      "tool": NAME_INS,
      "value": [],  //key: PO1: itemname ,PO2:V01,PO3: V02,PO4: V03,PO5:V04,P06:INS,P9:NO.,P10:TYPE, last alway mean P01:"MEAN",PO2:V01,PO3:V02-MEAN,PO4: V03,PO5:V04-MEAN
      "dateupdatevalue": day,
      "INTERSEC_ERR": 0,
      "K1b": '',
      "K1v": '',
      "FORMULA": '',
      "ANSCAL2": '',
      "confirmdataCW": [{
        "VAL1": "",
        "VAL2": "",
        "VAL3": "",
        "VAL4": "",
        "Aear": "",
        "FORMULA": "",
        "var": "",
        "ANSCAL2": '',
      }],
      "FREQUENCY": "",
      "REFLOT": "",
    }
    output = 'OK';
  }
  catch (err) {
    output = 'NOK';
  }
  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSEWB008-CLEAR', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008fromINS--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  try {

    HSEWB008db['preview'] = [];
    HSEWB008db['confirmdata'] = [];

    output = 'OK';
  }
  catch (err) {
    output = 'NOK';
  }
  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSEWB008-RESETVALUE', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008fromINS--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  try {

    let all = HSEWB008db['confirmdata'].length
    if (all > 0) {
      HSEWB008db['confirmdata'].pop();
    }

    output = 'OK';
  }
  catch (err) {
    output = 'NOK';
  }
  //-------------------------------------
  return res.json(output);
});

//"value":[],  //key: PO1: itemname ,PO2:V01,PO3: V02,PO4: V03,PO5:V04,P06:INS,P9:NO.,P10:TYPE, last alway mean P01:"MEAN",PO2:V01,PO3:V02-MEAN,PO4: V03,PO5:V04-MEAN


router.post('/FINAL/HSEWB008-FINISH', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-FINISH--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'OK';

  if (HSEWB008db['RESULTFORMAT'] === 'Number' || HSEWB008db['RESULTFORMAT'] === 'Text') {

    HSEWB008db["value"] = [];
    for (i = 0; i < HSEWB008db['confirmdata'].length; i++) {
      HSEWB008db["value"].push({
        "PO1": HSEWB008db["inspectionItemNAME"],
        "PO2": HSEWB008db['confirmdata'][i]['V1'],
        "PO3": HSEWB008db['confirmdata'][i]['V2'],
        "PO4": HSEWB008db['confirmdata'][i]['V3'],
        "PO5": HSEWB008db['confirmdata'][i]['V4'],
        "PO6": "-",
        "PO7": "-",
        "PO8": '-',
        "PO9": i + 1,
        "PO10": "AUTO",
      });
    }
    if (HSEWB008db["value"].length > 0) {
      let mean01 = [];
      let mean02 = [];
      for (i = 0; i < HSEWB008db["value"].length; i++) {
        mean01.push(parseFloat(HSEWB008db["value"][i]["PO3"]));
        mean02.push(parseFloat(HSEWB008db["value"][i]["PO5"]));
      }
      let sum1 = mean01.reduce((a, b) => a + b, 0);
      let avg1 = (sum1 / mean01.length) || 0;
      let sum2 = mean02.reduce((a, b) => a + b, 0);
      let avg2 = (sum2 / mean02.length) || 0;
      HSEWB008db["value"].push({
        "PO1": 'Mean',
        "PO2": HSEWB008db['confirmdata'][0]['V1'],
        "PO3": avg1,
        "PO4": HSEWB008db['confirmdata'][0]['V3'],
        "PO5": avg2,
      });
    }

  } else if (HSEWB008db['RESULTFORMAT'] === 'OCR' || HSEWB008db['RESULTFORMAT'] === 'Picture') {

  } else if (HSEWB008db['RESULTFORMAT'] === 'Graph') {

    HSEWB008db["value"] = [];
    for (i = 0; i < HSEWB008db['confirmdata'].length; i++) {
      HSEWB008db["value"].push({
        "PO1": HSEWB008db["inspectionItemNAME"],
        "PO2": HSEWB008db['confirmdata'][i]['V1'],
        "PO3": HSEWB008db['confirmdata'][i]['V2'],
        "PO4": HSEWB008db['confirmdata'][i]['V3'],
        "PO5": HSEWB008db['confirmdata'][i]['V4'],
        "PO6": "-",
        "PO7": "-",
        "PO8": HSEWB008db['confirmdata'][i]['V5'],
        "PO9": i + 1,
        "PO10": "AUTO",
      });
    }
    if (HSEWB008db["value"].length > 0) {
      let mean01 = [];
      let mean02 = [];
      for (i = 0; i < HSEWB008db["value"].length; i++) {
        mean01.push(parseFloat(HSEWB008db["value"][i]["PO3"]));
        mean02.push(parseFloat(HSEWB008db["value"][i]["PO5"]));
      }
      let sum1 = mean01.reduce((a, b) => a + b, 0);
      let avg1 = (sum1 / mean01.length) || 0;
      let sum2 = mean02.reduce((a, b) => a + b, 0);
      let avg2 = (sum2 / mean02.length) || 0;
      HSEWB008db["value"].push({
        "PO1": 'Mean',
        "PO2": HSEWB008db['confirmdata'][0]['V1'],
        "PO3": avg1,
        "PO4": HSEWB008db['confirmdata'][0]['V3'],
        "PO5": avg2,
      });
    }

  }

  if (HSEWB008db['RESULTFORMAT'] === 'Number' ||
    HSEWB008db['RESULTFORMAT'] === 'Text' ||
    HSEWB008db['RESULTFORMAT'] === 'OCR' ||
    HSEWB008db['RESULTFORMAT'] === 'Picture' || HSEWB008db['RESULTFORMAT'] === 'Graph') {
    request.post(
      'http://127.0.0.1:16090/FINAL/FINISHtoDB',
      { json: HSEWB008db },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // console.log(body);
          // if (body === 'OK') {
          HSEWB008db['confirmdata'] = [];
          HSEWB008db["value"] = [];
          //------------------------------------------------------------------------------------

          request.post(
            'http://127.0.0.1:16090/FINAL/HSEWB008-feedback',
            { json: { "PO": HSEWB008db['PO'], "ITEMs": HSEWB008db['inspectionItem'] } },
            function (error, response, body2) {
              if (!error && response.statusCode == 200) {
                // console.log(body2);
                // if (body2 === 'OK') {
                output = 'OK';
                // }
              }
            }
          );

          //------------------------------------------------------------------------------------
          // }

        }
      }
    );
  }
  //-------------------------------------
  return res.json(HSEWB008db);
});

router.post('/FINAL/HSEWB008-FINISH-CAL1', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-FINISH-CAL1--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'OK';
  if ((HSEWB008db['RESULTFORMAT'] === 'CAL1')) {



    HSEWB008db["value"] = [];
    let feedback = await mongodb.find("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'] });
    if (feedback.length > 0) {
      if (feedback[0]['VAL1'] !== '' && feedback[0]['VAL2'] !== '' && feedback[0]['Area'] !== '') {
        HSEWB008db["value"].push({
          "VAL1": feedback[0]['VAL1'],
          "VAL2": feedback[0]['VAL2'],
          "Area": feedback[0]['Area'],
          "FORMULA": feedback[0]['FORMULA'],
        });

        if (HSEWB008db['RESULTFORMAT'] === 'CAL1') {
          request.post(
            'http://127.0.0.1:16090/FINAL/FINISHtoDB',
            { json: HSEWB008db },
            function (error, response, body) {
              if (!error && response.statusCode == 200) {
                // console.log(body);
                // if (body === 'OK') {
                HSEWB008db['confirmdata'] = [];
                HSEWB008db["value"] = [];
                //------------------------------------------------------------------------------------
                request.post(
                  'http://127.0.0.1:16090/FINAL/HSEWB008-feedback',
                  { json: { "PO": HSEWB008db['PO'], "ITEMs": HSEWB008db['inspectionItem'] } },
                  function (error, response, body2) {
                    if (!error && response.statusCode == 200) {
                      // console.log(body2);
                      // if (body2 === 'OK') {
                      output = 'OK';
                      // }
                    }
                  }
                );
                //------------------------------------------------------------------------------------
                // }

              }
            }
          );
        }
      }
    }



  }

  //-------------------------------------
  return res.json(HSEWB008db);
});

router.post('/FINAL/HSEWB008-FINISH-CAL2', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-FINISH-CAL2--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'OK';
  if ((HSEWB008db['RESULTFORMAT'] === 'CAL2')) {

    //FORMULA
    console.log(HSEWB008db['FORMULA'])


    HSEWB008db["value"] = [];
    let feedback = await mongodb.find("BUFFERCAL", HSEWB008, { "PO": HSEWB008db['PO'], "CP": HSEWB008db['CP'] });
    if (feedback.length > 0) {
      if (feedback[0]['VAL1'] !== '' && feedback[0]['VAL2'] !== '' && feedback[0]['Area'] !== '') {
        HSEWB008db["value"].push({
          "VAL1": feedback[0]['VAL1'],
          "VAL2": feedback[0]['VAL2'],
          "VAL3": feedback[0]['VAL3'],
          "VAL4": feedback[0]['VAL4'],
          "Area": feedback[0]['Area'],
          "FORMULA": HSEWB008db['FORMULA'],

        });
        console.log(HSEWB008db)

        if (HSEWB008db['RESULTFORMAT'] === 'CAL2') {
          request.post(
            'http://127.0.0.1:16090/FINAL/FINISHtoDB',
            { json: HSEWB008db },
            function (error, response, body) {
              if (!error && response.statusCode == 200) {
                // console.log(body);
                // if (body === 'OK') {
                // HSEWB008db['confirmdata'] = [];
                // HSEWB008db["value"] = [];
                //------------------------------------------------------------------------------------
                request.post(
                  'http://127.0.0.1:16090/FINAL/HSEWB008-feedback',
                  { json: { "PO": HSEWB008db['PO'], "ITEMs": HSEWB008db['inspectionItem'] } },
                  function (error, response, body2) {
                    if (!error && response.statusCode == 200) {
                      // console.log(body2);
                      // if (body2 === 'OK') {
                      output = 'OK';
                      // }
                    }
                  }
                );
                //------------------------------------------------------------------------------------
                // }

              }
            }
          );
        }
      }
    }



  }

  //-------------------------------------
  return res.json(HSEWB008db);
});


router.post('/FINAL/HSEWB008-REFLOT', async (req, res) => {
  //-------------------------------------
  console.log('--HSEWB008-REFLOT--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  //FINAL/REFLOT
  if (HSEWB008db['REFLOT'] != '') {
    request.post(
      'http://127.0.0.1:16090/FINAL/REFLOT',
      { json: HSEWB008db },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // console.log(body);
          // if (body === 'OK') {
          // HSEWB008db['confirmdata'] = [];
          // HSEWB008db["value"] = [];
          //------------------------------------------------------------------------------------
          request.post(
            'http://127.0.0.1:16090/FINAL/HSEWB008-feedback',
            { json: { "PO": HSEWB008db['PO'], "ITEMs": HSEWB008db['inspectionItem'] } },
            function (error, response, body2) {
              if (!error && response.statusCode == 200) {
                // console.log(body2);
                // if (body2 === 'OK') {
                output = 'OK';
                // }
              }
            }
          );
          //------------------------------------------------------------------------------------
          // }

        }
      }
    );
  }
  //-------------------------------------
  return res.json(output);
});



module.exports = router;


