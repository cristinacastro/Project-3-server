const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Cost = require("../models/Cost");
const Group = require("../models/Group");
const User = require("../models/User");

const withAuth = require("../helpers/middleware");

router.post("/costs/add/:id", withAuth, async (req, res, next) => {
  const buyer = await User.findOne({email: req.email});
  const group = await Group.findById(req.params.id)
   console.log("dslcxfjlvh")
    const newCost = {
        concept: req.body.concept,
        import: req.body.import,
        ticket: req.body.ticket,
        group: group._id,
        buyer: buyer._id,
        date: req.body.date,  
    };

    try {
        const theCost = await Cost.create(newCost);
        //console.log(theCost)
        const array = []
        const arrayCompleta = array.push({...theCost})
        console.log(arrayCompleta, "fdñkgfklcbkl")
        //const theCostArr = {...theCost}
        //console.log(theCostArr, "provaaa")
    
        //const costsGroup = await Group.findById(req.params.id, {$push: {costs: [...theCostArr]}} )
        //console.log(costsGroup)
        res.json(theCost)
    } catch(error) {
        res.json(error)
    }
}); 


router.delete('/costs/delete/:id', async (req, res, next)=>{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
   
    try {
        const theRemovedCost = await Cost.findByIdAndRemove(req.params.id)
        res.json('The cost was deleted')
    } catch(error){
        res.json(error)
    }
});



module.exports = router;