import { BoardState, ChessGroup } from "../ChessGeometryUtils";
import { ChessMoveHistory } from "../ChessMoveUtils";
import GameControls from "./GameControls";
import MoveHistory from "./MoveHistory";
import SelectedPieceInfo from "./SelectedPieceInfo";

interface ChessContentProps {
    selectedPiece: ChessGroup | null;
    board: BoardState;
    moveHistory: ChessMoveHistory[];
    newGame: () => void;
}

const ChessContent = ({ selectedPiece, board, moveHistory, newGame }: ChessContentProps) => {
    return (
        <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100">
            <SelectedPieceInfo
                selectedPiece={selectedPiece}
                board={board}
            />

            <MoveHistory moveHistory={moveHistory} />

            <GameControls newGame={newGame} />
        </div>
    );
};

export default ChessContent;

