var timeline = null;

$(function(){
	setTimeout(function(){
		timeline = new VMM.Timeline();
		//data.json
		timeline.init("/TimeLineData");
	}, 1000);
});



function InitTimeLine(startDate, endDate){
	setTimeout(function(){
		timeline = new VMM.Timeline();
		//data.json
		timeline.init("/TimeLineData?startDate=" + startDate + "&endDate=" + endDate);

	}, 1000);
}