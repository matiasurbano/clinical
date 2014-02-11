
$(function(){

  $('.teal.button')
    .popup({
      on: 'click'
    });

  $('div.marker')
    .popup({
      on: 'hover',
      duration:200
    });


  // initialize common controls
  $('.ui.checkbox').checkbox();
  $('.ui.selection.dropdown').dropdown();




	$('#btnTestModal').on('click',function(event){
		$('.test.modal')
		  .modal('setting', {
		  	transition : 'vertical flip',
		    closable  : false,
		    onDeny    : function(){
		      window.alert('Wait not yet!');
		      return false;
		    },
		    onApprove : function() {
		      window.alert('Approved!');
		    }
		  }).modal('show');

	});


	$('#btnAddActivity').on('click',function(event){
		$('#addActivity')
		  .modal('setting', {
		  	transition : 'vertical flip',
		    closable  : false,
		    onDeny    : function(){
		      window.alert('Wait not yet!');
		      return false;
		    },
		    onApprove : function() {
		      window.alert('Approved!');
		    }
		  }).modal('show');

		  hideAll();

	});

    function hideAll(){
		$('.medicine_box').hide();
		$('.medicaltreatment_box').hide();
		$('.transport_box').hide();
    };

	$('#typedropdown.dropdown')
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

	$('.datepicker').pickadate({
		// container : '#addActivity'
	});

    $('.timepicker').pickatime({
    	container : '#addActivity',
    	interval: 15
    });


});
