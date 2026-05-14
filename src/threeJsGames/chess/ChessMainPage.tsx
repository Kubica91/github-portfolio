import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Group, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from "three";
import HorizontalSplitter from "../../components/HorizontalSplitter";
import PromotionDialog from "../../components/PromotionDialog";
import { useDialog } from "../../hooks/useDialog";
import { BoardState, ChessGroup, ChessPieceColor, ChessPosition, PromotionPieceType } from "./ChessGeometryUtils";
import { ChessMoveHistory, getLegalMovesForPiece, hasAnyLegalMove, isKingInCheck, isPromotion } from "./ChessMoveUtils";
import {
    buildBoardState,
    clearHighlightedPiece,
    clearMoveHighlights,
    clearSelectedPiece,
    fitCameraToBoard,
    getPieceByRaycast,
    getSquareByRaycast,
    highlightPiece,
    initializeChessPieces,
    initializeChessScene,
    promotePawn,
    selectPiece,
    showMoveHighlights,
} from "./ChessThreeJsUtils";
import ChessContent from "./components/ChessContent";

const ChessMainPage = () => {
    const { t } = useTranslation();
    const [selectedPiece, setSelectedPiece] = useState<ChessGroup | null>(null);
    const [board, setBoard] = useState<BoardState>(() => Array.from({ length: 8 }, () => Array(8).fill(null)));
    const [playerTurn, setPlayerTurn] = useState<ChessPieceColor>("white");
    const [moveHistory, setMoveHistory] = useState<ChessMoveHistory[]>([]);
    const [isGameOver, setIsGameOver] = useState(false);

    const { isOpen: promotionOpen, open: openPromotion, resolve: resolvePromotion } = useDialog<PromotionPieceType>();
    const promotionColorRef = useRef<ChessPieceColor>("white");

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const sceneRef = useRef<Scene | null>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const piecesGroupRef = useRef<Group | null>(null);
    const squaresGroupRef = useRef<Group | null>(null);
    const highlightsGroupRef = useRef<Group | null>(null);
    const highlightGroupRef = useRef<ChessGroup | null>(null);

    useEffect(() => {
        const initCanvas = async () => {
            if (!canvasRef.current || !containerRef.current) return;

            const { scene, camera, renderer, piecesGroup, squaresGroup, highlightsGroup } = await initializeChessScene(
                canvasRef.current,
                containerRef.current
            );

            sceneRef.current = scene;
            cameraRef.current = camera;
            rendererRef.current = renderer;
            piecesGroupRef.current = piecesGroup;
            squaresGroupRef.current = squaresGroup;
            highlightsGroupRef.current = highlightsGroup;

            setBoard(buildBoardState(piecesGroup));
        };

        initCanvas();

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

        const { clientWidth, clientHeight } = containerRef.current;
        rendererRef.current.setSize(clientWidth, clientHeight);
        fitCameraToBoard(cameraRef.current, clientWidth, clientHeight);
    };

    const applyMove = useCallback(
        (from: ChessPosition, to: ChessPosition, isCapture: boolean, piece: ChessGroup) => {
            const newBoard = board.map((row) => [...row]);
            newBoard[from.y][from.x] = null;
            newBoard[to.y][to.x] = piece;

            const nextPlayer: ChessPieceColor = playerTurn === "white" ? "black" : "white";
            const inCheck = isKingInCheck(newBoard, nextPlayer);
            const inMate = inCheck && !hasAnyLegalMove(newBoard, nextPlayer);

            clearSelectedPiece(selectedPiece!);
            if (highlightsGroupRef.current) clearMoveHighlights(highlightsGroupRef.current);

            setBoard(newBoard);
            setMoveHistory((prev) => [
                ...prev,
                {
                    pieceType: piece.getType(),
                    color: piece.chessColor,
                    from,
                    to,
                    isCapture,
                    isCheck: inCheck && !inMate,
                    isCheckmate: inMate,
                },
            ]);
            setSelectedPiece(null);
            setPlayerTurn(nextPlayer);

            if (inMate) {
                toast.info(t("Chess.CheckmateNotify", { color: t(`Chess.Color.${nextPlayer}`) }), { autoClose: false });
                setIsGameOver(true);
            } else if (inCheck) {
                toast.info(t("Chess.CheckNotify", { color: t(`Chess.Color.${nextPlayer}`) }));
            }
        },
        [board, playerTurn, selectedPiece, t]
    );

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (isGameOver) return;
            if (!rendererRef.current || !cameraRef.current || !piecesGroupRef.current) return;

            const rect = rendererRef.current.domElement.getBoundingClientRect();
            const mouse = new Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );

            const raycaster = new Raycaster();
            raycaster.setFromCamera(mouse, cameraRef.current);

            const targetPiece = getPieceByRaycast(piecesGroupRef.current, raycaster);

            if (targetPiece == highlightGroupRef.current) return;
            if (targetPiece && playerTurn !== targetPiece.chessColor) return;

            if (highlightGroupRef.current) clearHighlightedPiece(highlightGroupRef.current);

            if (targetPiece) highlightPiece(targetPiece);
            highlightGroupRef.current = targetPiece;
        },
        [playerTurn, isGameOver]
    );

    const finishMove = useCallback(
        async (from: ChessPosition, to: ChessPosition, isCapture: boolean) => {
            if (!selectedPiece) return;

            let boardPiece: ChessGroup = selectedPiece;

            if (isPromotion(selectedPiece, to) && piecesGroupRef.current) {
                promotionColorRef.current = selectedPiece.chessColor;

                const chosenType = await openPromotion();
                boardPiece = promotePawn(selectedPiece, chosenType, piecesGroupRef.current);
            }

            applyMove(from, to, isCapture, boardPiece);
        },
        [selectedPiece, openPromotion, applyMove]
    );

    const handleClick = useCallback(
        async (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (isGameOver) return;
            if (!rendererRef.current || !cameraRef.current || !piecesGroupRef.current || !squaresGroupRef.current) return;

            const rect = rendererRef.current.domElement.getBoundingClientRect();
            const mouse = new Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );

            const raycaster = new Raycaster();
            raycaster.setFromCamera(mouse, cameraRef.current);

            const targetPiece = getPieceByRaycast(piecesGroupRef.current, raycaster);

            // Own piece clicked - select / switch / deselect
            if (targetPiece && playerTurn === targetPiece.chessColor) {
                if (targetPiece === selectedPiece) {
                    if (highlightsGroupRef.current) clearMoveHighlights(highlightsGroupRef.current);
                    clearSelectedPiece(selectedPiece);
                    setSelectedPiece(null);
                    return;
                }

                if (selectedPiece) clearSelectedPiece(selectedPiece);

                const legalMoves = getLegalMovesForPiece(targetPiece, board);
                if (highlightsGroupRef.current)
                    showMoveHighlights(legalMoves, board, targetPiece.chessColor, highlightsGroupRef.current);

                selectPiece(targetPiece);
                setSelectedPiece(targetPiece);
                return;
            }

            if (!selectedPiece) return;

            // Opponent piece - try capture
            if (targetPiece && playerTurn !== targetPiece.chessColor) {
                const to = { ...targetPiece.chessPosition };
                const from = { ...selectedPiece.chessPosition };

                const legalMoves = getLegalMovesForPiece(selectedPiece, board);
                if (!legalMoves.some((m) => m.x === to.x && m.y === to.y)) return;

                targetPiece.removeFromParent();
                selectedPiece.moveTo(to);
                await finishMove(from, to, true);
                return;
            }

            // Empty square - try move
            const targetSquarePos = getSquareByRaycast(squaresGroupRef.current, raycaster);
            if (!targetSquarePos) return;

            const legalMoves = getLegalMovesForPiece(selectedPiece, board);
            if (!legalMoves.some((m) => m.x === targetSquarePos.x && m.y === targetSquarePos.y)) return;

            const from = { ...selectedPiece.chessPosition };
            selectedPiece.moveTo(targetSquarePos);

            await finishMove(from, targetSquarePos, false);
        },
        [selectedPiece, playerTurn, board, isGameOver, finishMove]
    );

    const newGame = useCallback(() => {
        if (!piecesGroupRef.current) return;
        piecesGroupRef.current.clear();

        initializeChessPieces(piecesGroupRef.current);
        setBoard(buildBoardState(piecesGroupRef.current));
        setSelectedPiece(null);
        setPlayerTurn("white");
        setMoveHistory([]);
        setIsGameOver(false);

        if (highlightsGroupRef.current) clearMoveHighlights(highlightsGroupRef.current);

        if (highlightGroupRef.current) {
            clearHighlightedPiece(highlightGroupRef.current);
            highlightGroupRef.current = null;
        }
    }, []);

    return (
        <>
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

            <PromotionDialog
                isOpen={promotionOpen}
                color={promotionColorRef.current}
                onSelect={resolvePromotion}
            />
        </>
    );
};

export default ChessMainPage;

