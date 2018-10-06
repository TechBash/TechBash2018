class Logger {

    async log(message) {
        //TODO: write log data to some persistence store
        console.log('%s: %s', new Date().toISOString(), message);
    };
}

module.exports.Logger = Logger;