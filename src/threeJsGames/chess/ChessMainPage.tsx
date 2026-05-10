import { useCallback, useEffect, useRef, useState } from "react";
import { Group, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from "three";
import HorizontalSplitter from "../../components/HorizontalSplitter";
import { ChessGroup } from "./ChessGeometryUtils";
import {
    ClearHighlightedPiece,
    ClearSelectedPiece,
    GetPieceByRaycast,
    HighlightPiece,
    InitializeChessScene,
    SelectPiece,
} from "./ChessThreeutils";
import ChessContent from "./components/ChessContent";

const ChessMainPage = () => {
    const [selectedPiece, setSelectedPiece] = useState<ChessGroup | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const sceneRef = useRef<Scene | null>(null);
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    const rendererRef = useRef<WebGLRenderer | null>(null);
    const piecesGroupRef = useRef<Group | null>(null);
    const highlightGroupRef = useRef<ChessGroup | null>(null);

    useEffect(() => {
        const InitCanvas = async () => {
            if (!canvasRef.current || !containerRef.current) return;

            const { scene, camera, renderer, piecesGroup } = await InitializeChessScene(
                canvasRef.current,
                containerRef.current
            );

            sceneRef.current = scene;
            cameraRef.current = camera;
            rendererRef.current = renderer;
            piecesGroupRef.current = piecesGroup;
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

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!rendererRef.current || !cameraRef.current || !piecesGroupRef.current) return;

        const rect = rendererRef.current.domElement.getBoundingClientRect();
        const mouse = new Vector2(
            ((event.clientX - rect.left) / rect.width) * 2 - 1,
            -((event.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new Raycaster();
        raycaster.setFromCamera(mouse, cameraRef.current);

        const piece = GetPieceByRaycast(piecesGroupRef.current, raycaster);
        if (piece == highlightGroupRef.current) return;

        if (highlightGroupRef.current) ClearHighlightedPiece(highlightGroupRef.current);

        if (piece) HighlightPiece(piece);

        highlightGroupRef.current = piece;
    }, []);

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!rendererRef.current || !cameraRef.current || !piecesGroupRef.current) return;

            const rect = rendererRef.current.domElement.getBoundingClientRect();
            const mouse = new Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );
            const raycaster = new Raycaster();
            raycaster.setFromCamera(mouse, cameraRef.current);

            const piece = GetPieceByRaycast(piecesGroupRef.current, raycaster);
            if (piece === selectedPiece) return;

            if (selectedPiece) ClearSelectedPiece(selectedPiece);

            if (piece) SelectPiece(piece);

            setSelectedPiece(piece);
        },
        [selectedPiece]
    );

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

            <ChessContent selectedPiece={selectedPiece} />
        </HorizontalSplitter>
    );
};

export default ChessMainPage;
