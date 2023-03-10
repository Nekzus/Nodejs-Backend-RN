import {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProducto,
  obtenerProductos,
} from "../controllers/index.js";
import {
  esAdminRole,
  tieneRole,
  validarCampos,
  validarJWT,
} from "../middlewares/index.js";
import { existeCategoriaPorId, existeProductoPorId } from "../helpers/index.js";

import { Router } from "express";
import { check } from "express-validator";

const routerProd = Router();

// Obtener todos los productos - publico
routerProd.get("/", obtenerProductos);

// Obtener un producto por id - publico
routerProd.get(
  "/:id",
  [check("id").custom(existeProductoPorId), validarCampos],
  obtenerProducto
);

// Crear producto - privado - cualquier persona con un token valido
routerProd.post(
  "/",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE", "USER_ROLE"),
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// Actualizar producto por id - privado - cualquier persona con un token valido
routerProd.put(
  "/:id",
  [
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE", "USER_ROLE"),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar producto por id - privado - Admin
routerProd.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

export { routerProd };
