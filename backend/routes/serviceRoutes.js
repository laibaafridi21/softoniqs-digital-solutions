const express= require("express")
const router = express.Router();
const supabase = require("../config/supabase");
const authMiddleware = require("../middleware/authMiddleware");


router.get( "/", async (req, res) =>  {
    try {
    
     const    {data, error} = await supabase 
        .from("services")
        .select("*")
        .order("id",  {ascending : true} );
    

if (error) {
    return res.status(500).json ({error: error.message})

}
res.json(data) ;


}  catch (error){
    res.status(500).json  ({error: "Failed to fetch services"})
}
});


router.post("/", authMiddleware, async (req, res) => {
    try {
      const {
        title,
        description,
        features,
        technologies,
        price,
      } = req.body;
  
      if (!title || !description) {
        return res.status(400).json({
          error: "Title and description are required",
        });
      }
  
      const { data, error } = await supabase
        .from("services")
        .insert([
          {
            title,
            description,
            features,
            technologies,
            price,
          },
        ])
        .select();
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      res.status(201).json(data[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create service" });
    }
  });


  router.put("/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, features, technologies, price } = req.body;
  
      const { data, error } = await supabase
        .from("services")
        .update({ title, description, features, technologies, price })
        .eq("id", id)
        .select();
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      if (!data || data.length === 0) {
        return res.status(404).json({ error: "Service not found" });
      }
  
      res.json(data[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update service" });
    }
  });

  router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
  
      const { data, error } = await supabase
        .from("services")
        .delete()
        .eq("id", id)
        .select();
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      if (!data || data.length === 0) {
        return res.status(404).json({ error: "Service not found" });
      }
  
      res.json({ message: "Service deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });






module.exports = router;