document.getElementById('inputComentario').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        
        
        const comentarioTexto = this.value;
        
       
        this.value = '';
        const novoComentario = document.createElement('div');
        novoComentario.classList.add('comentario');

        novoComentario.innerHTML = `
            <img src="imagensRSocial/Steve-Jobs.jpg" alt="Foto de perfil" class="foto-perfil">
            <div class="conteudo-comentario">
                <span class="nome-comentario">Steve Jobs</span>
                <p>${comentarioTexto}</p>
            </div>
        `;

        
        document.getElementById('comentariosExistentes').appendChild(novoComentario);
    }
});
