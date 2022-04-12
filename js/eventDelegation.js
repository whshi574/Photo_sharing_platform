$(function() {
    //New button clicks  event delegation
    $("#img_page").on("click", ".heart_btn", function() {
        $this = $(this);

        if ($this.attr("data-selected") == "false") {
            $this.find(".heart").css("background-position", "0 -60px");
            $this.attr("data-selected", "true");
            console.log($this.attr("data-selected"));
        } else if ($this.attr("data-selected") == "true") {
            $this.find(".heart").css("background-position", "0 0");
            $this.attr("data-selected", "false");
        }

    });

    //picture display page event delegation

    //picture display page closing button event
    $("#img_view_close").on("click", function() {
        if ($("#img_view").css("display") != "none") {
            $("#img_view").css("display", "none");
        }
    });

    //---The effect that click picture list to show other pictures

    $("#img_view").on("click", "li", function() {
        $this = $(this);
        $("#main_img").attr("src", $this.find("img").attr("src"));
        $this.siblings("li").attr("class", "");
        $this.attr("class", "selected");
    });

    //---The effect that click pictures of the picture list to move the pictures of the list
    if (parseInt($(".img_list_ul").css("height")) > parseInt($(".img_list_box").css("height"))) {
        $("#img_view").on("click", "li", function() {
            $this = $(this);
            $center=$(".img_list").offset().top+parseInt($(".img_list_box").css("height"))/2-parseInt($this.css("height"));
            $top_upper_bound=parseInt($(".img_list_box").css("height"))-parseInt($(".img_list_ul").css("height"))-5;
            $pianyi=$this.offset().top-$center;
            $top=parseInt($(".img_list_ul").css("top"))-$pianyi;
            if($top<0&&$top>$top_upper_bound){
            	$(".img_list_ul").css("top",$top+"px")
            }else if($top>=0){
            	$(".img_list_ul").css("top","0px")
            }else {
            	$(".img_list_ul").css("top",$top_upper_bound+"px")
            }
        });
    }


});
