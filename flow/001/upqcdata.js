const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');


router.post('/FINAL/upqcdata',async (req,res) => {
    //-------------------------------------
    console.log('--upqcdata--');
    console.log(req.body);
    //-------------------------------------
    
    
    //-------------------------------------
      return  res.json(output);
});

router.post('/FINAL/UNIX',async (req,res) => {
  //-------------------------------------
  console.log('--UNIX--');
  console.log(req.body);
  //-------------------------------------
  
  
  //-------------------------------------
    return  res.json(Date.now() + 2629743000*6);
});


router.post('/FINAL/CHECK',async (req,res) => {
  //-------------------------------------
  console.log('--FINAL/CHECK--');
  console.log(req.body);
  //-------------------------------------
  if (input["PO"] !== undefined && input["USERID"] !== undefined) {
  let feedbackupdate = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'CHECKID': input["USERID"]  } });
  }
  //-------------------------------------
    return  res.json(Date.now() + 2629743000*6);
});

router.post('/FINAL/APPROVE',async (req,res) => {
  //-------------------------------------
  console.log('--FINAL/APPROVE--');
  console.log(req.body);
  //-------------------------------------
  if (input["PO"] !== undefined && input["USERID"] !== undefined) {
    let feedbackupdate = await mongodb.update(MAIN_DATA, MAIN, { "PO": input['PO'] }, { "$set": { 'APPROVEID': input["USERID"]  } });
    }
  
  //-------------------------------------
    return  res.json(Date.now() + 2629743000*6);
});


module.exports = router;