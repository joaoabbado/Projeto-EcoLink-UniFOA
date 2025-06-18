const HOST = `http://${process.env.HOST}:${process.env.PORT}`
const links = [
    {id: 1, name: "cartas", label: "Cartas", url: HOST+"/cartas"},
    {id: 2, name: "aleatorio", label: 'Aleatório', url: HOST+"/cartas/aleatorio"},
    {id: 3, name: "valor", label: 'Valor', url: HOST+"/cartas/valor/"},
    {id: 4, name: "naipe", label: 'Naipe', url: HOST+"/cartas/naipe/"},
    {id: 5, name: "jogos", label: 'Jogos', url: HOST+"/cartas/jogos"},
    {id: 7, name: "usuarios", label: 'Usuários', url: HOST+"/admin/usuarios"},
    {id: 6, name: "perfil", label: 'Perfil', url: HOST+"/user/perfil"},
    
]

export default links