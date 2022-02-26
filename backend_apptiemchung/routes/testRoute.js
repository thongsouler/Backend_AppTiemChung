// const requireLogin = require('../middlewares/requireLogin');
const express = require('express');
const testdangky = require('../models/testdangky');
const router = express.Router();



router.get('/testget', async (req, res) => {
    const hi = await testdangky.find();
    console.log({ hi })
    res.send(hi);
  });


router.post('/testpost', async (req, res) => {
    // console.log(req.body);
    // const { title, company, price, imageUrl, description, name } = req.body;
  
    // const newVac = new VaccineModel({
    //   title, company, price, imageUrl, description, name
   try {
        
    const vac = await new testdangky(req.body).save()
    return res.send({
      message: 'created successfully',
      data: vac
    })
  } catch (error) {
    console.log(error)
    
  }
  });


  module.exports = router;