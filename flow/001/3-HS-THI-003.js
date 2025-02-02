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

//----------------- SETUP

let NAME_INS = 'HS-THI-003'

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

let MAININP = "MAIN_INPROCESS";


//----------------- dynamic

let finddbbuffer = [{}];

let HSTHI003db = {
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
  //----------------------
  "USER": '',
  "USERID": '',
  "REFLOT": "",
  "FREQUENCY": "",
}



router.get('/FINAL/CHECK-HSTHI003', async (req, res) => {

  return res.json(HSTHI003db['PO']);
});


router.post('/FINAL/HSTHI003db', async (req, res) => {
  //-------------------------------------
  // console.log('--HSTHI003db--');
  // console.log(req.body);
  //-------------------------------------
  let finddb = [{}];
  try {

    finddb = HSTHI003db;
    finddbbuffer = finddb;
  }
  catch (err) {
    finddb = finddbbuffer;
  }
  //-------------------------------------
  return res.json(finddb);
});

router.post('/FINAL/GETINtoHSTHI003', async (req, res) => {
  //-------------------------------------
  console.log('--GETINtoHSTHI003--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  check = HSTHI003db;
  if (input['PO'] !== undefined && input['CP'] !== undefined && check['PO'] === '' && input['USER'] !== undefined && input['USERID'] !== undefined) {
    // let dbsap = await mssql.qurey(`select * FROM [SAPData_GW_GAS].[dbo].[tblSAPDetail] where [PO] = ${input['PO']}`);

    let findPO = await mongodb.findSAP('mongodb://172.23.10.39:12020', "ORDER", "ORDER", {});

    let cuslot = '';
//&& findPO[0][`DATA`].length > 0
    if (findPO[0][`DATA`] != undefined ) {
      let dbsap = ''
      for (i = 0; i < findPO[0][`DATA`].length; i++) {
        if (findPO[0][`DATA`][i][`PO`] === input['PO']) {
          dbsap = findPO[0][`DATA`][i];
          // break;
          cuslot = cuslot + findPO[0][`DATA`][i][`CUSLOTNO`] + ','
        }
      }

      if (dbsap === '') {
      //   try {
          // let resp = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_QC_INTERFACE', {
          //   "BAPI_NAME": "ZPPIN011_OUT",
          //   "IMP_TEXT02": input['PO'],
          //   "TABLE_NAME": "PPORDER"
          // });
          // // if (resp.status == 200) {
          // let returnDATA = resp;
          // // output = returnDATA["Records"] || []
          // console.log(returnDATA["Records"])
          // if (returnDATA["Records"].length > 0) {


          //   dataout = {
          //     'PO': `${parseInt(returnDATA["Records"][0]['PO'])}`,
          //     'SEQUENCE': returnDATA["Records"][0]['SEQ'],
          //     'CP': `${parseInt(returnDATA["Records"][0]['CPMAT'])}`,
          //     'FG': `${parseInt(returnDATA["Records"][0]['FGMAT'])}`,
          //     'STATUS': returnDATA["Records"][0]['STA'],
          //     'QUANTITY': returnDATA["Records"][0]['QTYT'],
          //     'UNIT': returnDATA["Records"][0]['UNIT'],
          //     'COSTCENTER': returnDATA["Records"][0]['CUSTNA'],

          //     'PART': returnDATA["Records"][0]['PARTNO'],
          //     'PARTNAME': returnDATA["Records"][0]['PARTNA'],
          //     'MATERIAL': returnDATA["Records"][0]['MATNA'],
          //     'CUSTOMER': returnDATA["Records"][0]['CUSLOTNO'],
          //     'PROCESS': returnDATA["Records"][0]['PROC'],
          //     'WGT_PC': returnDATA["Records"][0]['WEIGHT_PC'],
          //     'WGT_JIG': returnDATA["Records"][0]['WEIGHT_JIG'],
          //     'ACTQTY': returnDATA["Records"][0]['ACT_QTY'],
          //     'CUSLOTNO': returnDATA["Records"][0]['CUSLOTNO'],
          //     'FG_CHARG': returnDATA["Records"][0]['FG_CHARG'],
          //     'CUSTNAME': returnDATA["Records"][0]['CUST_FULLNM'],
          //   };


          //   dbsap = dataout
          // }
          // }
          
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



        HSTHI003db = {
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
          //----------------------
          "USER": input['USER'],
          "USERID": input['USERID'],
          "REFLOT": "",
          "FREQUENCY": "",
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

router.post('/FINAL/HSTHI003-geteachITEM', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003-geteachITEM--');
  console.log(req.body);
  let inputB = req.body;

  let ITEMSS = '';
  let output = 'NOK';

  for (i = 0; i < HSTHI003db['ItemPickcode'].length; i++) {
    if (HSTHI003db['ItemPickcode'][i]['value'] === inputB['ITEMs']) {
      ITEMSS = HSTHI003db['ItemPickcode'][i]['key'];
    }
  }


  if (ITEMSS !== '') {

    //-------------------------------------
    HSTHI003db['inspectionItem'] = ITEMSS;
    HSTHI003db['inspectionItemNAME'] = inputB['ITEMs'];
    let input = { 'PO': HSTHI003db["PO"], 'CP': HSTHI003db["CP"], 'ITEMs': HSTHI003db['inspectionItem'] };
    //-------------------------------------
    if (input['PO'] !== undefined && input['CP'] !== undefined && input['ITEMs'] !== undefined) {
      let findcp = await mongodb.find(PATTERN, PATTERN_01, { "CP": input['CP'] });
      let UNITdata = await mongodb.find(master_FN, UNIT, {});
      let masterITEMs = await mongodb.find(master_FN, ITEMs, { "masterID": HSTHI003db['inspectionItem'] });

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
            HSTHI003db["RESULTFORMAT"] = masterITEMs[0]['RESULTFORMAT']
            HSTHI003db["GRAPHTYPE"] = masterITEMs[0]['GRAPHTYPE']
            //------------------------------------

            let graph = await mongodb.find(PATTERN, GRAPH_TABLE, {});
            HSTHI003db['GAPnameList'] = [];
            for (k = 0; k < graph.length; k++) {
              HSTHI003db['GAPnameList'].push(graph[k]['NO']);
            }
          }

          for (j = 0; j < UNITdata.length; j++) {
            if (findcp[0]['FINAL'][i]['UNIT'] == UNITdata[j]['masterID']) {
              HSTHI003db["UNIT"] = UNITdata[j]['UNIT'];
            }
          }

          console.log(findcp[0]['FINAL'][i]['POINT']);

          HSTHI003db["POINTs"] = findcp[0]['FINAL'][i]['POINT'];
          HSTHI003db["PCS"] = findcp[0]['FINAL'][i]['PCS'];
          HSTHI003db["PCSleft"] = findcp[0]['FINAL'][i]['PCS'];

          HSTHI003db["SPEC"] = '';
          if (findcp[0]['FINAL'][i]['SPECIFICATIONve'] !== undefined) {
            if (findcp[0]['FINAL'][i]['SPECIFICATIONve']['condition'] === 'BTW') {
              HSTHI003db["SPEC"] = `${findcp[0]['FINAL'][i]['SPECIFICATIONve']['BTW_LOW']}-${findcp[0]['FINAL'][i]['SPECIFICATIONve']['BTW_HI']}`;
            } else if (findcp[0]['FINAL'][i]['SPECIFICATIONve']['condition'] === 'HIM(>)') {
              HSTHI003db["SPEC"] = `>${findcp[0]['FINAL'][i]['SPECIFICATIONve']['HIM_L']}`;
            } else if (findcp[0]['FINAL'][i]['SPECIFICATIONve']['condition'] === 'LOL(<)') {
              HSTHI003db["SPEC"] = `<${findcp[0]['FINAL'][i]['SPECIFICATIONve']['LOL_H']}`;
            } else if (findcp[0]['FINAL'][i]['SPECIFICATIONve']['condition'] === 'Actual') {
              HSTHI003db["SPEC"] = 'Actual';
            }
          }

          HSTHI003db["ANSCAL2"] = '';

          let date = Date.now()
          let REFLOT = await mongodb.find(PATTERN, "referdata", { "MATCP": HSTHI003db['MATCP'], "ITEMS": ITEMSS, "EXP": { $gt: date } });

          console.log(REFLOT)

          if (REFLOT.length > 0) {
            HSTHI003db["REFLOT"] = REFLOT[0]['TPKLOT'];
          }

          HSTHI003db["FREQUENCY"] = findcp[0]['FINAL'][i]['FREQUENCY'];



          HSTHI003db["INTERSEC"] = masterITEMs[0]['INTERSECTION'];
          output = 'OK';
          let findpo = await mongodb.find(MAIN_DATA, MAIN, { "PO": input['PO'] });
          if (findpo.length > 0) {
            request.post(
              'http://127.0.0.1:16090/FINAL/HSTHI003-feedback',
              { json: { "PO": HSTHI003db['PO'], "ITEMs": HSTHI003db['inspectionItem'] } },
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
    HSTHI003db["POINTs"] = '';
    HSTHI003db["PCS"] = '';
    HSTHI003db["SPEC"] = '';
    HSTHI003db["PCSleft"] = '';
    HSTHI003db["UNIT"] = "";
    HSTHI003db["INTERSEC"] = "";
    output = 'NOK';

    HSTHI003db["FREQUENCY"] = '';
    HSTHI003db["REFLOT"] = '';
  }

  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSTHI003-geteachGRAPH', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003-geteachGRAPH--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  try {
    let graph = await mongodb.find(PATTERN, GRAPH_TABLE, { "NO": input['GAPname'] });
    console.log(graph);
    HSTHI003db['GAPnameListdata'] = graph[0];//confirmdata
    HSTHI003db['GAP'] = HSTHI003db['GAPnameListdata'][`GT${HSTHI003db['confirmdata'].length + 1}`]
  }
  catch (err) {

  }
  //-------------------------------------
  return res.json('ok');
});

router.post('/FINAL/HSTHI003-preview', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003-preview--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  if (input.length > 0) {
    if (input[0]['V1'] !== undefined) {
      //-------------------------------------
      try {
        HSTHI003db['preview'] = input;
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
    HSTHI003db['preview'] = [];
    output = 'clear';
  }
  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSTHI003-confirmdata', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003-confirmdata--');
  console.log(req.body);
  // let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  try {
    let datapush = HSTHI003db['preview'][0]

    if (HSTHI003db['RESULTFORMAT'] === 'Graph') {
      let pushdata = HSTHI003db['preview'][0]

      pushdata['V5'] = HSTHI003db['GAP'];
      pushdata['V1'] = `${HSTHI003db['confirmdata'].length + 1}:${pushdata['V1']}`;

      if (HSTHI003db['GAP'] != '') {

        HSTHI003db['confirmdata'].push(pushdata);
        HSTHI003db['preview'] = [];
        output = 'OK';
        HSTHI003db['GAP'] = HSTHI003db['GAPnameListdata'][`GT${HSTHI003db['confirmdata'].length + 1}`]
      } else {
        output = 'NOK';
      }


    } else if (HSTHI003db['RESULTFORMAT'] === 'Number') {

      let pushdata = HSTHI003db['preview'][0]

      pushdata['V5'] = HSTHI003db['confirmdata'].length + 1
      pushdata['V1'] = `${HSTHI003db['confirmdata'].length + 1}:${pushdata['V1']}`

      HSTHI003db['confirmdata'].push(pushdata);
      HSTHI003db['preview'] = [];
      output = 'OK';
    } else if (HSTHI003db['RESULTFORMAT'] === 'CAL2') {

      let pushdata = HSTHI003db['preview'][0]

      pushdata['V5'] = HSTHI003db['confirmdata'].length + 1
      pushdata['V1'] = `${HSTHI003db['confirmdata'].length + 1}:${pushdata['V1']}`


     
      


      HSTHI003db['confirmdata'].push(pushdata);
      HSTHI003db['preview'] = [];
      output = 'OK';
    }
  }
  catch (err) {
    output = 'NOK';
  }
  //-------------------------------------
  return res.json(output);
});



router.post('/FINAL/HSTHI003-feedback', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003-feedback--');
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
      HSTHI003db["PCSleft"] = `${parseInt(HSTHI003db["PCS"]) - oblist.length}`;
      if (HSTHI003db['RESULTFORMAT'] === 'Number' || HSTHI003db['RESULTFORMAT'] === 'Text' || HSTHI003db['RESULTFORMAT'] === 'Graph') {
        for (i = 0; i < LISTbuffer.length; i++) {
          if (LISTbuffer[i]['PO1'] === 'Mean') {
            ITEMleftVALUEout.push({ "V1": 'Mean', "V2": `${LISTbuffer[i]['PO3']}` })
          } else {
            ITEMleftVALUEout.push({ "V1": `${LISTbuffer[i]['PO2']}`, "V2": `${LISTbuffer[i]['PO3']}` })
          }

        }



        HSTHI003db["ITEMleftUNIT"] = [{ "V1": "FINAL", "V2": `${oblist.length}` }];
        HSTHI003db["ITEMleftVALUE"] = ITEMleftVALUEout;

      } else {

      }
      // output = 'OK';
      if ((parseInt(HSTHI003db["PCS"]) - oblist.length) == 0) {
        //CHECKlist
        for (i = 0; i < feedback[0]['CHECKlist'].length; i++) {
          if (input["ITEMs"] === feedback[0]['CHECKlist'][i]['key']) {
            feedback[0]['CHECKlist'][i]['FINISH'] = 'OK';
            // console.log(feedback[0]['CHECKlist']);
            if (HSTHI003db['FREQUENCY'] === 'time/6M'||HSTHI003db['FREQUENCY'] === 'pcs/M'||HSTHI003db['FREQUENCY'] === 'time/Year'||HSTHI003db['FREQUENCY'] === 'pcs/Y') {
              let resp = await axios.post('http://127.0.0.1:16090/FINAL/REFLOTSET', {
                "PO": HSTHI003db['PO'],
                "MATCP": HSTHI003db['CP'],
                "FREQUENCY": HSTHI003db['FREQUENCY'],
                "ITEMs": HSTHI003db['inspectionItem'],
                "TPKLOT": HSTHI003db['TPKLOT'],
                "INS": HSTHI003db['INS']
              });
            }
            let feedbackupdate = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'CHECKlist': feedback[0]['CHECKlist'] } });

            break;
          }
        }
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

            if (HSTHI003db['GRAPHTYPE'] == 'CDE') {

              //
              let axis_data = [];
              for (i = 0; i < LISTbuffer.length; i++) {
                if (LISTbuffer[i]['PO1'] !== 'Mean') {
                  axis_data.push({ x: parseFloat(LISTbuffer[i].PO8), y: parseFloat(LISTbuffer[i].PO3) });
                }
              }
              //-----------------core

              let core = 0;
              if (HSTHI003db['INTERSEC'] !== '') {
                core = parseFloat(HSTHI003db['INTERSEC'])
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
                HSTHI003db[`INTERSEC_ERR`] = 1;
              }

              //
            } else if (HSTHI003db['GRAPHTYPE'] == 'CDT') {

              //
              let axis_data = [];
              for (i = 0; i < LISTbuffer.length; i++) {
                if (LISTbuffer[i]['PO1'] !== 'Mean') {
                  axis_data.push({ x: parseFloat(LISTbuffer[i].PO8), y: parseFloat(LISTbuffer[i].PO3) });
                }
              }
              //-----------------core

              let core = 0;
              if (HSTHI003db['INTERSEC'] !== '') {
                core = parseFloat(HSTHI003db['INTERSEC'])
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
                HSTHI003db[`INTERSEC_ERR`] = 1;
              }

              //
            } else if (HSTHI003db['GRAPHTYPE'] == 'CDT(S)') {

              //
              let axis_data = [];
              for (i = 0; i < LISTbuffer.length; i++) {
                if (LISTbuffer[i]['PO1'] !== 'Mean') {
                  axis_data.push({ x: parseFloat(LISTbuffer[i].PO8), y: parseFloat(LISTbuffer[i].PO3) });
                }
              }
              //-----------------core

              let core = 0;
              if (HSTHI003db['INTERSEC'] !== '') {
                core = parseFloat(HSTHI003db['INTERSEC'])
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
                HSTHI003db[`INTERSEC_ERR`] = 1;
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
                HSTHI003db[`INTERSEC_ERR`] = 1;
              }
            }

          } else if (masterITEMs[0]['RESULTFORMAT'] === 'Picture') {
            //
          } else if (masterITEMs[0]['RESULTFORMAT'] === 'OCR') {
            //

          } else {

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

        if (CHECKlistdataFINISH.length === feedback[0]['CHECKlist'].length) {
          // feedback[0]['FINAL_ANS']["ALL_DONE"] = "DONE";
          // feedback[0]['FINAL_ANS']["PO_judgment"] ="pass";
          let feedbackupdateFINISH = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { "ALL_DONE": "DONE", "PO_judgment": "pass", } });
        }

      }
    } else {
      HSTHI003db["ITEMleftUNIT"] = '';
      HSTHI003db["ITEMleftVALUE"] = '';
    }

  }

  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSTHI003-SETZERO', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003fromINS--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  try {

    HSTHI003db = {
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
      "REFLOT": "",
      "FREQUENCY": "",

    }
    output = 'OK';
  }
  catch (err) {
    output = 'NOK';
  }
  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSTHI003-CLEAR', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003fromINS--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  try {

    HSTHI003db['preview'] = [];
    HSTHI003db['confirmdata'] = [];

    output = 'OK';
  }
  catch (err) {
    output = 'NOK';
  }
  //-------------------------------------
  return res.json(output);
});

router.post('/FINAL/HSTHI003-RESETVALUE', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003fromINS--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  try {

    let all = HSTHI003db['confirmdata'].length
    if (all > 0) {
      HSTHI003db['confirmdata'].pop();
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


router.post('/FINAL/HSTHI003-FINISH', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003-FINISH--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'OK';

  if (HSTHI003db['RESULTFORMAT'] === 'Number' || HSTHI003db['RESULTFORMAT'] === 'Text') {

    HSTHI003db["value"] = [];
    for (i = 0; i < HSTHI003db['confirmdata'].length; i++) {
      HSTHI003db["value"].push({
        "PO1": HSTHI003db["inspectionItemNAME"],
        "PO2": HSTHI003db['confirmdata'][i]['V1'],
        "PO3": HSTHI003db['confirmdata'][i]['V2'],
        "PO4": HSTHI003db['confirmdata'][i]['V3'],
        "PO5": HSTHI003db['confirmdata'][i]['V4'],
        "PO6": "-",
        "PO7": "-",
        "PO8": '-',
        "PO9": i + 1,
        "PO10": "AUTO",
      });
    }
    if (HSTHI003db["value"].length > 0) {
      let mean01 = [];
      let mean02 = [];
      for (i = 0; i < HSTHI003db["value"].length; i++) {
        mean01.push(parseFloat(HSTHI003db["value"][i]["PO3"]));
        mean02.push(parseFloat(HSTHI003db["value"][i]["PO5"]));
      }
      let sum1 = mean01.reduce((a, b) => a + b, 0);
      let avg1 = (sum1 / mean01.length) || 0;
      let sum2 = mean02.reduce((a, b) => a + b, 0);
      let avg2 = (sum2 / mean02.length) || 0;
      HSTHI003db["value"].push({
        "PO1": 'Mean',
        "PO2": HSTHI003db['confirmdata'][0]['V1'],
        "PO3": avg1,
        "PO4": HSTHI003db['confirmdata'][0]['V3'],
        "PO5": avg2,
      });
    }

  } else if (HSTHI003db['RESULTFORMAT'] === 'OCR' || HSTHI003db['RESULTFORMAT'] === 'Picture') {

  } else if (HSTHI003db['RESULTFORMAT'] === 'Graph') {

    HSTHI003db["value"] = [];
    for (i = 0; i < HSTHI003db['confirmdata'].length; i++) {
      HSTHI003db["value"].push({
        "PO1": HSTHI003db["inspectionItemNAME"],
        "PO2": HSTHI003db['confirmdata'][i]['V1'],
        "PO3": HSTHI003db['confirmdata'][i]['V2'],
        "PO4": HSTHI003db['confirmdata'][i]['V3'],
        "PO5": HSTHI003db['confirmdata'][i]['V4'],
        "PO6": "-",
        "PO7": "-",
        "PO8": HSTHI003db['confirmdata'][i]['V5'],
        "PO9": i + 1,
        "PO10": "AUTO",
      });
    }
    if (HSTHI003db["value"].length > 0) {
      let mean01 = [];
      let mean02 = [];
      for (i = 0; i < HSTHI003db["value"].length; i++) {
        mean01.push(parseFloat(HSTHI003db["value"][i]["PO3"]));
        mean02.push(parseFloat(HSTHI003db["value"][i]["PO5"]));
      }
      let sum1 = mean01.reduce((a, b) => a + b, 0);
      let avg1 = (sum1 / mean01.length) || 0;
      let sum2 = mean02.reduce((a, b) => a + b, 0);
      let avg2 = (sum2 / mean02.length) || 0;
      HSTHI003db["value"].push({
        "PO1": 'Mean',
        "PO2": HSTHI003db['confirmdata'][0]['V1'],
        "PO3": avg1,
        "PO4": HSTHI003db['confirmdata'][0]['V3'],
        "PO5": avg2,
      });
    }

  }

  if (HSTHI003db['RESULTFORMAT'] === 'Number' ||
    HSTHI003db['RESULTFORMAT'] === 'Text' ||
    HSTHI003db['RESULTFORMAT'] === 'OCR' ||
    HSTHI003db['RESULTFORMAT'] === 'Picture' || HSTHI003db['RESULTFORMAT'] === 'Graph') {
    request.post(
      'http://127.0.0.1:16090/FINAL/FINISHtoDB',
      { json: HSTHI003db },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // console.log(body);
          // if (body === 'OK') {
          HSTHI003db['confirmdata'] = [];
          HSTHI003db["value"] = [];
          //------------------------------------------------------------------------------------

          request.post(
            'http://127.0.0.1:16090/FINAL/HSTHI003-feedback',
            { json: { "PO": HSTHI003db['PO'], "ITEMs": HSTHI003db['inspectionItem'] } },
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
  return res.json(HSTHI003db);
});

router.post('/FINAL/HSTHI003-REFLOT', async (req, res) => {
  //-------------------------------------
  console.log('--HSTHI003-REFLOT--');
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK';
  //-------------------------------------
  //FINAL/REFLOT
  if (HSTHI003db['REFLOT'] != '') {
    request.post(
      'http://127.0.0.1:16090/FINAL/REFLOT',
      { json: HSTHI003db },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // console.log(body);
          // if (body === 'OK') {
          // HSTHI003db['confirmdata'] = [];
          // HSTHI003db["value"] = [];
          //------------------------------------------------------------------------------------
          request.post(
            'http://127.0.0.1:16090/FINAL/HSTHI003-feedback',
            { json: { "PO": HSTHI003db['PO'], "ITEMs": HSTHI003db['inspectionItem'] } },
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


