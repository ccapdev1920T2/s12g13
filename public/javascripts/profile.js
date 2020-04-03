$(document).ready(function(){
   
    $('#InfoButton').click(function(){
       $('#InventoryContent').hide();
       $('#InfoContent').show();
   });

   $('#InventoryButton').click(function(){
    $('#InfoContent').hide()
    $('#InventoryContent').show()
});

});