img = new Image();
img.src = "/assets/spinner.gif";
img.src = "/assets/fresh.png";
img.src = "/assets/rotten.png";


$(document).ready(function(){
	$("#searchform").submit(function(event){
		search(1);
		return false;
	});
});

function search(pageno){
        queryURI = encodeURIComponent($("#query").val());
        $("#results").html("<div class='spinner'><img src='assets/spinner.gif'/></div>");
        $.ajax({url:"/search/getMovies", data:{query:queryURI, page:pageno}}).done(function(data){
                $("#results").html(data);
        });
};
