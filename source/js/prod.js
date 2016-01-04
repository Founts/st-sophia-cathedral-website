$( document ).ready(function(){
  var objFeaturedTitles = $("#featured-content .gi .b-title");
  adjustHeadingHeight(objFeaturedTitles);
  $(window).resize(function() {
    //stuff to do immediately/during resize
    //adjustHeadingHeight();
    adjustHeadingHeight(objFeaturedTitles);
    //stuff to do delayed, run through resizer
    //resizer();
  });

  $('a#menu').click(function() {
    scrollToAnchor('footer');     
  });
  $('a#menu-small').click(function() {
    scrollToAnchor('footer');     
  });
  // toggle visibility of calendar list item details
  $('.simcal-event').on('click', function() {
    $(this).find('.event-details').toggle();
  });

});

function scrollToAnchor(aid){
  var aTag = $("#"+ aid);
  $('html,body').animate({scrollTop: aTag.offset().top},1200);
}

function adjustHeadingHeight(objHeadings){
  var h; //largest height variable
  //width check //748.8px = bp-med
  if ($("body").width() > 748.8) {
    iterate();
    objHeadings.height(h);
  }else {
    objHeadings.each(function(){
      objHeadings.css("height", "");
    });
  }
  //find the tallest heading by iterating through them all
  function iterate(){
    objHeadings.each(function(index){
      //if h is empty, set it
      //else compare with current item, if bigger set it, else do nothing
      if(h == null) {
        h = $( this ).height();
      } else if($( this ).height() > h) {
        h = $( this ).height();
      }
    });
  };
}