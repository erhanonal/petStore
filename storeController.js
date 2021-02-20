// petController.js
// Import pet model
Order = require('./orderModel');
Pet = require('./petModel');




/*
  * GET /store/inventory
  */

 exports.index =  async function (req, res) {
    
    var soldCount = await Pet.countDocuments({ status:'sold' })
    var availableCount = await Pet.countDocuments({ status:'available' })

    let inventory = {
        available : availableCount,
        sold :  soldCount
    }

    res.status(200).json({message: "OK", inventory});
 
};

/*
  * POST /store/order
  */

 exports.new = async function (req, res) {
    var order = new Order();
    order.petId = req.body.petId ;

    var current = 0;
    await Order.countDocuments({  }, function (err, count) {
        current = count;
      });
    order._id =  current + 1;
 
    order.shipDate = req.body.shipDate;
    order.stage = req.body.stage;
   
// save the pet and check for errors
    order.save(function (err) {
        // Check for validation error
        if (err){
            res.status(405).json({message: 'Invalid Input', err});
        }
        else
            res.status(200).json({message: 'Successful operation', order });
    });
};


/*
  * PATCH store/order/{orderId}
  */

 exports.update = function (req, res) {
    Order.findOne({ _id: req.params['orderId']}, function (err, order) {
        if (err)
            res.status(405).json({message: "Invalid input", err});
        else{
            var validRequest = false;
            if (req.body.stage === "approved" && order.stage === "placed")
                validRequest = true;
            else if( req.body.stage === "delivered" && order.stage === "approved")
                validRequest = true;

            if(validRequest){
                order.stage = req.body.stage;
                order.save(function (err) {
                    if (err)
                        res.status(405).json({message: 'Invalid input', err});
                    else    
                        res.status(200).json({ message: 'Successful operation', order });
                    });
            }    
            else  
                res.status(400).json({ message: 'Bad request Stage is not applicable', order });  
        }
    });
};


/*
  * GET store/order/{orderId}
  */
 exports.view = function (req, res) {
    if( req.params['orderId'] <= 5 || req.params['orderId'] > 10 ){
        Order.findOne({ _id: req.params['orderId']}, function (err, order) {
            if (err)
                res.status(404).json({message: 'Error at finding order', err});
            else if(order == null)
                res.status(404).json({message: 'Order not found'});
            else
                res.status(200).json({message: 'Successful operation', order});    
        });
    }
    else 
        res.status(400).json({message: 'Invalid ID supplied'});
};


/*
  * DELETE store/order/{orderId}
  */
exports.delete = function (req, res) {
    if(req.params['orderId'] < 1000){
        Order.deleteOne({_id: req.params['orderId']}, function (err, order) {
            if (err)
                res.status(404).json({message: 'Order not found', err});
            else    
                res.status(200).json({ message: 'OK'});
        });
    }else
        res.status(400).json({message: 'Invalid Id supplied'});
    
};


