const mysql = require('mysql')

const connectiondDb = () => {mysql.createConnection({
        host:'localhost',
        user: 'root',
        password: '123456789',
        database: 'prueba'
    
    })
    
    const insert = {
     
    }
    //PERMISOS DE USUARIO: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';
    
    connectiondDb.connect((err) => {
        if(err) throw err; 
        console.log("base de datos conectada"); 
    })
}

export{
    connectiondDb
}
