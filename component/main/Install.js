var React = require( 'react' );
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Dropzone = require('react-dropzone');
var PresetItems = require( './PresetItems.js' );

var unzip = window.require('unzip2');
var fs = window.require('fs');
var path = window.require('path');
var osenv = window.require('osenv');
var os = window.require('os');
var mkdirp = window.require('mkdirp');

var Install = React.createClass({
	displayName: 'Install',
	statics: {
		getDirectories: function (src) {
			return fs.readdirSync(src).filter(function(file) {
				return fs.statSync(path.join(src, file)).isDirectory();
			});
		}
	},

	getDefaultProps: function () {
		var presetsPath;

		if (os.platform() === 'darwin') { //OSX
			presetsPath = path.join(osenv.home(), '/Library/Application Support/Adobe/Lightroom/Develop Presets');
		} else if (os.platform() === 'win32') {
			presetsPath = path.join(osenv.home(), path.normalize('/AppData/Roaming/Adobe/Lightroom/Develop Presets'));
		}
		return {
			presetsPath: presetsPath,
			presetsList: this.getDirectories(presetsPath)
		};
	},

	getInitialState: function () {
		return {
			presetsList: this.props.presetsList.sort() || []
		};
	},

	componentDidMount: function () {
	},

	updateList: function (item) {
		var presetsList = this.state.presetsList;
		presetsList.push(item);

		this.setState({
			presetsList: presetsList.sort()
		});
	},

	onDrop: function (files) {
		var component = this,
			baseName;

		files.forEach(function (file) {
			// Get the name of the subdirectory that we will unzip the files to
			baseName = path.basename(file.path, '.zip');

			fs.createReadStream(file.path).pipe(unzip.Parse())
			.on('entry', function (entry) {
				// If this is a lrtemplate file, we can copy it to the right directory
				if (path.extname(entry.path) === '.lrtemplate') {

					// Create the subdirectory under the lightroom develop presets dir if it doesn't exist
					mkdirp(path.join(component.props.presetsPath, baseName), function (err) {
						if (err) {
							return; //handle error
						} else {
							if (component.state.presetsList.indexOf(baseName) === -1) {
								component.updateList(baseName);
							}
							// Extract lrtemplate files to the directory
							entry.pipe(fs.createWriteStream(path.join(component.props.presetsPath, baseName, entry.path))							);
						}
					});
				} else {
				    entry.autodrain();
				}
			});
		});
	},

	render: function() {
		return (
	    	<Dropzone onDrop={this.onDrop} supportClick={false} style={{}}>
	        	<PresetItems presetsList={this.state.presetsList} presetsPath={this.props.presetsPath}/>
	      	</Dropzone>
		);
	}
});

module.exports = Install;
