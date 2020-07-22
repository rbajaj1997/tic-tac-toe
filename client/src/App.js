import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Game from './components/Game';

// const gamestate = {
// 	p1_name: "",
// 	p2_name: "",
// 	p1_score: 0,
// 	p2_score: 0,
// 	ties: 0,
// 	p1_turn: true,
// 	grid: [0, 0, 1, 0, 0, -1, 0, 0, 0]
// }

function App() {
	return (
		<React.Fragment>
			<CssBaseline />
			<MainContainer/>
		</React.Fragment>
	);
}

export default App;
