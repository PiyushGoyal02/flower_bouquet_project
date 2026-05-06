const productModel = require("../Models/adminSideModel")

exports.getAllProducts = async (req, res) => {
  try{

    const products = await productModel.find({}, 'productName descriptionText category originalPrice discountPrice productsquantity deliveryTime productHighlights stockStatus discountPercentage images');

    if (!products || products.length === 0){
      res.status(404).json(
        {
          success: false,
          message: "No products found"
        }
      )
    }

    res.status(201).json(
      {
        success: true,        
        message: "Products fetched successfully",
        products: products
      }
    )

  }catch(error){
    console.log("Error fetching products:", error);
    res.status(501).json({
      success: false,
      message: "Server error while fetching products"
    });
  }
}