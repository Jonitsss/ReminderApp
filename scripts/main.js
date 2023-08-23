let display1 = document.getElementById('display-1')
let display2 = document.getElementById('display-2')
let btnDisplay1 = document.getElementById('btn-add-tarea')
let btn = document.getElementById('btn')

//inputs
let inputTxt = document.getElementById('input')
let btnSelectImg = document.getElementById('select-img')
let btnSelectDay = document.getElementById('select-day')
let img = document.querySelectorAll('.icons')
let dataId = -1
//Contenedores
let contentTareas = document.getElementById('content-tareas')
let contentImg = document.getElementById('img-content')

//Btn Select Img
btnSelectImg.addEventListener('click', ()=>{
    contentImg.classList.toggle('flex')
    notFound()
})

//
function notFound() {
    localStorage.setItem('img', ('img/notfound.svg'))
}

//
function removeGreen() {
    img.forEach(img => img.classList.remove('green'));
}
//Seleccionar img
img.forEach(img=>{
    img.addEventListener('click', ()=>{
    removeGreen()
    img.classList.add('green');
    
    let imgClickSrc = img.getAttribute('src')
    localStorage.setItem('img', imgClickSrc)
    })
})

function crearTarea(titulo, dia, img,dataid) {
    let div = document.createElement('div')
    div.classList.add('tareas')
    div.setAttribute('id', 'tareas');
    div.setAttribute('data-id', dataid)
    div.innerHTML += `<img src="${img}" alt="" class="icon-tareas">
    <label>
        <h2>${titulo}</h2>
        <p class="dias">Te quedan ${dia} día(s) para tu tarea...</p>
    </label>
    <img src="img/trash.svg" alt="trash icon" class="trash-icon">`
    contentTareas.appendChild(div)
    inputTxt.value = ''
}

function addTarea() {
    if (inputTxt.value == '') {
        alert('Debes Completar los Campos')
    }
    else {
        dataId++
        let titulo = inputTxt.value
        let img = localStorage.getItem('img')
        let ValorDia = btnSelectDay.value
        let tiempo = Date.now()
//--------Obtener el arreglo de tareas de localStorage--------//
        let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
// Agregar la nueva tarea al arreglo
        tareas.push({
            titulo: titulo,
            dia: ValorDia,
            img: img,
            tiempo: tiempo,
            dataid: dataId,
        });
        localStorage.setItem('tareas', JSON.stringify(tareas));
        crearTarea(titulo, ValorDia, img, dataId)
}}


function actualizarTextoDias(diasElement, diasRestantes) {
    if (diasRestantes == 0) {
        diasElement.textContent = 'Tarea Vencida...'
    }else {
        diasElement.textContent = `Te quedan ${diasRestantes} día(s) para tu tarea...`
    }
    
}

function TareasGuardadas() {
    const storedTareas = JSON.parse(localStorage.getItem('tareas')) || [];

    storedTareas.forEach(tarea => {
        crearTarea(tarea.titulo, tarea.dia , tarea.img, tarea.dataid);
        const tareaDiv = document.querySelector(`[data-id="${tarea.dataid}"]`);
        const dias = document.querySelector('[class="dias"]');
        
        const tiempoCreacion = tarea.tiempo;
        console.log('')
        const ahora = Date.now();
        const tiempoTranscurrido = ahora - tiempoCreacion;
        
        const tiempoTotal = tarea.dia * 1000 * 60 * 60 * 24; //Convertir días a milisegundos
        const tercioTarea = tiempoTotal / 3;
        
        tareaDiv.classList.remove('green');
        tareaDiv.classList.remove('yellow');
        tareaDiv.classList.remove('red');
        if (tiempoTranscurrido <= tercioTarea) {
            tareaDiv.classList.add('green');
        } else if (tiempoTranscurrido <= tercioTarea * 2) {
            tareaDiv.classList.add('yellow');
        } else {
            tareaDiv.classList.add('red');
        }
        const diasRestantes = Math.max(0, Math.ceil((tiempoTotal - tiempoTranscurrido) / (1000 * 60 * 60 * 24)));
        actualizarTextoDias(dias, diasRestantes);
    });
}


TareasGuardadas()

btn.addEventListener('click', addTarea)

//BOTÓN SWITCH DISPLAY 1 Y 2
btnDisplay1.addEventListener('click', ()=>{
    display1.style.display = 'none'
    display2.classList.add('flex')
    localStorage.setItem('display1', 'none')
    notFound()
})

//FUNCIÓN PARA QUE DISPLAY 1 NO APAREZCA XD
function DisplayNone() {
    if (JSON.parse(localStorage.getItem('tareas')).length === 0) {
        display1.style.display = 'flex'; // Mostrar el display1 si no hay tareas
        display2.classList.remove('flex'); // Ocultar el display2
    } else {
        display1.style.display = 'none'; // Ocultar el display1 si hay tareas
        display2.classList.add('flex'); // Mostrar el display2
    }
    notFound();
}
DisplayNone()



//Declarar mediante id el btn trash
let btnTrash = document.querySelectorAll('.trash-icon')

//al hacer click en el btn trash, eliminar la tarea guardada en localStorage
btnTrash.forEach(btn => {
    btn.addEventListener('click', () => {
        let taskId = btn.parentElement.getAttribute('data-id'); // Obtener el ID de la tarea asociado al botón
        let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        // Filtrar las tareas para mantener solo las que no coinciden con el ID de la tarea a eliminar
        tareas = tareas.filter(tarea => tarea.dataid !== parseInt(taskId));
        localStorage.setItem('tareas', JSON.stringify(tareas));
        btn.parentElement.remove(); 
    });
});
