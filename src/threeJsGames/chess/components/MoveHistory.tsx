import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ChessMoveHistory } from "../ChessMoveUtils";
import MoveCell from "./MoveCell";

interface MoveHistoryProps {
    moveHistory: ChessMoveHistory[];
}

interface MoveRow {
    white: ChessMoveHistory | null;
    black: ChessMoveHistory | null;
}

const MoveHistory = ({ moveHistory }: MoveHistoryProps) => {
    const { t } = useTranslation();

    const rows = useMemo(() => {
        const result: MoveRow[] = [];
        for (let i = 0; i < moveHistory.length; i += 2) {
            result.push({
                white: moveHistory[i] ?? null,
                black: moveHistory[i + 1] ?? null,
            });
        }
        return result;
    }, [moveHistory]);

    return (
        <section className="flex-1 flex flex-col min-h-0 border-b border-slate-700">
            <div className="px-4 pt-4 pb-2 flex items-baseline justify-between">
                <h3 className="text-xs uppercase tracking-wider text-slate-400">{t("Chess.MoveHistory")}</h3>

                {moveHistory.length > 0 && (
                    <span className="text-xs font-mono text-slate-500">
                        {t("Chess.MovesCount", { count: moveHistory.length })}
                    </span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
                {moveHistory.length === 0 ? (
                    <div className="text-sm text-slate-500 italic py-4 text-center">{t("Chess.NoMoves")}</div>
                ) : (
                    <ol className="space-y-1">
                        {rows.map((row, i) => (
                            <li
                                key={i}
                                className="grid grid-cols-[1.75rem_1fr_1fr] items-stretch gap-2"
                            >
                                <span className="text-xs text-slate-500 font-mono text-right pt-1.5 select-none">
                                    {i + 1}.
                                </span>

                                <MoveCell move={row.white} />

                                <MoveCell move={row.black} />
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </section>
    );
};

export default MoveHistory;

