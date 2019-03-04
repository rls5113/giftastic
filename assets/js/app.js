    var topics = ["bugs bunny","daffy duck", "porky pig","foghorn leghorn","pinky and the brain","the simpsons","beavis and butthead","pokemon","justice league","pink panther","peanuts","johnny bravo","johnny quest","hong kong phooey","top cat","roadrunner"];
  
   function showPics() {
        // console.log("showPics ...");
        var param1 = $(this).attr("qryParam1").toLowerCase().replace(" ","+");
        var limit = 10;
        var qryURL = "https://api.giphy.com/v1/gifs/search?q="+param1+"&limit="+limit+"&api_key=snZzpnPXDcEYSih2lIqPeVtaVN2q1kYo";

        // console.log(qryURL);
        
        $.ajax({
            url: qryURL,
            method: "GET"
        }).then( function(response) {
            // console.log(JSON.stringify(response));
            // $("results").text(JSON.stringify(response));
            $("#results").empty();
            for(var i=0;i<limit;i++) {
                // console.log(" src:   " + response.data[i].images.fixed_width.url);

                var src = response.data[i].images.fixed_width_still.url;
                var animate = response.data[i].images.fixed_width.url;
                var still = response.data[i].images.fixed_width_still.url;
                var state = "still";
                var rating = response.data[i].rating;
                var title = response.data[i].title;

               var img = $("<img>").addClass("giffy")
                    .attr({
                        "src": src,
                        "data-animate": animate,
                        "data-still": still,
                        "data-state": state
                    });
 
                var span = $("<div>").addClass("imgHolder");
                if(i % 2 === 0){
                    span.css("float","left");
                } else {
                    span.css("float","right");
                }
                var rating =$("<h6>").text("Rating: "+rating);
                var title = $("<h6>").text("Title: "+title);
                span.prepend(title);
                span.prepend(rating);
                span.append(img);

                $("#results").append(span);
            }
            $(".giffy").on("click", changeState);
        }); 

    }

    function changeState() {
 
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    };

   
    function renderButtons() {
        console.log("renderButtons...");
        $("#button-view").empty();
        for(var i=0;i<topics.length;i++){
            //generate the buttons
            var button = $("<button>").addClass("topicButton btn btn-info")
                .attr("qryParam1",topics[i])
                .text(topics[i]);
                console.log(button.html());
            $("#button-view").append(button);
        }
    }
    //create topic button listener
    $("#add-topic").on("click", function(event){
        event.preventDefault();
        var topic = $("#input-topic").val().trim();
        topics.push(topic);
        $("#input-topic").val("");
        renderButtons();
    });
    $(document).on("click", ".topicButton", showPics);
    
    renderButtons();