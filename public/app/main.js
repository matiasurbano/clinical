$(function(){

  var snapper = new Snap({
      element: document.getElementById('content'),
      disable: 'right'
  });



  // initialize common controls
  $('.ui.checkbox').checkbox();
  $('.ui.selection.dropdown').dropdown();

  $('#open-left').on('click',function(evnt){
     snapper.open('left');
  })
    

});
