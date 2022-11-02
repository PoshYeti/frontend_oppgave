import React, { useState } from 'react';
import SporingAPI from './sporingAPI';
import { Grid, Input, Box, Button } from '@material-ui/core';
import logo from './images/logo.jpg'

function App() {

	const [status, setStatus] = useState(false);

	return (
    	<Grid container style={{margin:"0.5em"}}>
			<Grid item xs={12}>
				<img src={logo} style={{width: "12em"}} alt="Posten logo"/>
			</Grid>
			<Grid container sm={1}></Grid>
			<Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" xs={12} sm={10}>
				<Grid item xs={12}>
					<h1>Track your packages</h1>
				</Grid>
				<Grid item xs={12}>
					<b>Tracking number input</b>
				</Grid>
				<Grid item xs={12}>
				<Box
					component="form"
					noValidate
					autoComplete="off"
					>
					<Input style={{width: "20em", backgroundColor: "#f2f2f2"}} defaultValue="TESTPACKAGEATPICKUPPOINT"  />
					<Button style={{color: "white", marginLeft: "0.5em", backgroundColor: "#e32d22"}} variant="outlined" disableElevation onClick={() => setStatus(true)}>Track</Button>
				</Box>
				</Grid>
				{status && 
					<SporingAPI />
				}
			</Grid>
			
    	</Grid>
  	);
}

export default App;
