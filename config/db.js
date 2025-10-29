//Importa Mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

//Funcion asincronica para conectar la base de datos
const connectDB = async () => {
    try {
        //Conecta usando la URI de .env // process.env.MONGODB_URI
        await mongoose.connect('mongodb+srv://jonathangpdr_db_user:Djagp07.@cluster0.kqueo4v.mongodb.net/?appName=Cluster0totalcareDB', {
            useNewUrlParser: true, //Evita advertencias de depreciacion
            useUnifiedTopology: true //Usa el nuevo motor de topologia
        });
        console.log('MongoDB conectado exitosamente');
    } catch (error) {
        //Maneja errores de conexion
        console.error('Error al conectar MongoDB:', error.message);
        process.exit(1); //Termina el preoceso si falla
    }
};

//Exporta la funcion para usarla en server.js
module.exports = connectDB;