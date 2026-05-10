const API =
'https://bancajana-production.up.railway.app';

function formatarDataBR(data){

    if(!data) return '';

    return new Date(data)
    .toLocaleDateString('pt-BR');

}


function formatarDataInput(data){

    if(!data) return '';

    return data.split('T')[0];

}


async function carregarAlunos(){

   const req = await fetch(

    `${API}/alunos`,

    {

        headers: {

            'Content-Type':
            'application/json',

            'Authorization':
            localStorage.getItem('token')

        }

    }

);

    const alunos = await req.json();

    let html = '';

    alunos.forEach(aluno => {

        html += `

        <div class="card
                    border-0
                    shadow-sm
                    rounded-4
                    mb-3">

            <div class="card-body">

                <h5>${aluno.nome}</h5>

                <small>
                    Responsável:
                    ${aluno.responsavel}
                </small>

                <br>

                <small>
                    Tel:
                    ${aluno.telefone}
                </small>

                <br>

                <small>
                    Mensalidade:
                    R$ ${aluno.valor_mensalidade}
                </small>

                 <br>

                 <small>
                    Vencimento da Mensalidade:
                    Dia ${aluno.dia_vencimento}
                </small>

                 <br>

                <div class="mt-3">

                    <button
                        class="btn btn-sm btn-warning"
                        onclick="editarAluno(${aluno.id})">

                        Editar

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="excluirAluno(${aluno.id})">

                        Excluir

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    document.getElementById(
        'listaAlunos'
    ).innerHTML = html;

}


async function salvarAluno(){

    const id =
        document.getElementById('id').value;

    const dados = {

        nome:
            document.getElementById('nome').value,

        data_matricula:
            document.getElementById(
                'data_matricula'
            ).value,

        responsavel:
            document.getElementById(
                'responsavel'
            ).value,

        telefone:
            document.getElementById(
                'telefone'
            ).value,

        valor_mensalidade:
            document.getElementById(
                'valor_mensalidade'
            ).value,

         dia_vencimento:
            document.getElementById(
                'dia_vencimento'
            ).value

    };

    if(id){

    await fetch(

    `${API}/alunos/${id}`,

    {

        method: 'PUT',

        headers: {

            'Content-Type':
            'application/json',

            'Authorization':
            localStorage.getItem('token')

        },

        body: JSON.stringify(dados)

    }

);

    }else{

       await fetch(

    `${API}/alunos`,

    {

        method: 'POST',

        headers: {

            'Content-Type':
            'application/json',

            'Authorization':
            localStorage.getItem('token')

        },

        body: JSON.stringify(dados)

    }

);

    }

    location.reload();

}


async function editarAluno(id){

    const req =
        await fetch(`${API}/alunos/${id}`);

    const aluno =
        await req.json();

    document.getElementById('id').value =
        aluno.id;

    document.getElementById('nome').value =
        aluno.nome;

    document.getElementById(
    'data_matricula'
).value =
formatarDataInput(
    aluno.data_matricula
);

    document.getElementById(
        'responsavel'
    ).value =
        aluno.responsavel;

    document.getElementById(
        'telefone'
    ).value =
        aluno.telefone;

    document.getElementById(
        'valor_mensalidade'
    ).value =
        aluno.valor_mensalidade;

    new bootstrap.Modal(
        document.getElementById(
            'modalAluno'
        )
    ).show();

}


async function excluirAluno(id){

    if(confirm('Excluir aluno?')){

        await fetch(

    `${API}/alunos/${id}`,

    {

        method: 'DELETE',

        headers: {

            'Authorization':
            localStorage.getItem('token')

        }

    }

);

        carregarAlunos();

    }

}


function buscarAluno(){

    let busca =
        document.getElementById(
            'busca'
        ).value.toLowerCase();

    let cards =
        document.querySelectorAll('.card');

    cards.forEach(card => {

        if(
            card.innerText.toLowerCase()
            .includes(busca)
        ){

            card.style.display = '';

        }else{

            card.style.display = 'none';

        }

    });

}

carregarAlunos();
