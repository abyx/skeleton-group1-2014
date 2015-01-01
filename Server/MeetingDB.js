var moment = require('moment');
var Q = require('q');

var MeetingDBRepository = {
    getAllMeetingsEvent: function (db, startDate, endDate) {
        console.log("startDate:" + startDate);

        return Q.ninvoke(db.collection("Meetings").find({startDate: {$gte: startDate, $lte: endDate}}), "toArray").then(
            function (result) {
                console.log("********************** getAllMeetingsEvent ************************");

                result.filter(function (element) {
                    element.startDate = moment(element.startDate).format('YYYY,MM,DD');
                });

                console.log(result);
                console.log("********************** getAllMeetingsEvent END ************************");

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
    db.collection('Meetings').insertOne(meetingEvent, function (err, result) {

        if (err) {
            console.log("Error occured" + err);
            return;
        }

        var savedMeeting = result.ops[0];
        console.log("savedMeeting" + savedMeeting);

    })
}
}
;

module.exports = {
    MeetingDBRepository: MeetingDBRepository
};