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

    const isCheck = move.isCheck && !move.isCheckmate;
    const isMate = move.isCheckmate;

    return (
        <div
            className={`relative flex items-center gap-1.5 pl-2 pr-4 py-1 rounded font-mono text-xs min-w-0 overflow-hidden ${
                isWhite ? "bg-slate-100 text-slate-900" : "bg-slate-950 text-slate-100 border border-slate-700" }`}
        >
            {isMate && <span className="absolute left-0 inset-y-0 w-[3px] bg-red-500" />}
            {isCheck && <span className="absolute left-0 inset-y-0 w-[3px] bg-amber-400" />}

            <span
                className={`w-2 h-2 rounded-full shrink-0 border ${isWhite ? "border-slate-900 bg-white" : "border-slate-100 bg-black"}`}
            />

            <span className="truncate">{label}</span>

            {isMate && <span className="ml-auto shrink-0 font-bold text-red-500">#</span>}
            {isCheck && <span className="ml-auto shrink-0 font-bold text-amber-400">+</span>}

            {isMate && <span className="absolute right-0 inset-y-0 w-[3px] bg-red-500" />}
            {isCheck && <span className="absolute right-0 inset-y-0 w-[3px] bg-amber-400" />}
        </div>
    );
};

export default MoveCell;

