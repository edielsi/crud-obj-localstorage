var form_cadastro = document.getElementById('frm_cadastro');
var btn_enviar = document.querySelector('input[type=submit]');

var nome = document.getElementById('nome');
var telefone = document.getElementById('telefone');
var email = document.getElementById('email');
var foto = document.getElementById('foto');
var campo_indice = document.getElementById('indice');

var foto_tmp;

// var cadastros = [{
//     'id': 1,
//     'nome': 'isleide',
//     'telefone': '11980808080',
//     'email': 'email@mail.com',
//     'foto': ''

// }];

//locaStorage.setItem(key,value)
//locaStorage.getItem(key)
//locaStorage.removeItem(key)
//locaStorage.clear()
//JSON.parse()
//JSON.stringigy()




btn_enviar.addEventListener('click', e => {
    e.preventDefault();
    if (campo_indice.value >= 0) {
        //edição
        cadastros[campo_indice.value].nome = nome.value;
        cadastros[campo_indice.value].telefone = telefone.value;
        cadastros[campo_indice.value].email = email.value;
        
        converterImagem()

        setTimeout(() => {
            cadastros[campo_indice.value].foto =document.getElementById('foto_temp').value;
            localStorage.setItem('cadastros',JSON.stringify(cadastros))
            atualizar_lista()
        }, 500);
        

    } else {
        var id = cadastros.length + 1;

        converterImagem()

        setTimeout(() => {

            cadastros.push({
                'id': id,
                'foto': document.getElementById('foto_temp').value,
                'nome': nome.value,
                'telefone': telefone.value,
                'email': email.value,

            });

            localStorage.setItem('cadastros',JSON.stringify(cadastros))

            atualizar_lista();
            
            document.getElementById('foto_temp').value = ""
        }, 500);

    }
});

function converterImagem() {

    //pegar arquivo do formulario
    var arquivo = document.getElementById('foto').files;

    //verificar se tem arquivo
    if (arquivo.length > 0) {

        //acessar o arquivo desejado
        var arquivo_enviado = arquivo[0];

        //instanciando o objeto que lê o arquivo
        var leitura = new FileReader();

        //converter leitura para formato dataurl
        leitura.readAsDataURL(arquivo_enviado);

        //carregar a imagem em base64
        leitura.addEventListener('load', (e) => {

            //acessar o resultado do carregamento
            document.getElementById('foto_temp').value = e.target.result

            console.log(document.getElementById('foto_temp').value)

           
        })
    }
}

function atualizar_lista() {
    let lista = document.getElementById('lista');

    lista.innerHTML = "";

    if(localStorage.length>0){
        
        cadastros = JSON.parse(localStorage.getItem('cadastros'))
    }else{
        cadastros = [];
    }


    cadastros.forEach((item, index) => {

        if (item.foto == undefined) {
            item.foto = "http://localhost/ci4/oh4/img/sistema/oh.jpg"
        }

        lista.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td><img src="${item.foto}" width="50px"></td>
            <td>${item.nome}</td>
            <td>${item.telefone}</td>
            <td>${item.email}</td>
            <td>
                <button class="btn btn-warning" onclick="preenche_formulario_edicao(${index})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="excluir_registro(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`
    });

    document.querySelector('input[type=submit]').value = "Enviar";

    form_cadastro.reset();

}

atualizar_lista();

function preenche_formulario_edicao(indice) {
    nome.value = cadastros[indice].nome;
    telefone.value = cadastros[indice].telefone;
    email.value = cadastros[indice].email;
    campo_indice.value = indice;

    document.getElementById('foto_temp').value = cadastros[indice].foto;
    console.log(cadastros[indice].foto)
    document.querySelector('input[type=submit]').value = "Salvar Alteração"

}

function excluir_registro(indice) {

    let resposta = confirm('Tem certeza que deseja excluir o cadastro de: ' + cadastros[indice].nome + " ?")

    if (resposta) {
        cadastros.splice(indice, 1);
        localStorage.setItem('cadastros',JSON.stringify(cadastros))
    }

    atualizar_lista();
}

