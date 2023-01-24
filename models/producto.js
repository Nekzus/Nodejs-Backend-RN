import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CoordsSchema = Schema({
  lat: { type: Number, default: 0 },
  lng: { type: Number, default: 0 },
});

const ProductoSchema = Schema({
  title: {
    type: String,
    required: [true, "El titulo es obligatorio"],
    // unique: true,
  },
  estado: { type: Boolean, default: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
  img: { type: String, default: null },
  date: { type: Date, default: Date.now },
  typeanimal: { type: String, default: null },
  race: { type: String, default: null },
  sex: { type: String, default: null },
  location: { type: CoordsSchema, default: { lat: 0, lng: 0 } },
  identification: { type: Boolean, default: false },
  description: { type: String, default: null },
  phone: {
    type: String,
    // required: true,
    // match: /^[0-9\s]{3}-?[0-9\s]{7}$/,
    default: null,
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...producto } = this.toObject();

  if (producto.user._id) {
    producto.user.uid = producto.user._id;
    delete producto.user._id;
  }

  return producto;
};

const Producto = model("Producto", ProductoSchema);

export { Producto };
