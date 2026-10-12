
const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");
const authMiddleware = require("../middleware/authMiddleware");

// Get all case studies
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch case studies" });
  }
});

// Create a case study
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      technologies,
      client,
      challenge,
      solution,
      results,
      featured_image,
      gallery_images,
      project_url,
    } = req.body;

    if (!title || !slug || !description) {
      return res.status(400).json({
        error: "Title, slug, and description are required",
      });
    }

    const { data, error } = await supabase
      .from("case_studies")
      .insert([{
        title,
        slug,
        description,
        category,
        technologies,
        client,
        challenge,
        solution,
        results,
        featured_image,
        gallery_images: gallery_images || [],
        project_url,
      }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create case study" });
  }
});

// Update a case study
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      description,
      category,
      technologies,
      client,
      challenge,
      solution,
      results,
      featured_image,
      gallery_images,
      project_url,
    } = req.body;

    const { data, error } = await supabase
      .from("case_studies")
      .update({
        title,
        slug,
        description,
        category,
        technologies,
        client,
        challenge,
        solution,
        results,
        featured_image,
        gallery_images,
        project_url,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Case study not found" });
    }

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update case study" });
  }
});

// Delete a case study
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("case_studies")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Case study not found" });
    }

    res.json({ message: "Case study deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete case study" });
  }
});

module.exports = router;
