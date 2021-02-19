// petController.js
// Import pet model
Pet = require('./petModel');



/*
  * GET /pets 
  */

exports.index = function (req, res) {
    Pet.get(function (err, pets) {
        if (err) {
            res.json({message: "Encountered Error",err});
        }
        res.status(200).json({message: "OK", pets});
    });
};


/*
  * POST /pets
  */

exports.new = async function (req, res) {
    var pet = new Pet();
    pet.name = req.body.name ? req.body.name : pet.name;
    var current = 0;
    await Pet.countDocuments({  }, function (err, count) {
        current = count;
      });
    pet._id =  current + 1;
 
    pet_tags = req.body.tags
   
    pet.status = req.body.status;
// save the pet and check for errors
    pet.save(function (err) {
        // Check for validation error
        if (err){
            res.status(405).json({message: 'Invalid Input', err});
        }
        else
            res.status(201).json({message: 'Successful operation', pet });
    });
};

/*
  * GET pets/{petId}
  */
exports.view = function (req, res) {
    Pet.findOne({ _id: req.params['pet_id']}, function (err, pet) {
        if (err)
            res.status(404).json({message: 'Pet not found', err});
        else
        res.status(200).json({message: 'Successful operation', pet });    
    });
};


/*
  * PATCH pets/{petId}
  */

exports.update = function (req, res) {
    Pet.findOne({ _id: req.params['pet_id']}, function (err, pet) {
        if (err)
            res.status(404).json(err);
        else{
            pet.name = req.body.name ? req.body.name : pet.name;
            pet.id = req.body.id;
        
             pet.tags = req.body.tags;
            pet.status = req.body.status;
// save the contact and check for errors
        pet.save(function (err) {
            if (err)
                res.status(405).json({message: 'Invalid input', err});
            else    
                res.status(200).json({ message: 'OK', pet });
        
            });
        }
    });
};


/*
  * DELETE pets/{petId}
  */
exports.delete = function (req, res) {
    Pet.deleteOne({_id: req.params['pet_id']}, function (err, pet) {
        if (err)
            res.status(400).json({message: 'Invalid pet value', err});
        else    
            res.status(200).json({ message: 'OK'});
    });
};

/*
  * GET pets/{findByStatus}
  */
exports.findByStatus = function(req, res){
    Pet.find({ status: req.body.status}, function (err, pet) {
        if (err)
            res.status(400).json({message: 'Invalid status value', err});
         else    
            res.status(200).json({message: 'OK', pet });
    });
};


/*
  * GET pets/{findByTags}
  */


exports.findByTags = function(req, res){
    Pet.find({ 
        'tags':{ $in: req.body.tags}
    }, function (err, pet) {
        if (err)
            res.status(400).json({message: 'Invalid tag value', err});
        else    
            res.status(200).json({message: 'OK', pet });
    });
};
