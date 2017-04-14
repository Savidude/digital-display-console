var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs');
var multer = require('multer');

var upload = multer({ dest: 'public/images/uploads'});

router.post('/', upload.single('file'), function(req, res, next) {
    var file = path.resolve('./public/images/uploads') + '/' + req.file.originalname;
    var extension = path.extname(file);

    if (extension === '.jpg' || extension === '.jpeg' || extension === '.png'){
        fs.rename(req.file.path, file, function(err) {
            if (err) {
                console.log(err);
                res.send(500);
            } else {
                res.json({
                    message: 'File uploaded successfully',
                    filename: req.file.filename
                });
            }
        });
    } else {
        console.log('Invalid file format');
        res.send(400);
    }

});

module.exports = router;