import { createConnection } from "mysql2";

const conexao = createConnection(
    {
        host:'localhost',
        port:3306,
        user:'root',
        password: '',
        database: 'ecolink'
    }
)
export default conexao;