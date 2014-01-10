img = new Image();
img.src = "/assets/fresh.png";
img.src = "/assets/rotten.png";
img.src = "/assets/cfresh.png";
img.src = "/assets/upright.png";
img.src = "/assets/spilled.png"; //preload images

$(document).ready(function(){
	$("#searchform").submit(function(event){ //capture search and prevent from submitting
		search(4, 1);
		return false;
	});
	$("#results").on('hidden.bs.collapse', collapsed); 
	search(0, 1); //show box office on page load
});

function collapsed(){
	setTimeout(function(){showResults()}, 100); //required because immediately showing is glitchy
}

currenttype = -1;
currentpage = -1;

function search(type, pageno){
	queryURI = encodeURIComponent($("#query").val());
	if(type == currenttype && currentpage == pageno & type != 4){
		return; //don't update if the same page is selected
	}
	
	if(currenttype != type){ //if nav bar used to change pages
		if(currenttype == 4){
			$("#searchform").collapse('hide');
			$("#query").blur(); //unfocus search bar
		}
		$("#nav-bo").removeClass(); //reset navbar
		$("#nav-it").removeClass();
		$("#nav-op").removeClass();
		$("#nav-up").removeClass();
		$("#nav-se").removeClass();

		switch(type){
			case 0:
				setTitle("Box Office");
				$("#nav-bo").addClass("active"); //set navbar
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
				$("#query").focus(); //focus search bar
				break;
		}
	}
	currentpage = pageno;
	currenttype = type;

	$("#results").collapse('hide'); //hide results before searching
	if(type == 4 && queryURI == ""){
		return; //hide results after an empty search, but don't perform search
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
	if(resultsready == 2) { //once for ajax ready, once for collapsed finished. order does not matter
		$("#results").html(resultdata);
		$("#results").collapse('show');
		resultsready = 0;
	}
}

function setTitle(title){
	if($("#pagetitle").html() == title)return;
	$("#pagetitle").fadeOut(400, function(){
		$("#pagetitle").html(title); //set title once invisible
		$("#pagetitle").fadeIn(400);
	});
}
