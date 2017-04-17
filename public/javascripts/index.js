var row;

$("document").ready(function () {
    console.log("index.js ready");
    var i = 0;
    var deviceData = document.getElementById('device-data');

    $.getJSON('../conf/devices.json', function (data) {
        // var row;
        data.devices.map(function (device) {
            // console.log(device.id + '-' + device.name);
            if (i == 0) {
                row = '<br><div class="col-lg-2 col-md-2">' +
                                '<button type="button" class="btn btn-default" ' +
                                        'onclick="location.href=\'/device/' + device.id + '\';">' +
                                    '<i class="material-icons" style="font-size:144px;">tv</i>' +
                                    '<h3>' + device.name + '</h3>' +
                                '</button>' +
                            '</div>'+
                            '<div class="col-lg-1 col-md-1"></div>';
                i += 1;
            } else {
                var content = '<div class="col-lg-2 col-md-2">' +
                                    '<button type="button" class="btn btn-default" ' +
                                            'onclick="location.href=\'/device/' + device.id + '\';">' +
                                        '<i class="material-icons" style="font-size:144px;">tv</i>' +
                                        '<h3>' + device.name + '</h3>' +
                                    '</button>' +
                                '</div>'+
                                '<div class="col-lg-1 col-md-1"></div>';
                // console.log(i);
                row = row.concat(content);
                // console.log(this.row);
                if (i === 3) {
                    var divRow = document.createElement('div');
                    divRow.className = 'row';
                    divRow.innerHTML = row;
                    deviceData.appendChild(divRow);
                    i = 0;
                } else {
                    i += 1;
                }
            }
        });
        if (i != 0) {
            var divRow = document.createElement('div');
            divRow.className = 'row';
            divRow.innerHTML = row;
            deviceData.appendChild(divRow);
        }
    });
});