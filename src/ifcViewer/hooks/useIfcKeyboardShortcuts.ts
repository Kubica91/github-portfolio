import { useEffect } from "react";

export interface IfcKeyboardShortcutHandlers {
    onResetCamera: () => void;
    onPanicClear: () => void;
    onFocusAtCursor: () => void;
    onHideAtCursor: () => void;
    onToggleMeasure: () => void;
    onToggleColorByCategory: () => void;
    onDelete: () => void;
}

const isTypingInInput = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;

    const tag = target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if (target.isContentEditable) return true;

    return false;
};

export const useIfcKeyboardShortcuts = (handlers: IfcKeyboardShortcutHandlers, enabled: boolean) => {
    useEffect(() => {
        if (!enabled) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (isTypingInInput(event.target)) return;

            if (event.ctrlKey || event.metaKey || event.altKey) return;

            switch (event.key) {
                case "Escape":
                    event.preventDefault();
                    handlers.onPanicClear();
                    break;

                case "r":
                case "R":
                    event.preventDefault();
                    handlers.onResetCamera();
                    break;

                case "f":
                case "F":
                    event.preventDefault();
                    handlers.onFocusAtCursor();
                    break;

                case "h":
                case "H":
                    event.preventDefault();
                    handlers.onHideAtCursor();
                    break;

                case "m":
                case "M":
                    event.preventDefault();
                    handlers.onToggleMeasure();
                    break;

                case "c":
                case "C":
                    event.preventDefault();
                    handlers.onToggleColorByCategory();
                    break;

                case "Delete":
                case "Backspace":
                    event.preventDefault();
                    handlers.onDelete();
                    break;

                default:
                    break;
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [enabled, handlers]);
};

