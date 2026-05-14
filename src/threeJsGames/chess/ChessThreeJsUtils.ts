import {
    AmbientLight,
    BoxGeometry,
    DirectionalLight,
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    PCFShadowMap,
    PerspectiveCamera,
    Raycaster,
    Scene,
    WebGLRenderer,
} from "three";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import {
    BLACK_PIECE_COLOR,
    BoardMesh,
    BoardState,
    ChessGroup,
    ChessPieceColor,
    ChessPieceGroup,
    ChessPosition,
    EDGE_DEFAULT_COLOR,
    EDGE_HIGHLIGHT_COLOR,
    getBishopGeometry,
    getChessboardGeometry,
    getKingGeometry,
    getKnightGeometry,
    getPawnGeometry,
    getQueenGeometry,
    getRookGeometry,
    MOVE_HIGHLIGHT_CAPTURE,
    MOVE_HIGHLIGHT_NORMAL,
    PromotionPieceType,
    SELECTED_PIECE_COLOR,
    SQUARE_SIZE,
    WHITE_PIECE_COLOR,
} from "./ChessGeometryUtils";

export const buildBoardState = (piecesGroup: Group): BoardState => {
    const board: BoardState = Array.from({ length: 8 }, () => Array<ChessPieceGroup | null>(8).fill(null));
    for (const child of piecesGroup.children) {
        if (child instanceof ChessPieceGroup) {
            const { x, y } = child.chessPosition;
            board[y][x] = child;
        }
    }
    return board;
};

export const initializeChessPieces = (piecesGroup: Group) => {
    while (piecesGroup.children.length > 0) {
        piecesGroup.remove(piecesGroup.children[0]);
    }

    const placePiece = (piece: Group, x: number, y: number) => {
        piece.position.x = (x - 3.5) * SQUARE_SIZE;
        piece.position.z = (3.5 - y) * SQUARE_SIZE;
        piecesGroup.add(piece);
    };

    const backRankFactories = [
        getRookGeometry,
        getKnightGeometry,
        getBishopGeometry,
        getQueenGeometry,
        getKingGeometry,
        getBishopGeometry,
        getKnightGeometry,
        getRookGeometry,
    ];

    for (let x = 0; x < 8; x++) {
        const whiteBack = backRankFactories[x]("white", { x, y: 0 });
        placePiece(whiteBack, x, 0);

        const whitePawn = getPawnGeometry("white", { x, y: 1 });
        placePiece(whitePawn, x, 1);

        const blackPawn = getPawnGeometry("black", { x, y: 6 });
        placePiece(blackPawn, x, 6);

        const blackBack = backRankFactories[x]("black", { x, y: 7 });
        placePiece(blackBack, x, 7);
    }
};

export const initializeChessScene = async (canvas: HTMLCanvasElement, container: HTMLDivElement) => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

    const renderer = new WebGLRenderer({ canvas: canvas });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setAnimationLoop(animate);

    const piecesGroup = new Group();
    initializeChessPieces(piecesGroup);
    scene.add(piecesGroup);

    const highlightsGroup = new Group();
    scene.add(highlightsGroup);

    const { board, squaresGroup } = await getChessboardGeometry();
    scene.add(board);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 5, 2);
    dirLight.target = piecesGroup;
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;

    fitCameraToBoard(camera, container.clientWidth, container.clientHeight);

    function animate() {
        renderer.render(scene, camera);
    }

    return { scene, camera, renderer, piecesGroup, squaresGroup, highlightsGroup };
};

export const fitCameraToBoard = (camera: PerspectiveCamera, width: number, height: number) => {
    const aspect = width / height;
    const fitSize = 8 * SQUARE_SIZE + 2.2;

    const vHalfFovTan = Math.tan((camera.fov * Math.PI) / 360);

    const heightForVertical = fitSize / (2 * vHalfFovTan);
    const heightForHorizontal = fitSize / (2 * vHalfFovTan * aspect);
    const cameraHeight = Math.max(heightForVertical, heightForHorizontal);

    camera.aspect = aspect;
    camera.position.set(0, cameraHeight, 0);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
};

export const getPieceByRaycast = (piecesGroup: Group, raycaster: Raycaster): ChessGroup | null => {
    const intersects = raycaster.intersectObjects(piecesGroup.children, true);
    if (intersects.length > 0) {
        let intersectedObject = intersects[0].object;

        while (intersectedObject.parent && intersectedObject.parent !== piecesGroup) {
            intersectedObject = intersectedObject.parent;
        }

        if (intersectedObject.parent === piecesGroup) {
            return intersectedObject as ChessGroup;
        }
    }

    return null;
};

export const getSquareByRaycast = (squaresGroup: Group, raycaster: Raycaster): ChessPosition | null => {
    const intersects = raycaster.intersectObjects(squaresGroup.children, false);
    if (intersects.length === 0) return null;

    const hit = intersects[0].object;
    if (!(hit instanceof BoardMesh)) return null;

    return hit.chessPosition;
};

export const highlightPiece = (piece: ChessGroup) => {
    piece.traverse((child) => {
        if (!(child instanceof LineSegments2)) return;
        (child.material as LineMaterial).color.setHex(EDGE_HIGHLIGHT_COLOR);
    });
};

export const clearHighlightedPiece = (piece: ChessGroup) => {
    piece.traverse((child) => {
        if (!(child instanceof LineSegments2)) return;
        (child.material as LineMaterial).color.setHex(EDGE_DEFAULT_COLOR);
    });
};

export const selectPiece = (piece: ChessGroup) => {
    piece.traverse((child) => {
        if (child instanceof LineSegments2) return;
        const mesh = child as Mesh;
        if (!mesh.isMesh) return;

        (mesh.material as MeshStandardMaterial).color.setHex(
            piece.chessColor === "white" ? SELECTED_PIECE_COLOR : SELECTED_PIECE_COLOR
        );
    });
};

export const clearSelectedPiece = (piece: ChessGroup) => {
    piece.traverse((child) => {
        if (child instanceof LineSegments2) return;
        const mesh = child as Mesh;
        if (!mesh.isMesh) return;

        (mesh.material as MeshStandardMaterial).color.setHex(
            piece.chessColor === "white" ? WHITE_PIECE_COLOR : BLACK_PIECE_COLOR
        );
    });
};

export const showMoveHighlights = (
    moves: ChessPosition[],
    board: BoardState,
    pieceColor: ChessPieceColor,
    highlightsGroup: Group
) => {
    clearMoveHighlights(highlightsGroup);

    for (const move of moves) {
        const occupant = board[move.y][move.x];
        const isCapture = occupant !== null && occupant.chessColor !== pieceColor;
        const color = isCapture ? MOVE_HIGHLIGHT_CAPTURE : MOVE_HIGHLIGHT_NORMAL;

        const geo = new BoxGeometry(SQUARE_SIZE - 0.06, 0.025, SQUARE_SIZE - 0.06);
        const mat = new MeshBasicMaterial({ color });
        const mesh = new Mesh(geo, mat);
        mesh.position.set((move.x - 3.5) * SQUARE_SIZE, 0.075, (7 - move.y - 3.5) * SQUARE_SIZE);
        highlightsGroup.add(mesh);
    }
};

export const clearMoveHighlights = (highlightsGroup: Group) => {
    while (highlightsGroup.children.length > 0) {
        highlightsGroup.remove(highlightsGroup.children[0]);
    }
};

export const promotePawn = (pawn: ChessPieceGroup, newType: PromotionPieceType, piecesGroup: Group): ChessPieceGroup => {
    const PROMOTION_FACTORIES: Record<
        PromotionPieceType,
        typeof getQueenGeometry | typeof getRookGeometry | typeof getBishopGeometry | typeof getKnightGeometry
    > = {
        queen: getQueenGeometry,
        rook: getRookGeometry,
        bishop: getBishopGeometry,
        knight: getKnightGeometry,
    };

    const pos = { ...pawn.chessPosition };
    pawn.removeFromParent();

    const newPiece = PROMOTION_FACTORIES[newType](pawn.chessColor, pos);
    newPiece.position.set((pos.x - 3.5) * SQUARE_SIZE, 0, (7 - pos.y - 3.5) * SQUARE_SIZE);
    newPiece.hasMoved = true;
    piecesGroup.add(newPiece);

    return newPiece;
};
