$(function(){


  // Data and time picker
  $('.datepicker').pickadate();

  $('.timepicker').pickatime({
    interval: 15
  });
 

  function hideAll(){
    $('.medicine_box').hide();
    $('.medicaltreatment_box').hide();
    $('.transport_box').hide();
  };


  // Add Activity Button Handler
  $('#btnAddActivity').on('click',function(event){
    $('#addActivity')
      .modal('setting', {
        transition : 'vertical flip',
        closable  : false,
        onDeny    : function(){
          return false;
        },
        onApprove : function(event,args) {
          // submit id fired
          $('#addActivityForm').submit();
        }
      }).modal('show');

      hideAll();

  });


  var $weeklyrepeatCheckbox = $('.ui.checkbox > input[name=weeklyrepeat]');

  $weeklyrepeatCheckbox.checkbox({
      onEnable: function(){ 
        $('#weeklyrepeat').show();
      },
      onDisable: function(){ 
        $('#weeklyrepeat').hide();
      }
  });


  var $typedropdown = $('#typedropdown.dropdown');

  // Type Botton Handler
  $typedropdown
    .dropdown({
      onChange: function(value) {

        if (value === "medicaltreatment"){
            hideAll();
            $('.medicaltreatment_box').show();
        }
        else if (value === "medicine"){
          hideAll();
          $('.medicine_box').show();
        }
        else if (value === "transport"){
          hideAll();
          $('.transport_box').show();
        }
      }
    });


});


