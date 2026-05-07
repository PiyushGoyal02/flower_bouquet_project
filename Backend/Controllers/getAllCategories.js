const adminProducts = require("../Models/adminSideModel")

exports.getAllCategories = async (req, res) => {
  try{
    
    // distinct method is used to get unique values of a field from the collection, we don't neet fake value to get categories.
    const categories = await adminProducts.distinct("category");

    res.status(200).json(
      {
        success: true,
        message: "Categories fetched successfully",
        categories: categories,
      }
    )

  }catch(error){
    res.status(500).json(
      {
        success: false,
        message: "Error fetching categories",
        error: error.message,
      }
    )
  }
}