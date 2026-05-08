import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * useStorageState synchronizuje hodnotu se stavem a localStorage.
 * @param key Klíč v localStorage
 * @param initialValue Výchozí hodnota (volitelné)
 */

type UseStorageStateReturn<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>];

const useStorageState = <T>(key: string, initialValue?: T): UseStorageStateReturn<T> => {
    const [value, setValue] = useState<T | undefined>(() => {
        try {
            const item = localStorage.getItem(key);
            if (item !== null) {
                return JSON.parse(item) as T;
            }
            return initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        if (value === undefined) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
};

export default useStorageState;
