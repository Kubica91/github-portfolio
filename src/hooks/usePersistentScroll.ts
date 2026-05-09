import { RefObject, useEffect, useRef, useState } from "react";

/**
 * Ukládá scroll pozici do sessionStorage při unmountu a obnovuje ji při mountu.
 *
 * @param key Klíč v sessionStorage
 * @param containerRef Ref na scrollovatelný kontejner
 * @returns Scroll pozice načtená ze storage (při mountu)
 */
const usePersistentScroll = (key: string, containerRef: RefObject<HTMLDivElement>): number | undefined => {
    const [initialValue] = useState<number | undefined>(() => {
        try {
            const item = sessionStorage.getItem(key);
            if (item !== null) {
                return JSON.parse(item) as number;
            }
        } catch {
            return undefined;
        }
    });

    const scrollTopRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            scrollTopRef.current = el.scrollTop;
        };

        el.addEventListener("scroll", handleScroll);

        return () => {
            el.removeEventListener("scroll", handleScroll);
            const val = scrollTopRef.current;
            if (val === undefined) {
                sessionStorage.removeItem(key);
            } else {
                sessionStorage.setItem(key, JSON.stringify(val));
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return initialValue;
};

export default usePersistentScroll;
