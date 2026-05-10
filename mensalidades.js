const API =
'https://bancajana-production.up.railway.app/;


async function carregarMensalidades(){

    const status =
        document.getElementById(
            'filtroStatus'
        ).value;

  const req = await fetch(

    `${API}/mensalidades`,

    {

        headers: {

            'Content-Type':
            'application/json',

            'Authorization':
            localStorage.getItem('token')

        }

    }

);

    let mensalidades =
        await req.json();

    if(status){

        mensalidades =
            mensalidades.filter(m =>
                m.status === status
            );

    }

    let html = '';

    mensalidades.forEach(item => {

        let cor = 'secondary';

        if(item.status === 'PAGO'){

            cor = 'success';

        }

        if(item.status === 'PENDENTE'){

            cor = 'danger';

        }

        html += `

        <div class="card
                    border-0
                    shadow-sm
                    rounded-4
                    mb-3">

            <div class="card-body">

                <div class="
                    d-flex
                    justify-content-between">

                    <h5>${item.aluno}</h5>

                    <span
                    class="badge bg-${cor}">

                    ${item.status}

                    </span>

                </div>

                <small>

                    Referência:
                    ${item.referencia_mes}/
                    ${item.referencia_ano}

                </small>

                <br>

                <small>

                    Valor:
                    R$ ${item.valor}

                </small>

                <br>

                <small>

                    Vencimento:
                    ${item.data_vencimento}

                </small>

                <div class="mt-3">

                    ${
                        item.status !== 'PAGO'

                        ?

                        `<button
                            class="btn btn-success btn-sm"
                            onclick="abrirPagamento(${item.id}, ${item.valor})">

                            Pagar

                        </button>`

                        :

                        ''

                    }

                </div>

            </div>

        </div>

        `;

    });

    document.getElementById(
        'listaMensalidades'
    ).innerHTML = html;

}


function abrirPagamento(id, valor){

    document.getElementById(
        'mensalidade_id'
    ).value = id;

    document.getElementById(
        'valor_pago'
    ).value = valor;

    new bootstrap.Modal(
        document.getElementById(
            'modalPagamento'
        )
    ).show();

}


async function pagarMensalidade(){

    const id =
        document.getElementById(
            'mensalidade_id'
        ).value;

    const dados = {

        forma_pagamento:
            document.getElementById(
                'forma_pagamento'
            ).value,

        valor_pago:
            document.getElementById(
                'valor_pago'
            ).value

    };

await fetch(

    `${API}/mensalidades/pagar/${id}`,

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

    location.reload();

}

carregarMensalidades();
