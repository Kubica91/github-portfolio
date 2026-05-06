import { ConeGeometry, CylinderGeometry, Group, Mesh, MeshBasicMaterial, SphereGeometry } from "three";

export const GetPawnGeometry = () => {
    const pawn = new Group();
    const material = new MeshBasicMaterial({ color: 0xffffff });

    const base = new Mesh(new CylinderGeometry(0.4, 0.5, 0.2, 32), material);
    base.position.y = 0.1;
    pawn.add(base);

    const body = new Mesh(new CylinderGeometry(0.22, 0.32, 0.7, 32), material);
    body.position.y = 0.55;
    pawn.add(body);

    const neck = new Mesh(new CylinderGeometry(0.13, 0.13, 0.13, 32), material);
    neck.position.y = 0.98;
    pawn.add(neck);

    const head = new Mesh(new SphereGeometry(0.18, 32, 32), material);
    head.position.y = 1.18;
    pawn.add(head);

    const top = new Mesh(new ConeGeometry(0.09, 0.13, 32), material);
    top.position.y = 1.33;
    pawn.add(top);

    return pawn;
};
