var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs');
var multer = require('multer');
var mkdirp = require('mkdirp');

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
                updateImageData(req.file.originalname)
                res.render('images', { title: 'Digital Display Console' });
            }
        });
    } else {
        console.log('Invalid file format. Please upload .jpg, .jpeg, or .png files');
        res.send(400);
    }

});

function updateImageData(filename) {
    fs.readFile('./public/data/images.json', 'utf-8', function(err, data) {
            //If no image data is available, create the file and add data
            if (err) {
                var imageData = '{' +
                        '"data": [' +
                            '{' +
                                '"name" : "' + filename + '",' +
                                '"date" : "' + getDateTime() + '"' +
                            '}' +
                        ']' +
                    '}'
                var imageJSONData = JSON.parse(imageData);
                mkdirp('./public/data', function (err) {
                    if (err) throw err;

                    else {
                        fs.writeFile("./public/data/images.json", JSON.stringify(imageJSONData, null, 2), 'utf-8', function(err) {
                            if(err) throw err;
                        });
                    }
                });
            } else {
                var imageArray = imageArray = JSON.parse(data);
                imageArray.data.push({
                    name: filename,
                    date: getDateTime()
                });

                fs.writeFile('./public/data/images.json', JSON.stringify(imageArray, null, 2), 'utf-8', function(err) {
                    if (err) throw err;
                })
            }
        }
        );
}

function getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
e
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "-" + month + "-" + year + " " + hour + ":" + min + ":" + sec;
}

module.exports = router;