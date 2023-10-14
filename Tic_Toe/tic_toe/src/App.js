import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import './styles.css'


function Square({value, handleClick}){
  return <button className='square' onClick={handleClick}>
    {value}
  </button>;

}

export default function Board(){
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, changeTurn] = useState(true);
  const [counter, setCounter] = useState(0);

  const winner = getWinner();

  const playerToPlay = isXTurn ? 'X' : 'O';
  let message = playerToPlay + ' To Play';

  if(winner){
    message = 'We have a winner: player ' + winner;
  }else if(counter == 9){
    message = 'We have a tie!';
  }


  function play(index){
    if(board[index] || getWinner()){
      return;
    }

    let symbol = isXTurn ? 'X' : 'O';
    board[index] = symbol;
    setBoard(board);
    setCounter(counter+1);
    changeTurn(!isXTurn);
  }

  function reset(){
    setBoard(Array(9).fill(null));
    setCounter(0);
    changeTurn(true);

  }


  return (
    <>
    {message}
    <div className="board-row">
      <Square value={board[0]} handleClick={()=> play(0)} />
      <Square value={board[1]} handleClick={()=> play(1)} />
      <Square value={board[2]} handleClick={()=> play(2)} />
    </div>

    <div className="board-row">
    <Square value={board[3]} handleClick={()=> play(3)} />
    <Square value={board[4]} handleClick={()=> play(4)} />
    <Square value={board[5]} handleClick={()=> play(5)} />
    </div>
    <div className="board-row">
    <Square value={board[6]} handleClick={()=> play(6)} />
    <Square value={board[7]} handleClick={()=> play(7)} />
    <Square value={board[8]} handleClick={()=> play(8)} />

    </div>

    <button onClick={reset}>
      Reset Game
    </button>

    </>
  );


  function getWinner(){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let i=0;i<lines.length;i++){
      const [a, b, c] = lines[i];
      if(!board[a] || !board[b] || !board[c]){
        continue;
      }
      if(board[a] == board[b] && board[a] == board[c]){
        return board[a];
      }
    }

    return null;

  }
}
