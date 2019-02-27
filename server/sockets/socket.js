const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {
        let siguienteTicket = ticketControl.siguienteTicket();
        console.log(siguienteTicket);
        callback(siguienteTicket);
    });

    client.emit('estadoActual', {
        estadoActual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                ok: false,
                mensaje: 'El escritorio es obligatorio'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        let ultimos4 = ticketControl.getUltimos4();

        client.broadcast.emit('ultimos4', ultimos4);


    });


});