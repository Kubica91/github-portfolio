import { BoxGeometry, ConeGeometry, CylinderGeometry, Group, Mesh, MeshStandardMaterial, SphereGeometry } from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const material = new MeshStandardMaterial({ color: 0xffffff });

function addAndShadow(group: Group, mesh: Mesh) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
}

export const GetPawnGeometry = () => {
    const pawn = new Group();
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

export const GetRookGeometry = () => {
    const rook = new Group();
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

export const GetKnightGeometry = () => {
    const knight = new Group();
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

    return knight;
};

export const GetBishopGeometry = () => {
    const bishop = new Group();
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

export const GetQueenGeometry = () => {
    const queen = new Group();
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

export const GetKingGeometry = () => {
    const king = new Group();
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
    const squareSize = 1.2;
    const boardSize = 8 * squareSize;
    const board = new Group();

    const whiteMat = new MeshStandardMaterial({ color: 0xfafafa });
    const blackMat = new MeshStandardMaterial({ color: 0x222222 });

    for (let x = 0; x < 8; x++) {
        for (let z = 0; z < 8; z++) {
            const isWhite = (x + z) % 2 === 0;
            const mat = isWhite ? whiteMat : blackMat;

            const square = new Mesh(new BoxGeometry(squareSize, 0.06, squareSize), mat);
            square.position.x = (x - 3.5) * squareSize;
            square.position.z = (z - 3.5) * squareSize;
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
        meshTop.position.x = -4 * squareSize + squareSize / 2 + x * squareSize + textSize / 2;
        meshTop.position.z = -4 * squareSize - textSize - 0.05;
        meshTop.rotation.x = -Math.PI / 2;
        meshTop.rotation.z = Math.PI;
        board.add(meshTop);

        const meshBottom = new Mesh(textGeo, textMat);
        meshBottom.position.x = -4 * squareSize + squareSize / 2 + x * squareSize - textSize / 2;
        meshBottom.position.z = 4 * squareSize + textSize + 0.05;
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
        meshLeft.position.x = -4 * squareSize - textSize - 0.05;
        meshLeft.position.z = 4 * squareSize - squareSize / 2 - z * squareSize + textSize / 2;
        meshLeft.rotation.x = -Math.PI / 2;
        board.add(meshLeft);

        const meshRight = new Mesh(textGeo, textMat);
        meshRight.position.x = 4 * squareSize + textSize + 0.05;
        meshRight.position.z = 4 * squareSize - squareSize / 2 - z * squareSize - textSize / 2;
        meshRight.rotation.x = -Math.PI / 2;
        meshRight.rotation.z = -Math.PI;
        board.add(meshRight);
    }

    return board;
};
