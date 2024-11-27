function consultarCep() {
    const cep = document.getElementById('cep').value;

    if (cep.length !== 8) {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error("CEP não encontrado");
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                document.getElementById('rua').value = "";
                document.getElementById('bairro').value = "";
                document.getElementById('cidade').value = "";
                document.getElementById('estado').value = "";
            } else {
                document.getElementById('rua').value = data.logradouro || "";
                document.getElementById('bairro').value = data.bairro || "";
                document.getElementById('cidade').value = data.localidade || "";
                document.getElementById('estado').value = data.uf || "";
            }
        })
        .catch(error => {
            alert("Erro na consulta do CEP.");
            console.error(error);
        });
}

document.getElementById('cep').addEventListener('input', () => {
    const cep = document.getElementById('cep').value;

    if (cep.length === 8) {
        consultarCep();
    } else {
        document.getElementById('resultado').innerText = "";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("usuarioLogado");

    if (nomeUsuario) {
        const saudacao = document.querySelector("#saudacao");
        saudacao.textContent = `${nomeUsuario}`;
        const saudacao2 = document.querySelector("#saudacao2");
        saudacao2.textContent = `${nomeUsuario}`;
    } else {

    }
});

document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    document.querySelector('.next').addEventListener('click', () => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].classList.add('active');
    });

    document.querySelector('.prev').addEventListener('click', () => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        items[currentIndex].classList.add('active');
    });

    items[currentIndex].classList.add('active');
});


function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}