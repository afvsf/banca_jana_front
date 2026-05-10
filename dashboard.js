const API =
'https://bancajana-production.up.railway.app/;


async function carregarDashboard(){

  const req = await fetch(

    `${API}/dashboard`,

    {

        headers: {

            'Content-Type':
            'application/json',

            'Authorization':
            localStorage.getItem('token')

        }

    }

);

    const dados = await req.json();

    document.getElementById(
        'recebido'
    ).innerHTML =
        `R$ ${dados.total_recebido}`;

    document.getElementById(
        'pendente'
    ).innerHTML =
        `R$ ${dados.total_pendente}`;

    document.getElementById(
        'alunos'
    ).innerHTML =
        dados.total_alunos;

    document.getElementById(
        'inadimplentes'
    ).innerHTML =
        dados.inadimplentes;

    let html = '';

    dados.ultimos_pagamentos.forEach(item => {

        html += `
            <div class="border-bottom py-2">

                <strong>${item.nome}</strong>

                <br>

                R$ ${item.valor_pago}

            </div>
        `;

    });

    document.getElementById(
        'ultimosPagamentos'
    ).innerHTML = html;

}

carregarDashboard();
