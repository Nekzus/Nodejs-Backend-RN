import { request, response } from "express";

import { Producto } from "../models/index.js";

// obtenerProductos - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
  const { limite = 1500, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("user", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);
  res.json({
    total,
    productos,
  });
};

// obtenerProducto - populate {}
const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("user", "nombre")
    .populate("categoria", "nombre");
  res.json(producto);
};

// crearProducto
const crearProducto = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body;
  // const title = body.title.toUpperCase();
  // const productoDB = await Producto.findOne({ title });
  // if (productoDB) {
  //   return res.status(400).json({
  //     msg: `El producto ${productoDB.title}, ya existe`,
  //   });
  // }

  try {
    // Crear data a guardar
    const data = {
      ...body,
      title: body.title.toUpperCase(),
      user: req.usuario._id,
    };
    // Guardar en la base de datos
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

// actualizarProducto
const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  if (data.title) {
    data.title = data.title.toUpperCase();
  }
  data.usuario = req.usuario._id;
  const producto = await Producto.findByIdAndUpdate(id, data, {
    new: true,
  });
  res.json(producto);
};

// borrarProducto - estado: false
const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const productoDB = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json(productoDB);
};

export {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProducto,
  obtenerProductos,
};
