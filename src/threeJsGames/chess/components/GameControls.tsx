import { useTranslation } from "react-i18next";

interface GameControlsProps {
    newGame: () => void;
}

const GameControls = ({ newGame }: GameControlsProps) => {
    const { t } = useTranslation();

    return (
        <section className="p-4 space-y-3">
            <button
                className="w-full py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-colors"
                type="button"
                onClick={newGame}
            >
                {t("Chess.NewGame")}
            </button>
        </section>
    );
};

export default GameControls;

