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

        return Q.ninvoke(db.collection('ATMEvents').find({ startDate: { '$gte' : startDateQuery, '$lt' : endDateQuery }}),	'toArray').then(
            function(Events) {
                console.log('getAtmEvents - start');

                var timelineEvents = [];
                for (var i = 0; i < Events.length; i++) {
                    var event = Events[i];

                    var timelineEvent =
                    {
                        "startDate": toTimeLineDate(event.startDate),
                        "headline": event.headline,
                        "text": event.text,
                        "asset": event.asset
                    };

                    timelineEvents.push(timelineEvent);
                }
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
        event.headline =  moment(event.startDate).format('DD/MM/YYYY') + " " + event.headline;
        event.asset = {"media": event.asset};

        console.log("Added ATM : " , event);

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