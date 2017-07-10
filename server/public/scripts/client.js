$(document).ready(function(){

  // event listener for submit button
  $('#submitNewTaskButton').on('click', function(){
    console.log('button clicked');
    var taskName = $('#taskName').val();
    // Post route for tasks
    $.ajax({
      type: 'POST',
      url: '/tasks',
      data: {
        name: taskName
      },
      success: function(response) {
        console.log(response);
      }
    });
  });
});
