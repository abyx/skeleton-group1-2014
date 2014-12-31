var timeline;

$(function(){
	setTimeout(function(){
		timeline = new VMM.Timeline();
		//data.json
		//timeline.init("/TimeLineData");
	}, 500);
});



function InitTimeLine(startDate, endDate){
	setTimeout(function(){
		timeline = new VMM.Timeline();
     	var formattedStartDate = startDate.format('DD/MM/YYYY');
		var formattedEndDate = endDate.format('DD/MM/YYYY');
		if (timeline != null) {
			timeline.init("/TimeLineData?startDate='" + formattedStartDate + "'&endDate='" + formattedEndDate + "'");
		}
	}, 1000);
}