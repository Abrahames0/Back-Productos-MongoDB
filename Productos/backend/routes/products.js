var express = require("express");
var router = express.Router();
let productModel = require('../models/product');

//Listado de todos los productos
router.get("/", async function (req, res, next) {
  const resultado = await productModel.find();
  res.json(resultado);
});


router.post("/", async function (req, res, next) {
  const product = new productModel({
      id: req.body.id, //Extra el Id pasado por el body
      description: req.body.description,
      name: req.body.name,
      price: req.body.price,
      images: req.body.images
    });


    const result = await product.save(); // Lo guarda en Mongo
    res.json('Registro Agregado exitosamente');
});

router.put("/:id", async function (req, res, next) {
  try {
    const resultado = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    if(!resultado) return res.statusCode(404)
    return res.send(resultado) 
  } catch (err) {
      console.log(err)
  }
});

router.delete("/:id", async function (req, res, next) {
 try {
  const productoEliminado = await productModel.findByIdAndDelete(req.params.id)
  if(!productoEliminado) return res.statusCode(404)
  return res.send('producto eliminado')
 } catch (err) {
    console.log(err);
 }
})

module.exports = router;
