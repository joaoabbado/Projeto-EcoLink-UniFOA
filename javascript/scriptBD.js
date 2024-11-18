const usuarios = [
    {
        id: 1,
        nome: 'Paulo',
        email: 'paulo@gmail.com',
        tipo: 'aluno',
        senha: 'senhaP'
    },
    {
        id: 2,
        nome: 'Guilherme',
        email: 'guilherme@gmail.com',
        tipo: 'adm',
        senha: 'senhaG'
    },
    {
        id: 3,
        nome: 'Arthur',
        email: 'arthur@gmail.com',
        tipo: 'aluno',
        senha: 'senhaA'
    },
    {
        id: 4,
        nome: 'Gorito',
        email: 'gorito@gmail.com',
        tipo: 'aluno',
        senha: 'senhaG'
    },
    {
        id: 5,
        nome: 'João',
        email: 'joão@gmail.com',
        tipo: 'aluno',
        senha: 'senhaJ'
    },
    {
        id: 5,
        nome: 'Glyden',
        email: 'glyden@gmail.com',
        tipo: 'aluno',
        senha: 'senhaG'
    },
    {
        id: 5,
        nome: 'Pilad',
        email: 'pilad@gmail.com',
        tipo: 'aluno',
        senha: 'senhaP'
    }
]

localStorage.setItem("BDusuarios",JSON.stringify(usuarios))
const visualizarJSON = localStorage.getItem("BDusuarios")
console.log(visualizarJSON);

export function pegarData(){
    const dados = JSON.parse(localStorage.getItem("BDusuarios")) || []
    return dados
}