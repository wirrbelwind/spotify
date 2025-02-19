import { Image as UiImage, ImageProps as UiImageProps } from "@heroui/image";
import NextImage, { ImageProps as NextImageProps } from "next/image";

type ImageProps = UiImageProps & NextImageProps

export const Image = (props: ImageProps) => {
    
    return (
        <UiImage
            as={NextImage}
            {...props}
        />
    )
}
