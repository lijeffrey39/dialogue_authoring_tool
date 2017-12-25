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
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
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
			},
			phases: [],
			taskStrategies: [],
			socialStrategies: [],
			phase: "",
			taskStrategy: "",
			socialStrategy: ""
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
		this.split = split.filter((val) => val);
		var url = "/";
		for(var i = 0; i < this.split.length; i++)
		{
			url += this.split[i] + "/";
			this.state.breadcrumbs.push(<RightArrow key={i}/>);
			this.state.breadcrumbs.push(<Link key={this.split[i]} to={url} style={{color:"black"}}> {this.split[i]} </Link>);
		}
		
		if(this.split.length >= 3)
		{
			this.state.phase = this.split[0];
			this.state.taskStrategy = this.split[1];
			this.state.socialStrategy = this.split[2];
		}
	}

	getPhases()
	{
		var self = this;
		var phases = [];
		this.database.ref("/").on('value', function(value){
			var i = 0;
			for(var prop in value.val())
			{
				phases.push(<MenuItem value={prop} key={i} primaryText={prop} />);
				i++;
			}
			self.setState({phases});
		});
	}

	getTaskStrategies()
	{
		var self = this;
		var taskStrategies = [];
		this.database.ref("/" + this.state.phase).on('value', function(value){
			var i = 0;
			for(var prop in value.val())
			{
				taskStrategies.push(<MenuItem value={prop} key={i} primaryText={prop} />);
				i++;
			}
			self.setState({taskStrategies});
		});
	}

	getSocialStrategies()
	{
		var self = this;
		var socialStrategies = [];
		this.database.ref("/" + this.state.phase + "/" + this.state.taskStrategy).on('value', function(value){
			var i = 0;
			for(var prop in value.val())
			{
				socialStrategies.push(<MenuItem value={prop} key={i} primaryText={prop} />);
				i++;
			}
			self.setState({socialStrategies});
		});
	}

	/**
	 * format data into json array after data has been retrieved
	 */
	componentDidMount()
	{
		var self = this;
		this.getPhases();
		this.getTaskStrategies();
		this.getSocialStrategies();
		//read the value
		this.currentRef.on('value', function(value){
			self.setState({data: value.val()});
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
		// if(this.state.phase != "" && this.state.taskStrategy != "" && this.state.socialStrategy != "")
		// {
		// 	// this.currentRef.set(this.state.data);
		// 	// this.returnToPrevious();
		// }
		// console.log("/" + this.state.phase + "/" + this.state.taskStrategy + "/" + this.state.socialStrategy);
	}

	returnToPrevious()
	{
		var re = new RegExp(".*\/");
		window.location.href = re.exec(window.location.href);
	}

	handlePhaseChange(event, index, value)
	{
		this.getTaskStrategies();
		this.setState({phase: value, socialStrategies:[], taskStrategy: "", socialStrategy: ""});
	}

	handleTaskStrategyChange(event, index, value)
	{
		this.getSocialStrategies();
		this.setState({taskStrategy: value, socialStrategy: ""});
	}

	handleSocialStrategyChange(event, index, value)
	{
		this.setState({socialStrategy: value});
	}

	render()
	{
		return (
		<MuiThemeProvider>
		<div className="editor">
		<h3> {this.state.breadcrumbs}</h3>
		<Divider></Divider>
		<SelectField
        value={this.state.phase}
        onChange={this.handlePhaseChange.bind(this)}
        maxHeight={200}>
        	{this.state.phases}
      	</SelectField>
		  <SelectField
        value={this.state.taskStrategy}
        onChange={this.handleTaskStrategyChange.bind(this)}
        maxHeight={200}>
        	{this.state.taskStrategies}
      	</SelectField>
		  <SelectField
        value={this.state.socialStrategy}
        onChange={this.handleSocialStrategyChange.bind(this)}
        maxHeight={200}>
        	{this.state.socialStrategies}
      	</SelectField>
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
		  style={{width:'50%', margin:'0 5% 0 25%'}}
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

