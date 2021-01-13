var BASE_URL = 'https://reqres.in/api/users/';
const POSTMAN_URL = 'https://httpbin.org/post';

var span_user_id = document.getElementById("id");
var span_user_email = document.getElementById("email");
var span_user_name = document.getElementById("name");
var span_status = document.getElementById("status");


//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener('load', (ev) => {
    let numsecs = document.getElementById('segundos');
    let numuser = document.getElementById('usuario');
    let boton = document.getElementById('submit');

    boton.addEventListener('click', async(ev) => {
        ev.preventDefault();
        clearFields();
        let user = await procesarFetch(numsecs.value, numuser.value);
        printData(user);
        postUser(user);
    });
});

/**
 *  Limpia los datos mostrados anteriormente
 */
function clearFields() {
    document.querySelectorAll('span').forEach((element) => {
        element.innerHTML = '';
    });
}

/**
 * Funcion que realiza la petecion de obtencion de datos hacia la API insertada
 * 
 * @param {Number} numsecs Segundo que tardara en obtener la informacion 
 * @param {Number} numuser Numero de usuario registrado
 * @returns Usuario
 */
async function procesarFetch(numsecs, numuser) {
    let user;

    let link_user = numuser + "?delay=" + numsecs;

    await fetch(BASE_URL + link_user)
        .then(response => {
            if (response.status == "404") {
                span_status.innerHTML = response.status;
            } else {
                return response.json()
            }
        })
        .then(response => {
            user = response;
            console.log("Respuesta conseguida.");
        })
        .catch(error => console.error("No hay respuesta " + error));

    return user.data;
}

/**
 * Muestro los datos obtenidas por get
 * @param {Object} user Datos del usuario obtenidas con GET 
 */
function printData(user) {
    if (user == null || user == undefined) {
        console.error("No se ha encontrado ningun usuario");
    } else {
        span_user_id.innerHTML = user.id;
        span_user_email.innerHTML = user.email;
    }
}

/**
 * Recojo el usuario obtenido y lo guardo en otro server junto las opciones de la API
 * @param {Object} user Objeto usuario
 */
async function postUser(user) {
    if (user == null || user == undefined) {
        console.error("No se ha encontrado ningun usuario");
    } else {
        const options_fetch = {
            method: "POST",
            headers: {
                "Content-type": "aplication/json; charset=UTF-8"
            },
            body: JSON.stringify(user)
        }
        fetch(POSTMAN_URL, options_fetch)
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                span_user_name.innerHTML = user.first_name;
                span_status.innerHTML = "200";
                console.log('Success:', response)
            });
    }
}