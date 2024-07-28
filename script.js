let ArrayUsuarios = [];
let login = false;
let apykey = "fff5b989659d1b6c8f12a2a68f02c84b66596dccd4d630493caca198c255add3";

let btnInicio = document.getElementById('btnLogin');
btnInicio.addEventListener('click', alertLogin);

function alertLogin() {
    Swal.fire({
        background:"#424242",
        color:"#ebeae8",
        html:   '<h2 class="tituloAlert">INICIAR SESION</h2>' +
                '<form class="form">'+
                '<input type="text" placeholder="Nombre" id="nombre">' +
                '<input type="password" placeholder="Contraseña" id="password">' +
                '<button class="btn" id="loginBtn">Confirmar</button>'+
                '</form>',
        showConfirmButton: false,
    });

    document.getElementById('loginBtn').addEventListener('click', function(event) {
        event.preventDefault();
        let nombre = document.getElementById('nombre').value;
        let password = document.getElementById('password').value;
        
        let recuperado = JSON.parse(localStorage.getItem("UsuariosRegistrados")) || [];
        function busqueda(objUsuario) {
            return objUsuario.nombre === nombre && objUsuario.password === password;
        }
        let resultadoFind = recuperado.find(busqueda)

        console.log("resultadoFind: " + resultadoFind);

        if (resultadoFind == null) {
            Swal.fire({
                background:"#424242",
                color:"#ebeae8",
                title: "Usuario No Encontrado",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4caf50"
            })
        }else {
            Swal.fire({
                background:"#424242",
                color:"#ebeae8",
                title: "Bienvenido!",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4caf50"
            })
        login = true;

        if (login = true) {
            // mostrarLiga(5, Liga1);
            agregarPartido(mostrarPartido);
            borrarDiv();
        }
        }
    });
}

let btnRegistro = document.getElementById('btnRegistro');
btnRegistro.addEventListener('click', alertRegistro);

function alertRegistro() {
    Swal.fire({
        background:"#424242",
        color:"#ebeae8",
        html:   '<h2 class="tituloAlert">Registrarse</h2>' +
                '<form class="form">'+
                '<input type="text" placeholder="Nombre" id="nombre">' +
                '<input type="password" placeholder="Contraseña" id="password">' +
                '<input type="email" placeholder="Mail" id="email">' +
                '<button class="btn" id="registroBtn">Confirmar</button>'+
                '</form>',
        showConfirmButton: false
    });

    document.getElementById('registroBtn').addEventListener('click', function(event) {
        event.preventDefault();

        let nombre = document.getElementById('nombre').value;
        let password = document.getElementById('password').value;
        let email = document.getElementById('email').value;

        if (nombre === "" || password === "" || email === "") {
            Swal.fire({
                background:"#424242",
                color:"#ebeae8",
                title: "Todos los campos son obligatorios",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4caf50"
            })
            return;
        }else {

        let recuperado = JSON.parse(localStorage.getItem("UsuariosRegistrados")) || [];

        let usuarioExistente = recuperado.some(function(objUsuario) {
            return objUsuario.nombre === nombre && objUsuario.password === password && objUsuario.email === email;
        });

        if (usuarioExistente == true) {
            Swal.fire({
                background:"#424242",
                color:"#ebeae8",
                title: "Usuario ya registrado",
                text: "Inicie sesión para acceder",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#4caf50"
            })
        }else {

        let usuario = {nombre: nombre, password: password, email: email}
        recuperado.push(usuario);
        localStorage.setItem("UsuariosRegistrados", JSON.stringify(recuperado));
        Swal.fire({
            background:"#424242",
            color:"#ebeae8",
            title: "Usuario registrado correctamente",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#4caf50"
        })
        }
}})}

//! MUESTRA EL NOMBRE DE LA LIGA (POR SI AGREGO MAS LUEGO)
// function mostrarLiga(countryId, funcionLiga) {
//   fetch(`https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=${apykey}&countryId=${countryId}`)
//     .then(response => response.json())
//     .then(data => {
//         if (Array.isArray(data.result) && data.result.length > 0) {
//           funcionLiga(data.result[0].league_name);
//         }
//     })
//     .catch(error => {
//       console.error('Error al hacer la solicitud:', error);
//     });
// }

// function Liga1(leagueName) {
// 	let thead = document.getElementById('thead');
// 	let fila = document.createElement("tr");
// 	fila.innerHTML = `<th colspan="6">${leagueName}<th>`;
// 	thead.appendChild(fila);
// }

//! Cambiar la fecha en "from=2024-05-23&to=2024-05-26" para los nuevos partidos
function agregarPartido(funcionTabla) {
    fetch(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${apykey}&from=2024-05-23&to=2024-05-26&countryId=5&leagueId=207`)
        .then(response => response.json())
        .then(data => {
            let partidos = data.result;
            partidos.forEach(partido => {
                funcionTabla(
                    partido.event_time,
                    partido.event_home_team,
                    partido.event_away_team,
                    partido.event_final_result
                );
            });
        });
}

function mostrarPartido(eventTime, homeTeam, awayTeam, finalResult) {
    console.log('Detalles del partido:', {
        eventTime: eventTime,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        finalResult: finalResult
    });

    let tbody = document.getElementById('tbody');

    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${eventTime || 'N/A'}</td>
        <td>${homeTeam || 'N/A'}</td>
        <td>${finalResult || 'N/A'}</td>
        <td>${awayTeam || 'N/A'}</td>
    `;
    tbody.appendChild(fila);
}

function borrarDiv() {
    let div = document.querySelector('.containerSesion');
        div.remove();
}

