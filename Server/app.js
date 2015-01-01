var Q = require('q');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var _ = require('lodash');
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
  console.log(request.body, request.params.id, 'query', request.query);
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
      "text": "<i><span class='c1'>נתונים</span> & <span class='c2'>רועננו</span></i>",
      "asset": {
        "media": "assets/img/baba_logo.png",
        "credit": "",
        "caption": ""
      },
      "date": []
    }
    };

  var startDate =  moment(request.query.startDate,'DD/MM/YYYY').toDate();
  var endDate = moment(request.query.endDate,'DD/MM/YYYY').toDate();

  console.log("filtering BY dates : " + startDate + "   -    " + endDate);

  /*objMailDAL.mailDAL.getMailsByDates(db, startDate,endDate).then(function (result)
  {
    console.log("res: " , result);

    parentJson.timeline.date = result;

    console.log("parent: " , parentJson);

    response.send( parentJson );


  });*/
    meetingDBRepository.MeetingDBRepository.getAllMeetingsEvent(db, startDate,endDate).then(function (result)
    {
        console.log("res: " , result);

        parentJson.timeline.date = result;

        console.log("parent: " , parentJson);

        response.send( parentJson );


    });



});


app.get('/TimeLineDataNew', function(request, response){

    var timelineStart = moment(request.query.startDate,'DD/MM/YYYY').format('YYYY,MM');
    console.log(timelineStart);

    var parentJson = {
        timeline: {
            "headline": "באבא זמן",
            "type": "default",
            "startDate": timelineStart,
            "text": "<i><span class='c1'>נתונים</span> & <span class='c2'>רועננו</span></i>",
            "asset": {
                "media": "assets/img/baba_logo.png",
                "credit": "",
                "caption": ""
            },
            "date": []
        }
    };

    var startDate =  moment(request.query.startDate,'DD/MM/YYYY').toDate();
    var endDate = moment(request.query.endDate,'DD/MM/YYYY').toDate();

    console.log("filtering BY dates : " + startDate + "   -    " + endDate);

    /*objMailDAL.mailDAL.getMailsByDates(db, startDate,endDate).then(function (result)
     {
     console.log("res: " , result);

     parentJson.timeline.date = result;

     console.log("parent: " , parentJson);

     response.send( parentJson );


     });*/
    meetingDBRepository.MeetingDBRepository.getAllMeetingsEvent(db, startDate,endDate).then(function (result)
    {
        console.log("res: " , result);

        parentJson.timeline.date = result;

        console.log("parent: " , parentJson);

        response.send( parentJson );


    });



});

app.post('/Meetings'),function(request,response){

  var meetingJson1 =
        {
          "startDate":"2012,5,1",
          "headline":"פגישה1",
          "text":"אירוע",
          "asset": {
            "media":"assets/img/meeting.jpg"
          }
        };
    var meetingJson2 =
    {
        "startDate":"2012,6,1",
        "headline":"2פגישה",
        "text":"אירוע",
        "asset": {
            "media":"assets/img/meeting.jpg"
        }
    };


  meetingDBRepository.saveMeetingEvent(db,meetingJson1);
  meetingDBRepository.saveMeetingEvent(db,meetingJson2);

  response.sendStatus(200);

}
app.get('/Meetings'),function(){




}

mongo.connect('mongodb://192.168.100.22/app', function(err, aDb) {
  if (err) {
    throw err;
  }

  db = aDb;




  /*var tmpMail1= {
        "startDate":"2013,4,2",
       "headline":"2/4/2013<br>שליחת דואר",
        "text":"אירוע1",
        "asset": {
         "media":"assets/img/mail.jpg"
       }
      };
  var tmpMail2= {
    "startDate":"2013,5,9",
    "headline":"2/4/2013<br>שליחת דואר",
    "text":"אירוע2",
    "asset": {
      "media":"assets/img/mail.jpg"
    }
  };


  objMailDAL.mailDAL.deleteAllMails(db).then(function ()
      {
        objMailDAL.mailDAL.saveMail(db,tmpMail1);
        objMailDAL.mailDAL.saveMail(db,tmpMail2);
      });
*/



  var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(' [*] Listening at http://%s:%s', host, port);
  });
});



/*
 var resJson = {
 timeline:
 {
 "headline":"באבא זמן",
 "type":"default",
 "startDate":timelineStart,
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
 console.log(moment(request.query.startDate,'DD/MM/YYYY').isAfter(moment('01/01/2012','DD/MM/YYYY').format()));
 if ((moment(request.query.startDate,'DD/MM/YYYY').isAfter(moment('01/01/2012','DD/MM/YYYY').format()))
 || (moment(request.query.startDate,'DD/MM/YYYY').isSame(moment('01/01/2012','DD/MM/YYYY').format()))) {

 response.send(anotherJson);
 }
 else
 {
 response.send(resJson);
 }
 */

app.post('/InsertNewATMEvent', function(request, response) {
  console.log('Body' ,request.body);
  db.collection("ATMEvents").insert(request.body);
});


