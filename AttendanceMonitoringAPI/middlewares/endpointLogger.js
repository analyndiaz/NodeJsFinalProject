const EventEmitter = require("events");

class EndpointLogger extends EventEmitter {
  logEndpointCall = (req, res, next) => {
    this.emit("endpointCalled", req);
    next();
  };
}

module.exports = new EndpointLogger();
