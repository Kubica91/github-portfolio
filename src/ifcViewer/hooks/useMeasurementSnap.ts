import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { IfcViewerHandle } from "../IfcViewerThreeJsUtils";
import { computeSnap, SnapResult } from "../MeasurementSnapUtils";

interface UseMeasurementSnapResult {
    snapResult: SnapResult | null;
    handleSnapMouseMove: (event: { clientX: number; clientY: number }) => void;
    handleSnapMouseLeave: () => void;
    resolveClickPoint: (event: { clientX: number; clientY: number }) => Promise<Vector3 | null>;
}

export const useMeasurementSnap = (
    viewerRef: MutableRefObject<IfcViewerHandle | null>,
    enabled: boolean
): UseMeasurementSnapResult => {
    const [snapResult, setSnapResult] = useState<SnapResult | null>(null);
    const rafRef = useRef<number | null>(null);
    const pendingEventRef = useRef<{ clientX: number; clientY: number } | null>(null);
    const enabledRef = useRef(enabled);
    const inFlightRef = useRef(false);

    useEffect(() => {
        enabledRef.current = enabled;
        if (!enabled) {
            setSnapResult(null);
            pendingEventRef.current = null;
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        }
    }, [enabled]);

    useEffect(() => {
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const handleSnapMouseMove = useCallback(
        (event: { clientX: number; clientY: number }) => {
            if (!enabledRef.current) return;
            if (!viewerRef.current) return;

            pendingEventRef.current = { clientX: event.clientX, clientY: event.clientY };

            if (rafRef.current !== null || inFlightRef.current) return;

            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                const ev = pendingEventRef.current;
                pendingEventRef.current = null;
                if (!ev || !viewerRef.current || !enabledRef.current) return;

                inFlightRef.current = true;
                void computeSnap(viewerRef.current, ev)
                    .then((result) => {
                        if (!enabledRef.current) {
                            setSnapResult(null);
                            return;
                        }
                        setSnapResult(result);
                    })
                    .finally(() => {
                        inFlightRef.current = false;
                    });
            });
        },
        [viewerRef]
    );

    const handleSnapMouseLeave = useCallback(() => {
        pendingEventRef.current = null;
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        setSnapResult(null);
    }, []);

    const resolveClickPoint = useCallback(
        async (event: { clientX: number; clientY: number }): Promise<Vector3 | null> => {
            if (!viewerRef.current) return null;
            const result = await computeSnap(viewerRef.current, event);
            return result ? result.point : null;
        },
        [viewerRef]
    );

    return { snapResult, handleSnapMouseMove, handleSnapMouseLeave, resolveClickPoint };
};
