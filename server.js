'use strict';

const express = require('express');
const cors = require('cors');
const formidable = require('formidable');

// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.on('fileBegin', (name, file) => {
    file.path = __dirname + "/uploads/" + file.name;
  });

  form.parse(req, (err, fields, files) => {
    console.log("Upload: " + files.upfile.name);
    if (err) console.log('Something went wrong!');

    // res.json({ fields: fields, files: files });

    res.json({
      'message': {
        'file name': files.upfile.name,
        'file size': files.upfile.size
      }
    });
  });

});

app.get('/hello', function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
