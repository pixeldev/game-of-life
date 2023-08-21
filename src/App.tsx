import React, {
	useRef,
	useState
} from "react";
import { Cell } from "./board/Cell.tsx";
import { calculateNextBoard } from "./board/Game.ts";

export const rows: number = 71;
export const columns: number = 30;

type GameData = {
	playing: boolean;
	intervalId: number;
}

function App() {
	const momentsRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
	const delayRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

	const [ board, setBoard ] = useState(() => {
		return Array(rows)
			.fill(0)
			.map(() => {
				return Array(columns)
					.fill(0)
					.map(() => {
						return false;
					});
			});
	});

	const [ gameData, setGameData ] = useState<GameData>({
		playing: false,
		intervalId: 0
	});

	const startGame = (): void => {
		if (gameData.playing) {
			clearInterval(gameData.intervalId);
			setGameData({
				playing: false,
				intervalId: 0
			});
			return;
		}
		let moments: number = momentsRef.current?.valueAsNumber || 1;
		const delayBetweenMoments: number = delayRef.current?.valueAsNumber || 50;
		const intervalId: number = setInterval(async (): Promise<void> => {
			if (moments === 0) {
				clearInterval(gameData.intervalId);
				setGameData({
					playing: false,
					intervalId: 0
				});
			} else {
				setBoard((board: boolean[][]) => calculateNextBoard(board));
			}
		}, delayBetweenMoments);
		setGameData({
			playing: true,
			intervalId
		});
	};

	const updateCell = (row: number, column: number, isAlive: boolean) => {
		setBoard((board: boolean[][]) => {
			const newBoard: boolean[][] = [ ...board ];
			newBoard[row][column] = isAlive;
			return newBoard;
		});
	};

	return (
		<main className="game">
			<h1>Game of Life</h1>
			<div key="board" className="board">
				{
					board.map((column: boolean[], rowIndex: number) => (
						<div key={ `row-${ rowIndex }` } className="row">
							{
								column.map((_: boolean, columnIndex: number) => <Cell key={ `${ rowIndex },${ columnIndex }` }
								                                                      updateBoard={ updateCell }
								                                                      board={ board }
								                                                      row={ rowIndex }
								                                                      column={ columnIndex }/>)
							}
						</div>
					))
				}
			</div>
			<span className="moments">
				<strong>Number of moments</strong>
				<input ref={ momentsRef } type="number" id="moments" name="moments" min="1" placeholder="1"/>
			</span>
			<span className="delay">
				<strong>Delay between moments (ms)</strong>
				<input ref={ delayRef } type="number" id="delay" name="delay" min="50" placeholder="50"/>
			</span>
			<button onClick={ startGame }>{ gameData.playing ? "Stop" : "Play" }</button>
		</main>
	);
}

export default App;