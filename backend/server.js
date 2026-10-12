 
 
 require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/auth");
const authMiddleware =require ("./middleware/authMiddleware.js")
const cors =require ("cors");
const serviceRoutes = require("./routes/serviceRoutes")
const caseStudyRoutes = require("./routes/caseStudyRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Softoniqs backend is running");
});

app.use("/api/services", serviceRoutes );






app.use("/api/case-studies"   , caseStudyRoutes)




app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const { data, error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name,
        email,
        message,
      },
    ])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({
      error: "Failed to send message",
    });
  }

  res.status(201).json({
    message: "Message sent successfully",
    data,
  });
});

app.get("/api/admin/test", authMiddleware, (req, res) =>{
  res.json({
    message: "Protected route accessed successfully",
    admin: req.admin
  });
}   );

app.get("/api/admin/contact-message",authMiddleware, async (req, res)  =>  {
  const {data, error} =await supabase 
  .from ("contact_messages")
  .select("*")
  .order("created_at", {ascending: false});

 if (error) {
  console.error ( "Supabase error:" , error);

  return res.status(500) .json({
    error: "Failed to fetch contactmessage"
  });
 }
 res.json(data);
});




app.listen(5000, () => {
  console.log("Server is running on port 5000");
});