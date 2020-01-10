const { io } = require('../server');
const { TicketControl } = require('../class/ticket-controler');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Client need new ticket
    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTicket();
        console.log(nextTicket);
        callback(nextTicket);
    });

    // Emit Actual State
    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour()
    });


    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({error:true, msg: 'El escritorio es requerido'});
        }

        let attendTicket = ticketControl.attendTicket(data.desktop);
        callback(attendTicket);
        // update change on last four tickets
    });
});