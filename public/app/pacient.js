$(function(){


  // Add Activity Button Handler
  $('#btnAddMessage').on('click',function(event){
    $('#addMessage')
      .modal('setting', {
        transition : 'vertical flip',
        closable  : false,
        onDeny    : function(){
          return false;
        },
        onApprove : function(event,args) {
          // submit id fired

          
          $('#addMessageForm').submit();
        }
      }).modal('show');
  });


  $("#senderTo").select2();


});
