import { useTranslation } from "react-i18next";
import { ChessPieceColor, PromotionPieceType } from "../threeJsGames/chess/ChessGeometryUtils";

interface PromotionDialogProps {
    isOpen: boolean;
    color: ChessPieceColor;
    onSelect: (piece: PromotionPieceType) => void;
}

const PromotionDialog = ({ isOpen, color, onSelect }: PromotionDialogProps) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    const pieces: PromotionPieceType[] = ["queen", "rook", "bishop", "knight"];

    const symbols: Record<ChessPieceColor, Record<PromotionPieceType, string>> = {
        white: { queen: "♕", rook: "♖", bishop: "♗", knight: "♘" },
        black: { queen: "♛", rook: "♜", bishop: "♝", knight: "♞" },
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl shadow-black/60 p-6 flex flex-col items-center gap-5">
                <div className="text-center">
                    <h2 className="text-slate-100 text-base font-semibold">{t("Chess.PromoteTitle")}</h2>

                    <p className="text-slate-400 text-xs mt-0.5">{t("Chess.PromoteSubtitle")}</p>
                </div>

                <div className="flex gap-3">
                    {pieces.map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => onSelect(type)}
                            className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl bg-slate-700 hover:bg-sky-700 border border-slate-600
                                hover:border-sky-500 text-slate-100 transition-colors cursor-pointer"
                        >
                            <span
                                className={`text-5xl leading-none select-none ${color === "white" ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : ""}`}
                            >
                                {symbols[color][type]}
                            </span>

                            <span className="text-xs font-medium text-slate-300">{t(`Chess.Pieces.${type}`)}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromotionDialog;

