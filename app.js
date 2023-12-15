const raspberry = require('array-gpio');

console.log('start');

class RasPiOutputManager {
    constructor() {
        this.outputs = [];
        for (let i = 0; i < 16; i++) {
            this.outputs.push(raspberry.out(i));
        }
    }

    setOn(pin) {
        if (pin < 16) this.outputs[pin].on();
        else return false;
        return true;
    }

    setOff(pin) {
        if (pin < 16) this.outputs[pin].off();
        else return false;
        return true;
    }

    getPin(pin) {
        if (pin < 16) return this.outputs[pin].isOn;
        else return null;
    }
}

let outputs = new RasPiOutputManager();

class ServiceMonitor {
    constructor(outputPin, config) {
        // config will hold all the callbacks necessary for the monitor to operate along with the appropraite options like
        // how often to check and when to check and stuff like that.
    }
}