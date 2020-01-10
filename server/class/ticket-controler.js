const fs = require('fs');

/**
 * Class ticket
 * Manager from individual tickets.
 * For Internal propose
 */
class Ticket {

    /** 
     * @construct
     * @param number   - number of ticket
     * @param desktop  - number of desktop
    */
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}


/**
 * Class ticket control 
 * 
 * Manager for tickets progress.
 */

class TicketControl {

    /**
     * Construct.
     * Initialize ticket of the day. Check the lastest status to avoid errors
     */
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

    /**
     * Reset Count.
     * Clear data and initialize for a new work day
     */
    resetCount() {
        this.lastTicket = 0;
        this.tickets = [];
        this.lastFour = [];

        this.saveData();
        console.log('Reset Days and Last tiket on server');
    }

    /**
     * Next Ticket
     * Assign a new ticket with sequential number
     * Desktop is'nt assigned
     * @returns string
     */
    nextTicket() {
        this.lastTicket += 1;

        // create a new ticket
        let ticket = new Ticket(this.lastTicket, null); 
        this.tickets.push(ticket);

        this.saveData();
        return `Ticket ${this.lastTicket}`;
    }


    /**
     * Get last Ticket
     * Return last assigned ticket
     * @returns string
     */
    getLastTicket() {
        return `Ticket ${this.lastTicket}`;
    }

    /**
     * Get Last Four Assigned ticket
     * Return last four assigned tickets.
     * @return array of tickets
     */
    getLastFour() {
        return this.lastFour;
    }

    /**
     * Attend Ticket
     * Assign a pending ticket for the desk to attend to
     * 
     * @param {string} desktop - name of dektop for attend a ticket 
     * @returns {string} 'No hay tickets' if the number of pending tickets is zero
     * @returns {Ticket} Ticket object with number of ticket and desktop
     */
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

    /**
     * Save Data
     * Save status of tickets on JSON Data
     */
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