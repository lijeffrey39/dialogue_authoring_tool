import React from 'react';
import './fileExplorer.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FileMenu from './fileMenu.js';
import firebase from '../fire.js';
var database = firebase.database();

var greeting = database.ref('Greeting/Greeting/SD/SSML');
greeting.set('test');
greeting.on('value', function(value){
	console.log(value.val());
})

const fileExplorer = () => (
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

export default fileExplorer;