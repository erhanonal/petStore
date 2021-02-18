// petController.js
// Import pet model
Pet = require('./petModel');
// Handle index actions
exports.index = function (req, res) {
    Pet.get(function (err, pets) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Pets retrieved successfully",
            data: pets
        });
    });
};
// Handle create pet actions
exports.new = async function (req, res) {
    var pet = new Pet();
    pet.name = req.body.name ? req.body.name : pet.name;
    var current = 0;
    await Pet.countDocuments({  }, function (err, count) {
    
       // console.log("Count: "+ count)
        current = count;
      });
    pet._id =  current + 1;
    pet.tags = req.body.tags.replace(/\s/g, "").split(',');
    //console.log("Tags: ")
    //console.log(pet.name)
   // console.log(pet._id)
    //console.log(pet.tags)
    pet.status = req.body.status;
// save the pet and check for errors
    pet.save(function (err) {
        // Check for validation error
        if (err){
            res.json(err);
            console.log(err);
        }
        else
            res.json({
                message: 'New pet created!',
                data: pet
            });
    });
};


// Handle view pet info
exports.view = function (req, res) {
    Pet.findOne({ _id: req.params['pet_id']}, function (err, pet) {
        if (err)
            res.send(err);
        res.json({
            message: 'pet details loading..',
            data: pet
        });
    });
};


// Handle update pet info
exports.update = function (req, res) {
    Pet.findOne({ _id: req.params['pet_id']}, function (err, pet) {
        if (err)
            res.send(err);
            pet.name = req.body.name ? req.body.name : pet.name;
            pet.id = req.body.id;
            pet.tags = req.body.tags.replace(/\s/g, "").split(',');
            pet.status = req.body.status;
// save the contact and check for errors
        pet.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Pet Info updated',
                data: pet
            });
        });
    });
};
// Handle delete pet
exports.delete = function (req, res) {
    Pet.deleteOne({_id: req.params['pet_id']}, function (err, pet) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Pet deleted'
        });
    });
};


exports.findByStatus = function(req, res){
    Pet.find({ status: req.body.status}, function (err, pet) {
        if (err)
            res.send(err);
        res.json({
            message: 'Listing pets with status',
            data: pet
        });
    });
};


exports.findByTags = function(req, res){
    Pet.find({ 
        'tags':{ $in: req.body.tags.replace(/\s/g, "").split(',')}
    }, function (err, pet) {
        if (err)
            res.send(err);
        res.json({
            message: 'Listing pets with tags',
            data: pet
        });
    });
};
