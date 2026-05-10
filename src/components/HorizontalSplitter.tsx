import React, { useCallback, useEffect, useState } from "react";

interface HorizontalSplitterProps {
    startWidth: number;
    minWidth: number;
    maxWidth: number;
    children: [React.ReactNode, React.ReactNode?];
    onResize?: (newWidth: number) => void;
}

const HorizontalSplitter: React.FC<HorizontalSplitterProps> = ({ children, startWidth, minWidth, maxWidth, onResize }) => {
    const [leftPercent, setLeftPercent] = useState(startWidth);
    const [dragging, setDragging] = useState(false);

    const onMouseDown = useCallback(() => {
        setDragging(true);
        document.body.style.cursor = "col-resize";
    }, []);

    const onMouseUp = useCallback(() => {
        setDragging(false);
        document.body.style.cursor = "";
    }, []);

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!dragging) return;

            const vw = window.innerWidth;
            let newPercent = (e.clientX / vw) * 100;
            if (newPercent < minWidth) newPercent = minWidth;
            if (newPercent > maxWidth) newPercent = maxWidth;

            setLeftPercent(newPercent);
            if (onResize) onResize(newPercent);
        },
        [minWidth, maxWidth, dragging, onResize]
    );

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        } else {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [dragging, onMouseMove, onMouseUp]);

    if (!children[1]) {
        return <div className="w-full h-full flex">{children[0]}</div>;
    }

    return (
        <div className="w-full h-full flex overflow-hidden">
            <div
                className="h-full overflow-auto transition-all duration-200"
                style={{
                    width: `${leftPercent}%`,
                    minWidth: `${minWidth}%`,
                    maxWidth: `${maxWidth}%`,
                    transition: dragging ? "none" : "width 0.2s",
                }}
            >
                {children[0]}
            </div>

            <div
                className={`relative flex flex-col items-center justify-center cursor-col-resize select-none z-20 transition-all duration-200 ${
                    dragging ? "bg-sky-400/30" : "hover:bg-sky-300/30 group" }`}
                style={{ width: 16 }}
                onMouseDown={onMouseDown}
                onDoubleClick={() => setLeftPercent(startWidth)}
            >
                <div
                    className={`absolute left-1/2 top-0 w-px -translate-x-1/2 transition-all duration-200
                        ${dragging ? "bg-sky-300" : "bg-slate-300 group-hover:bg-sky-300"}`}
                    style={{ height: "calc(50% - 16px)" }}
                />
                <div
                    className={`mx-auto h-8 w-1.5 rounded bg-slate-500 transition-all duration-200 shadow-sm
                        ${dragging ? "bg-sky-500" : "group-hover:bg-sky-500"}`}
                />
                <div
                    className={`absolute left-1/2 bottom-0 w-px -translate-x-1/2 transition-all duration-200
                        ${dragging ? "bg-sky-300" : "bg-slate-300 group-hover:bg-sky-300"}`}
                    style={{ height: "calc(50% - 16px)" }}
                />
            </div>

            <div className="h-full overflow-auto flex-1">{children[1]}</div>
        </div>
    );
};

export default HorizontalSplitter;
