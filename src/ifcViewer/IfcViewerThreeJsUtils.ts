import * as OBC from "@thatopen/components";
import * as FRAGS from "@thatopen/fragments";
import { Box3, Color, Sphere, Vector2 } from "three";

export type IfcWorld = OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>;

export interface IfcViewerHandle {
    components: OBC.Components;
    world: IfcWorld;
    fragments: OBC.FragmentsManager;
    ifcLoader: OBC.IfcLoader;
    clipper: OBC.Clipper;
    hider: OBC.Hider;
    models: Map<string, FRAGS.FragmentsModel>;
}

const HIGHLIGHT_STYLE: FRAGS.MaterialDefinition = {
    color: new Color(0xffc857),
    renderedFaces: FRAGS.RenderedFaces.TWO,
    opacity: 1,
    transparent: false,
};

export const initializeIfcViewer = async (container: HTMLElement): Promise<IfcViewerHandle> => {
    const components = new OBC.Components();
    const worlds = components.get(OBC.Worlds);

    const world = worlds.create<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>();
    world.scene = new OBC.SimpleScene(components);
    world.renderer = new OBC.SimpleRenderer(components, container);
    world.camera = new OBC.SimpleCamera(components);

    components.init();

    world.scene.setup();
    world.scene.three.background = new Color(0x1f2937);

    world.camera.controls.setLookAt(15, 15, 15, 0, 0, 0);

    const fragments = components.get(OBC.FragmentsManager);
    const workerUrl = await OBC.FragmentsManager.getWorker();
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

    const ifcLoader = components.get(OBC.IfcLoader);
    await ifcLoader.setup({
        autoSetWasm: false,
        wasm: {
            path: `${import.meta.env.BASE_URL.replace(/\/$/, "")}/wasm/`,
            absolute: false,
        },
    });

    const clipper = components.get(OBC.Clipper);
    clipper.enabled = false;
    clipper.visible = false;

    const hider = components.get(OBC.Hider);

    return {
        components,
        world,
        fragments,
        ifcLoader,
        clipper,
        hider,
        models: new Map(),
    };
};

export const disposeIfcViewer = (handle: IfcViewerHandle) => {
    handle.models.clear();
    handle.components.dispose();
};

export const loadIfcModel = async (handle: IfcViewerHandle, file: File): Promise<FRAGS.FragmentsModel> => {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const model = await handle.ifcLoader.load(bytes, true, file.name);
    handle.models.set(model.modelId, model);

    await fitCameraToModel(handle, model);

    return model;
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

export const removeAllClippingPlanes = (handle: IfcViewerHandle) => {
    handle.clipper.deleteAll();
};

export const fitCameraToModel = async (handle: IfcViewerHandle, model?: FRAGS.FragmentsModel) => {
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

