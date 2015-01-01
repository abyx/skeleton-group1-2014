var Q = require('q');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var _ = require('lodash');
var ATMDB = require('./ATMDB');
var objMailDAL = require('./MailDAL');
var meetingDBRepository = require('./MeetingDB');
var app = express();
///tempDB.TimelineRepository

var db;

app.use(express.static('../public'));
app.use(bodyParser.json());

app.get('/example', function(request, response) {
  response.send({success: true});
});

app.post('/example/:id', function(request, response) {
  //console.log(request.body, request.params.id, 'query', request.query);
  response.sendStatus(200);
});


app.get('/TimeLineData', function(request, response){

  var timelineStart = moment(request.query.startDate,'DD/MM/YYYY').format('YYYY,MM');
  console.log(timelineStart);

  var parentJson = {
    timeline: {
      "headline": "באבא זמן",
      "type": "default",
      "startDate": timelineStart,
      "text": "<i><span class='c1'>חווית המסע בזמן</span></i>",
      "asset": {
        "media": "assets/img/baba_logo.png",
        "credit": "",
        "caption": ""
      },
      "date": []
    }
    };

  var startDate = moment(request.query.startDate,'DD/MM/YYYY').toDate();
  var endDate   = moment(request.query.endDate,'DD/MM/YYYY').toDate();

  var promiseATM;
  var promiseMeeting;
  var promiseEmail;
  var allPromises = [];
  console.log('query', request.query);
  if (request.query.isATM == "true") {
    console.log('isAtm Started' , request.query.isATM);
    promiseATM = ATMDB.ATMData.getEvents(moment(request.query.startDate,'DD/MM/YYYY').toDate(),
                                      moment(request.query.endDate,'DD/MM/YYYY').toDate(), db);
    allPromises.push(promiseATM);
  }
  if (request.query.isMeeting == "true") {

  }
  if (request.query.isEmail == "true"){
    var promiseEmail = objMailDAL.mailDAL.getMailsByDates(db, startDate,endDate);
    allPromises.push(promiseEmail);
  }

  if (allPromises.length > 0) {
    Q.all(allPromises).then(function (results) {
      console.log('=============results===========')
      console.log(results);
      console.log('=============results end ===========')
      if (results !== undefined && results.length > 0) {
        for (var i = 0; i < results.length; i++) {
          var result = results[i];
          console.log('=============result===========')
          console.log(result);
          console.log('=============result end ===========')
          if (result !== undefined && result.length > 0) {
            parentJson.timeline.date = parentJson.timeline.date.concat(result);
          }
        }

        response.send(parentJson);
      }
      else {
        response.sendStatus(500);
      }
    });
  }
  else
    response.send(parentJson);

  /*
  objMailDAL.mailDAL.getMailsByDates(db, startDate,endDate).then(function (result)
  {
    console.log("res: " , result);

    parentJson.timeline.date = result;

    console.log("parent: " , parentJson);

    //response.send( parentJson );


  }).then(function(){
    return ATMDB.ATMData.getEvents(moment(request.query.startDate,'DD/MM/YYYY').toDate(),
        moment(request.query.endDate,'DD/MM/YYYY').toDate(), db);
  }).then(function(Events) {
    if (Events == null)
      response.sendStatus(500);
    else
    {

      parentJson.timeline.date = parentJson.timeline.date.concat(Events);
      console.log("parent: " , parentJson);
      response.send(parentJson);
    }
  });
  */
});

app.post('/Meetings' ,function(request,response){

  var timelineStart = moment(request.query.startDate,'DD/MM/YYYY').format('YYYY,MM');
  var meetingJson =

  {
    timeline:
    {
      "headline":"באבא זמן",
      "type":"default",
      "startDate":timelineStart,
      "text":"<i><span class='c1'>נתונים</span> & <span class='c2'>רועננו</span></i>",
      "asset":
      {
        "media":"assets/img/baba_logo.png",
        "credit":"",
        "caption":""
      },
      "date": [

        {
          "startDate":"2012,5,1",
          "headline":"2פגישה",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/meeting.jpg"
          }
        },
        {
          "startDate":"2012,6,1",
          "headline":"1פגישה",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/meeting.jpg"
          }
        }
      ]
    }
  };

  console.log('got to server');

  //db.collection("Meetings").insert(request.body);

  meetingDBRepository.MeetingDBRepository.saveMeetingEvent(db,meetingJson);

  response.sendStatus(200);

});
app.get('/Meetings',function(request,response){

  console.log(request.query.startDate);
  console.log(request.query.endDate);

  var allMeetings = meetingDBRepository.MeetingDBRepository.getAllMeetingsEvent(db,request.query.startDate,request.query.endDate);

  console.log(allMeetings);

  response.sendStatus(200);

});

mongo.connect('mongodb://localhost/app', function(err, aDb) {
  if (err) {
    throw err;
  }

  db = aDb;




  var tmpMail1= {
        "startDate":"2013,4,2",
       "headline":"2/4/2013<br>שליחת דואר",
        "text":"אירוע1",
        "asset": {
         "media":"assets/img/mail.jpg"
       }
      };
  var tmpMail2= {
    "startDate":"2013,5,9",
    "headline":"9/5/2013<br>משיכת כסף מכספומט",
    "text":"אירוע2",
    "asset": {
      "media":"assets/img/atm.png"
    }
  };
    var tmpMail3= {
        "startDate":"2013,7,9",
        "headline":"9/7/2013<br>פגישה חשודה",
        "text":"אירוע2",
        "asset": {
            "media":"assets/img/meeting.jpg"
        }
    };
    var tmpMail4= {
        "startDate":"2013,9,9",
        "headline":"9/9/2013<br>שליחת דואר",
        "text":"אירוע2",
        "asset": {
            "media":"assets/img/mail.jpg"
        }
    };


  objMailDAL.mailDAL.deleteAllMails(db).then(function ()
      {
        objMailDAL.mailDAL.saveMail(db,tmpMail1);
        objMailDAL.mailDAL.saveMail(db,tmpMail2);
          objMailDAL.mailDAL.saveMail(db,tmpMail3);
          objMailDAL.mailDAL.saveMail(db,tmpMail4);
      });




  var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(' [*] Listening at http://%s:%s', host, port);
  });
});




app.post('/InsertNewATMEvent', function(request, response) {
  var responseCode = ATMDB.ATMData.saveEvent(request.body, db);
  response.send(responseCode);
});
