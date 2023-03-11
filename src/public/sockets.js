const socket= io()

const guardarN = (materia, nota) => {
    socket.emit('client:newnote', {materia, nota})
}
const deletN = (id) => {
    socket.emit('cliente:delete', id)
}

const update = (id) => {
    socket.emit('client:updatenote', id)
}

const actualizar = (id, materia, nota) => {
    socket.emit('client:petactualiz', {
        id, 
        materia, 
        nota
    })
}

socket.on('server:newnote', appendN)
socket.on('server:loadnotes', renderN)
socket.on('server:notaA', not => {
    console.log(not)
    const materia = document.querySelector('#materia')
    const nota = document.querySelector('#nota')
    materia.value= not.materia
    nota.value= not.nota

    savedID = not.id

})