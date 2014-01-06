$("<img/>")[0].src = "/assets/spinner.gif";

function search(){
	queryURI = encodeURIComponent($("#query").val())
	$("#results").html("<img src='assets/spinner.gif'/>")
	$.ajax({url:"/search/getMovies", data:{query:queryURI}}).done(function(data){
		$("#results").html(data);
        })
}
