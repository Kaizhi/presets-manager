var app = require('app');
var Menu = require('menu');
var Menubar = require('menubar');
var MenuItem = require('menu-item');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var dialog = require('dialog');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit();
});

ipc.on('app:eventSync', function (event, arg) {
	app.quit();
});

ipc.on('app:event', function (event, arg) {
	if (arg === 'openFile') {
		dialog.showOpenDialog({
			filters: [
				{ name: 'Lightroom Presets', extensions: ['zip']}
			],
			properties: [ 'openFile', 'multiSelections' ]
		}, function (files) {
			event.sender.send('app:response', files);
		});
	}
});

var mb = Menubar({
	dir: __dirname,
	preloadWindow: true,
	width: 400, //400
	height: 400,
	resizable: false
});

mb.on('ready', function () {
});

mb.on('after-create-window', function () {
	// mb.window.openDevTools({
	// 	detach: false
	// });
});

