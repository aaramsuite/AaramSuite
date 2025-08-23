const User = require("../model/userModal");
const bcrypt = require("bcrypt");

module.exports.register = async (req,res,next) => {
    try{
        // console.log(req.body);
        const { name,password,number,age } = req.body;
        const phoneNumberCheck = await User.findOne({ number });
        if(phoneNumberCheck)
            return res.json({msg: "User already exits", status: false});
        const hashedpassword = await bcrypt.hash(password,10);
        const user = await User.create({  
            name,
            password: hashedpassword,
            number,
            age 
        });
        delete user.password;
        return res.json({ user,status: true }); 
    } catch (ex) {
        next(ex);
    }
};

module.exports.login = async (req,res,next) => {
    try{
        // console.log(req.body);
        const { number,password } = req.body;
        // console.log(`email id is : ${emailID} and password is ${password}`);
        const user = await User.findOne({ number });

        if(!user)
            return res.json({msg: "Incorrect username or password", status: false});
        const isPasswordValid = await  bcrypt.compare(password,user.password);

        if(!isPasswordValid)
            return res.json({msg: "Incorrect username or password", status: false});
        
        
        
        delete user.password;
        return res.json({ user ,status: true }); 
    } catch (ex) {
        next(ex);
    }

};