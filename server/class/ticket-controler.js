const fs = require('fs');

/**
 * Class ticket control 
 */

class TicketControl {

    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();

        let dataSaved = require('../data/data.json');

        if ( dataSaved.today === this.today ) { //same day
            // assume a server restart. Load last ticket
            this.lastTicket = dataSaved.lastTicket;
        } else { // is a new day
            this.resetCount();
        }
    }

    resetCount() {
        this.lastTicket = 0;
        this.saveData();
        console.log('Reset Days and Last tiket on server');
    }

    nextTicket() {
        this.lastTicket += 1;
        this.saveData();
        return `Ticket ${this.lastTicket}`;
    }

    getLastTicket() {
        return `Ticket ${this.lastTicket}`;
    }

    saveData() {
        let jsonData = {
            lastTicket: this.lastTicket,
            today: this.today
        }
        let jsonDataString = JSON.stringify(jsonData);
        
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}


module.exports = {
    TicketControl
}