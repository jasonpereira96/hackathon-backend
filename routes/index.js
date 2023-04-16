var express = require('express');
var router = express.Router();
const { sequelize, User, WaterReading, PhReading, Reading, PumpRecord } = require("./../db/db");
const { getRandomToken } = require("./../util/util");
const { auth } = require("./../middleware/auth");


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', async function (req, res, next) {
  try {
    await sequelize.sync();
    console.log(req.body.username + "as");
    res.json({
      ok: true
    })
    // next();

  } catch (e) {
    console.log(e);
  }
});

router.post('/login', async function (request, response, next) {
  try {
    // await sequelize.sync();
    const user = await User.findOne({ where: { username: request.body.username, password: request.body.password } });
    if (user === null) {
      response.sendStatus(404);
    } else {
      try {
        const newToken = getRandomToken();
        user.token = newToken;
        await user.save();
        response.json({
          success: true,
          code: 200,
          token: newToken
        });
      } catch (e) {
        console.log(500 + " " + q);
        response.sendStatus(500);
      }
    }

  } catch (e) {
    console.log(e);
  }
});

router.post('/logout', async function (req, res, next) {
  try {
    const token = req.headers.token;
    const user = await User.findOne({ where: { token: token } });
    if (user === null) {
      response.sendStatus(404);
    } else {
      try {
        user.token = "";
        await user.save();
        response.json({
          success: true,
          code: 200,
        });
      } catch (e) {
        console.log(500 + " " + "q");
        response.sendStatus(500);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/data', async function (request, response, next) {
  try {

    const readings = await Reading.findAll({
      limit: 30,
      order: [
        ['createdAt', 'DESC'],
      ]
    });

    return response.json({
      success: true,
      readings
    });
  } catch (e) {
    console.log(e);
    response.sendStatus(500);
  }
});


router.get('/esp-recv', async function (request, response, next) {
  try {
    console.log(request.body);
    console.log(request.query);
    return response.json({
      cool: true,
      message: "I recived your message and I want to put it into the database but tell me what is what"
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/esp-send', async function (request, response, next) {
  try {
    console.log(request.body);
    console.log(request.query);
    return response.json({
      cool: true,
      message: "you sent a message"
    });
  } catch (e) {
    console.log(e);
  }
});

router.get('/pump-data', async function (request, response, next) {
  const readings = await PumpRecord.findAll({
    limit: 10,
    order: [
      ['createdAt', 'DESC'],
    ]
  });
  return response.json({
    readings
  });
});

router.post('/esp', async function (request, response, next) {
  try {
    console.log(request.body); 
    console.log(request);
    const readings = await Reading.findAll({
      limit: 1,
      order: [
        ['createdAt', 'DESC'],
      ]
    });
    const reading = readings[0];
    let items = [
      reading.phLow,
      reading.phHigh,
      reading.pumpStatus ? 1 : 2,
      reading.pumpInterval,
      reading.lightStatus ? 1: 0,
      reading.lightDurationMinutes
    ];

    /*
    {
  ph: '7.00',
  phLow: '0.00',
  phHigh: '14.00',
  overflow: '0',
  underflow: '0',
  turbulance: '0',
  temperature: '69.42',
  humidity: '12.50',
  pump_status: '0',
  pump_interval_seconds: '1800',
  light_status: '0',
  light_duration_minutes: '60'
}
     */
    
    response.send(items.join(","));
    let data;
    for (let key of Object.keys(request.body)) {
      if (key.startsWith("ph:")) {
        data = parseKey(key);
        console.log(data);
        break;
      }
    }

    let record = {
      ph: parseFloat(data.ph),
      phLow: parseFloat(data.phLow),
      phHigh: parseFloat(data.phHigh),
      overflow: parseInt(data.overflow) ? 1: 0,
      underflow: parseInt(data.underflow) ? 1: 0,
      turbulence: 0,
      temperature: parseFloat(data.temperature),
      humidity: parseFloat(data.humidity),
      pumpStatus: parseInt(data.pump_status) === 1,
      pumpInterval: parseInt(data.pump_interval_seconds),
      lightStatus: parseInt(data.light_status) === 1,
      lightDurationMinutes: parseInt(data.light_duration_minutes)
    };
    try {
      await Reading.create(record);
      console.log("Reading creation succeeded");
    } catch(e) {
      console.log("Reading creation failed");
    }
  } catch (e) {
    console.log(e);
  }
});


function parseKey(key) {
  let items = key.split(",");
  let res = {};
  console.log(items);
  for (let i=0; i<12; i++) {
    let item = items[i];
    console.log(item);
    let [k, v] = item.split(":");
    k = k.trim();
    v = v.trim();
    res[k] = v;
  }
  return res;
}




module.exports = router;
