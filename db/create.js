// const db = require("./db");
const { User, WaterReading, PhReading, Reading, PumpRecord } = require("./db")

async function doit() {
    const kacper = await User.create({
        name: "Kacper",
        token: "123sfdvs",
        username: "kacper",
        password: "1234"
    });
    const jason = await User.create({
        name: "Jason",
        token: "123sfdvs",
        username: "jason",
        password: "1234"
    });
    const lukas = await User.create({
        name: "Lukas",
        token: "123sfdvs",
        username: "lukas",
        password: "1234"
    });
    const anthony = await User.create({
        name: "Anthony",
        token: "123sfdvs",
        username: "anthony",
        password: "1234"
    });
}

async function createWaterReading() {
    await WaterReading.create({ reading: 56.3 })
    await WaterReading.create({ reading: 40.3 })
    await WaterReading.create({ reading: 52.86 })
    await WaterReading.create({ reading: 33.2 })
    await WaterReading.create({ reading: 95.365 })
}

async function createPhReading() {
    await PhReading.create({ reading: 0 })
    await PhReading.create({ reading: 14 })
    await PhReading.create({ reading: 7.8 })
    await PhReading.create({ reading: 6.5 })
    await PhReading.create({ reading: 9.6 })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

async function createReading() {
    for (let i = 0; i < 5; i++) {
        await Reading.create({
            ph: getRandomInt(4, 11),
            phLow: getRandomInt(3, 4),
            phHigh: getRandomInt(11, 12),
            overflow: false,
            underflow: false,
            turbulence: false,
            temperature: getRandomInt(0, 35),
            humidity: getRandomInt(10, 40),
            pumpStatus: true,
            pumpInterval: getRandomInt(10, 40),
            lightStatus: true,
            lightDurationMinutes: getRandomInt(10, 20),
        });
    }
}

async function createPumpRecord() {
    for (let i=0; i<10; i++) {
        await PumpRecord.create({action: 'on'});
        await PumpRecord.create({action: 'off'});
        await PumpRecord.create({action: 'on'});
        await PumpRecord.create({action: 'off'});
        await PumpRecord.create({action: 'on'});
        await PumpRecord.create({action: 'off'});
        await PumpRecord.create({action: 'on'});
        await PumpRecord.create({action: 'off'});
        await PumpRecord.create({action: 'on'});
        await PumpRecord.create({action: 'off'});
        await PumpRecord.create({action: 'on'});
    }
}


// doit();
// createWaterReading();
// createPhReading();
// createReading();
// createPumpRecord();



