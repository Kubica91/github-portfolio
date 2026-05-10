import { ChessGroup } from "../ChessGeometryUtils";

interface ChessContentProps {
    selectedPiece: ChessGroup | null;
}

const ChessContent = ({ selectedPiece }: ChessContentProps) => {
    console.log("Selected piece in ChessContent:", selectedPiece);
    return <div className="w-full h-full">{"xxx"}</div>;
};

export default ChessContent;
