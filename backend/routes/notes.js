const express = require('express'); 
const router = express.Router();

router.get('/', (req, res)=>{ 
	res.status(200); 
	obj = {
        msg : "first note",
        id : 1
    };
    res.json(obj);
}); 

module.exports = router;