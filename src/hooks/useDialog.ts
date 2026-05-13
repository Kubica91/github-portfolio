import { useCallback, useRef, useState } from "react";

export function useDialog<T>() {
    const [isOpen, setIsOpen] = useState(false);
    const resolverRef = useRef<((value: T) => void) | null>(null);

    const open = useCallback((): Promise<T> => {
        setIsOpen(true);

        return new Promise<T>((resolve) => {
            resolverRef.current = resolve;
        });
    }, []);

    const resolve = useCallback((value: T) => {
        setIsOpen(false);

        resolverRef.current?.(value);
        resolverRef.current = null;
    }, []);

    return { isOpen, open, resolve };
}

