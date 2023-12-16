// TODO: Webserver for monitoring

import ArrayGpio from 'array-gpio';

console.log('start');

const pins_lut = [null, 28, 3, 5, 7, 29, 31, 26, 24, 21, 19, 23, 32, 33, 8, 10, 36, 11, 12, 35, 38, 40, 15, 16, 18, 22, 37, 13]

class RasPiOutputManager {
    constructor(pin) {
        this.output = ArrayGpio.output(pin);
    }

    setOn() {
        this.output.on();
        return this.output.isOn;
    }

    setOff() {
        this.output.off();
        return this.output.isOn;
    }

    getPin() {
        return this.output.isOn;
    }
}

let outputs = [];
for (let i = 1; i <= 16; i++) {
    outputs.push(new RasPiOutputManager(pins_lut[i]));
}

class ServiceMonitor {
    constructor(outputPin, config) {
        this.outputPin = outputPin;
        // config will hold all the callbacks necessary for the monitor to operate along with the appropraite options like
        // how often to check and when to check and stuff like that.

        // If check daily, time to check config
        // Otherwise, check on interval

        // need to keep track of how many times a service has been rebooted in a short period of time. 
        // have config.serviceFailedRebootTimes (if a service is rebooted this number of times in the [short period of time] stop rebooting until it serviceRebootFailed_reset_cb() succeeds.)

        // need to keep track of how many times a service has been rebooted overall


    }

    async reboot() {
        this.outputPin.setOff();
        if (this.config.rebootDelay === undefined || this.config.rebootDelay === null) await waitSeconds(30);
        else await waitSeconds(this.config.rebootDelay);
        this.outputPin.setOn();
    }
}

let exampleconfig = {
    serviceRebootFailed_reset_cb: () => {
        // do some things to determine that the service has been successfully restored
        // this cb will called repeatedly based in the below interval. once it returns true, the service will be considered restored.
    },
    serviceRebootFailed_reset_cb_interval_minutes: 30, // 30 minutes

    checkInterval_minutes: 120, // check the service every 2 hours
    // instead of the above, it could be checkInterval_hours: 48 or checkInterval_days: 3 or something like that
    checkIntervalOffset_minutes: 10, // check the service at 10 minutes past the hour when it is due
    // the two above options determine exactly when the check happens. to run a 1AM every night, checkInterval would be 1440 and checkIntervalOffset would be 60.

    rebootDelay_seconds: 60, // how long to wait between turning off the device and turning it back on
};



function waitSeconds(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, seconds * 1000);
    });
}


