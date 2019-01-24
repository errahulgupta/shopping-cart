Stripe.setPublishableKey("pk_test_TkCx0WJUMTxvUuH0QzFo9GyS");

var $form = $("#checkout-form");

$form.submit(function(event){
   $form.find("button").prop("disabled",true); 
   
});

