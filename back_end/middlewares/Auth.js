const jwt = require('jsonwebtoken');


const Auth = (req,res,next)=>{
   
    const [Bearer, token] = req.headers.authorization.split(" ");

    try {
        if(!token){
            res.status(200).json({"Msg":'you are not authoeized!'});
        }

        const decoded = jwt.verify(token, 'masai');

        if(!decoded){
            res.status(200).json({"Msg":'you are not authoeized!'});
        }
    
        req.body.userId= decoded.userID;
        req.body.author=decoded.name;
        req.body.role=decoded.role;

        next();
         
    } catch (error) {
        res.status(400).send({'Error':error});
    }
}

module.exports = {Auth};