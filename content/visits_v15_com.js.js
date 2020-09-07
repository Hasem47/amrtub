$(document).ready(function() {
	
	
	
    var ajaxobj;
    var ajaxobj3;
    var ajaxobj5;
    var visit_success;
    var website_number;
    var newimg;
    var bool_visiting_site;
    var website_url;
    var burst;
    var listing_points;
    var wait_timer;
    var counter;
    $("a.setfav").click(function() {
        web_num = $(this).attr("name");
        unfav_after = $(this).attr("rel");
        var starobj = $(this);
        var dataString_fav = "num=" + web_num;
        starobj.find("img").attr("src", SITE_ROOT_URL + "images/loader.gif");
        ajaxobj_fav = $.ajax({
            type: "POST",
            url: SITE_ROOT_URL + "ajax4.php",
            cache: false,
            data: dataString_fav,
            dataType: "text",
            success: function(msg) {
                if (msg == "{login}") {
                    window.location = LOGIN_URL2;
                    return false
                } else if (unfav_after == "hide") {
                    $("#lbox_" + starobj.attr("name")).hide("200");
                    return false
                } else {
                    if (msg == "0") {
                        newimg = "star_fade.gif";
                        newtitle = "Set as Favourite"
                    }
                    if (msg == "1") {
                        newimg = "star.gif";
                        newtitle = "My Favourite"
                    }
                    starobj.find("img").attr("src", SITE_ROOT_URL + "images/" + newimg);
                    starobj.find("img").attr("title", newtitle);
                    starobj.find("img").attr("alt", newtitle)
                }
            },
            error: function() {}
        })
    });
	
	
	
	
    window.onbeforeunload = function() {
        if (bool_visiting_site == "1") {
            close_windows();
            bool_visiting_site = 0
        }
    };
    $("a.open_iframe1").click(function() {
		
		
        visit_success = false;
        website_number = $(this).attr("name");
        bool_visiting_site = 0;
        var visit_id = "";
        $("#iframe1_self").show();
        var dataString = "num=" + website_number;
        ajaxobj = $.ajax({
            type: "POST",
            url: SITE_ROOT_URL + file_aj1_5,
            cache: false,
            data: dataString,
            dataType: "xml",
            success: function(xml) {
                website_url = $(xml).find("url").text();
                visit_id = $(xml).find("vid").text();
                burst = $(xml).find("burst").text();
                listing_points = $(xml).find("points").text();
                visit_limit = $(xml).find("visit_limit").text();
                captcha = $(xml).find("captcha").text();
                captcha_opts = $(xml).find("captcha_opts").text();
                wait_timer = $(xml).find("wait").text();
				popalr = $(xml).find("popalr").text();
				
                if ($(xml).find("sessclog").text() != "") SESSCLOG = $(xml).find("sessclog").text();
                if (website_url == "{ipissue}") 
				{
                    close_windows();
                    $("#lbox_" + website_number).find(".circle_sp").addClass("circle_faded");
                    $("#lbox_" + website_number).find(".notavmsg").show().html("Your IP (" + IP_ADDRESS + ") has visited this website recently. Please try again after a few hours.").addClass("red font12 mbtm5");
                    $("#lbox_" + website_number).find(".l_report").html("");
                    $("#lbox_" + website_number).find(".l_fav").html("");
                    return false;
                } 
				
				else if (website_url == "{captcha}") 
				{
                    close_windows();
                    $("#lbox_" + website_number).find(".notavmsg").show().html("Some error occured while processing your request. Please refresh this page and try again.").addClass("red font12 mbtm5");
                    return false;
                } 
				else if (website_url == "{nopoints}") {
                    close_windows();
                    $("#lbox_" + website_number).addClass("listing_box_disabled");
                    $("#lbox_" + website_number).find(".circle_sp").addClass("circle_faded");
                    $("#lbox_" + website_number).find(".notavmsg").show().html("No points are available for this website. Please try again after some time.").addClass("red font12 mbtm5");
                    $("#lbox_" + website_number).find(".l_report").html("");
                    $("#lbox_" + website_number).find(".l_fav").html("");
                    return false;
                } 
				else if (website_url == "{login}" || website_url == "{login_exp}") {
                    close_windows();
                    if (website_url == "{login}") window.location = LOGIN_URL;
                    if (website_url == "{login_exp}") window.location = LOGIN_EXP_URL;
                    return false;
                } 
				else {
                    
					/*
					if (self.window.name.length != "10" && self.window.name.length != "0") self.window.name = SESSCLOG;
					
                    if (self.window.name != SESSCLOG && FLOG == '') 
					{
                        close_windows();
                        window.location = URL39;
                        return false;
                    }
					*/
					
					if (popalr == '1')
					{
						close_windows();
						//$("#lbox_" + website_number).find(".circle_sp").addClass("circle_faded");
						
						
						$("#lbox_" + website_number).find(".notavmsg").show().html("Sorry, you cannot visit multiple websites in parallel. Please make sure you are viewing websites in one browser window only.").addClass("red font12 mbtm5").delay(5000).fadeOut('fast');
						

						$("#lbox_" + website_number).find(".l_report").html("");
						$("#lbox_" + website_number).find(".l_fav").html("");
						return false;
					}
					else 
					{
                        bool_visiting_site =
                            1;
                        if (burst == 0) {
                            $("#iframe1_self").attr("src", website_url);
                            Resize()
                        }
                        $("#iframe1_points").show("200");
                        $("#iframe1_msg").html("");
                        $(function() {
                            var cnt = wait_timer;
                            counter = setInterval(function() {
                                if (cnt > 0) {
                                    if (cnt == 1) llbbll = "second";
                                    else llbbll = "seconds";
                                    $("#iframe1_msg").html("<b class='special'>" + cnt + " " + llbbll + "</b>");
                                    cnt--
                                } else {
                                    clearInterval(counter);
                                    var capoptarr = captcha_opts.split(",");
                                    var seloptstr = "";
                                    timg = SITE_ROOT_URL + "imgcaptchas/tmp_captchas/" + captcha;
                                    btnimg = SITE_ROOT_URL + "images/btncapt.gif";
                                    var thtml = "";
                                    thtml = "<div><div class='res_cb1'>Please identify the picture to continue &rsaquo;</div><div class='res_cb2'><div style='width:75px;height:75px;background:#333333;margin:0 auto'><img src='" + timg + "'></div></div><div class='res_cb3'>";
                                    $(capoptarr).each(function(i, val) {
                                        thtml = thtml + "<a href='#;' class='selanslink' rel='" + val + "'>" + val + "</a> &nbsp;"
                                    });
                                    thtml = thtml + "</div><div class='clear'></div></div>";
                                    $("#iframe1_msg").html(thtml);
                                    $(".selanslink").click(function() {
                                        captans = $(this).attr("rel");
                                        $("#iframe1_msg").html("<span class='bold'>Processing Data...</span>");
                                        var dataString3 = "num=" + website_number + "&vid=" + visit_id + "&vlim=" + visit_limit + "&capnix=" + captans;
                                        ajaxobj3 = $.ajax({
                                            type: "POST",
                                            url: SITE_ROOT_URL + file_aj3_5,
                                            cache: false,
                                            data: dataString3,
                                            dataType: "xml",
                                            success: function(xml) {
                                                obj3_msg = $(xml).find("msg").text();
                                                obj3_points = $(xml).find("points").text();
                                                $("#iframe1_msg").html(obj3_msg);
                                                if (obj3_points != "#") $("#box_acc_pts").hide().html(obj3_points).animate({
                                                        opacity: "show"
                                                    },
                                                    "slow");
                                                if (visit_limit == "0") visit_success = true;
                                                else visit_success = false;
                                                if (burst == 1) {
                                                    $("#iframe1_self").attr("src", website_url);
                                                    Resize()
                                                }
                                            },
                                            error: function() {
                                                bool_visiting_site = 0;
                                                close_windows()
                                            }
                                        })
                                    })
                                }
                            }, 1E3)
                        })
                    }
                }
            },
            error: function() {
                bool_visiting_site = 0;
                alert("Failed to load the module.\n\nPlease clear your browser's cache and try again.");
                close_windows()
            }
        });
        $("#iframe1_self").attr("src", SITE_ROOT_URL + "loadingsoon.html");
        Resize();
        var popupid = $(this).attr("rel");
        popWidth = $(window).width() - 50;
        $("#" + popupid).fadeIn().css({
            "width": Number(popWidth)
        });
        var popMargTop = ($("#" + popupid).height() + 50) / 2;
        var popMargLeft = ($("#" + popupid).width() + 0) / 2;
        $("#" + popupid).css({
            "margin-top": -popMargTop,
            "margin-left": -popMargLeft
        });
        $("body").append('<div id="fade"></div>');
        $("#fade").css({
            "filter": "alpha(opacity=60)"
        }).fadeIn();
        return false
    });
    $("a.close, #fade").live("click", function() 
	{
		$.post(SITE_ROOT_URL + file_aj5_1);		
	    close_windows();
        return false
    });

    function close_windows() {
        clearInterval(counter);
        $("#fade , .iframe1").fadeOut(function() {
            $("#fade").remove()
        });
        $("#iframe1_self").attr("src", "");
        $("#iframe1_points").hide();
        $("#iframe1_div").hide();
        if (typeof ajaxobj != "undefined") {
            ajaxobj.abort();
            delete ajaxobj
        }
        if (typeof ajaxobj3 != "undefined") {
            ajaxobj3.abort();
            delete ajaxobj3
        }
        if (visit_success) {
            $("#lbox_" + website_number).addClass("listing_box_visited");
            $("#lbox_" + website_number).find(".circle_sp").addClass("circle_faded")
        }
        bool_visiting_site = 0
    }
    $(".listing_desc_img").click(function() {
        $(this).parent().parent().find("div").filter(".listing_desc").animate({
            opacity: "show"
        }, "fast");
        $(this).hide()
    });
   
});

function Resize() {
    var height = $(window).height() - 50;
    $("#iframe1_self").height(height)
};