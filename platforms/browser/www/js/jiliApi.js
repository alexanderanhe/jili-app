$(document).ready( function(){

   $("#insert").click(function(){

     var phoneNumber=$("#phoneNumber").val();
     var delay=$("#delay").val();
     var message=$("#message").val();
     var dataString="phoneNumber="+phoneNumber+"&delay="+delay+"&message="+message;

     if ($.trim(phoneNumber).length > 0 & $.trim(delay).length > 0 & $.trim(message).length > 0){
      $.ajax({
       type: "POST",
       url:"http://newsletter.pe.hu/app/",
       data: dataString,
       crossDomain: true,
       cache: false,
       beforeSend: function(){ 
        $("#insert").val('Connecting...');
       },
       success: function(result){

         var data = JSON.parse(result);
         if(data.result == "OK"){
           alert("Saved");
           $("#insert").val('Send');
           updateList();
         } else {
          alert(data.detail);
         }
        }
       });
     }
     return false;

   });

   updateList();
 });

function updateList() {
  $.getJSON( "http://newsletter.pe.hu/app/?get", function( data ) {

    console.log(data);
    var items = [];
    $.each( data, function( key, val ) {
      items.push( "<li id='" + key + "'>" + val.phoneNumber + ' ' + val.delay + ' ' + val.message + "</li>" );
    });
   
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#list-content" );

    console.log(items);
  });
}