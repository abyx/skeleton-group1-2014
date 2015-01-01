var moment = require('moment');
var Q = require('q');

var MeetingDBRepository = {
    getAllMeetingsEvent: function (db, startDate, endDate) {
        console.log("startDate:" + startDate);

        return Q.ninvoke(db.collection("Meetings").find({startDate: {$gte: startDate, $lte: endDate}}), "toArray").then(
            function (result) {
                console.log("--- getAllMeetingsEvent");

                result.filter(function (element) {
                    element.startDate = moment(element.startDate).format('YYYY,MM,DD');
                });


                return result;
            }
        ).fail(
            function (err) {
                console.log(err);
            }
        );
    }


    ,

    saveMeetingEvent: function (db, meetingEvent) {
        meetingEvent.startDate = moment(meetingEvent.startDate, 'YYYY,MM,DD').toDate();
        meetingEvent.headline =  moment(meetingEvent.startDate).format('DD/MM/YYYY') + " " + meetingEvent.headline;
        meetingEvent.asset = {"media": "assets/img/meeting.jpg"};

        console.log("Added Meeting : " , meetingEvent);

        db.collection('Meetings').insertOne(meetingEvent, function (err, result) {

            if (err) {
                console.log("Error occured" + err);
                return;
            }

            var savedMeeting = result.ops[0];
            console.log("savedMeeting: ", savedMeeting);

        })
    },

    deleteAllMeetings: function (db) {

        return Q.ninvoke(db.collection("Meetings"), "deleteMany", {});


    }

};

module.exports = {
    MeetingDBRepository: MeetingDBRepository
};