import { useEffect, useRef } from "react";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { GetPawnGeometry } from "./ChessUtils";

const ChessMainPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new Scene();
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animate);

        const pawn = GetPawnGeometry();
        scene.add(pawn);

        camera.position.z = 5;

        function animate(time: number) {
            pawn.rotation.x = time / 1000;
            pawn.rotation.y = time / 1000;
            pawn.rotation.z = time / 1000;

            renderer.render(scene, camera);
        }
    }, [canvasRef]);

    return <canvas ref={canvasRef} />;
};

export default ChessMainPage;
