import React from 'react';
import './utterances.css';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import {ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Add from 'material-ui/svg-icons/content/add-circle';
import Avatar from 'material-ui/Avatar';
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
			tableData: []
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
			url += split[i] + "/";
			this.state.breadcrumbs.push(<RightArrow key={i}/>);
			this.state.breadcrumbs.push(<Link key={split[i]} to={url} style={{color:"black"}}> {split[i]} </Link>);
		}
	}

	/**
	 * onclick Function for each folder to change to new url
	 * @param {String} newUrl 
	 */
	changeUrl(newUrl)
	{
		window.location.href=newUrl;
	}

	/**
	 * Add an untitled folder
	 * potentially dangerous because updating this.state.folders before it is fetched from firebase
	 */
	addFolder()
	{
		var self = this;
		var temp = this.state.folders;
		temp.push(
		  <div key={this.untitledCount}>
		  <ListItem onClick={() => self.changeUrl(this.state.currentLocation + "Untitled")}
			  leftAvatar={<Avatar icon={<FileFolder />} />}
			  primaryText={'Untitled'}
			/>
			  <Divider />
		  </div> 
		);
		this.untitledCount++;
		this.setState({folders:temp});
	}

	/**
	 * format data into json array after data has been retrieved
	 */
	componentDidMount()
	{
		var self = this;
		//read the value
		this.currentRef.on('value', function(value){
			self.state.data = value.val();
			var tableData = [];
			for(var prop in self.state.data)
			{
				var ss = self.state.data[prop];
				ss.socialStrategy = prop;
				ss.phase = self.state.phase;
				ss.taskStrategy = self.state.taskStrategy;
				tableData.push(ss);
			}
			self.setState({tableData: tableData});
		});
	}

	/**
	 * change URL to editor
	 * @param {*} rowNumber of row clicked
	 */
	handleRowClick(rowNumber)
	{
		window.location.href = this.state.currentLocation + this.state.tableData[rowNumber].socialStrategy;
	}

	
	render()
	{
		return (
		<MuiThemeProvider>
		<div className="utterances">
		<h3> {this.state.breadcrumbs}
		<IconButton 
			disableTouchRipple={true}
			//onClick={() => this.changeUrl()}
			iconStyle={{color:"#44aa77", width:"60px", height:"60px"}}>
			<Add />
		</IconButton>  </h3>
		<div>
			<Divider/>
			<Table displayRowCheckbox={false}
			onCellClick= {this.handleRowClick.bind(this)}>
			<TableHeader 
			displaySelectAll={false}
            adjustForCheckbox={false}>
      		<TableRow>
        		<TableHeaderColumn style={{width: "50%"}}>Text</TableHeaderColumn>
        		<TableHeaderColumn>Phase</TableHeaderColumn>
				<TableHeaderColumn>TS</TableHeaderColumn>
				<TableHeaderColumn>SS</TableHeaderColumn>
				<TableHeaderColumn>Date</TableHeaderColumn>
				<TableHeaderColumn>Author</TableHeaderColumn>
      		</TableRow>
    		</TableHeader>
			<TableBody displayRowCheckbox={false}>
            {this.state.tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn style={{width: "50%"}}>{row.text}</TableRowColumn>
                <TableRowColumn>{row.phase}</TableRowColumn>
				<TableRowColumn>{row.taskStrategy}</TableRowColumn>
				<TableRowColumn>{row.socialStrategy}</TableRowColumn>
				<TableRowColumn>{row.date}</TableRowColumn>
				<TableRowColumn>{row.author}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
			</Table>
		</div>
		
		{/* <FileMenu></FileMenu>		 */}
		</div>
		</MuiThemeProvider>);
	}
}

