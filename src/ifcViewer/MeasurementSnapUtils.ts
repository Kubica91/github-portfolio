import { SnappingClass } from "@thatopen/fragments";
import { Camera, Vector2, Vector3 } from "three";
import { IfcViewerHandle } from "./IfcViewerThreeJsUtils";

export const SNAP_THRESHOLD_PX = 12;

export type SnapType = "vertex" | "midpoint" | "edge" | "surface";

export interface SnapResult {
    point: Vector3;
    type: SnapType;
    screen: { x: number; y: number };
}

const projectToScreen = (point: Vector3, camera: Camera, rect: DOMRect): { x: number; y: number } => {
    const tmpProj = new Vector3();
    tmpProj.copy(point).project(camera);

    const x = rect.left + ((tmpProj.x + 1) / 2) * rect.width;
    const y = rect.top + ((1 - tmpProj.y) / 2) * rect.height;

    return { x, y };
};

interface RaycastResultWithSnap {
    point: Vector3;
    snappingClass?: SnappingClass;
    snappedEdgeP1?: Vector3;
    snappedEdgeP2?: Vector3;
}

export const computeSnap = async (
    handle: IfcViewerHandle,
    event: { clientX: number; clientY: number },
    threshold: number = SNAP_THRESHOLD_PX
): Promise<SnapResult | null> => {
    const dom = handle.world.renderer?.three.domElement;
    if (!dom) return null;

    const rect = dom.getBoundingClientRect();
    const mx = event.clientX;
    const my = event.clientY;

    if (mx < rect.left || mx > rect.right || my < rect.top || my > rect.bottom) return null;

    const camera = handle.world.camera.three as Camera;
    const mouse = new Vector2(mx, my);

    let result: RaycastResultWithSnap | null;
    try {
        const raw = await handle.fragments.raycast({
            camera: handle.world.camera.three,
            mouse,
            dom,
            snappingClasses: [SnappingClass.POINT, SnappingClass.LINE, SnappingClass.FACE],
        });
        result = (raw as RaycastResultWithSnap | undefined) ?? null;
    } catch {
        return null;
    }

    if (!result || !result.point) return null;

    const snappedPoint = result.point.clone();

    if (result.snappingClass === SnappingClass.POINT) {
        const screen = projectToScreen(snappedPoint, camera, rect);
        return { point: snappedPoint, type: "vertex", screen };
    }

    if (result.snappingClass === SnappingClass.LINE) {
        if (result.snappedEdgeP1 && result.snappedEdgeP2) {
            const mid = result.snappedEdgeP1.clone().add(result.snappedEdgeP2).multiplyScalar(0.5);
            const midScreen = projectToScreen(mid, camera, rect);
            const dx = midScreen.x - mx;
            const dy = midScreen.y - my;
            const midPxDist = Math.sqrt(dx * dx + dy * dy);

            if (midPxDist <= threshold) {
                return { point: mid, type: "midpoint", screen: midScreen };
            }
        }

        const screen = projectToScreen(snappedPoint, camera, rect);
        return { point: snappedPoint, type: "edge", screen };
    }

    const screen = projectToScreen(snappedPoint, camera, rect);
    return { point: snappedPoint, type: "surface", screen };
};

