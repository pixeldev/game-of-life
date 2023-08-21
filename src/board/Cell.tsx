import "./Cell.css";

export const Cell = ({
	updateBoard,
	board,
	row,
	column
}: {
	updateBoard: (row: number, column: number, isAlive: boolean) => void;
	board: boolean[][];
	row: number;
	column: number;
}) => {
	const isAlive: boolean = board[row][column];
	const className: string = isAlive ? "cell-alive" : "cell-dead";
	return (
		<div id={ `${ row }-${ column }` } className={ `cell ${ className }` } onClick={ () => {
			updateBoard(row, column, !isAlive);
		} }/>
	);
};