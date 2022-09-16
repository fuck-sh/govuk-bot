class Listener {
    /**
     * 
     * @param {object} options
     * @param {string} options.name
     * @param {boolean} options.once 
     */

    constructor({ name, once }) {
        this.name = name;
        this.once = once || false;
    }

    run() {
        throw new Error("event.run was not implemented");
    }
}

module.exports = Listener;