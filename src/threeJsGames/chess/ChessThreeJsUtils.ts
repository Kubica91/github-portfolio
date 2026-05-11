import {
    AmbientLight,
    DirectionalLight,
    Group,
    Mesh,
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
    BoardMesh,
    BoardState,
    ChessGroup,
    ChessPieceGroup,
    ChessPosition,
    EDGE_DEFAULT_COLOR,
    EDGE_HIGHLIGHT_COLOR,
    GetBishopGeometry,
    GetChessboardGeometry,
    GetKingGeometry,
    GetKnightGeometry,
    GetPawnGeometry,
    GetQueenGeometry,
    GetRookGeometry,
    SELECTED_EMISSIVE_COLOR,
    SQUARE_SIZE,
} from "./ChessGeometryUtils";

export const BuildBoardState = (piecesGroup: Group): BoardState => {
    const board: BoardState = Array.from({ length: 8 }, () => Array<ChessPieceGroup | null>(8).fill(null));
    for (const child of piecesGroup.children) {
        if (child instanceof ChessPieceGroup) {
            const { x, y } = child.chessPosition;
            board[y][x] = child;
        }
    }
    return board;
};

export const InitializeChessPieces = (piecesGroup: Group) => {
    while (piecesGroup.children.length > 0) {
        piecesGroup.remove(piecesGroup.children[0]);
    }

    const placePiece = (piece: Group, x: number, y: number) => {
        piece.position.x = (x - 3.5) * SQUARE_SIZE;
        piece.position.z = (3.5 - y) * SQUARE_SIZE;
        piecesGroup.add(piece);
    };

    const backRankFactories = [
        GetRookGeometry,
        GetKnightGeometry,
        GetBishopGeometry,
        GetQueenGeometry,
        GetKingGeometry,
        GetBishopGeometry,
        GetKnightGeometry,
        GetRookGeometry,
    ];

    for (let x = 0; x < 8; x++) {
        const whiteBack = backRankFactories[x]("white", { x, y: 0 });
        placePiece(whiteBack, x, 0);

        const whitePawn = GetPawnGeometry("white", { x, y: 1 });
        placePiece(whitePawn, x, 1);

        const blackPawn = GetPawnGeometry("black", { x, y: 6 });
        placePiece(blackPawn, x, 6);

        const blackBack = backRankFactories[x]("black", { x, y: 7 });
        placePiece(blackBack, x, 7);
    }
};

export const InitializeChessScene = async (canvas: HTMLCanvasElement, container: HTMLDivElement) => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

    const renderer = new WebGLRenderer({ canvas: canvas });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setAnimationLoop(animate);

    const piecesGroup = new Group();
    InitializeChessPieces(piecesGroup);
    scene.add(piecesGroup);

    const { board, squaresGroup } = await GetChessboardGeometry();
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

    camera.position.set(0, 8, 0);
    camera.lookAt(0, 0, 0);

    function animate() {
        renderer.render(scene, camera);
    }

    return { scene, camera, renderer, piecesGroup, squaresGroup };
};

export const GetPieceByRaycast = (piecesGroup: Group, raycaster: Raycaster): ChessGroup | null => {
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

export const GetSquareByRaycast = (squaresGroup: Group, raycaster: Raycaster): ChessPosition | null => {
    const intersects = raycaster.intersectObjects(squaresGroup.children, false);
    if (intersects.length === 0) return null;

    const hit = intersects[0].object;
    if (!(hit instanceof BoardMesh)) return null;

    return hit.chessPosition;
};

export const HighlightPiece = (piece: ChessGroup) => {
    piece.traverse((child) => {
        if (!(child instanceof LineSegments2)) return;
        (child.material as LineMaterial).color.setHex(EDGE_HIGHLIGHT_COLOR);
    });
};

export const ClearHighlightedPiece = (piece: ChessGroup) => {
    piece.traverse((child) => {
        if (!(child instanceof LineSegments2)) return;
        (child.material as LineMaterial).color.setHex(EDGE_DEFAULT_COLOR);
    });
};

export const SelectPiece = (piece: ChessGroup) => {
    piece.traverse((child) => {
        if (child instanceof LineSegments2) return;
        const mesh = child as Mesh;
        if (!mesh.isMesh) return;

        (mesh.material as MeshStandardMaterial).emissive.setHex(SELECTED_EMISSIVE_COLOR);
    });
};

export const ClearSelectedPiece = (piece: ChessGroup) => {
    piece.traverse((child) => {
        if (child instanceof LineSegments2) return;
        const mesh = child as Mesh;
        if (!mesh.isMesh) return;

        (mesh.material as MeshStandardMaterial).emissive.setHex(EDGE_DEFAULT_COLOR);
    });
};
