interface ElementDetailRowProps {
    keyName: string;
    value: string | number | boolean | null;
}

const ElementDetailRow = ({ keyName, value }: ElementDetailRowProps) => (
    <>
        <dt className="text-slate-400 truncate">{keyName}</dt>

        <dd
            className="text-slate-100 truncate"
            title={String(value)}
        >
            {value === null ? "-" : String(value)}
        </dd>
    </>
);

export default ElementDetailRow;
