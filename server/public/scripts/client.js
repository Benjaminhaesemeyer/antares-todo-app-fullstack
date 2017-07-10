$(document).ready(function(){


  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(response) {
      console.log('Get request responded with:', response);
      appendTasksToDOM(response);
    }
  });

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
        console.log('Post request responded with:', response);
      }
    });
  });

  function appendTasksToDOM(taskList) {
    console.log('appending items to DOM');
    // iterate through the taskList
    for (var i = 0; i < taskList.length; i++) {
      // append task to the DOM
      var $tr = $('<tr></tr>');
      $tr.append('<td>' + taskList[i].name + '</td>');
      $('#taskTableBody').append($tr);
    }
  }
});
