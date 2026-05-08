import { useEffect, useRef } from "react";
import {
    AmbientLight,
    DirectionalLight,
    Group,
    Mesh,
    MeshStandardMaterial,
    PCFShadowMap,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    WebGLRenderer,
} from "three";
import {
    GetBishopGeometry,
    GetKingGeometry,
    GetKnightGeometry,
    GetPawnGeometry,
    GetQueenGeometry,
    GetRookGeometry,
} from "./ChessGeometryUtils";

const ChessMainPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new Scene();
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
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

        const plane = new Mesh(new PlaneGeometry(9, 9), new MeshStandardMaterial({ color: 0x888888 }));
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.01;
        plane.receiveShadow = true;
        plane.castShadow = false;
        scene.add(plane);

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

        camera.position.set(0, 4, 8);
        camera.lookAt(0, 0, 0);

        function animate(time: number) {
            mainGroup.rotation.y = time / 1000;
            renderer.render(scene, camera);
        }
    }, [canvasRef]);

    return <canvas ref={canvasRef} />;
};

export default ChessMainPage;
