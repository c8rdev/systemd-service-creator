var fs = require('fs')
var sudo = require('sudo-prompt');
var options = {
    name: 'Systemd Service Creator',
};
var serviceName = document.getElementById('service-name')
var serviceDesc = document.getElementById('service-description')
var serviceType = document.getElementById('service-type')
var serviceFile = document.getElementById('service-file')
var createButton = document.getElementById('service-create-button')

function handleCreateButtonClick() {
    var serviceNameVal = serviceName.value
    var serviceDescVal = serviceDesc.value
    var serviceTypeVal = serviceType.value
    var serviceFileVal = serviceFile.files[0].path
    var serviceFileContent = `
[Unit]
Description=${serviceDescVal}
[Service]
ExecStart=${serviceFileVal}
Type=${serviceTypeVal}
[Install]
WantedBy=multi-user.target
`
    fs.writeFileSync(`/tmp/${serviceNameVal}`, serviceFileContent)
    sudo.exec(`chmod +x ${serviceFileVal} && cp -r /tmp/${serviceNameVal} /etc/systemd/system/${serviceNameVal}.service && systemctl daemon-reload`,
        options,
        function (error, stdout, stderr) {
            if (error) {
                alert("ERROR")
                throw error;
            }
            console.log('stdout: ' + stdout);
            alert("SUCCESS")
        }
    );
}

createButton.addEventListener('click', handleCreateButtonClick)