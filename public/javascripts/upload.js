$('.upload-btn').on('click', function (){
  $('#upload-input').click();
  $('.progress-bar').text('0%');
  $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){
    
  var file = $(this).get(0).files;
  
  if (files.length > 0) {
    // One or more files are selected, then process the file upload...

    // create FormData object which will be sent as the data
    // payload in AJAX request
    var formData = new FormData();
        
    // loop through selected files
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
            
      // add the files to formData object for the data payload
      formData.append('uploads[]', file, file.name);
      }
        
      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
          console.log('upload successful!\n' + data);
        };
        xhr: function() {
          // create XMLHttpRequest
          var xhr = new XMLHttpRequest();
          
          // listen to the "progress" event 
          xhr.upload.addEventListener('progress', function(evt) {
            
            if (evt.lengthComputable) {
              //calculate percentage of upload completed
              var percentComplete = evt.loaded /evt.total;
              percentComplete = parseInt(percentComplete * 100);

              // update bootstrap progress bar
              $('.progress-bar').text(percentComplete + '%');
              $('.progress-bar').width(percentComplete + '%');
              
              // once upload reaches 100%, set progress bar text to 'done'
              if (percentComplete === 100) {
                $('.progress-bar').html('Done');
              }
            }
          }, false);
          
          return xhr;
        }
      });

  }

});


