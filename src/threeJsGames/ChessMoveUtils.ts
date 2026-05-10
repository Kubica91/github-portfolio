import { BoardState, ChessPieceGroup, ChessPosition } from "./chess/ChessGeometryUtils";

export const isInBounds = (p: ChessPosition) => p.x >= 0 && p.x < 8 && p.y >= 0 && p.y < 8;

export const pieceAt = (board: BoardState, p: ChessPosition): ChessPieceGroup | null =>
    isInBounds(p) ? board[p.y][p.x] : null;

export const isEnemy = (target: ChessPieceGroup | null, chessColor: string): boolean => {
    return target !== null && target.chessColor !== chessColor;
};

export const isEmpty = (target: ChessPieceGroup | null): boolean => {
    return target === null;
};
