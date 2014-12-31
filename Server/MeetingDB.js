

var MeetingDBRepository = {
    getAllMeetingsEvent: function(db) {
        db.collection('Meetings').find({}).toArray(function (err, allMeetings)
        {

            if (err) {

                console.log("Error in getMeetings" + err)

                return;

            }

            console.log("allMeetings"+allMeetings);


    })
    },

    saveMeetingEvent: function(db,meetingEvent) {
        db.collection('Meetings').insertOne(meetingEvent,function(err,result){

          if(err) {
              console.log("Error occured" + err);
              return;
          }

            var savedMeeting = result.ops[0];
            console.log("savedMeeting" + savedMeeting);

        })
    }
};

module.exports = {
    MeetingDBRepository: MeetingDBRepository
};