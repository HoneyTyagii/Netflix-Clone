export function createImageURL(path: string) {
    return `${import.meta.env.VITE_BASE_IMAGE_URI}/${path}`;
}