$(document).ready(function(){

  function getAllTasks() {
    $.ajax({
      type: 'GET',
      url: '/tasks',
      success: function(response) {
        console.log('Get request responded with:', response);
        appendTasksToDOM(response);
      }
    });
  }

  getAllTasks();

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
        getAllTasks();
      }
    });
  });

  $('#taskTableBody').on('click', '.completeTaskButton', function() {
    console.log('logging $(this)', $(this));
    console.log('The data on that button', $(this).data().id);

    $.ajax({
      type: 'PUT',
      url: '/tasks/complete/' + $(this).data().id,
      success: function(response) {
        console.log(response);
        getAllTasks();
      }
    });
  });

  $('#taskTableBody').on('click', '.undoCompleteTaskButton', function() {
    console.log('logging $(this)', $(this));
    console.log('The data on that button', $(this).data().id);

    $.ajax({
      type: 'PUT',
      url: '/tasks/undoComplete/' + $(this).data().id,
      success: function(response) {
        console.log(response);
        getAllTasks();
      }
    });
  });

  //task delete button click
$('#taskTableBody').on('click', '.deleteBtn', function(){
  console.log('logging $(this)', $(this));
  console.log('The data on that button', $(this).data().id);

$.ajax({
  type: 'DELETE',
  url: '/tasks/' + $(this).data().id,
  success: function(response) {
    console.log(response);
    console.log('I deleted the task!');
    getAllTasks();
  }
});
}); // end of delete task button

  function appendTasksToDOM(taskList) {
    console.log('appending items to DOM');
    $('#taskTableBody').empty();
    // iterate through the taskList
    for (var i = 0; i < taskList.length; i++) {
      var taskToAppend = taskList[i];
      // append task to the DOM
      var $tr = $('<tr></tr>');

      var $buttonTd = $('<td></td>');
      var $button;
      if(taskToAppend.is_complete === false) {
        $button = $('<button class="completeTaskButton">Complete task #' + taskToAppend.id + '</button>');
      } else {
        $button = $('<button class="undoCompleteTaskButton">Undo complete task #' + taskToAppend.id + '</button>');
      }

      $button.data('id', taskToAppend.id);
      $buttonTd.append($button);
      $tr.append($buttonTd);
      //append the task
      $tr.append('<td>' + taskToAppend.name + '</td>');
      $tr.append('<td><button class="deleteBtn">' + taskToAppend.id + '">Delete</button></td>');
      $('#taskTableBody').append($tr);
    }
  }

  function deleteTask(taskid) {
    console.log('task id = ', taskid);
    // When using URL params, your url would be...
    // '/todo/' + taskkId

    // YOUR AJAX CODE HERE
    $.ajax({
      type: 'DELETE',
      url: '/tasks/' + $(this).data().id,
      success: function(response) {
        console.log(response);
        console.log('I deleted the task!');
        getAllTasks();
      }
    });
  }

});
