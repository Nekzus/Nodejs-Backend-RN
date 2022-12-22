import {
  googleSignIn,
  login,
  validarTokenUsuario,
} from "../controllers/index.js";
import { validarCampos, validarJWT } from "../middlewares/index.js";

import { Router } from "express";
import { check } from "express-validator";

const routerAuth = Router();

routerAuth.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

routerAuth.post(
  "/google",
  [check("id_token", "id_token es necesario").not().isEmpty(), validarCampos],
  googleSignIn
);

routerAuth.get("/", [validarJWT], validarTokenUsuario);

export { routerAuth };
