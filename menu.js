function criarMenu(){

    const menu = `

    <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

        <div class="container">

            <a
            class="navbar-brand fw-bold"
            href="#">

            Sistema Banca

            </a>

            <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuSistema">

                <span
                class="navbar-toggler-icon"></span>

            </button>

            <div
            class="collapse navbar-collapse"
            id="menuSistema">

                <ul class="navbar-nav ms-auto">

                    <li class="nav-item">

                        <a
                        class="nav-link"
                        href="./dashboard.html">

                        Dashboard

                        </a>

                    </li>

                    <li class="nav-item">

                        <a
                        class="nav-link"
                        href="./mensalidades.html">

                        Mensalidades

                        </a>

                    </li>

                    <li class="nav-item">

                        <a
                        class="nav-link"
                        href="./alunos.html">

                        Alunos

                        </a>

                    </li>

                    <li class="nav-item">

                        <button
                        class="btn btn-danger btn-sm ms-2"
                        onclick="logout()">

                        Sair

                        </button>

                    </li>

                </ul>

            </div>

        </div>

    </nav>

    `;

    document.getElementById(
        'menu'
    ).innerHTML = menu;

}

function logout(){

    localStorage.removeItem(
        'token'
    );

    window.location =
        './index.html';

}

criarMenu();
