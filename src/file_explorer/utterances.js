import React from 'react';
import './utterances.css';
import {Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
// import {ListItem} from 'material-ui/List';
// import FileFolder from 'material-ui/svg-icons/file/folder';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
// import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar';
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
			currentLocation: currentUrl, //current location
			tableData: [] //array of utterances
		}
		this.currentRef = this.database.ref(this.state.currentLocation);
		this.urlToBread(currentUrl);
	}
	
	/**
	 * Changes string s to html for breadcrumbs
	 * @param {String} s url
	 */
	urlToBread(s)
	{
		this.state.breadcrumbs = [(<Link key="home" to="/" style={{color:"white"}}>Home </Link>)];
		var split = s.split("/");
		split = split.filter((val) => val);
		var url = "/";
		for(var i = 0; i < split.length; i++)
		{
			url += split[i] + "/";
			this.state.breadcrumbs.push(<RightArrow key={i} color={"white"}/>);
			this.state.breadcrumbs.push(<Link key={split[i]} to={url} style={{color:"white"}}> {split[i]} </Link>);
		}
	}

	/**
	 * Add an utterance by opening the editor to a new page
	 */
	addUtterance()
	{
		window.location.href = this.state.currentLocation + "new";
	}

	/**
	 * format data into array after data has been retrieved
	 */
	componentDidMount()
	{
		var self = this;
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
		{/* <h3> {this.state.breadcrumbs} 
		<FloatingActionButton 
			style={{float:'right', marginRight:'20px', position:'relative', top:'-7px'}}
			onClick={() => this.addUtterance()}>
      		<ContentAdd />
		</FloatingActionButton></h3> */}
		<AppBar
			title={this.state.breadcrumbs}
    		iconElementRight={
			<FloatingActionButton 
				mini={true}
				backgroundColor="white"
				iconStyle={{fill: "#1FBCD3"}}
				onClick={() => this.addUtterance()}>
				  <ContentAdd />
			</FloatingActionButton>}
  		/>
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
		</div>
		</MuiThemeProvider>);
	}
}

