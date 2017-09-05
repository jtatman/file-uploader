// note: investigate using let instead of var on reformat
// GIVES: SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode

var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // allow user to upload muliple files at once
  form.multiples = true;
  
  // store uploads in /uploads directory 
  form.uploadDir = path.join(__dirname, './uploads');

  // rename file once uploaded to original file name
  // requires successful upload to complete
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors
  form.on('error', function(err) {
    console.log('An error has occurred: \n' + err);
  });

  // when files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing form data?
  form.parse(req);
 
});

// start server on port 3000
var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});


