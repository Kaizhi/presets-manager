var React = require( 'react' );
var fs = window.require('fs');
var path = window.require('path');

var PresetItems = React.createClass({
	statics: {
		deleteFolderRecursive: function (path) {
			if( fs.existsSync(path) ) {
				fs.readdirSync(path).forEach(function(file,index){
					var curPath = path + "/" + file;
					if (fs.lstatSync(curPath).isDirectory()) { // recurse
						deleteFolderRecursive(curPath);
					} else { // delete file
						fs.unlinkSync(curPath);
					}
				});

				fs.rmdirSync(path);
			}
		},
	},

	getInitialState: function () {
		return {
			presetsList: this.props.presetsList || []
		};
	},

	deletePreset: function (evt) {
		if (!evt.target.classList.contains('fa')) {
			return;
		}

		var list = this.state.presetsList,
			itemIndex = evt.target.parentNode.dataset.presetindex;

		console.log('deleting ', path.join(this.props.presetsPath, list[itemIndex]));
		this.constructor.deleteFolderRecursive(path.join(this.props.presetsPath, list[itemIndex]));
		list.splice(itemIndex, 1);

		this.setState({
			presetsList: list
		});
	},

	render: function() {
		function item(itemText, index) {
			return (
				<li key={index}>
					{itemText}
					<span className="actions" data-presetindex={index}><i className="fa fa-trash-o"></i></span>
				</li>
			);
		};
		return <ul onClick={this.deletePreset} className="presets-list">{this.state.presetsList.map(item)}</ul>;
	}
});

module.exports = PresetItems;
