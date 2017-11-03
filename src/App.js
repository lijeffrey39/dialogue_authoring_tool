import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import FileExplorer from './file_explorer/fileExplorer.js';

const dataSource3 = [
  {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
];
const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};


const App = () => (
	<BrowserRouter>
	<div className="App">
		{/* <FileExplorer></FileExplorer> */}
		<Link to="/fileExplorer">File Explorer</Link>
		{/* <h1> Utterance Editor </h1>
		<div>
			<MuiThemeProvider>
				<AutoComplete
					floatingLabelText="Same text, different values"
					filter={AutoComplete.noFilter}
					openOnFocus={true}
					dataSource={dataSource3}
					dataSourceConfig={dataSourceConfig}
			    />
			</MuiThemeProvider>
		</div> */}
		<Route path="/fileExplorer" component={FileExplorer}/>
    </div>
		</BrowserRouter>
);



export default App;
