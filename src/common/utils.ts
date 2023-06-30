type dimension = "width" | "original"

export function createImageURL(
    path: string,
    type: dimension="width"
    ) {
    return type === "width"
    ? `${import.meta.env.VITE_BASE_IMAGE_URI}/${path}`
    : `${import.meta.env.VITE_BASE_IMAGE_URI}/${path}`;
}