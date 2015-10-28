// When the page is ready
$(document).ready(function () {
  //when a checkbox is selected, update the total amount
  $("input[type='checkbox']").click(function(event) {
    updateTotal();
  });

  $("#other_fee_amount").focusout(function() {
     //check if field is NOT empty
    if ( $(this).val() ) {
      //format to two decimals
      $(this).val(parseFloat($(this).val()).toFixed(2));
    }
    //update total whether empty or with a value
    updateTotal();
  });
  //only allow numbers in form text field with currency class
  $(".currency").keypress(function() {
    validateKey()
  });
});

//form function
function updateTotal() {
  var total = 0;
  //sum all checkbox values
  $("form input:checked").each(function() {
    total += parseFloat(this.value);
  });
  //sum other fee amount value also
  $("#other_fee_amount").each(function() {
    //make sure text field isn't null/blank before summing
    if ( $(this).val() ){
      total += parseFloat($(this).val());
    }
  });
  //update hidden field to be used for passing to api
  $("#totalCost").val(total.toFixed(2));
  
  //fade out transition for Total
  $("#totalCostText").fadeOut(200, function(){
    $("#totalCostText").text("$" + total.toFixed(2));
  });
  $("#totalCostText").fadeIn();
};

//only allow numbers
//http://stackoverflow.com/a/469419/1357618
function validateKey(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );

  var regex = /[0-9]|\./;

  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}