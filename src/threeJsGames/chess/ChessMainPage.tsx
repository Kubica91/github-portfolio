import { useCallback, useEffect, useRef, useState } from "react";
import { Group, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from "three";
import HorizontalSplitter from "../../components/HorizontalSplitter";
import { BoardState, ChessGroup, ChessPieceColor } from "./ChessGeometryUtils";
import { ChessMoveHistory } from "./ChessMoveUtils";
import {
    BuildBoardState,
    ClearHighlightedPiece,
    ClearSelectedPiece,
    GetPieceByRaycast,
    HighlightPiece,
    InitializeChessPieces,
    InitializeChessScene,
    SelectPiece,
} from "./ChessThreeJsUtils";
import ChessContent from "./components/ChessContent";

const ChessMainPage = () => {
    const [selectedPiece, setSelectedPiece] = useState<ChessGroup | null>(null);
    const [board, setBoard] = useState<BoardState>(() => Array.from({ length: 8 }, () => Array(8).fill(null)));
    const [playerTurn, setPlayerTurn] = useState<ChessPieceColor>("white");
    const [moveHistory, setMoveHistory] = useState<ChessMoveHistory[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const sceneRef = useRef<Scene | null>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const piecesGroupRef = useRef<Group | null>(null);
    const squaresGroupRef = useRef<Group | null>(null);
    const highlightGroupRef = useRef<ChessGroup | null>(null);

    useEffect(() => {
        const InitCanvas = async () => {
            if (!canvasRef.current || !containerRef.current) return;

            const { scene, camera, renderer, piecesGroup, squaresGroup } = await InitializeChessScene(
                canvasRef.current,
                containerRef.current
            );

            sceneRef.current = scene;
            cameraRef.current = camera;
            rendererRef.current = renderer;
            piecesGroupRef.current = piecesGroup;
            squaresGroupRef.current = squaresGroup;

            setBoard(BuildBoardState(piecesGroup));
        };

        InitCanvas();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

            if (rendererRef.current) {
                rendererRef.current.setAnimationLoop(null);
                rendererRef.current.dispose();
            }
        };
    }, []);

    const handleResize = () => {
        if (!rendererRef.current || !cameraRef.current || !containerRef.current) return;

        rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
    };

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!rendererRef.current || !cameraRef.current || !piecesGroupRef.current) return;

            const rect = rendererRef.current.domElement.getBoundingClientRect();
            const mouse = new Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );
            const raycaster = new Raycaster();
            raycaster.setFromCamera(mouse, cameraRef.current);

            const targetPiece = GetPieceByRaycast(piecesGroupRef.current, raycaster);

            if (targetPiece == highlightGroupRef.current) return;
            if (targetPiece && playerTurn !== targetPiece.chessColor) return;

            if (highlightGroupRef.current) ClearHighlightedPiece(highlightGroupRef.current);

            if (targetPiece) HighlightPiece(targetPiece);
            highlightGroupRef.current = targetPiece;
        },
        [playerTurn]
    );

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!rendererRef.current || !cameraRef.current || !piecesGroupRef.current || !squaresGroupRef.current) return;

            const rect = rendererRef.current.domElement.getBoundingClientRect();
            const mouse = new Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );
            const raycaster = new Raycaster();
            raycaster.setFromCamera(mouse, cameraRef.current);

            const targetPiece = GetPieceByRaycast(piecesGroupRef.current, raycaster);

            if (targetPiece && playerTurn === targetPiece.chessColor) {
                if (targetPiece === selectedPiece) return;

                if (selectedPiece) ClearSelectedPiece(selectedPiece);

                SelectPiece(targetPiece);
                setSelectedPiece(targetPiece);
                return;
            }

            if (targetPiece && selectedPiece && playerTurn !== targetPiece.chessColor) {
                const canMove = selectedPiece.canMoveTo(targetPiece.chessPosition, board);
                if (canMove) {
                    const from = { ...selectedPiece.chessPosition };
                    const to = { ...targetPiece.chessPosition };

                    targetPiece.removeFromParent();
                    selectedPiece.moveTo(to);

                    setBoard((prev) => {
                        const newBoard = prev.map((row) => [...row]);
                        newBoard[from.y][from.x] = null;
                        newBoard[to.y][to.x] = selectedPiece;
                        return newBoard;
                    });
                    setMoveHistory((prev) => [
                        ...prev,
                        {
                            pieceType: selectedPiece.getType(),
                            color: selectedPiece.chessColor,
                            from,
                            to,
                            isCapture: true,
                        },
                    ]);

                    ClearSelectedPiece(selectedPiece);
                    setSelectedPiece(null);

                    setPlayerTurn((prev) => (prev === "white" ? "black" : "white"));
                }
                return;
            }

            if (!selectedPiece) return;

            const targetSquare = GetPieceByRaycast(squaresGroupRef.current, raycaster);
            if (!targetSquare) return;

            const canMove = selectedPiece.canMoveTo(targetSquare.chessPosition, board);
            if (!canMove) return;

            const from = { ...selectedPiece.chessPosition };
            const to = { ...targetSquare.chessPosition };

            selectedPiece.moveTo(to);

            setBoard((prev) => {
                const newBoard = prev.map((row) => [...row]);
                newBoard[from.y][from.x] = null;
                newBoard[to.y][to.x] = selectedPiece;
                return newBoard;
            });
            setMoveHistory((prev) => [
                ...prev,
                {
                    pieceType: selectedPiece.getType(),
                    color: selectedPiece.chessColor,
                    from,
                    to,
                    isCapture: false,
                },
            ]);

            ClearSelectedPiece(selectedPiece);
            setSelectedPiece(null);

            setPlayerTurn((prev) => (prev === "white" ? "black" : "white"));
        },
        [selectedPiece, playerTurn, board]
    );

    const newGame = useCallback(() => {
        if (!piecesGroupRef.current) return;
        piecesGroupRef.current.clear();

        InitializeChessPieces(piecesGroupRef.current);
        setBoard(BuildBoardState(piecesGroupRef.current));
        setSelectedPiece(null);
        setPlayerTurn("white");
        setMoveHistory([]);
    }, []);

    return (
        <HorizontalSplitter
            startWidth={70}
            minWidth={30}
            maxWidth={90}
            onResize={handleResize}
        >
            <div
                className="w-full h-full overflow-hidden"
                ref={containerRef}
            >
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                    onMouseMove={handleMouseMove}
                    onClick={handleClick}
                />
            </div>

            <ChessContent
                selectedPiece={selectedPiece}
                board={board}
                moveHistory={moveHistory}
                newGame={newGame}
            />
        </HorizontalSplitter>
    );
};

export default ChessMainPage;
