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

  console.log( "------ /TimeLineData -----");
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
    if (request.query.isATM == "true") {
        promiseATM =  ATMDB.ATMData.getEvents(startDate,endDate , db);
        allPromises.push(promiseATM);
    }
    if (request.query.isMeeting == "true") {
        promiseMeeting = meetingDBRepository.MeetingDBRepository.getAllMeetingsEvent(db, startDate,endDate);
        allPromises.push(promiseMeeting);
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
  console.log("***** filtering BY dates : " + startDate + "   -    " + endDate);

  objMailDAL.mailDAL.getMailsByDates(db, startDate,endDate).then(function (Events)
  {
      console.log("2 getMailsByDates then --------- ");
      console.log("res getMailsByDates: ", Events);

      if (Events != null) {
          parentJson.timeline.date = Events;
      }

  }).then(function(){
    var promise = ATMDB.ATMData.getEvents(startDate,endDate , db);
    promise.then(function(Events) {
        console.log("2 ATMData.getEvents then --------- ");
        console.log("res ATMData: ", Events);
      if (Events != null){

          parentJson.timeline.date = parentJson.timeline.date.concat(Events);

      }
    });
  }).then(function(){
          meetingDBRepository.MeetingDBRepository.getAllMeetingsEvent(db, startDate,endDate).then(function (Events)
          {
              console.log("3 getAllMeetingsEvent then --------- ");
              console.log("res getAllMeetingsEvent: ", Events);
              if (Events != null) {
                  parentJson.timeline.date = parentJson.timeline.date.concat(Events);
              }

              console.log("**** MERGED JSON: ", parentJson);
              console.log("**** END MERGED JSON: ");
              response.send(parentJson);

          });

      });
      */
});

app.post('/Meetings' ,function(request,response){

  meetingDBRepository.MeetingDBRepository.saveMeetingEvent(db,request.body);

  response.sendStatus(200);

});

app.get('/Meetings',function(request,response){

  console.log(request.query.startDate);
  console.log(request.query.endDate);

  var allMeetings = meetingDBRepository.MeetingDBRepository.getAllMeetingsEvent(db,request.query.startDate,request.query.endDate);

  console.log(allMeetings);

  response.sendStatus(200);

});

app.delete('/Meetings',function(request,response){


    meetingDBRepository.MeetingDBRepository.deleteAllMeetings(db).then(function () {

        response.sendStatus(200);
    });

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
        "asset":
         "assets/img/mail.jpg"

      };
  var tmpMail2= {
    "startDate":"2013,5,9",
    "headline":"9/5/2013<br>משיכת כסף מכספומט",
    "text":"אירוע2",
    "asset":
     "https://www.youtube.com/watch?v=WEza-xZMTWs"

  };
    var tmpMail3= {
        "startDate":"2013,7,9",
        "headline":"9/7/2013<br>פגישה חשודה",
        "text":"אירוע2",
        "asset":
           "assets/img/meeting.jpg"

    };
    var tmpMail4= {
        "startDate":"2013,9,9",
        "headline":"9/9/2013<br>שליחת דואר",
        "text":"אירוע2",
        "asset":
           "assets/img/mail.jpg"

    };
      var tmpMail5= {
        "startDate":"2009,5,9",
        "headline":"9/5/2009<br>משיכת כסף מכספומט",
        "text":"אירוע2",
        "asset": "https://www.youtube.com/watch?v=ghRijg1IJnU"

    };
  var tmpMail6= {
    "startDate":"2010,5,9",
    "headline":"9/5/2010<br>כניסה לחניון",
    "text":"חניון",
    "asset":
       "assets/img/images.jpg"

  };
  var tmpMail7= {
    "startDate":"2011,5,9",
    "headline":"9/5/2011<br>כניסה לחניון",
    "text":"חניון",
    "asset":
       "assets/img/images3U240V20.jpg"

  };

  objMailDAL.mailDAL.deleteAllMails(db).then(function ()
      {
          objMailDAL.mailDAL.saveMail(db,tmpMail1);
          ATMDB.ATMData.saveEvent(tmpMail2,db);
          meetingDBRepository.MeetingDBRepository.saveMeetingEvent(db,tmpMail3);
          objMailDAL.mailDAL.saveMail(db,tmpMail4);
          ATMDB.ATMData.saveEvent(tmpMail5,db);
          meetingDBRepository.MeetingDBRepository.saveMeetingEvent(db,tmpMail6);
          meetingDBRepository.MeetingDBRepository.saveMeetingEvent(db,tmpMail7);

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

app.post('/AddMail', function(request, response) {
    var startDateInput =   moment(request.query.startDate,'DD/MM/YYYY').format('YYYY,MM');
    var startDateInput =   moment(request.body.startDate).format('YYYY,MM,DD');

    var tmpNewMail= {
        "startDate":startDateInput,
        "headline":"2/4/2013<br>שליחת דואר",
        "text":"אירוע חדש",
        "asset": {
            "media":"assets/img/mail.jpg"
        }
    };

    objMailDAL.mailDAL.saveMail(db,tmpNewMail);
    response.sendStatus(200);



});


