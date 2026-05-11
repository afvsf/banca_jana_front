const API =
'https://bancajana-production.up.railway.app';

const token =
localStorage.getItem('token');

// ======================================
// RENDER MENSALIDADES
// ======================================


function renderMensalidades(dados){

    let html = '';

    let totalPago = 0;

    let totalPendente = 0;

    dados.forEach(item => {

        if(item.status === 'PAGO'){

            totalPago +=
                Number(item.valor);

        }else{

            totalPendente +=
                Number(item.valor);

        }

        let atraso = '';

        if(item.dias_atraso > 0){

            atraso = `

                <small class="text-danger">

                    ${item.dias_atraso}
                    dias atraso

                </small>

            `;

        }
        console.log(item);
      html += `

<div
class="card border-0 shadow-sm mb-3 rounded-4">

    <div class="card-body">

        <h5>${item.aluno}</h5>

        <p>

            ${item.referencia_mes}/
            ${item.referencia_ano}

        </p>

        <p>

            Valor:
            R$ ${item.valor}

        </p>

        <p>

            Vencimento:
            ${item.data_vencimento}

        </p>

        <p>

            ${item.status}

        </p>

        ${atraso}

        <div class="mt-3">

            ${

                item.status !== 'PAGO'

                ?

                `

                <button
                class="btn btn-success btn-sm"

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

    html = `

        <div
        class="alert alert-success">

            Total Recebido:
            R$ ${totalPago.toFixed(2)}

            <br>

            Total Pendente:
            R$ ${totalPendente.toFixed(2)}

        </div>

    ` + html;

    document.getElementById(
        'listaMensalidades'
    ).innerHTML = html;

}

// ======================================
// CARREGAR MENSALIDADES
// ======================================


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

    renderMensalidades(

        dados.filter(item => {

            if(!status) return true;

            return item.status === status;

        })

    );

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

async function buscarRelatorio(){

    const inicio =
        document.getElementById(
            'data_inicio'
        ).value;

    const fim =
        document.getElementById(
            'data_fim'
        ).value;

    const status =
        document.getElementById(
            'filtroStatus'
        ).value;

    const req =
        await fetch(

            `${API}/mensalidades/relatorio/periodo?inicio=${inicio}&fim=${fim}&status=${status}`,

            {

                headers: {

                    'Authorization':
                    token

                }

            }

        );

    const dados =
        await req.json();

    renderMensalidades(dados);

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
