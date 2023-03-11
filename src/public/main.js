


const Formulario = document.querySelector('#formulario')
const materia = document.querySelector('#materia')
const nota = document.querySelector('#nota')


Formulario.addEventListener('submit', e => {
    e.preventDefault()
    if(savedID){
        actualizar(savedID, materia.value, nota.value)
    }else{
        guardarN(materia.value, nota.value)
    }

    materia.value=''
    nota.value=''

    materia.focus()
})
