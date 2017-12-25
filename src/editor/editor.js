import React from 'react';
import './editor.css';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import {ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Add from 'material-ui/svg-icons/content/add-circle';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table';
import firebase from '../fire.js';

export default class Utterances extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.untitledCount = 0;
		this.database = firebase.database();

		//make sure the url ends with /
		var currentUrl = props.match.url.endsWith("/") ? props.match.url : props.match.url + "/";
		this.state = 
		{
			currentLocation: currentUrl,
			data: {
				SSML:"",
				date:"",
				author:"",
				text:""
			}
		}
		//get ssml
		this.currentRef = this.database.ref(this.state.currentLocation);
		this.urlToBread(currentUrl);

		//set it to test
		//greeting.set('test');
	}
	
	/**
	 * Changes string s to html for breadcrumbs
	 * @param {String} s url
	 */
	urlToBread(s)
	{
		this.state.breadcrumbs = [(<Link key="home" to="/" style={{color:"black"}}>Home </Link>)];
		var split = s.split("/");
		split = split.filter((val) => val);
		var url = "/";
		for(var i = 0; i < split.length; i++)
		{
			url += split[i];
			this.state.breadcrumbs.push(<RightArrow key={i}/>);
			this.state.breadcrumbs.push(<Link key={split[i]} to={url} style={{color:"black"}}> {split[i]} </Link>);
		}
		if(split.length >= 2)
		{
			this.state.phase = split[0];
			this.state.taskStrategy = split[1];
		}
	}

	/**
	 * format data into json array after data has been retrieved
	 */
	componentDidMount()
	{
		var self = this;
		//read the value
		this.currentRef.on('value', function(value){
			self.setState({data: value.val()});
			console.log(value.val());
		});
	}

	handleTextChange(event) 
	{
		var prev = this.state.data;
		prev.text = event.target.value;
		this.setState({
		  data: prev
		});
	}

	handleSSMLChange(event) 
	{
		var prev = this.state.data;
		prev.SSML = event.target.value;
		this.setState({
		  data: prev
		});
	}

	handleCopyButton() 
	{
		var prev = this.state.data;
		prev.SSML += "\n" + prev.text;
		this.setState({
			data: prev
		  });
	}

	saveData() 
	{
		this.currentRef.set(this.state.data);
		this.returnToPrevious();
	}

	returnToPrevious()
	{
		var re = new RegExp(".*\/");
		window.location.href = re.exec(window.location.href);
	}

	render()
	{
		return (
		<MuiThemeProvider>
		<div className="editor">
		<h3> {this.state.breadcrumbs}</h3>
		<Divider></Divider>
		<Tabs>
    	<Tab label="Text" >
		  <TextField
		  id="textfield"
		  style={{width:'50%', margin:'0 25% 0 25%'}}
		  value={this.state.data.text}
		  onChange={this.handleTextChange.bind(this)}
		  multiLine={true}
        />
    	</Tab>
    	<Tab label="SSML" >
		  <TextField
		  id="ssmlfield"
		  style={{width:'50%', margin:'0 0 0 25%'}}
          value={this.state.data.SSML}
		  onChange={this.handleSSMLChange.bind(this)}
		  multiLine={true}
        />
		<RaisedButton 
			label="Copy from Text" 
			primary={true}
			onClick={this.handleCopyButton.bind(this)}
			/>
    	</Tab>
		</Tabs>
		{/* <FileMenu></FileMenu>		 */}
		<RaisedButton 
			label="Save" 
			primary={true}
			onClick={this.saveData.bind(this)}
			/>
		<RaisedButton 
			label="Cancel" 
			primary={true}
			onClick={this.returnToPrevious.bind(this)}
			/>
		</div>
		</MuiThemeProvider>);
	}
}

