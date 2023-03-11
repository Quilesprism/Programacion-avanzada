const divnotas = document.querySelector ('#notas')

let savedID = ''

const notaUI = nota => {
    const div = document.createElement('div')

div.innerHTML += `
    <div class="card card-body mb-2 animate__animated animate__fadeIn">
        <div class="d-flex justify-content-be{nota.materia}</h1>
            <div> tween">     
            <h1 class="h3 card-title" >$
                <button class="btn btn-danger delete" data-id="${nota.id}">Borrar</button>
                <button class="btn btn-danger update" data-id="${nota.id}">Actualizar</button>            
                
            </div>
        </div>
        <p>${nota.nota}</p>
    </div>`

    const btnDelete = div.querySelector(".delete")
    btnDelete.addEventListener('click', ()=>{
        deletN(btnDelete.dataset.id)
    })

    const btnUpdate = div.querySelector(".update")
    btnUpdate.addEventListener('click', ()=>{
        update(btnUpdate.dataset.id)
    })

    return div
}

const renderN = notas =>{
    divnotas.innerHTML = ''

    Object.entries(notas).forEach(([key, value]) => {
        divnotas.append(notaUI(value))
})}

const appendN = notas =>{
      divnotas.append(notaUI(notas)) 
}