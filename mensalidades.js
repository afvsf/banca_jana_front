const API =
'https://bancajana-production.up.railway.app';

const token =
localStorage.getItem('token');


async function carregarMensalidades(){

    const status =
        document.getElementById(
            'filtroStatus'
        ).value;

    const req =
        await fetch(

            `${API}/mensalidades`,

            {

                headers: {

                    'Authorization':
                    token

                }

            }

        );

    const dados =
        await req.json();

    let html = '';

    dados
    .filter(item => {

        if(!status) return true;

        return item.status === status;

    })

.forEach(item => {

    let atraso = '';

    if(item.dias_atraso > 0){

        atraso = `

            <br>

            <small class="text-danger">

                ${item.dias_atraso}
                dias atraso

            </small>

        `;

    }

    html += `

        <div
        class="card border-0 shadow-sm mb-3 rounded-4">

            <div class="card-body">

                <h5>${item.aluno}</h5>

                <p class="mb-1">

                    Referência:
                    ${item.referencia_mes}/${item.referencia_ano}

                </p>

                <p class="mb-1">

                    Valor:
                    R$ ${item.valor}

                </p>

                <p class="mb-1">

                    Status:
                    <strong>${item.status}</strong>

                </p>

                ${atraso}

                <div class="mt-3">

                    ${

                        item.status !== 'PAGO'

                        ?

                        `

                        <button
                        class="btn btn-success"

                        onclick="
                        abrirModal(
                            ${item.id},
                            ${item.valor}
                        )">

                        Registrar Pagamento

                        </button>

                        `

                        :

                        `

                        <span
                        class="badge bg-success">

                        Pago

                        </span>

                        `

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


function abrirModal(id, valor){

    document.getElementById(
        'mensalidade_id'
    ).value = id;

    document.getElementById(
        'valor_pago'
    ).value = valor;

    const modal =
        new bootstrap.Modal(

            document.getElementById(
                'modalPagamento'
            )

        );

    modal.show();

}

async function gerarMensalidades(){

    await fetch(

        `${API}/mensalidades/gerar-anual`,

        {

            method: 'POST',

            headers: {

                'Authorization':
                localStorage.getItem('token')

            }

        }

    );

    alert(
        'Mensalidades geradas'
    );

    carregarMensalidades();

}


async function pagarMensalidade(){

    const id =
        document.getElementById(
            'mensalidade_id'
        ).value;

    const forma_pagamento =
        document.getElementById(
            'forma_pagamento'
        ).value;

    const valor_pago =
        document.getElementById(
            'valor_pago'
        ).value;

    await fetch(

        `${API}/mensalidades/pagar/${id}`,

        {

            method: 'PUT',

            headers: {

                'Content-Type':
                'application/json',

                'Authorization':
                token

            },

            body: JSON.stringify({

                valor_pago,
                forma_pagamento

            })

        }

    );

    alert(
        'Pagamento registrado'
    );

    location.reload();

}


carregarMensalidades();
