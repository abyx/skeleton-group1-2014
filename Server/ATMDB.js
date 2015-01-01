var Q = require('q');
var moment = require('moment');

function toTimeLineDate(date)
{
    var dateObj = new Date(date);
    return dateObj.getFullYear().toString() + ',' + (dateObj.getMonth() + 1).toString() + ',' + dateObj.getDay().toString();
}


function toNiceDate(date)
{
    //console.log('date', date);
    var dateObj = new Date(date);
    //console.log('dateObj',dateObj);
    return date.getDay().toString(); + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();
}

var ATMData = {
    getEvents: function(startDateQuery, endDateQuery, db) {
        console.log('getEvents - start');
        return Q.ninvoke(db.collection('ATMEvents').find({ startDate: { '$gte' : startDateQuery, '$lt' : endDateQuery }}),	'toArray').then(
            function(Events) {
                var timelineEvents = [];
                for (var i = 0; i < Events.length; i++) {
                    var event = Events[i];

                    var timelineEvent =
                    {
                        "startDate": toTimeLineDate(event.startDate),
                        "headline": toNiceDate(event.startDate) + "<br>" + event.text,
                        "text": " ",
                        "asset": {
                            "media": "assets/img/atm.png"
                        }
                    };

                    timelineEvents.push(timelineEvent);
                }
                console.log('timelineEvents', timelineEvents);
                return timelineEvents;

            }).fail(
            function(err)	{
                console.log('error' , err);
                return null;
            }
        );
    },

    saveEvent: function(event, db) {
        event.startDate = new Date(event.startDate);
        event.endDate = new Date(event.endDate);
        Q.ninvoke(db.collection("ATMEvents").insert(event)).then(
            function(result)	{
                return 200;
            }
        ).fail(
            function(err)	{
                //	handle	error
                return 500;
            }
        );
    }
};

module.exports = {
    ATMData: ATMData
};