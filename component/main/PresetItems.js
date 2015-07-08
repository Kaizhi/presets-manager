var React = require( 'react' );
var fs = window.require('fs');
var path = window.require('path');
var PresetItem = require( './PresetItem.js' );

var PresetItems = React.createClass({
	statics: {
		deleteFolderRecursive: function (folderPath) {
			if( fs.existsSync(folderPath) ) {
				fs.readdirSync(folderPath).forEach(function(file,index){
					var curPath = path.join(folderPath, file);
					if (fs.lstatSync(curPath).isDirectory()) { // recurse
						deleteFolderRecursive(curPath);
					} else { // delete file
						fs.unlinkSync(curPath);
					}
				});

				fs.rmdirSync(folderPath);
			}
		},
	},

	getInitialState: function () {
		return {
			presetsList: this.props.presetsList || []
		};
	},

	deletePreset: function (itemIndex) {

		var list = this.state.presetsList

		this.constructor.deleteFolderRecursive(path.join(this.props.presetsPath, list[itemIndex]));
		list.splice(itemIndex, 1);

		this.setState({
			presetsList: list
		});
	},

	render: function() {
		var component = this;

		function item(itemText, index) {
			return (
				<PresetItem key={index + itemText} deletePreset={component.deletePreset.bind(component, index)} index={index} itemText={itemText}/>
			);
		};
		return <ul className="presets-list">{this.state.presetsList.map(item)}</ul>;
	}
});

module.exports = PresetItems;
