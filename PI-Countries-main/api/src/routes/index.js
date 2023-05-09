const { Router } = require("express");
const countriesRoutes = require("./Countries");
const activitiesRoutes = require("./Activities");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countriesRoutes);
router.use("/activities", activitiesRoutes);

module.exports = router;
