import usuarios from "../database/usuarios.js";
import conexao from "../database/conexao.js"

const UserRepository = {
    async getAll() {
        return usuarios
    },
    async getById(id) {
        const sql = "SELECT * FROM usuario where id_usuario =?";
        const [rows]= await conexao.promise().execute(sql,[id]);
        return rows[0]
    },
 async getUser(email,senha){
        console.log('Consulta no banco com:', email, senha);
        const sql = 'select id_usuario,nome,email,perfil from usuario where email =? and senha =?;'
         const list = await conexao.promise().query(sql,[email,senha]).catch(erro=>{
            return [erro]
        })
        return list[0][0]
    },

    async create(user) {
        const sql = 'INSERT INTO usuario (nome, email,senha, perfil) values (?, ?, ?, ?);'
        const list = await conexao.promise().execute(sql,
            [
                user.nome,
                user.email,
                user.senha,
                user.perfil

            ]).catch(erro=>{
                return [erro]
            })
        return list[0]
       
        
    },
   async update(id, user) {
    const { email, nome, perfil, senha } = user;
    const sql = "UPDATE usuario SET email = ?, nome = ?, senha = ? WHERE id_usuario = ?";

    try {
        const [result] = await conexao.promise().execute(sql, [
            email,
            nome,
            senha,
            id,
        ]);
        // 'result' contém info sobre as linhas afetadas
        return result;
    } catch (erro) {
        console.error("Erro no update:", erro);
        throw erro;  // lança o erro para o controller tratar
    }
    },
    async delete(id) {
        try {
        const sql = "DELETE FROM usuario WHERE id_usuario = ?";
        const [result] = await conexao.promise().execute(sql, [id]);
        return result;
    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        throw error; // repassa o erro para o controller
    }
    },
    async getByEmail(email) {
        return usuarios.find((user) => user.email.toLowerCase() === email.toLowerCase());
    },
    async getUserByEmail(email){
        const sql = 'SELECT id_usuario,nome,email,senha,perfil FROM usuario WHERE email = ?';
        const [rows] = await conexao.promise().query(sql,[email]);
        return rows[0];
    }
}

export default UserRepository