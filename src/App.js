import React, { Component } from 'react';
import './App.css';
import {ButtonToolbar, MenuItem, DropdownButton} from 'react-bootstrap';
class Box extends Component{
	selectBox = ()=> {
		this.props.selectBox(this.props.row, this.props.col)
	}
	render(){
		return(
			<div
			className={this.props.boxClass}
			id={this.props.id}
			onClick={this.selectBox}
			/>
		);
	}
}
class Grid extends Component{
	render(){
		const width = (this.props.cols * 14);
		var rowsArr = [];
		var boxClass = "";
		for(var i=0; i < this.props.rows ; i++){
			for(var j=0; j < this.props.cols ; j++){
				let boxId = i + "_"+ j;
				 boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
				 rowsArr.push(
					 <Box
					 boxClass={boxClass}
					 key={boxId}
					 boxId={boxId}
					 row={i}
					 col={j}
					 selectBox={this.props.selectBox}
					 />
				 );
			}
		}
		return(
			<div className="grid" style={{width:width}}>
			{rowsArr}
			</div>
		);
	}
}
class Buttons extends Component{
	handleSelect = (evt) =>{
		this.props.gridSize(evt);
	}
	render(){
		return (
			<div className="center">
			<ButtonToolbar>
			<button className="btn btn-default" onClick={this.props.playButton}>play</button>
			<button className="btn btn-default" onClick={this.props.pauseButton}>pause</button>
			<button className="btn btn=default" onClick={this.props.clear}>clear</button>
			<button className="btn btn-default" onClick={this.props.slow}>slow</button>
			<button className="btn btn-default" onClick={this.props.fast}>fast</button>
			<button className="btn btn=default" onClick={this.props.intialGrid}>start</button>
			<DropdownButton
			title="Grid Size"
			id="size-menu"
			onSelect={this.handleSelect}
			>
			<MenuItem eventKey="1">20*10</MenuItem>
			<MenuItem eventKey="2">50*30</MenuItem>
			<MenuItem eventKey="3">70*50</MenuItem>
			</DropdownButton>
			</ButtonToolbar>
			</div>
		);
	}
}
class App extends Component {
	constructor(props){
		super(props);
		this.speed = 100;
		this.rows = 30;
		this.cols = 50;
		this.state = {
	    generation: 0,
			gridFull: Array(this.rows).fill().map(()=>Array(this.cols).fill(false))
	  }

	}
	selectBox = (row,col) => {
		let gridCopy = arrayClone(this.state.gridFull);
		gridCopy[row][col] = !gridCopy[row][col];
		this.setState({gridFull:gridCopy});
	}
	intialGrid = () =>{
		let gridCopy = arrayClone(this.state.gridFull);
		for(let i=0; i<this.rows; i++){
			for(let j=0; j<this.cols; j++){
				let random = Math.floor(Math.random()*4);
				if(random ===1){
					gridCopy[i][j] = true;
				}
				else gridCopy[i][j] = false;
			}
		}
		this.setState({gridFull:gridCopy});
	}
	play = () =>{
		let  grid = this.state.gridFull;
		let gridCopy = arrayClone(this.state.gridFull);
		for(let i = 1 ; i<this.rows ; i++){
			for(let j = 1; j<this.cols; j++){
				let count = 0;
					for(let x = -1; x<2 ; x++){
						for(let y = -1; y<2 ; y++){
							if(grid[(i+x+this.rows)%this.rows][(j+y+this.cols)%this.cols])
							count++;
						}
					}
					if(grid[i][j]){count -= count;}
					console.log(count);
					if(grid[i][j] && (count < 2 || count >3)) gridCopy[i][j] = false;
					if(!grid[i][j] && count === 3) gridCopy[i][j] = true;
				}
			}
			this.setState({gridFull:gridCopy,
				generation : this.state.generation+1
			});
		}
		playButton = ()=>{
			clearInterval(this.intervalId);
			this.intervalId = setInterval(this.play,this.props.speed);
		}
		pauseButton =()=>{
			clearInterval(this.intervalId);
		}
		fast = ()=>{
			this.speed=100;
			this.playButton();
		}
		slow = ()=>{
			this.speed=1000;
			this.playButton();
		}
		clear = ()=>{
			clearInterval(this.intervalId);
			let emptyArry = Array(this.rows).fill().map(()=>Array(this.cols).fill(false));
			this.setState({
				gridFull:emptyArry,
				generation :0
			});
		}
		gridSize = (size)=>{
			switch (size){
				case "1":
				this.cols = 20;
				this.rows = 10;
				break;
				case "2":
				this.cols = 50;
				this.rows = 30;
				break;
				default:
				this.cols = 70;
				this.rows = 50;
			}
			this.clear();
		}
componentDidMount(){
	this.intialGrid();
	this.playButton();
}
		render(){
			return (
	      <div>
				<h1>The Game Of Life</h1>
				<Buttons
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					slow={this.slow}
					fast={this.fast}
					clear={this.clear}
					intialGrid={this.intialGrid}
					gridSize={this.gridSize}
				/>
				<Grid
				gridFull={this.state.gridFull}
				rows={this.rows}
				cols={this.cols}
				selectBox={this.selectBox}
				/>
				<h2>Generation : {this.state.generation}</h2>
	      </div>
	    );
		}

}
 function arrayClone(arr){
	 return JSON.parse(JSON.stringify(arr));
 }

export default App;
