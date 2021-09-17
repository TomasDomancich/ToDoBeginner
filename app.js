console.log('app.js loaded')

const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listaTarea = document.getElementById('listaTarea')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tareas = {}

listaTarea.addEventListener('click', e => {
    btnAccion(e)
})

formulario.addEventListener('submit', e => {
    e.preventDefault()
    setTarea (e)
})

const setTarea = e => {
    if(input.value.trim() === ""){
        console.warn('Error: Ingrese una tarea, por favor.')
        return
    }
    
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }

    tareas[tarea.id] = tarea

    formulario.reset()
    mostrarTareas()
}

const mostrarTareas = () => {
    listaTarea.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        clone.querySelectorAll('.btn')[0].dataset.id = tarea.id
        fragment.appendChild(clone)
    })

        listaTarea.appendChild(fragment)
}

const btnAccion = e => {
    
    if (e.target.classList.contains('finalizar')){
        delete tareas[e.target.dataset.id]
        mostrarTareas()
    }

    e.stopPropagation()
}