import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Folders from './file_explorer/folders.js';
import Utterances from './file_explorer/utterances.js';
import Editor from './editor/editor.js';

//import firebase from './fire.js';


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
		<Route exact path="/" component={Folders}/>
		<Route exact path="/:page" component={Folders}/>
		<Route exact path="/:page/:page" component={Utterances}/>
		<Route exact path="/:page/:page/:page" component={Editor}/>
		{/* <Route path="/editor" component={Editor}/> */}
    </div>
		</BrowserRouter>
);

export default App;
