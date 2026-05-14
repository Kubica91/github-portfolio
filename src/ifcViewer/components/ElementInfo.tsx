import { useTranslation } from "react-i18next";
import { IfcPropertyMap } from "../IfcTreeUtils";

interface ElementInfoProps {
    selected: {
        localId: number;
        category: string | null;
        properties: IfcPropertyMap;
    } | null;
}

const ElementInfo = ({ selected }: ElementInfoProps) => {
    const { t } = useTranslation();

    return (
        <section className="p-4 space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2">{t("IfcViewer.Element.Title")}</h3>

            {!selected ? (
                <p className="text-sm text-slate-500">{t("IfcViewer.Element.NoSelection")}</p>
            ) : (
                <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-sm">
                    <dt className="text-slate-400">{t("IfcViewer.Element.Type")}</dt>

                    <dd
                        className="text-slate-100 truncate"
                        title={selected.category ?? ""}
                    >
                        {selected.category ?? "-"}
                    </dd>

                    <dt className="text-slate-400">{t("IfcViewer.Element.LocalId")}</dt>

                    <dd className="text-slate-100">{selected.localId}</dd>

                    {Object.entries(selected.properties).map(([key, value]) => (
                        <DetailRow
                            key={key}
                            keyName={key}
                            value={value}
                        />
                    ))}
                </dl>
            )}
        </section>
    );
};

interface DetailRowProps {
    keyName: string;
    value: string | number | boolean | null;
}

const DetailRow = ({ keyName, value }: DetailRowProps) => (
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

export default ElementInfo;

