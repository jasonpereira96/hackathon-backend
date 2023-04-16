var express = require('express');
var router = express.Router();
const { sequelize, User, WaterReading, PhReading } = require("./../db/db");
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

    const phReadings = await PhReading.findAll({
      limit: 30,
      order: [
        ['createdAt', 'DESC'],
      ]
    });
    const waterReadings = await WaterReading.findAll({
      limit: 30,
      order: [
        ['createdAt', 'DESC'],
      ]
    });

    return response.json({
      success: true,
      phReadings, waterReadings
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

router.post('/esp', async function (request, response, next) {
  try {
    console.log(request.body);
    return response.json({
      cool: true,
      message: "you sent a message on the new endpoint"
    });
  } catch (e) {
    console.log(e);
  }
});




module.exports = router;
