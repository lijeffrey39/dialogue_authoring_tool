import React from 'react';
import './editor.css';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
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
			socialStrategy: "",
			new: false
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
		
		this.state.phase = this.split[0];
		this.state.taskStrategy = this.split[1];

		//set up new utterance
		if(this.split[2] === "new")
		{
			this.state.socialStrategy = "";
			this.state.new = true;
		}
		else
		{
			this.state.socialStrategy = this.split[2];
		}
	}

	/**
	 * Returns phases from database in dropdown list
	 */
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

	/**
	 * returns task strategies from database in dropdown list
	 */
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

	/**
	* Returns social strategies in dropdown list
	*/
	getSocialStrategies()
	{
		var SS = ["NONE", "PR", "SD", "ID", "RSE", "VSN", "QE"];
		var socialStrategies = [];
		for(var i = 0; i < SS.length; i++)
		{
			socialStrategies.push(<MenuItem value={SS[i]} key={i} primaryText={SS[i]} />);
		}
		this.setState({socialStrategies});
	}

	/**
	 * Get dropdown lists and utterance data from database
	 */
	componentDidMount()
	{
		var self = this;
		this.getPhases();
		this.getTaskStrategies();
		this.getSocialStrategies();
		if(!this.state.new)
		{
			this.currentRef.on('value', function(value){
				self.setState({data: value.val()});
			});
		}
	}

	/**
	 * Change the utterance's author
	 * @param {*} event 
	 */
	handleAuthorChange(event) 
	{
		var prev = this.state.data;
		prev.author = event.target.value;
		this.setState({
		  data: prev
		});
	}

	/**
	 * Change the utterance's date
	 * @param {*} event 
	 */
	handleDateChange(event) 
	{
		var prev = this.state.data;
		prev.date = event.target.value;
		this.setState({
		  data: prev
		});
	}

	/**
	 * Change the utterance's text
	 * @param {*} event 
	 */
	handleTextChange(event) 
	{
		var prev = this.state.data;
		prev.text = event.target.value;
		this.setState({
		  data: prev
		});
	}

	/**
	 * Change the utterance's ssml
	 * @param {*} event 
	 */
	handleSSMLChange(event) 
	{
		var prev = this.state.data;
		prev.SSML = event.target.value;
		this.setState({
		  data: prev
		});
	}

	/**
	 * Append text from text field to ssml field
	 */
	handleCopyButton() 
	{
		var prev = this.state.data;
		prev.SSML += "\n" + prev.text;
		this.setState({
			data: prev
		  });
	}

	/**
	 * Saves data to the database in the specified location. 
	 * If the specified phase, task strategy, or social strategy are different, delete data in the old location.
	 */
	saveData() 
	{
		if(this.state.phase !== "" && this.state.taskStrategy !== "" && this.state.socialStrategy !== "")
		{
			var userLoc = "/" + this.state.phase + "/" + this.state.taskStrategy + "/" + this.state.socialStrategy + "/";
			var userRef = this.database.ref(userLoc);
			userRef.set(this.state.data);
			if(userLoc !== this.state.currentLocation)
			{
				this.currentRef.set({}); //currently causes an error on page because there is no text to display, but should be ok
										 // because we return to the previous page anyway
			}
			this.returnToPrevious();
		}
	}

	/**
	 * Deletes data at the current location and returns to the previous page
	 */
	deleteData()
	{
		this.currentRef.set({});
		this.returnToPrevious();
	}

	/**
	 * returns to the utterances page
	 */
	returnToPrevious()
	{
		var re = new RegExp(".*\/");
		window.location.href = re.exec(window.location.href);
	}

	/**
	 * Changes the phase, updates the task strategies list and clears the task strategy and social strategy
	 * @param {*} event 
	 * @param {*} index 
	 * @param {*} value 
	 */
	handlePhaseChange(event, index, value)
	{
		this.setState({phase: value, taskStrategy: "", socialStrategy: ""}, () => this.getTaskStrategies());
	}

	/**
	 * Changes the task strategy, clears the social strategy
	 * @param {*} event 
	 * @param {*} index 
	 * @param {*} value 
	 */
	handleTaskStrategyChange(event, index, value)
	{
		this.setState({taskStrategy: value, socialStrategy: ""});
	}

	/**
	 * Changes the social strategy
	 * @param {*} event 
	 * @param {*} index 
	 * @param {*} value 
	 */
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
		<div style={{display:'inline-block'}}><h5>Phase</h5>
		<SelectField
		value={this.state.phase}
		errorText={this.state.phase === "" && 'Required'}
        onChange={this.handlePhaseChange.bind(this)}
        maxHeight={200}>
        	{this.state.phases}
      	</SelectField></div>
		<div style={{display:'inline-block'}}><h5>Task Strategy</h5>
		  <SelectField
		value={this.state.taskStrategy}
		errorText={this.state.taskStrategy === "" && 'Required'}
        onChange={this.handleTaskStrategyChange.bind(this)}
        maxHeight={200}>
        	{this.state.taskStrategies}
      	</SelectField></div>
		<div style={{display:'inline-block'}}><h5>Social Strategy</h5>
		  <SelectField
		value={this.state.socialStrategy}
		errorText={this.state.socialStrategy === "" && 'Required'}
        onChange={this.handleSocialStrategyChange.bind(this)}
        maxHeight={200}>
        	{this.state.socialStrategies}
      	</SelectField></div>
		<div style={{display:'inline-block', verticalAlign:'top'}}>
		<h5>Author</h5>
		<TextField
		  id="authorfield"
		  errorText={this.state.data.author === "" && 'Required'}
		  style={{width:'75%'}}
		  value={this.state.data.author}
		  onChange={this.handleAuthorChange.bind(this)}
        />
		</div>
		<div style={{display:'inline-block', verticalAlign:'top'}}>
		<h5>Date</h5>
		<TextField
		  id="datefield"
		  errorText={this.state.data.date === "" && 'Required'}
		  style={{width:'75%'}}
		  value={this.state.data.date}
		  onChange={this.handleDateChange.bind(this)}
        />
		</div>
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
			onClick={this.returnToPrevious.bind(this)}
			style={{margin:"10px"}}
			/>
		<RaisedButton 
			label="Delete" 
			backgroundColor="#EF3434"
			labelColor="white"
			onClick={this.deleteData.bind(this)}
			/>
		</div>
		</MuiThemeProvider>);
	}
}

