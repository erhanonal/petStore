// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to Pet Store API!',
    });
});
// Import contact controller

var petController = require('./petController');

router.route('/pets')
    .get(petController.index)
    .post(petController.new);


router.route('/pets/findByStatus')
    .get(petController.findByStatus)

router.route('/pets/findByTags')
    .get(petController.findByTags)    


router.route('/pets/:pet_id')
    .get(petController.view)
    .patch(petController.update)
    .delete(petController.delete);


// Export API routes
module.exports = router;