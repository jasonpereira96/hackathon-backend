// const db = require("./db");
const { User, WaterReading, PhReading } = require("./db")

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


// doit();
createWaterReading();
createPhReading();



