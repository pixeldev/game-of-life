import {
	columns,
	rows
} from "../App.tsx";

export function calculateNextBoard(lastBoard: boolean[][]): boolean[][] {
	const nextBoard: boolean[][] = [];

	for (let i = 0; i < rows; i++) {
		nextBoard[i] = [];
		for (let j = 0; j < columns; j++) {
			nextBoard[i][j] = calculateNextCell(lastBoard, i, j);
		}
	}

	return nextBoard;
}

function calculateNextCell(lastBoard: boolean[][], i: number, j: number): boolean {
	const neighbors = countNeighbors(lastBoard, i, j);

	if (lastBoard[i][j]) {
		return neighbors === 2 || neighbors === 3;
	} else {
		return neighbors === 3;
	}
}

function countNeighbors(lastBoard: boolean[][], i: number, j: number): number {
	let neighbors = 0;

	for (let x = -1; x <= 1; x++) {
		for (let y = -1; y <= 1; y++) {

			if (x === 0 && y === 0) {
				continue;
			}

			const neighborI = i + x;
			const neighborJ = j + y;

			if (neighborI >= 0 && neighborI < rows && neighborJ >= 0 && neighborJ < columns) {
				neighbors += lastBoard[neighborI][neighborJ] ? 1 : 0;
			}
		}
	}

	return neighbors;
}