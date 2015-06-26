$( document ).ready(function(){
  adjustHeadingHeight();
  $(window).resize(function() {
    //stuff to do immediately/during resize
    adjustHeadingHeight();
    //stuff to do delayed, run through resizer
    resizer();
  });
});

var h //largest height variable

function adjustHeadingHeight(){
  //width check //748.8px bp-med
  if ($("body").width() > 748.8) {
    iterate();
    $(".gi .b-title").height(h);
  }else {
    $(".gi .b-title").each(function(){
      $(".gi .b-title").css("height", "");
    });
  }
  //find the tallest heading by iterating through them all
  function iterate(){
    $(".gi .b-title").each(function(index){
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