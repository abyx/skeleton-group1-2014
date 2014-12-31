var Q = require('q');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var _ = require('lodash');
var app = express();

var db;

app.use(express.static('../public'));
app.use(bodyParser.json());

app.get('/example', function(request, response) {
  response.send({success: true});
});

app.post('/example/:id', function(request, response) {
  console.log(request.body, request.params.id, 'query', request.query);
  response.sendStatus(200);
});
/*
app.get('/TimeLineData', function(request, response){
  var resJson = {
    timeline:
    {
      "headline":"באבא זמן",
      "type":"default",
      "startDate":"2009,1",
      "text":"<i><span class='c1'>באבא</span> & <span class='c2'>זמן</span></i>",
      "asset":
      {
        "media":"assets/img/baba_logo.png",
        "credit":"",
        "caption":""
      },
      "date": [
        {
          "startDate":"2013,2,1",
          "headline":"1/2/2013<br>משיכת כסף בכספומט",
          "text":"אירוע",
          "asset": {
            "media": "assets/img/atm.png"
          }
        },
        {
          "startDate":"2013,4,2",
          "headline":"2/4/2013<br>שליחת דואר",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/mail.jpg"
          }
        },
        {
          "startDate":"2013,5,1",
          "headline":"פגישה",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/meeting.jpg"
          }
        },
        {
          "startDate":"2010,2,1",
          "headline":"1/2/2013<br>משיכת כסף בכספומט",
          "text":"אירוע",
          "asset": {
            "media": "assets/img/atm.png"
          }
        },
        {
          "startDate":"2009,5,1",
          "headline":"פגישה",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/meeting.jpg"
          }
        }
      ]
    }
  };

  var DateArray =
  [
    {
      "startDate":"2013,2,1",
      "headline":"1/2/2013<br>משיכת כסף בכספומט",
      "text":"אירוע",
      "asset": {
        "media": "assets/img/atm.png"
      }
    },
    {
      "startDate":"2013,4,2",
      "headline":"2/4/2013<br>שליחת דואר",
      "text":"אירוע",
      "asset": {
        "media":"assets/img/mail.jpg"
      }
    },
    {
      "startDate":"2013,5,1",
      "headline":"פגישה",
      "text":"אירוע",
      "asset": {
        "media":"assets/img/meeting.jpg"
      }
    },
    {
      "startDate":"2010,2,1",
      "headline":"1/2/2013<br>משיכת כסף בכספומט",
      "text":"אירוע",
      "asset": {
        "media": "assets/img/atm.png"
      }
    },
    {
      "startDate":"2009,5,1",
      "headline":"פגישה",
      "text":"אירוע",
      "asset": {
        "media":"assets/img/meeting.jpg"
      }
    }
  ];


  resJson.timeline.date = _.filter(DateArray,function(item)
                          {
                            var itemDate = StringToDate(item.startDate);
                            console.log('condidtion',itemDate);

                            return (itemDate >= StringToDate(request.query.startDate) && itemDate <= StringToDate(request.query.endDate));
                          });

  console.log('date data',	resJson.timeline);
  console.log('date data',	resJson.timeline.date);
  
  response.send(resJson);
});
*/

app.get('/TimeLineData', function(request, response){

  var resJson = {
    timeline:
    {
      "headline":"באבא זמן",
      "type":"default",
      "startDate":"2009,1",
      "text":"<i><span class='c1'>באבא</span> & <span class='c2'>זמן</span></i>",
      "asset":
      {
        "media":"assets/img/baba_logo.png",
        "credit":"",
        "caption":""
      },
      "date": [
        {
          "startDate":"2013,2,1",
          "headline":"1/2/2013<br>משיכת כסף בכספומט",
          "text":"אירוע",
          "asset": {
            "media": "assets/img/atm.png"
          }
        },
        {
          "startDate":"2013,4,2",
          "headline":"2/4/2013<br>שליחת דואר",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/mail.jpg"
          }
        },
        {
          "startDate":"2013,5,1",
          "headline":"פגישה",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/meeting.jpg"
          }
        },
        {
          "startDate":"2010,2,1",
          "headline":"1/2/2013<br>משיכת כסף בכספומט",
          "text":"אירוע",
          "asset": {
            "media": "assets/img/atm.png"
          }
        },
        {
          "startDate":"2009,5,1",
          "headline":"פגישה",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/meeting.jpg"
          }
        }
      ]
    }
  };

  var anotherJson = {
    timeline:
    {
      "headline":"באבא זמן",
      "type":"default",
      "startDate":"2012,1",
      "text":"<i><span class='c1'>נתונים</span> & <span class='c2'>רועננו</span></i>",
      "asset":
      {
        "media":"assets/img/baba_logo.png",
        "credit":"",
        "caption":""
      },
      "date": [
        {
          "startDate":"2014,2,1",
          "headline":"1/2/2013<br>משיכת כסף בכספומט",
          "text":"אירוע",
          "asset": {
            "media": "assets/img/atm.png"
          }
        },
        {
          "startDate":"2013,4,2",
          "headline":"2/4/2013<br>שליחת דואר",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/mail.jpg"
          }
        },
        {
          "startDate":"2012,5,1",
          "headline":"פגישה",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/meeting.jpg"
          }
        }
      ]
    }
  };
  console.log(request.query.startDate);
  console.log(moment(request.query.startDate,'DD/MM/YYYY'));
  console.log(moment('01/01/2012','DD/MM/YYYY'));
  console.log(moment(request.query.startDate,'DD/MM/YYYY').isAfter(moment('01/01/2012','DD/MM/YYYY')));
  if (moment(request.query.startDate,'DD/MM/YYYY').isAfter(moment('01/01/2012','DD/MM/YYYY'))) {
    response.send(anotherJson);
  }
  else
  {
    response.send(resJson);
  }

});

function StringToDate(date)
{
  var splitedDate = date.split(',');
  return new Date(splitedDate[0], splitedDate[1], splitedDate[2]);
}

mongo.connect('mongodb://localhost/app', function(err, aDb) {
  if (err) {
    throw err;
  }

  db = aDb;

  var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(' [*] Listening at http://%s:%s', host, port);
  });
});

