import React ,{Component} from 'react';
const Board = ({board})=>{
  return(
    {board.map((cell,index)=>{
      return <Cell key={index} status="alive" id="1"/>
    })}
  );
}
export default Board;
