import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js"; 
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración del motor de plantillas Handlebars
app.engine('handlebars',handlebars.engine()); 
app.set('view engine', 'handlebars');
app.set('views', path.resolve('views'));

// Middleware para manejar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Rutas de la API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta de las vistas
app.use('/', viewRouter(io));

// Ruta de archivos estáticos
app.use(express.static(path.resolve('public')));

// Configuración de Websockets
io.on('connection', (socket) => {
    console.log('Cliente conectado');
});

// Puerto de escucha
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});