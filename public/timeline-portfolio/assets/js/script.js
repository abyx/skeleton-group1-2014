var timeline;

$(function(){
	setTimeout(function(){
		timeline = new VMM.Timeline();
		//data.json
		//timeline.init("/TimeLineData");
	}, 500);
});



function InitTimeLine(query){
	setTimeout(function(){
		timeline = new VMM.Timeline();
     	var formattedStartDate = query.startDate.format('DD/MM/YYYY');
		var formattedEndDate = query.endDate.format('DD/MM/YYYY');
		if (timeline != null) {
			timeline.init("/TimeLineData?startDate='" + formattedStartDate + "'&endDate='" + formattedEndDate +
			              "'&isATM=" + query.isATM + "&isMeeting=" + query.isMeeting + "&isEmail=" + query.isEmail);
		}
	}, 1000);

}

function postMeeting (){



}