import UserRepository from "../repositories/UserRepository.js";
import links from "../database/links.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import permissoes from "../database/permisoes.js";
import { isCompleteName, isEmail, isPassword } from "../shared/util.js";

const SECRET = process.env.SECRET;
const TOKEN_EXPIRE = eval(process.env.TOKEN_EXPIRE);

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      console.log('Login recebido:', { email: req.body.email, senha: req.body.senha });

      const usuario = await UserRepository.getUserByEmail(email);
      if (!usuario) {
        return res.status(401).json({status:401, ok:false, message: "usuário não encontrado"})

        
      }
      
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta){
        return res.status(401).json({status:401, ok: false, message: "Senha incorreta"});
      }
      const user = {
        id:usuario.id_usuario,
        nome: usuario.nome,
        email:usuario.email,
        acesso: usuario.perfil,
      };
    const token = jwt.sign(user, SECRET, { expiresIn: TOKEN_EXPIRE });
    return res.status(200).json({
      status: 200,
      ok: true,
      message: "Acesso autorizado",
      token: token,
      user: user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, ok: false, message: error.message });
  }
  },
  linksUser: (req, res) => {
    const list = permissoes.find(
      (permissao) => permissao.name === "user"
    ).links;
    res.status(200).json(links.filter((link) => list.includes(link.name)));
  },
  linksAdmin: (req, res) => {
    const list = permissoes.find(
      (permissao) => permissao.name === "admin"
    ).links;
    res.status(200).json(links.filter((link) => list.includes(link.name)));
  },
createUser: async (req, res, next) => {
  const { nome, email, senha, confirma } = req.body;
  const msgErrors = [];

  if (!nome) {
    msgErrors.push("O nome é obrigatório");
  } else if (!isCompleteName(nome)) {
    msgErrors.push("Informe seu nome completo");
  }

  if (!email) {
    msgErrors.push("O email é obrigatório");
  } else if (!isEmail(email)) {
    msgErrors.push("E-mail inválido");
  }

  if (!senha) {
    msgErrors.push("A senha é obrigatória");
  } else if (!isPassword(senha)) {
    msgErrors.push("A senha deve ter no mínimo 8 caracteres");
  } else if (senha !== confirma) {
    msgErrors.push("A senha e a confirmação não conferem");
  }

  if (msgErrors.length > 0) {
    return res.status(400).json({
      status: 400,
      ok: false,
      message: msgErrors,
    });
  }

  try {
    const senhaHash = await bcrypt.hash(senha,10)
    const user = { nome, email, senha:senhaHash, perfil: "user" };
    const resp = await UserRepository.create(user);
    console.log("Usuário criado:", resp);

    // Garantir que login vai funcionar:
    req.body.email = email;
    req.body.senha = senha;

    next(); // vai para AuthController.login
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      ok: false,
      message: "Erro ao criar usuário",
    });
  }
},

  updateUser: async (req, res) => {
  const { id, nome, email, senhaAtual, senha, confirma } = req.body;
  console.log(id)
  const msgErrors = [];

  // Validações básicas
  if (!nome) {
    msgErrors.push("O nome é obrigatório");
  } else if (!isCompleteName(nome)) {
    msgErrors.push("Informe seu nome completo");
  }

  if (!email) {
    msgErrors.push("O E-mail é obrigatório");
  } else if (!isEmail(email)) {
    msgErrors.push("E-mail inválido");
  }

  if (!senhaAtual) {
    msgErrors.push("Informe a senha atual para continuar");
  }

  if (!senha) {
    msgErrors.push("A nova senha é obrigatória");
  } else {
    if (!isPassword(senha)) {
      msgErrors.push("A senha deve ter no mínimo 8 caracteres");
    }
    if (senha !== confirma) {
      msgErrors.push("A senha e a confirmação não conferem");
    }
  }

  if (msgErrors.length > 0) {
    return res.status(400).json({
      status: 400,
      ok: false,
      message: msgErrors,
    });
  }

 
  const usuarioDB = await UserRepository.getById(id);
  if (!usuarioDB) {
    return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
  }

  const senhaConfere = await bcrypt.compare(senhaAtual, usuarioDB.senha);
  if (!senhaConfere) {
    return res.status(401).json({ ok: false, message: "Senha atual incorreta" });
  }

  
  const senhaHash = await bcrypt.hash(senha, 10);
  const userAtualizado = {
    nome,
    email,
    senha: senhaHash
  };

  const resposta = await UserRepository.update(id, userAtualizado);

if (resposta.affectedRows === 0) {
    return res.status(404).json({ ok: false, message: "Nenhum usuário foi atualizado. Verifique o ID." });
}

return res.status(200).json({ ok: true, message: "Usuário atualizado com sucesso", user: resposta });
},

  getUsuarios: async (req, res) => {
    try {
      const usuarios = await UserRepository.getAll(); 

      return res.status(200).json({
        status: 200,
        ok: true,
        usuarios, 
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        ok: false,
        message: "Erro ao buscar usuários",
      });
    }
  },
  deleteUser: async (req,res)=>{
    const {senha} =req.body
    const id = req.params.id
    if (!senha){
      return res.status(400).json({ok:false,message:"Senha Obrigatória"})
    }
    const usuarioDB= await UserRepository.getById(id);
    if (!usuarioDB) {
    return res.status(404).json({ ok: false, message: "Usuário não encontrado" });
  }

  const senhaConfere = await bcrypt.compare(senha, usuarioDB.senha);
  if (!senhaConfere) {
    return res.status(401).json({ ok: false, message: "Senha incorreta" });
  }

  const resultado = await UserRepository.delete(id);
  if (resultado.affectedRows === 0) {
    return res.status(400).json({ ok: false, message: "Erro ao deletar o usuário" });
  }

  return res.status(200).json({ ok: true, message: "Usuário deletado com sucesso" });
}
  
};

export default AuthController;
