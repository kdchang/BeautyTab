'use strict';

// google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-55968344-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function trackButton(e) {
    _gaq.push(['_trackEvent', e.id, 'clicked']);
};

$('.track-event').on('click', function(){
    trackButton(this);
})

$(document).ready(function() {
		var imgSource = [];
		var likeSource = [];
        var nextNote = ["https://graph.facebook.com/v1.0/302196939943133/photos?pretty=1&fields=source&limit=100&before=MzIyNDI1NDE0NTg2OTUy/photos_stream?tab=photos_stream"];
        var rand = 0;
        var showImgSrc = '';
        var pointer = 0;
        window.localStorage["like"];

        try {
            $('#dislike').on('click', function(){
                $('#alert-msg').fadeOut();
                if((likeSource.length !== 0) && (imgSource.length === 0)) {
                    likeSource.splice(rand, 1);
                    localStorage["like"] = JSON.stringify(likeSource); 
                } else {
                    imgSource.splice(rand, 1);
                }
        	    if(imgSource.length > 90) {
        	    	rand = Math.floor(Math.random() * imgSource.length);
                	showImgSrc = imgSource[rand];
                    try {
                        $('#show-img-box').empty();
                        $('#show-img-box').html('<a href="#" class="thumbnail show-img-area" id="show-img-area" target="_blank"></a>');
                        $('#show-img-area').empty().attr('href', showImgSrc);
                	    $('#show-img-area').empty().html('<img src="' + showImgSrc + '"alt="嗚嗚，Beauty 也需要休息一下" title="分享生命中的美好事物">');
                    } catch(e) {
                        $('#show-img-box').empty();
                        $('#show-img-box').html('<a href="#" class="thumbnail show-img-area" id="show-img-area" target="_blank"></a>');
                        $('#show-img-area').empty().attr('href', showImgSrc);
                        $('#show-img-area').empty().html('<img src="../images/backup-cover.png" alt="嗚嗚，Beauty 也需要休息一下" title="分享生命中的美好事物">');                        
                    }
            	} else {
                    loadPhoto();
                }
            });
        } catch(err) {
                $('#show-img-box').empty();
                $('#show-img-box').html('<a href="#" class="thumbnail show-img-area" id="show-img-area" target="_blank"></a>');
                $('#show-img-area').empty().attr('href', showImgSrc);
                $('#show-img-area').empty().html('<img src="../images/backup-cover.png" alt="嗚嗚，Beauty 也需要休息一下" title="分享生命中的美好事物">');
        }

        $('#like').on('click', function(){
        	savePhoto();
        });

        $('.track-event').on('click', function(){
            trackButton(this);
        });

        function init() {
        	if((typeof localStorage.like !== 'undefined') && (JSON.parse(localStorage["like"]).length !== 0)) {
        		likeSource = JSON.parse(localStorage["like"]);
                rand = Math.floor(Math.random() * likeSource.length);
                showImgSrc = likeSource[rand];
                $('#show-img-box').empty();
                $('#show-img-box').html('<a href="#" class="thumbnail show-img-area" id="show-img-area" target="_blank"></a>');
                $('#show-img-area').empty().attr('href', showImgSrc);
                $('#show-img-area').empty().html('<img src="' + showImgSrc + '"alt="嗚嗚，Beauty 也需要休息一下" title="分享生命中的美好事物">');        
            } else {
                loadPhoto();
            }
        }

        function savePhoto() {
        	if((likeSource.indexOf(showImgSrc) === -1)) {
	 			likeSource.push(showImgSrc); 
				localStorage["like"] = JSON.stringify(likeSource); 
                $('#alert-msg').empty().html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>收藏 <strong>Beauty</strong> 成功！</div>').fadeIn();
        	} else {
                $('#alert-msg').empty().html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>您已經收藏過啦XD </div>').fadeIn();
        	}
        }

        function loadPhoto() {
	       	$.ajax({
	            type: 'GET',
	            dataType: 'json',
	            url: nextNote[pointer],
	            success: function(res) {
	            	for(var key in res.data) {
	            		imgSource.push(res.data[key].source);
	            	}
	            	nextNote.push(res.paging.next);
	            	rand = Math.floor(Math.random() * imgSource.length);
                    if(likeSource.length !== 0) {
                        imgSource = imgSource.diff(likeSource);
                    }
	            	showImgSrc = imgSource[rand];
	            	if(imgSource.length !== 0) {
                        $('#show-img-box').empty();
                        $('#show-img-box').html('<a href="#" class="thumbnail show-img-area" id="show-img-area" target="_blank"></a>');
                        $('#show-img-area').empty().attr('href', showImgSrc);
                        $('#show-img-area').empty().html('<img src="' + showImgSrc + '"alt="嗚嗚，Beauty 也需要休息一下" title="分享生命中的美好事物">');
	            	}
	            	pointer++;
	            },
	            error: function(e){
                    $('#show-img-box').empty();
                    $('#show-img-box').html('<a href="#" class="thumbnail show-img-area" id="show-img-area" target="_blank"></a>');
                    $('#show-img-area').empty().attr('href', showImgSrc);
	            	$('#show-img-area').empty().html('<img src="../images/backup-cover.png" alt="嗚嗚，Beauty 也需要休息一下" title="分享生命中的美好事物">');
	            }

	        });

        }

        Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.indexOf(i) < 0;});
        };
        init();
});