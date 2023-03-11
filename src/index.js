import express from "express";
import { Server as websocketServer } from "socket.io";
import http from 'http';
const app = express()
const server = http.createServer(app)
const io = new websocketServer(server)
const mysql = require('mysql')
import { v4 as uuid } from 'uuid';

const connectiondDb = mysql.createConnection({
        host:'localhost',
        user: 'root',
        password: '123456789',
        database: 'prueba'
    
    }) 
connectiondDb.connect((err) => {
        if(err) throw err; 
        console.log("base de datos conectada"); 
    })

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log("conexion nueva:", socket.id)


let select = `SELECT * FROM notas;`; 
connectiondDb.query(select, (err, results) => {
    if (err) throw err;
    io.emit('server:loadnotes', results)
})

socket.on('client:newnote', data => {
    const newdata={...data, id: uuid()}
    let query = `INSERT INTO notas 
    (id, materia, nota) VALUES (?, ?, ?);`;
    connectiondDb.query(query, [newdata.id, newdata.materia, 
    newdata.nota], (err, rows) => {
    if (err) throw err;
    console.log("insertado");
});
    console.log("insertado");
    io.emit('server:newnote', newdata)  

})
socket.on('cliente:delete', id => {
    connectiondDb.query('DELETE FROM notas WHERE id = ?', [id], (err, rows) => {
        if (err) throw err;
        console.log('eliminado')
    })
    
    connectiondDb.query(`SELECT * FROM notas;`, (err, results) => {
        if (err) throw err;
        io.emit('server:loadnotes', results)
})
    
})

socket.on('client:updatenote', id => {
    connectiondDb.query(`SELECT * FROM notas WHERE id=?`,[id], (err, results) => {
        if (err) throw err;
        socket.emit('server:notaA', results[0])
})

socket.on('client:petactualiz', datoNota => {
let sql = `UPDATE notas
           SET materia = ?, nota = ? 
           WHERE id = ?`;
connectiondDb.query(sql, [datoNota.materia, datoNota.nota, datoNota.id], (err, results) => {
    if (err) throw err;
    io.emit('server:loadnotes', results)
});
})

})


})
  
server.listen(3000)
console.log('server on port', 3000)
