import UserRepository from "../repositories/UserRepository.js";
import links from "../database/links.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import permissoes from "../database/permisoes.js";

const SECRET = process.env.SECRET;
const TOKEN_EXPIRE = eval(process.env.TOKEN_EXPIRE);

const UserController = {
    deleteUser: async (req,res) =>{
      const {email, senha} = req.body
      
      if(senha == ""){
        return res.status(401).json({
          status: 401,
          ok: false,
          message: "Insira a senha",
        });
      }
        const usuario = await UserRepository.getByEmail(email);

        if(!usuario){
          return res.status(404).json({
            status:404,
            ok: false,
            message:"Usuário não encontrado"
          })
        }
        if (usuario.senha !== senha) {
          return res.status(401).json({
            status: 401,
            ok: false,
            message: "Senha incorreta",
          });
        }

        await UserRepository.delete(usuario.id)

        return res.status(200).json({
          status: 200,
          ok: true,
          message: "Usuário deletado com sucesso!",
        });
      }
}

export default UserController