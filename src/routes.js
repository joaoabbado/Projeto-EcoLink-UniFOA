import { Router } from "express";
//importação dos controllers
import AuthController from "./controllers/AuthController.js";
import middlewares from "./middlewares/middlewares.js";
import UserController from "./controllers/UserController.js";


const routes =  Router()

//MIDDLEARES GLOBAIS
routes.use(middlewares.global)

//ROTA RAIZ
routes.get('/',(req,res)=>{
    res.status(200).json({mensagem:"Sistema Ecolink"})
})

//ROTAS DE AUTENTICAÇÃO
routes.post('/login',AuthController.login) //feita
routes.get('/user/links',middlewares.verifyToken,AuthController.linksUser)
routes.get('/admin/links',middlewares.verifyTokenAdmin,AuthController.linksAdmin)

//ROTAS POST
routes.post('/user/create',AuthController.createUser,AuthController.login) //feita
routes.put('/user/update', AuthController.updateUser)
routes.delete('/user/delete/:id', AuthController.deleteUser)
routes.post('/user/check',middlewares.verifyToken)

routes.get('/api/usuarios',AuthController.getUsuarios)

export default routes
