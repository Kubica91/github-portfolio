import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { positionToAlgebraic } from "../ChessGeometryUtils";
import { ChessMoveHistory } from "../ChessMoveUtils";

interface MoveCellProps {
    move: ChessMoveHistory | null;
}

const MoveCell = ({ move }: MoveCellProps) => {
    const { t } = useTranslation();

    const isWhite = useMemo(() => move?.color === "white", [move?.color]);
    const label = useMemo(() => {
        if (!move) return "";

        const pieceName = t(`Chess.Pieces.${move.pieceType}`);
        const separator = move.isCapture ? "x" : ">";
        return `${pieceName} ${positionToAlgebraic(move.from)} ${separator} ${positionToAlgebraic(move.to)}`;
    }, [move, t]);

    if (!move) {
        return <div className="flex items-center justify-center text-slate-700 text-xs font-mono select-none">...</div>;
    }

    return (
        <div
            className={`flex items-center gap-1.5 px-2 py-1 rounded font-mono text-xs min-w-0 ${
                isWhite ? "bg-slate-100 text-slate-900" : "bg-slate-950 text-slate-100 border border-slate-700" }`}
        >
            <span className={`w-2 h-2 rounded-full shrink-0 border ${isWhite ? "border-slate-900" : "border-slate-100"}`} />

            <span className="truncate">{label}</span>
        </div>
    );
};

export default MoveCell;

