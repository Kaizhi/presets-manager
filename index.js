var app = require('app');
var Menu = require('menu');
var Menubar = require('menubar');
var MenuItem = require('menu-item');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit();
});

ipc.on('app:event', function (event, arg) {
	app.quit();
});

var mb = Menubar({
	dir: __dirname,
	preloadWindow: true,
	width: 1024, //400
	height: 600,
	resizable: true
});

mb.on('ready', function () {
});

mb.on('after-create-window', function () {
	mb.window.setResizable(false);
	mb.window.openDevTools({
		detach: false
	});
});

