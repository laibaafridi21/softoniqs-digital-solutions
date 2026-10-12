const express = require ("express");

const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken")

const supabase = require("../config/supabase");

const router =  express.Router();

router.post ("/login" , async (req,res)  =>{
const {email, password} =req.body ;
const {data: admin, error} = await supabase
.from("admins")
.select("*")
.eq("email", email)
.single();

if(error || !admin) {
   return res.status(401).json({
      error : "Invalid email or password",
   }
      
   );
};

const isPasswordCorrect  = await bcrypt.compare(password, admin.password);

if(!isPasswordCorrect)  {
   return res.status(401).json ({
      error: "Invalid email or password",
   }

   )
};

const token =jwt.sign(
   { id: admin.id , email: admin.email,  role: "admin"},
   process.env .JWT_SECRET,
   {expiresIn: "1h"},
);




res.json({
   message: "Login successful",
   token: token,
}

)

});
module.exports = router;
