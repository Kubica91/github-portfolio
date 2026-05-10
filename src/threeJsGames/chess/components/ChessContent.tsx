import { BoardState, ChessGroup, positionToAlgebraic } from "../ChessGeometryUtils";

interface ChessContentProps {
    selectedPiece: ChessGroup | null;
    board: BoardState;
}

const ChessContent = ({ selectedPiece, board }: ChessContentProps) => {
    return (
        <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100">
            <SelectedPieceInfo
                selectedPiece={selectedPiece}
                board={board}
            />

            <MoveHistory />

            <GameControls />
        </div>
    );
};

const SelectedPieceInfo = ({ selectedPiece, board }: { selectedPiece: ChessGroup | null; board: BoardState }) => {
    const moves = selectedPiece ? selectedPiece.getPossibleMoves(board) : [];

    return (
        <section className="border-b border-slate-700 p-4">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-3">Selected piece</h3>

            {!selectedPiece ? (
                <div className="text-sm text-slate-500 italic py-4 text-center">No piece selected</div>
            ) : (
                <>
                    <div className="flex items-start gap-3">
                        <div
                            className={`w-12 h-12 rounded-md flex items-center justify-center text-lg font-bold shrink-0 ${
                                selectedPiece.chessColor === "white"
                                    ? "bg-slate-100 text-slate-900"
                                    : "bg-slate-950 text-slate-100 border border-slate-700"
                                }`}
                        >
                            {selectedPiece.getDisplayName().charAt(0)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-base">{selectedPiece.getDisplayName()}</div>

                            <div className="text-xs text-slate-400 capitalize">{selectedPiece.chessColor}</div>

                            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                                <span className="text-slate-400">Position</span>

                                <span className="font-mono">{selectedPiece.getAlgebraicPosition()}</span>

                                <span className="text-slate-400">Possible moves</span>

                                <span className="font-mono">{moves.length}</span>
                            </div>
                        </div>
                    </div>

                    {moves.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                            {moves.map((m) => {
                                const label = positionToAlgebraic(m);
                                return (
                                    <span
                                        key={label}
                                        className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-200"
                                    >
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

const MoveHistory = () => {
    return (
        <section className="flex-1 flex flex-col min-h-0 border-b border-slate-700">
            <div className="px-4 pt-4 pb-2">
                <h3 className="text-xs uppercase tracking-wider text-slate-400">Move history</h3>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="text-sm text-slate-500 italic py-4 text-center">No moves yet</div>
            </div>
        </section>
    );
};

const GameControls = () => {
    return (
        <section className="p-4 space-y-3">
            <button
                className="w-full py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-colors"
                type="button"
            >
                New game
            </button>
        </section>
    );
};

export default ChessContent;

