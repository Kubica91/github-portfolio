import {
    Clipper,
    Components,
    FragmentsManager,
    Hider,
    IfcLoader,
    SimpleCamera,
    SimplePlane,
    SimpleRenderer,
    SimpleScene,
    SimpleWorld,
    Worlds,
} from "@thatopen/components";
import { FragmentsModel, MaterialDefinition, ProgressData, RenderedFaces } from "@thatopen/fragments";
import {
    Box3,
    BufferGeometry,
    CanvasTexture,
    Color,
    Group,
    Line,
    LineBasicMaterial,
    Mesh,
    Raycaster,
    Sphere,
    Sprite,
    SpriteMaterial,
    Vector2,
    Vector3,
} from "three";

export type IfcWorld = SimpleWorld<SimpleScene, SimpleCamera, SimpleRenderer>;

export interface IfcViewerHandle {
    components: Components;
    world: IfcWorld;
    fragments: FragmentsManager;
    ifcLoader: IfcLoader;
    clipper: Clipper;
    hider: Hider;
    models: Map<string, FragmentsModel>;
    measureGroup: Group;
    measurePoints: Vector3[];
}

const HIGHLIGHT_STYLE: MaterialDefinition = {
    color: new Color(0xffc857),
    renderedFaces: RenderedFaces.TWO,
    opacity: 1,
    transparent: false,
};

export const initializeIfcViewer = async (container: HTMLElement): Promise<IfcViewerHandle> => {
    const components = new Components();
    const worlds = components.get(Worlds);

    const world = worlds.create<SimpleScene, SimpleCamera, SimpleRenderer>();
    world.scene = new SimpleScene(components);
    world.renderer = new SimpleRenderer(components, container);
    world.camera = new SimpleCamera(components);

    components.init();

    world.scene.setup();
    world.scene.three.background = new Color(0x1f2937);

    world.camera.controls.setLookAt(15, 15, 15, 0, 0, 0);

    const fragments = components.get(FragmentsManager);
    const workerUrl = await FragmentsManager.getWorker();
    fragments.init(workerUrl);

    world.camera.controls.addEventListener("rest", () => {
        for (const [, model] of fragments.list) {
            model.useCamera(world.camera.three);
        }
        fragments.core.update(true);
    });

    fragments.list.onItemSet.add(({ value: model }) => {
        model.useCamera(world.camera.three);
        world.scene.three.add(model.object);
        fragments.core.update(true);
    });

    const ifcLoader = components.get(IfcLoader);
    await ifcLoader.setup({
        autoSetWasm: false,
        wasm: {
            path: `${import.meta.env.BASE_URL.replace(/\/$/, "")}/wasm/`,
            absolute: false,
        },
    });

    const clipper = components.get(Clipper);
    clipper.enabled = false;
    clipper.visible = false;

    const hider = components.get(Hider);

    const measureGroup = new Group();
    measureGroup.name = "ifc-measurements";
    world.scene.three.add(measureGroup);

    return {
        components,
        world,
        fragments,
        ifcLoader,
        clipper,
        hider,
        models: new Map(),
        measureGroup,
        measurePoints: [],
    };
};

export const disposeIfcViewer = (handle: IfcViewerHandle) => {
    handle.models.clear();
    handle.components.dispose();
};

export type LoadStage = ProgressData["process"];

export const loadIfcModel = async (
    handle: IfcViewerHandle,
    file: File,
    onProgress?: (progress: number, stage: LoadStage) => void
): Promise<FragmentsModel> => {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const model = await handle.ifcLoader.load(bytes, true, file.name, {
        processData: {
            progressCallback: (progress, data) => onProgress?.(progress, data.process),
        },
    });
    handle.models.set(model.modelId, model);

    return model;
};

export const removeModel = async (handle: IfcViewerHandle, modelId: string) => {
    await handle.fragments.core.disposeModel(modelId);
    handle.models.delete(modelId);
};

export const removeAllModels = async (handle: IfcViewerHandle) => {
    const ids = Array.from(handle.models.keys());
    for (const id of ids) {
        await handle.fragments.core.disposeModel(id);
    }

    handle.models.clear();
};

export const fitCameraToAll = async (handle: IfcViewerHandle) => {
    const models = Array.from(handle.models.values());
    if (models.length === 0) return;

    const combined = new Box3();
    for (const m of models) {
        if (!m.box.isEmpty()) combined.union(m.box);
    }
    if (combined.isEmpty()) return;

    const sphere = new Sphere();
    combined.getBoundingSphere(sphere);
    if (sphere.radius === 0) return;

    sphere.radius = Math.max(sphere.radius, 1);
    await handle.world.camera.controls.fitToSphere(sphere, true);
};

export const raycastModel = async (
    handle: IfcViewerHandle,
    event: { clientX: number; clientY: number }
): Promise<{ modelId: string; localId: number } | null> => {
    const dom = handle.world.renderer?.three.domElement;
    if (!dom) return null;

    const mouse = new Vector2(event.clientX, event.clientY);

    const result = await handle.fragments.raycast({
        camera: handle.world.camera.three,
        mouse,
        dom,
    });

    if (!result) return null;

    return { modelId: result.fragments.modelId, localId: result.localId };
};

export const highlightItems = async (handle: IfcViewerHandle, modelId: string, localIds: number[]) => {
    await handle.fragments.resetHighlight();

    if (localIds.length === 0) return;

    await handle.fragments.highlight(HIGHLIGHT_STYLE, { [modelId]: new Set(localIds) });
};

export const clearHighlight = async (handle: IfcViewerHandle) => {
    await handle.fragments.resetHighlight();
};

export const setItemsVisibility = async (handle: IfcViewerHandle, modelId: string, localIds: number[], visible: boolean) => {
    if (localIds.length === 0) return;

    await handle.hider.set(visible, { [modelId]: new Set(localIds) });
    handle.fragments.core.update(true);
};

export const showAll = async (handle: IfcViewerHandle) => {
    await handle.hider.set(true);
    handle.fragments.core.update(true);
};

export const setClipperEnabled = (handle: IfcViewerHandle, enabled: boolean) => {
    handle.clipper.enabled = enabled;
    handle.clipper.visible = enabled;
};

export const createClippingPlaneFromMouse = async (handle: IfcViewerHandle) => {
    if (!handle.clipper.enabled) return;

    await handle.clipper.create(handle.world);
};

export const createClippingPlaneFromRaycast = async (
    handle: IfcViewerHandle,
    event: { clientX: number; clientY: number }
): Promise<boolean> => {
    if (!handle.clipper.enabled) {
        handle.clipper.enabled = true;
        handle.clipper.visible = true;
    }

    const dom = handle.world.renderer?.three.domElement;
    if (!dom) return false;

    const mouse = new Vector2(event.clientX, event.clientY);

    const result = await handle.fragments.raycast({
        camera: handle.world.camera.three,
        mouse,
        dom,
    });

    if (!result) return false;

    const point = (result as { point?: Vector3 }).point;
    const normal = (result as { normal?: Vector3 }).normal;
    if (!point || !normal) return false;

    const flipped = normal.clone().negate();
    handle.clipper.createFromNormalAndCoplanarPoint(handle.world, flipped, point.clone());
    return true;
};

export const removeAllClippingPlanes = (handle: IfcViewerHandle) => {
    handle.clipper.deleteAll();
};

export interface ClippingPlaneHit {
    plane: SimplePlane;
    planeId: string;
}

export const raycastClippingPlane = (
    handle: IfcViewerHandle,
    event: { clientX: number; clientY: number }
): ClippingPlaneHit | null => {
    const dom = handle.world.renderer?.three.domElement;
    if (!dom) return null;

    const rect = dom.getBoundingClientRect();
    const ndc = new Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new Raycaster();
    raycaster.setFromCamera(ndc, handle.world.camera.three);

    const meshes: Mesh[] = [];
    const meshToPlane = new Map<Mesh, ClippingPlaneHit>();

    for (const [planeId, plane] of handle.clipper.list) {
        for (const mesh of plane.meshes) {
            meshes.push(mesh);
            meshToPlane.set(mesh, { plane, planeId });
        }
    }

    if (meshes.length === 0) return null;

    const intersects = raycaster.intersectObjects(meshes, false);
    if (intersects.length === 0) return null;

    return meshToPlane.get(intersects[0].object as Mesh) ?? null;
};

export const flipClippingPlane = (handle: IfcViewerHandle, planeId: string) => {
    const plane = handle.clipper.list.get(planeId);
    if (!plane) return;

    const newNormal = plane.normal.clone().negate();
    const origin = plane.origin.clone();

    handle.clipper.delete(handle.world, planeId);
    handle.clipper.createFromNormalAndCoplanarPoint(handle.world, newNormal, origin);
};

export const deleteClippingPlane = async (handle: IfcViewerHandle, planeId: string) => {
    await handle.clipper.delete(handle.world, planeId);
};

export const hasClippingPlanes = (handle: IfcViewerHandle): boolean => {
    return handle.clipper.list.size > 0;
};

export const fitCameraToModel = async (handle: IfcViewerHandle, model?: FragmentsModel) => {
    const target = model ?? Array.from(handle.models.values())[0];
    if (!target) return;

    const box: Box3 = target.box;
    if (box.isEmpty()) return;

    const sphere = new Sphere();
    box.getBoundingSphere(sphere);
    if (sphere.radius === 0) return;

    sphere.radius = Math.max(sphere.radius, 1);

    await handle.world.camera.controls.fitToSphere(sphere, true);
};

export const focusOnItem = async (handle: IfcViewerHandle, modelId: string, localId: number) => {
    const model = handle.models.get(modelId);
    if (!model) return;

    const [box] = await model.getBoxes([localId]);
    if (!box || box.isEmpty()) return;

    const sphere = new Sphere();
    box.getBoundingSphere(sphere);
    if (sphere.radius === 0) return;

    sphere.radius = Math.max(sphere.radius, 1);
    await handle.world.camera.controls.fitToSphere(sphere, true);
};

interface RaycastHit {
    modelId: string;
    localId: number;
    point: Vector3;
}

export const raycastModelDetailed = async (
    handle: IfcViewerHandle,
    event: { clientX: number; clientY: number }
): Promise<RaycastHit | null> => {
    const dom = handle.world.renderer?.three.domElement;
    if (!dom) return null;

    const mouse = new Vector2(event.clientX, event.clientY);

    const result = await handle.fragments.raycast({
        camera: handle.world.camera.three,
        mouse,
        dom,
    });

    if (!result) return null;

    const point = (result as { point?: Vector3 }).point;
    if (!point) return { modelId: result.fragments.modelId, localId: result.localId, point: new Vector3() };

    return { modelId: result.fragments.modelId, localId: result.localId, point: point.clone() };
};

const createDistanceLabel = (text: string): Sprite => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 64;

    const ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#86efac";
        ctx.font = "bold 32px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new SpriteMaterial({ map: texture, depthTest: false, transparent: true });
    const sprite = new Sprite(material);
    sprite.scale.set(2, 0.5, 1);

    return sprite;
};

export const addMeasurePoint = (handle: IfcViewerHandle, point: Vector3) => {
    handle.measurePoints.push(point.clone());

    if (handle.measurePoints.length < 2) return;

    const [a, b] = handle.measurePoints;
    const geometry = new BufferGeometry().setFromPoints([a, b]);
    const material = new LineBasicMaterial({ color: 0x22d3ee, depthTest: false, linewidth: 2 });
    const line = new Line(geometry, material);
    line.renderOrder = 999;

    const distance = a.distanceTo(b);
    const label = createDistanceLabel(`${distance.toFixed(2)} m`);
    label.position.copy(a).lerp(b, 0.5);
    label.renderOrder = 1000;

    handle.measureGroup.add(line);
    handle.measureGroup.add(label);
    handle.measurePoints = [];
};

export const clearMeasurements = (handle: IfcViewerHandle) => {
    for (const child of [...handle.measureGroup.children]) {
        handle.measureGroup.remove(child);
        const obj = child as Line | Sprite;
        const mat = (obj as { material?: { dispose?: () => void; map?: { dispose?: () => void } } }).material;
        const geo = (obj as { geometry?: { dispose?: () => void } }).geometry;
        geo?.dispose?.();
        mat?.map?.dispose?.();
        mat?.dispose?.();
    }
    handle.measurePoints = [];
};

export const cancelMeasureInProgress = (handle: IfcViewerHandle) => {
    handle.measurePoints = [];
};

export const categoryHexColor = (category: string): number => {
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
        hash = (hash * 31 + category.charCodeAt(i)) & 0xffffffff;
    }
    const hue = Math.abs(hash) % 360;
    return hslToHex(hue, 65, 55);
};

const hslToHex = (h: number, s: number, l: number): number => {
    const sN = s / 100;
    const lN = l / 100;
    const c = (1 - Math.abs(2 * lN - 1)) * sN;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lN - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
        r = c;
        g = x;
    } else if (h < 120) {
        r = x;
        g = c;
    } else if (h < 180) {
        g = c;
        b = x;
    } else if (h < 240) {
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    const R = Math.round((r + m) * 255);
    const G = Math.round((g + m) * 255);
    const B = Math.round((b + m) * 255);

    return (R << 16) | (G << 8) | B;
};

export const applyCategoryColoring = async (
    handle: IfcViewerHandle,
    byCategoryByModel: Map<string, Map<string, number[]>>
) => {
    for (const [modelId, categoryMap] of byCategoryByModel) {
        const model = handle.models.get(modelId);
        if (!model) {
            continue;
        }

        await model.resetColor(undefined);

        for (const [category, localIds] of categoryMap) {
            if (localIds.length === 0) continue;
            const color = new Color(categoryHexColor(category));
            await model.setColor(localIds, color);
        }
    }

    await handle.fragments.core.update(true);
};

export const clearCategoryColoring = async (handle: IfcViewerHandle) => {
    for (const model of handle.models.values()) {
        await model.resetColor(undefined);
    }
    await handle.fragments.core.update(true);
};

export const highlightSelectionOverBackground = async (handle: IfcViewerHandle, modelId: string, localIds: number[]) => {
    await handle.fragments.resetHighlight();

    if (localIds.length > 0) {
        await handle.fragments.highlight(HIGHLIGHT_STYLE, { [modelId]: new Set(localIds) });
    }
};

