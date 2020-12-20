import { useState, useEffect } from "react"

export default function BoardGame() {

  const boardPopulate = Array(9).fill("");

  const [board, setBoard] = useState(boardPopulate)
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    verifyWinner()
  }, [board])

  function handleSquareClick(squareIndex) {
    if (board[squareIndex] !== "") {
      console.log("Esse lugar já está marcado.")
      return null;
    }

    setBoard(board.map((item, index) => index === squareIndex ? currentPlayer : item))

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")

  }

  function verifyWinner() {
    const winnerConditition = [
      //Horizontal
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      //Vertical
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      //Diagonal
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],

    ];

    winnerConditition.forEach(squares => {
      console.log(squares)
      if (squares.every(square => square === "O")) {
        setWinner("O")
        console.log("O venceu")
      }

      if (squares.every(square => square === "X")) {
        setWinner("X")
        console.log("X venceu")
      }
    })

    verifyDraw();
  }

  function verifyDraw() {
    if (board.every(item => item !== ""))
      setWinner("D")
  }

  function resetGame() {
    setCurrentPlayer("O");
    setBoard(boardPopulate);
    setWinner(null);
  }

  return (
    <>
      <main className={winner ? `win-opacity` : `board`}>
        {board.map((item, squareIndex) => (
          <div onClick={() => handleSquareClick(squareIndex)} className={`squares ${item}`} key={squareIndex}> {item} </div>
        ))}
      </main>

      <div className="win-container">
        {winner && (
          <div className="footer">
            {winner === "D" ? <h1 className="draw">Empate</h1> : <> <h1 className="winner">O vencedor foi o</h1> <h1 className={winner === "X" ? "winner-x" : "winner-o"}>{winner}</h1></>}
            <button onClick={resetGame} type="button">Recomeçar</button>
          </div>
        )}
      </div>
    </>
  )
}