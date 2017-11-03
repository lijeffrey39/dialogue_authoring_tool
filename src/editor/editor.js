import React from 'react';
import './fileExplorer.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FileMenu from './fileMenu.js';

const editor = () => (
	<div className="file_explorer">
		<h1> Home </h1>
		<MuiThemeProvider>
			<Divider/>
		</MuiThemeProvider>
		<FileMenu></FileMenu>
		<div>
		</div>
    </div>
);

export default editor;