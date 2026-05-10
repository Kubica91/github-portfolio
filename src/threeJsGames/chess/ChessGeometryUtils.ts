import {
    BoxGeometry,
    ConeGeometry,
    CylinderGeometry,
    EdgesGeometry,
    Group,
    Mesh,
    MeshStandardMaterial,
    SphereGeometry,
} from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { isEnemy, isInBounds, pieceAt } from "../ChessMoveUtils";

export type ChessPieceColor = "white" | "black";
export type ChessPieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
export type ChessGroup = ChessPieceGroup;
export type BoardState = (ChessPieceGroup | null)[][];

export interface ChessPosition {
    x: number;
    y: number;
}

export const positionToAlgebraic = (p: ChessPosition): string => String.fromCharCode(97 + p.x).toUpperCase() + (p.y + 1);

export abstract class ChessPieceGroup extends Group {
    chessColor: ChessPieceColor;
    chessPosition: ChessPosition;
    hasMoved: boolean = false;

    constructor(chessColor: ChessPieceColor, chessPosition: ChessPosition) {
        super();
        this.chessColor = chessColor;
        this.chessPosition = chessPosition;
    }

    abstract getType(): ChessPieceType;

    abstract getPossibleMoves(board: BoardState): ChessPosition[];

    canMoveTo(target: ChessPosition, board: BoardState): boolean {
        return this.getPossibleMoves(board).some((m) => m.x === target.x && m.y === target.y);
    }

    getAlgebraicPosition(): string {
        return positionToAlgebraic(this.chessPosition);
    }

    getDisplayName(): string {
        const type = this.getType();
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
}

export class PawnGroup extends ChessPieceGroup {
    getType(): ChessPieceType {
        return "pawn";
    }

    getPossibleMoves(board: BoardState): ChessPosition[] {
        const moves: ChessPosition[] = [];
        const dir = this.chessColor === "white" ? 1 : -1;
        const startY = this.chessColor === "white" ? 1 : 6;
        const { x, y } = this.chessPosition;

        const oneStep = { x, y: y + dir };
        if (isInBounds(oneStep) && pieceAt(board, oneStep) === null) {
            moves.push(oneStep);

            const twoStep = { x, y: y + 2 * dir };
            if (y === startY && pieceAt(board, twoStep) === null) moves.push(twoStep);
        }

        for (const dx of [-1, 1]) {
            const cap = { x: x + dx, y: y + dir };
            if (!isInBounds(cap)) continue;

            const occupant = pieceAt(board, cap);
            if (isEnemy(occupant, this.chessColor)) moves.push(cap);
        }

        return moves;
    }
}

export class RookGroup extends ChessPieceGroup {
    getType(): ChessPieceType {
        return "rook";
    }

    getPossibleMoves(board: BoardState): ChessPosition[] {
        const moves: ChessPosition[] = [];
        const { x, y } = this.chessPosition;

        const directions = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
        ];

        for (let i = 0; i < directions.length; i++) {
            const { dx, dy } = directions[i];

            for (let j = 1; j < 8; j++) {
                const target = { x: x + dx * j, y: y + dy * j };
                if (!isInBounds(target)) break;

                const occupant = pieceAt(board, target);
                if (isEnemy(occupant, this.chessColor)) {
                    moves.push(target);
                    break;
                }

                if (occupant !== null) break;

                moves.push(target);
            }
        }

        return moves;
    }
}

export class KnightGroup extends ChessPieceGroup {
    getType(): ChessPieceType {
        return "knight";
    }

    getPossibleMoves(board: BoardState): ChessPosition[] {
        const moves: ChessPosition[] = [];
        const { x, y } = this.chessPosition;

        const positions = [
            { dx: -1, dy: 2 },
            { dx: 1, dy: 2 },
            { dx: -2, dy: 1 },
            { dx: -2, dy: -1 },
            { dx: 2, dy: 1 },
            { dx: 2, dy: -1 },
            { dx: -1, dy: -2 },
            { dx: 1, dy: -2 },
        ];

        for (let i = 0; i < positions.length; i++) {
            const { dx, dy } = positions[i];

            const target = { x: x + dx, y: y + dy };
            if (!isInBounds(target)) continue;

            const occupant = pieceAt(board, target);
            if (isEnemy(occupant, this.chessColor)) {
                moves.push(target);
                continue;
            }

            if (occupant !== null) continue;

            moves.push(target);
        }

        return moves;
    }
}

export class BishopGroup extends ChessPieceGroup {
    getType(): ChessPieceType {
        return "bishop";
    }

    getPossibleMoves(board: BoardState): ChessPosition[] {
        const moves: ChessPosition[] = [];
        const { x, y } = this.chessPosition;

        const directions = [
            { dx: -1, dy: 1 },
            { dx: -1, dy: -1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: -1 },
        ];

        for (let i = 0; i < directions.length; i++) {
            const { dx, dy } = directions[i];

            for (let j = 1; j < 8; j++) {
                const target = { x: x + dx * j, y: y + dy * j };
                if (!isInBounds(target)) break;

                const occupant = pieceAt(board, target);
                if (isEnemy(occupant, this.chessColor)) {
                    moves.push(target);
                    break;
                }

                if (occupant !== null) break;

                moves.push(target);
            }
        }

        return moves;
    }
}

export class QueenGroup extends ChessPieceGroup {
    getType(): ChessPieceType {
        return "queen";
    }

    getPossibleMoves(board: BoardState): ChessPosition[] {
        const moves: ChessPosition[] = [];
        const { x, y } = this.chessPosition;

        const directions = [
            { dx: -1, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: -1, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 1, dy: -1 },
        ];

        for (let i = 0; i < directions.length; i++) {
            const { dx, dy } = directions[i];

            for (let j = 1; j < 8; j++) {
                const target = { x: x + dx * j, y: y + dy * j };
                if (!isInBounds(target)) break;

                const occupant = pieceAt(board, target);
                if (isEnemy(occupant, this.chessColor)) {
                    moves.push(target);
                    break;
                }

                if (occupant !== null) break;

                moves.push(target);
            }
        }

        return moves;
    }
}

export class KingGroup extends ChessPieceGroup {
    getType(): ChessPieceType {
        return "king";
    }

    getPossibleMoves(board: BoardState): ChessPosition[] {
        const moves: ChessPosition[] = [];
        const { x, y } = this.chessPosition;

        const directions = [
            { dx: -1, dy: 1 },
            { dx: -1, dy: 0 },
            { dx: -1, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
            { dx: 1, dy: 1 },
            { dx: 1, dy: 0 },
            { dx: 1, dy: -1 },
        ];

        for (let i = 0; i < directions.length; i++) {
            const { dx, dy } = directions[i];

            const target = { x: x + dx, y: y + dy };
            if (!isInBounds(target)) continue;

            const occupant = pieceAt(board, target);
            if (isEnemy(occupant, this.chessColor)) {
                moves.push(target);
                continue;
            }

            if (occupant !== null) continue;

            moves.push(target);
        }

        return moves;
    }
}

export const EDGE_DEFAULT_COLOR = 0x000000;
export const EDGE_LINEWIDTH = 0.015;
export const SQUARE_SIZE = 1.2;
export const EDGE_HIGHLIGHT_COLOR = 0xffd54a;
export const SELECTED_EMISSIVE_COLOR = 0xff7043;

const whiteMaterial = new MeshStandardMaterial({ color: 0xf5f5f5 });
const blackMaterial = new MeshStandardMaterial({ color: 0x202020 });

const getMaterial = (chessColor: ChessPieceColor) => (chessColor === "white" ? whiteMaterial : blackMaterial);

const addAndShadow = (group: Group, mesh: Mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const edgesGeo = new EdgesGeometry(mesh.geometry, 25);
    const lineGeo = new LineSegmentsGeometry().fromEdgesGeometry(edgesGeo);
    const edges = new LineSegments2(
        lineGeo,
        new LineMaterial({
            color: EDGE_DEFAULT_COLOR,
            linewidth: EDGE_LINEWIDTH,
            worldUnits: true,
        })
    );
    edges.raycast = () => {};
    mesh.add(edges);

    group.add(mesh);
};

export const GetPawnGeometry = (chessColor: ChessPieceColor, chessPosition: ChessPosition) => {
    const pawn = new PawnGroup(chessColor, chessPosition);
    const material = getMaterial(chessColor).clone();

    const base = new Mesh(new CylinderGeometry(0.32, 0.38, 0.16, 32), material);
    base.position.y = 0.08;
    addAndShadow(pawn, base);

    const body = new Mesh(new CylinderGeometry(0.16, 0.22, 0.5, 32), material);
    body.position.y = 0.41;
    addAndShadow(pawn, body);

    const neck = new Mesh(new CylinderGeometry(0.09, 0.09, 0.09, 32), material);
    neck.position.y = 0.7;
    addAndShadow(pawn, neck);

    const head = new Mesh(new SphereGeometry(0.13, 32, 32), material);
    head.position.y = 0.87;
    addAndShadow(pawn, head);

    const top = new Mesh(new ConeGeometry(0.07, 0.09, 32), material);
    top.position.y = 1.01;
    addAndShadow(pawn, top);

    return pawn;
};

export const GetRookGeometry = (chessColor: ChessPieceColor, chessPosition: ChessPosition) => {
    const rook = new RookGroup(chessColor, chessPosition);
    const material = getMaterial(chessColor).clone();

    const base = new Mesh(new CylinderGeometry(0.36, 0.44, 0.18, 32), material);
    base.position.y = 0.09;
    addAndShadow(rook, base);

    const body = new Mesh(new CylinderGeometry(0.21, 0.29, 0.65, 32), material);
    body.position.y = 0.51;
    addAndShadow(rook, body);

    const topRing = new Mesh(new CylinderGeometry(0.26, 0.26, 0.11, 32), material);
    topRing.position.y = 0.93;
    addAndShadow(rook, topRing);

    const blockGeometry = new CylinderGeometry(0.06, 0.06, 0.13, 8);
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;

        const block = new Mesh(blockGeometry, material);
        block.position.x = Math.cos(angle) * 0.19;
        block.position.z = Math.sin(angle) * 0.19;
        block.position.y = 1.01;
        addAndShadow(rook, block);
    }
    return rook;
};

export const GetKnightGeometry = (chessColor: ChessPieceColor, chessPosition: ChessPosition) => {
    const knight = new KnightGroup(chessColor, chessPosition);
    const material = getMaterial(chessColor).clone();

    const base = new Mesh(new CylinderGeometry(0.38, 0.46, 0.19, 32), material);
    base.position.y = 0.095;
    addAndShadow(knight, base);

    const body = new Mesh(new CylinderGeometry(0.23, 0.31, 0.7, 32), material);
    body.position.y = 0.54;
    addAndShadow(knight, body);

    const head = new Mesh(new CylinderGeometry(0.14, 0.19, 0.38, 32), material);
    head.position.y = 1.08;
    head.position.x = 0.15;
    head.rotation.z = Math.PI / 6;
    addAndShadow(knight, head);

    const ear = new Mesh(new ConeGeometry(0.06, 0.14, 16), material);
    ear.position.y = 1.32;
    ear.position.x = 0.21;
    addAndShadow(knight, ear);

    knight.rotation.y = chessColor === "white" ? Math.PI / 2 : -Math.PI / 2;
    return knight;
};

export const GetBishopGeometry = (chessColor: ChessPieceColor, chessPosition: ChessPosition) => {
    const bishop = new BishopGroup(chessColor, chessPosition);
    const material = getMaterial(chessColor).clone();

    const base = new Mesh(new CylinderGeometry(0.39, 0.48, 0.19, 32), material);
    base.position.y = 0.095;
    addAndShadow(bishop, base);

    const body = new Mesh(new CylinderGeometry(0.24, 0.33, 0.75, 32), material);
    body.position.y = 0.57;
    addAndShadow(bishop, body);

    const neck = new Mesh(new CylinderGeometry(0.12, 0.12, 0.12, 32), material);
    neck.position.y = 0.99;
    addAndShadow(bishop, neck);

    const head = new Mesh(new SphereGeometry(0.19, 32, 32), material);
    head.position.y = 1.22;
    addAndShadow(bishop, head);

    const tip = new Mesh(new ConeGeometry(0.07, 0.28, 24), material);
    tip.position.y = 1.41;
    addAndShadow(bishop, tip);

    const slit = new Mesh(new ConeGeometry(0.03, 0.22, 16), material);
    slit.position.y = 1.28;
    slit.rotation.z = Math.PI / 2;
    addAndShadow(bishop, slit);

    return bishop;
};

export const GetQueenGeometry = (chessColor: ChessPieceColor, chessPosition: ChessPosition) => {
    const queen = new QueenGroup(chessColor, chessPosition);
    const material = getMaterial(chessColor).clone();

    const base = new Mesh(new CylinderGeometry(0.41, 0.52, 0.21, 32), material);
    base.position.y = 0.105;
    addAndShadow(queen, base);

    const body = new Mesh(new CylinderGeometry(0.28, 0.39, 0.88, 32), material);
    body.position.y = 0.65;
    addAndShadow(queen, body);

    const neck = new Mesh(new CylinderGeometry(0.14, 0.14, 0.14, 32), material);
    neck.position.y = 1.13;
    addAndShadow(queen, neck);

    const head = new Mesh(new SphereGeometry(0.21, 32, 32), material);
    head.position.y = 1.36;
    addAndShadow(queen, head);

    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;

        const cone = new Mesh(new ConeGeometry(0.045, 0.17, 16), material);
        cone.position.x = Math.cos(angle) * 0.19;
        cone.position.z = Math.sin(angle) * 0.19;
        cone.position.y = 1.54;
        addAndShadow(queen, cone);

        const ball = new Mesh(new SphereGeometry(0.025, 16, 16), material);
        ball.position.x = Math.cos(angle) * 0.19;
        ball.position.z = Math.sin(angle) * 0.19;
        ball.position.y = 1.64;
        addAndShadow(queen, ball);
    }

    return queen;
};

export const GetKingGeometry = (chessColor: ChessPieceColor, chessPosition: ChessPosition) => {
    const king = new KingGroup(chessColor, chessPosition);
    const material = getMaterial(chessColor).clone();

    const base = new Mesh(new CylinderGeometry(0.44, 0.56, 0.24, 32), material);
    base.position.y = 0.12;
    addAndShadow(king, base);

    const body = new Mesh(new CylinderGeometry(0.31, 0.43, 1.02, 32), material);
    body.position.y = 0.73;
    addAndShadow(king, body);

    const neck = new Mesh(new CylinderGeometry(0.16, 0.16, 0.16, 32), material);
    neck.position.y = 1.24;
    addAndShadow(king, neck);

    const head = new Mesh(new SphereGeometry(0.23, 32, 32), material);
    head.position.y = 1.49;
    addAndShadow(king, head);

    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;

        const spike = new Mesh(new ConeGeometry(0.055, 0.19, 16), material);
        spike.position.x = Math.cos(angle) * 0.21;
        spike.position.z = Math.sin(angle) * 0.21;
        spike.position.y = 1.68;
        addAndShadow(king, spike);

        const ball = new Mesh(new SphereGeometry(0.03, 16, 16), material);
        ball.position.x = Math.cos(angle) * 0.21;
        ball.position.z = Math.sin(angle) * 0.21;
        ball.position.y = 1.8;
        addAndShadow(king, ball);
    }

    const crossVert = new Mesh(new CylinderGeometry(0.04, 0.04, 0.48, 16), material);
    crossVert.position.y = 1.8;
    addAndShadow(king, crossVert);

    const crossHorz = new Mesh(new CylinderGeometry(0.04, 0.04, 0.16, 16), material);
    crossHorz.position.y = 1.93;
    crossHorz.rotation.z = Math.PI / 2;
    addAndShadow(king, crossHorz);

    return king;
};

export const GetChessboardGeometry = async () => {
    const boardSize = 8 * SQUARE_SIZE;
    const board = new Group();

    const whiteMat = new MeshStandardMaterial({ color: 0xfafafa });
    const blackMat = new MeshStandardMaterial({ color: 0x222222 });

    for (let x = 0; x < 8; x++) {
        for (let z = 0; z < 8; z++) {
            const isWhite = (x + z) % 2 === 0;
            const mat = isWhite ? whiteMat : blackMat;

            const square = new Mesh(new BoxGeometry(SQUARE_SIZE, 0.06, SQUARE_SIZE), mat);
            square.position.x = (x - 3.5) * SQUARE_SIZE;
            square.position.z = (z - 3.5) * SQUARE_SIZE;
            square.position.y = 0.03;
            square.receiveShadow = true;
            board.add(square);
        }
    }

    const base = new Mesh(
        new BoxGeometry(boardSize + 0.6, 0.08, boardSize + 0.6),
        new MeshStandardMaterial({ color: 0x333333 })
    );
    base.position.y = -0.04;
    base.receiveShadow = true;
    board.add(base);

    const loader = new FontLoader();
    const font = await loader.loadAsync("/github-portfolio/fonts/gentilis_regular.typeface.json");

    const textMat = new MeshStandardMaterial({ color: 0xfafafa });
    const textSize = 0.18;
    const textDepth = 0.01;

    for (let x = 0; x < 8; x++) {
        const letter = String.fromCharCode(97 + x);

        const textGeo = new TextGeometry(letter.toUpperCase(), {
            font: font,
            size: textSize,
            depth: textDepth,
        });

        const meshTop = new Mesh(textGeo, textMat);
        meshTop.position.x = -4 * SQUARE_SIZE + SQUARE_SIZE / 2 + x * SQUARE_SIZE + textSize / 2;
        meshTop.position.z = -4 * SQUARE_SIZE - textSize - 0.05;
        meshTop.rotation.x = -Math.PI / 2;
        meshTop.rotation.z = Math.PI;
        board.add(meshTop);

        const meshBottom = new Mesh(textGeo, textMat);
        meshBottom.position.x = -4 * SQUARE_SIZE + SQUARE_SIZE / 2 + x * SQUARE_SIZE - textSize / 2;
        meshBottom.position.z = 4 * SQUARE_SIZE + textSize + 0.05;
        meshBottom.rotation.x = -Math.PI / 2;
        board.add(meshBottom);
    }

    for (let z = 0; z < 8; z++) {
        const number = (z + 1).toString();

        const textGeo = new TextGeometry(number.toUpperCase(), {
            font: font,
            size: textSize,
            depth: textDepth,
        });

        const meshLeft = new Mesh(textGeo, textMat);
        meshLeft.position.x = -4 * SQUARE_SIZE - textSize - 0.05;
        meshLeft.position.z = 4 * SQUARE_SIZE - SQUARE_SIZE / 2 - z * SQUARE_SIZE + textSize / 2;
        meshLeft.rotation.x = -Math.PI / 2;
        board.add(meshLeft);

        const meshRight = new Mesh(textGeo, textMat);
        meshRight.position.x = 4 * SQUARE_SIZE + textSize + 0.05;
        meshRight.position.z = 4 * SQUARE_SIZE - SQUARE_SIZE / 2 - z * SQUARE_SIZE - textSize / 2;
        meshRight.rotation.x = -Math.PI / 2;
        meshRight.rotation.z = -Math.PI;
        board.add(meshRight);
    }

    return board;
};
