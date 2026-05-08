import { useEffect, useRef } from "react";
import { AmbientLight, DirectionalLight, Group, PCFShadowMap, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import {
    GetBishopGeometry,
    GetChessboardGeometry,
    GetKingGeometry,
    GetKnightGeometry,
    GetPawnGeometry,
    GetQueenGeometry,
    GetRookGeometry,
} from "./ChessGeometryUtils";

const ChessMainPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ThreeJsInit = async () => {
            if (!canvasRef.current || !containerRef.current) return;

            const scene = new Scene();
            const camera = new PerspectiveCamera(
                75,
                containerRef.current.clientWidth / containerRef.current.clientHeight,
                0.1,
                1000
            );

            const renderer = new WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            renderer.setAnimationLoop(animate);

            const figures = [
                GetPawnGeometry(),
                GetRookGeometry(),
                GetKnightGeometry(),
                GetBishopGeometry(),
                GetQueenGeometry(),
                GetKingGeometry(),
            ];

            const mainGroup = new Group();
            for (let i = 0; i < figures.length; i++) {
                const figure = figures[i];

                figure.position.x = (i - 2.5) * 1.5;
                mainGroup.add(figure);
            }
            scene.add(mainGroup);

            const board = await GetChessboardGeometry();
            scene.add(board);

            const ambientLight = new AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const dirLight = new DirectionalLight(0xffffff, 1);
            dirLight.position.set(2, 5, 2);
            dirLight.target = mainGroup;
            dirLight.castShadow = true;
            dirLight.shadow.mapSize.width = 1024;
            dirLight.shadow.mapSize.height = 1024;
            scene.add(dirLight);

            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = PCFShadowMap;

            camera.position.set(0, 8, 0);
            camera.lookAt(0, 0, 0);

            function animate(time: number) {
                mainGroup.rotation.y = time / 1000;
                renderer.render(scene, camera);
            }
        };

        ThreeJsInit();
    }, [canvasRef]);

    return (
        <div
            className="w-full h-full"
            ref={containerRef}
        >
            <canvas ref={canvasRef} />
        </div>
    );
};

export default ChessMainPage;
