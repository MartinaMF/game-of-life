import React,{Component} from 'react';

const divStyle = {
  height: '10px',
  width: '10px',
  background:'red'
};
const Cell = ({status, id})=>{

    return(
      <div style={divStyle}>{id}</div>
    );

}
export default Cell;
