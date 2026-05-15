import { Fragment, useEffect, useRef } from "react";

export interface ContextMenuItem {
    label: string;
    shortcut?: string;
    onClick: () => void;
    disabled?: boolean;
    danger?: boolean;
    separatorAfter?: boolean;
}

interface ContextMenuProps {
    x: number;
    y: number;
    items: ContextMenuItem[];
    onClose: () => void;
}

const ContextMenu = ({ x, y, items, onClose }: ContextMenuProps) => {
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const onDocMouseDown = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) onClose();
        };

        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("mousedown", onDocMouseDown);
        document.addEventListener("keydown", onKey);

        return () => {
            document.removeEventListener("mousedown", onDocMouseDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        <ul
            ref={ref}
            className="fixed z-50 min-w-[220px] bg-slate-800 border border-slate-700 rounded-md shadow-xl py-1 text-sm text-slate-100"
            style={{ left: x, top: y }}
            onContextMenu={(event) => event.preventDefault()}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
        >
            {items.map((item, idx) => (
                <Fragment key={idx}>
                    <li>
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={() => {
                                item.onClick();
                                onClose();
                            }}
                            className={`w-full flex items-center justify-between gap-4 px-3 py-1.5 rounded-sm disabled:text-slate-500 disabled:cursor-not-allowed
                            ${item.danger ? "hover:bg-rose-700/60" : "hover:bg-slate-700"} disabled:hover:bg-transparent`}
                        >
                            <span className="truncate">{item.label}</span>
                            {item.shortcut && <span className="text-xs text-slate-400 font-mono">{item.shortcut}</span>}
                        </button>
                    </li>

                    {item.separatorAfter && (
                        <li
                            className="my-1 border-t border-slate-700"
                            aria-hidden="true"
                        />
                    )}
                </Fragment>
            ))}
        </ul>
    );
};

export default ContextMenu;

