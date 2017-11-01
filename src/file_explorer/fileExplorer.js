import React from 'react';
//import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FileMenu from './fileMenu.js';

const fileExplorer = () => (
	<div className="file_explorer">
		<h1> File Explorer </h1>
		<FileMenu></FileMenu>
		<MuiThemeProvider>
			<Divider />
				Hi
			<Divider />
		</MuiThemeProvider>
		<div>
		</div>
    </div>
);



export default fileExplorer;