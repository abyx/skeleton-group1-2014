var moment = require('moment');
var Q = require('q');

var MailDAL = {
    getAllMails: function (db) {
        db.collection("MailEvents").find().toArray(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
        });
    },

    getMailsByDates: function (db, StartDate, EndDate) {

        return Q.ninvoke(db.collection("MailEvents").find({startDate: {$gte: StartDate, $lte: EndDate}}), "toArray").then(
            function (result) {
                console.log("---getMailsByDates ");

                result.filter(function(element)
                { element.startDate = moment(element.startDate).format('YYYY,MM,DD');
                });

                return result;
            }
        ).fail(
            function (err) {
                console.log(err);
            }
        );


    },

    saveMail: function (db, event) {
        event.startDate = moment(event.startDate, 'YYYY,MM,DD').toDate();
        event.headline =  moment(event.startDate).format('DD/MM/YYYY') + " " + event.headline;
        event.asset = {"media": "assets/img/mail.jpg"};

        //console.log("Added Mail Event : " , event);

        db.collection("MailEvents").insertOne(event, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            var SavedInfo = result.ops[0];
            //console.log("saveMail Run");
           console.log(result.ops[0]);
        });
    },

    deleteAllMails: function (db) {

        return Q.ninvoke(db.collection("MailEvents"), "deleteMany", {});


    }
};

module.exports = {
    mailDAL: MailDAL
};
