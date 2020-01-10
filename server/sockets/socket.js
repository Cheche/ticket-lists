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
        actual: ticketControl.getLastTicket()
    });
});