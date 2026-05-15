import { SnapResult, SnapType } from "../MeasurementSnapUtils";

interface SnapIndicatorProps {
    snap: SnapResult | null;
}

const SIZE = 18;

const colorFor = (type: SnapType): string => {
    switch (type) {
        case "vertex":
            return "#facc15";
        case "midpoint":
            return "#fb923c";
        case "edge":
            return "#38bdf8";
        case "surface":
            return "#94a3b8";
    }
};

const ShapeFor = ({ type }: { type: SnapType }) => {
    const color = colorFor(type);
    const stroke = 2;

    switch (type) {
        case "vertex":
            return (
                <rect
                    x={stroke / 2}
                    y={stroke / 2}
                    width={SIZE - stroke}
                    height={SIZE - stroke}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                />
            );

        case "midpoint":
            return (
                <polygon
                    points={`${SIZE / 2},${stroke} ${SIZE - stroke},${SIZE - stroke} ${stroke},${SIZE - stroke}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={stroke}
                />
            );

        case "edge":
            return (
                <g
                    stroke={color}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                >
                    <line
                        x1={stroke}
                        y1={stroke}
                        x2={SIZE - stroke}
                        y2={SIZE - stroke}
                    />

                    <line
                        x1={SIZE - stroke}
                        y1={stroke}
                        x2={stroke}
                        y2={SIZE - stroke}
                    />
                </g>
            );

        case "surface":
            return (
                <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={SIZE / 2 - stroke}
                    fill="none"
                    stroke={color}
                    strokeWidth={1}
                />
            );
    }
};

const SnapIndicator = ({ snap }: SnapIndicatorProps) => {
    if (!snap) return null;

    return (
        <div
            style={{
                position: "fixed",
                left: snap.screen.x - SIZE / 2,
                top: snap.screen.y - SIZE / 2,
                width: SIZE,
                height: SIZE,
                pointerEvents: "none",
                zIndex: 50,
            }}
        >
            <svg
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
            >
                <ShapeFor type={snap.type} />
            </svg>
        </div>
    );
};

export default SnapIndicator;

