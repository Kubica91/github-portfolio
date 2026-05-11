import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BoardState, ChessGroup, positionToAlgebraic } from "../ChessGeometryUtils";

interface SelectedPieceInfoProps {
    selectedPiece: ChessGroup | null;
    board: BoardState;
}

const SelectedPieceInfo = ({ selectedPiece, board }: SelectedPieceInfoProps) => {
    const { t } = useTranslation();

    const moves = useMemo(() => (selectedPiece ? selectedPiece.getPossibleMoves(board) : []), [selectedPiece, board]);

    return (
        <section className="border-b border-slate-700 p-4">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-3">{t("Chess.SelectedPiece")}</h3>

            {!selectedPiece ? (
                <div className="text-sm text-slate-500 italic py-4 text-center">{t("Chess.NoPieceSelected")}</div>
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
                            {t(`Chess.Pieces.${selectedPiece.getType()}`).charAt(0)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-base">{t(`Chess.Pieces.${selectedPiece.getType()}`)}</div>

                            <div className="text-xs text-slate-400">{t(`Chess.Color.${selectedPiece.chessColor}`)}</div>

                            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                                <span className="text-slate-400">{t("Chess.Position")}</span>

                                <span className="font-mono">{selectedPiece.getAlgebraicPosition()}</span>

                                <span className="text-slate-400">{t("Chess.PossibleMoves")}</span>

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

export default SelectedPieceInfo;

