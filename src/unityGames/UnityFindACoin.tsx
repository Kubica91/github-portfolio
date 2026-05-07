import HorizontalSplitter from "../components/HorizontalSplitter";

const UnityFindACoin = () => {
    return (
        <div className="h-full w-full p-2 overflow-hidden">
            <HorizontalSplitter
                startWidth={70}
                minWidth={30}
                maxWidth={90}
            >
                <div>{"xxx UnityFindACoin xxx"}</div>
                <div>{"xxx UnityFindACoin xxx"}</div>
            </HorizontalSplitter>
        </div>
    );
};

export default UnityFindACoin;
