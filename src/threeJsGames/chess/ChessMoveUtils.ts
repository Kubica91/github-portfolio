import {
    BoardState,
    ChessGroup,
    ChessPieceColor,
    ChessPieceGroup,
    ChessPieceType,
    ChessPosition,
} from "./ChessGeometryUtils";

export interface ChessMoveHistory {
    pieceType: ChessPieceType;
    color: ChessPieceColor;
    from: ChessPosition;
    to: ChessPosition;
    isCapture: boolean;
    isCheck: boolean;
    isCheckmate: boolean;
}

export const isInBounds = (p: ChessPosition) => p.x >= 0 && p.x < 8 && p.y >= 0 && p.y < 8;

export const pieceAt = (board: BoardState, p: ChessPosition): ChessPieceGroup | null =>
    isInBounds(p) ? board[p.y][p.x] : null;

export const isEnemy = (target: ChessPieceGroup | null, chessColor: ChessPieceColor): boolean => {
    return target !== null && target.chessColor !== chessColor;
};

export const isPromotion = (piece: ChessGroup, to: ChessPosition): boolean =>
    piece.getType() === "pawn" &&
    ((piece.chessColor === "white" && to.y === 7) || (piece.chessColor === "black" && to.y === 0));

export const findKingPosition = (board: BoardState, color: ChessPieceColor): ChessPosition | null => {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const piece = board[y][x];

            if (piece && piece.chessColor === color && piece.getType() === "king") return { x, y };
        }
    }
    return null;
};

export const isSquareAttackedBy = (board: BoardState, pos: ChessPosition, attackerColor: ChessPieceColor): boolean => {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const piece = board[y][x];

            if (!piece || piece.chessColor !== attackerColor) continue;

            if (piece.getPossibleMoves(board).some((m) => m.x === pos.x && m.y === pos.y)) return true;
        }
    }
    return false;
};

export const isKingInCheck = (board: BoardState, color: ChessPieceColor): boolean => {
    const kingPos = findKingPosition(board, color);

    if (!kingPos) return false;

    const opponent: ChessPieceColor = color === "white" ? "black" : "white";
    return isSquareAttackedBy(board, kingPos, opponent);
};

export const simulateMove = (board: BoardState, from: ChessPosition, to: ChessPosition): BoardState => {
    const next = board.map((row) => [...row]);
    next[to.y][to.x] = next[from.y][from.x];
    next[from.y][from.x] = null;
    return next;
};

export const getLegalMovesForPiece = (piece: ChessPieceGroup, board: BoardState): ChessPosition[] => {
    return piece.getPossibleMoves(board).filter((to) => {
        const simulated = simulateMove(board, piece.chessPosition, to);

        return !isKingInCheck(simulated, piece.chessColor);
    });
};

export const hasAnyLegalMove = (board: BoardState, color: ChessPieceColor): boolean => {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const piece = board[y][x];

            if (!piece || piece.chessColor !== color) continue;

            if (getLegalMovesForPiece(piece, board).length > 0) return true;
        }
    }
    return false;
};

