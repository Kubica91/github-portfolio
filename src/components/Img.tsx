import { ImgHTMLAttributes } from "react";
import { imageSizes } from "../generated/imageSizes";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height" | "loading"> & {
    src: string;
    loading?: "lazy" | "eager";
};

const Img = ({ src, loading = "lazy", ...rest }: Props) => {
    const size = imageSizes[src];
    if (!size && import.meta.env.DEV) {
        console.warn(`[Img] missing size for ${src}. Run: node scripts/generateImageSizes.mjs`);
    }
    return <img src={src} width={size?.width} height={size?.height} loading={loading} {...rest} />;
};

export default Img;
