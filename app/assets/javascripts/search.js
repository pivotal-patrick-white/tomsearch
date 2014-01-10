img = new Image();
//img.src = "/assets/spinner.gif";
img.src = "/assets/fresh.png";
img.src = "/assets/rotten.png";
img.src = "/assets/cfresh.png";

$(document).ready(function(){
	$("#searchform").submit(function(event){
		search(4, 1);
		return false;
	});
	$("#results").on('hidden.bs.collapse', collapsed);
	search(0, 1);
});

function collapsed(){
	setTimeout(function(){showResults()}, 100);
}

currenttype = -1;
currentpage = -1;

function search(type, pageno){
	queryURI = encodeURIComponent($("#query").val());
	if(type == currenttype && currentpage == pageno & type != 4){
		return;
	}
	
	if(currenttype != type){
		if(currenttype == 4){
			$("#searchform").collapse('hide');
		}
		$("#nav-bo").removeClass();
		$("#nav-it").removeClass();
		$("#nav-op").removeClass();
		$("#nav-up").removeClass();
		$("#nav-se").removeClass();

		switch(type){
			case 0:
				setTitle("Box Office");
				$("#nav-bo").addClass("active");
				break;
			case 1:
				setTitle("In Theatres");
				$("#nav-it").addClass("active");
				break;
			case 2:
				setTitle("Opening Movies");
				$("#nav-op").addClass("active");
				break;
			case 3:
				setTitle("Upcoming Movies");
				$("#nav-up").addClass("active");
				break;
			case 4:
				setTitle("Search Movies");
				$("#nav-se").addClass("active");
				$("#searchform").collapse('show');
				break;
		}
	}
	currentpage = pageno;
	currenttype = type;

	$("#results").collapse('hide');
	//$("#spinner").html("<div class='spinner'><img src='assets/spinner.gif'/></div>");
	if(type == 4 && queryURI == ""){
		return;
	}
	$.ajax({url:"/search/getMovies", data:{query:queryURI, page:pageno, resulttype:type}}).done(function(data){
		resultdata = data;
		showResults();
	});
};

resultsready = 0;
resultdata = "";

function getDetails(movieid){
	$.ajax({url:"/search/getDetails", data:{id:movieid}}).done(function(data){
		$("#detailscontent").html(data);
		$("#details").modal('show');
	});
}

function showResults(){
	resultsready++;
	if(resultsready == 2) {
		//$("#spinner").html("");
		$("#results").html(resultdata);
		$("#results").collapse('show');
		resultsready = 0;
	}
}

function setTitle(title){
	if($("#pagetitle").html() == title)return;
	$("#pagetitle").fadeOut(400, function(){
		$("#pagetitle").html(title);
		$("#pagetitle").fadeIn(400);
	});
}
