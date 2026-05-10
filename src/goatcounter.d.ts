interface GoatCounterVars {
    path?: string;
    title?: string;
    referrer?: string;
    event?: boolean;
}

interface GoatCounter {
    no_onload?: boolean;
    allow_local?: boolean;
    endpoint?: string;
    count?: (vars?: GoatCounterVars) => void;
    filter?: () => string | false;
}

declare global {
    interface Window {
        goatcounter?: GoatCounter;
    }
}

export {};

