const API =
'https://bancajana-production.up.railway.app';

const token =
localStorage.getItem('token');

async function carregarDashboard(){

    const mes =
        document.getElementById('mes').value;

    const ano =
        document.getElementById('ano').value;

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

    const filtrado =
        dados.filter(item =>

            item.referencia_mes == mes
            &&

            item.referencia_ano == ano

        );

    let totalRecebido = 0;

    let totalPendente = 0;

    let inadimplentes = 0;

    let pagamentos = 0;

    let html = '';

    filtrado.forEach(item => {

        if(item.status === 'PAGO'){

            totalRecebido +=
                Number(item.valor_pago || 0);

            pagamentos++;

        }else{

            totalPendente +=
                Number(item.valor);

            inadimplentes++;

        }

        html += `

            <div class="border-bottom py-2">

                <strong>${item.aluno}</strong>

                <br>

                Status:
                ${item.status}

                <br>

                Valor:
                R$ ${item.valor}

            </div>

        `;

    });

    
    document.getElementById(
        'totalRecebido'
    ).innerHTML =

        `R$ ${totalRecebido.toFixed(2)}`;

    document.getElementById(
        'totalPendente'
    ).innerHTML =

        `R$ ${totalPendente.toFixed(2)}`;

    document.getElementById(
        'inadimplentes'
    ).innerHTML = inadimplentes;

    document.getElementById(
        'pagamentos'
    ).innerHTML = pagamentos;

    document.getElementById(
        'listaResumo'
    ).innerHTML = html;

}

async function carregarAniversariantes(){

    const req = await fetch(
        `${API}/dashboard/aniversariantes`,
        {
            headers:{
                Authorization: token
            }
        }
    );

    const lista = await req.json();

    let html = "";

    if(lista.length === 0){

        html = `
            <p class="text-muted">
                Nenhum aniversariante este mês.
            </p>
        `;

    }else{

        lista.forEach(item => {

            html += `
                <div class="border-bottom py-2">

                    <strong>${item.nome}</strong>

                    <br>

                    <small>
                        Dia ${item.dia}
                    </small>

                </div>
            `;

        });

    }

    document.getElementById("aniversariantes").innerHTML = html;

}

carregarDashboard();

carregarAniversariantes();
