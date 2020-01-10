const fs = require('fs');

/**
 * Class ticket
 * Manager from individual tickets.
 * For Internal propose
 * @construct 
 */
class Ticket {

    /** 
     * @construct
     * @param number    - number of ticket
     * @param desktop  - number of desktop
    */
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}


/**
 * Class ticket control 
 */

class TicketControl {

    constructor() {

        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let dataSaved = require('../data/data.json');

        if ( dataSaved.today === this.today ) { //same day
            // assume a server restart. Load last ticket
            this.lastTicket = dataSaved.lastTicket;
            this.tickets = dataSaved.tickets;
            this.lastFour = dataSaved.lastFour;

        } else { // is a new day
            this.resetCount();
        }
    }

    resetCount() {
        this.lastTicket = 0;
        this.tickets = [];
        this.lastFour = [];

        this.saveData();
        console.log('Reset Days and Last tiket on server');
    }

    nextTicket() {
        this.lastTicket += 1;

        // create a new ticket
        let ticket = new Ticket(this.lastTicket, null); 
        this.tickets.push(ticket);

        this.saveData();
        return `Ticket ${this.lastTicket}`;
    }

    getLastTicket() {
        return `Ticket ${this.lastTicket}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return `No hay tickets`;
        }

        let numberTicket = this.tickets[0].number;
        this.tickets.shift();   // delete first item

        let attendTicket = new Ticket(numberTicket, desktop);
        this.lastFour.unshift(attendTicket);    // push on first position
        
        if ( this.lastFour.length > 4 ) {
            this.lastFour.splice(-1,1);     //delete last item
        }

        console.log('last four', this.lastFour);

        this.saveData();

        return attendTicket;
    }

    saveData() {
        let jsonData = {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }

        let jsonDataString = JSON.stringify(jsonData);
        
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}


module.exports = {
    TicketControl
}