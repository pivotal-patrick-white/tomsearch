img = new Image();
img.src = "/assets/spinner.gif";
img.src = "/assets/fresh.png";
img.src = "/assets/rotten.png";


$(document).ready(function(){
	$("#searchform").submit(function(event){
		search(1);
		return false;
	});
	$("#results").on('hidden.bs.collapse', collapsed);
	search(1);
});

function collapsed(){
	setTimeout(function(){showResults()}, 100);
}

function search(pageno){
        queryURI = encodeURIComponent($("#query").val());
	if(queryURI == "")
		setTitle("Box Office");
	else
		setTitle("Search Movies");
	$("#results").collapse('hide');
        $("#spinner").html("<div class='spinner'><img src='assets/spinner.gif'/></div>");
        $.ajax({url:"/search/getMovies", data:{query:queryURI, page:pageno}}).done(function(data){
		resultdata = data;
		showResults();
        });
};

resultsready = 0;
resultdata = "";

function showResults(){
	resultsready++;
	if(resultsready == 2) {
		$("#spinner").html("");
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
