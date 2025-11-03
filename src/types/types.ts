export type TextBlock = {
    _key: string;
    _type: 'block';
    style: string;
    children: Array<{
        _key: string;
        _type: 'span';
        text: string;
        marks: string[];
    }>;
    markDefs?: Array<{
        _key: string;
        _type: string;
        [key: string]: unknown;
    }>;
}

export type ImageType = {
    asset: { url: string, _id: string }
    alt?: string; caption?: { en: string, de: string }
}

export type MotionPortalsType = {
    headline: { de: string; en: string };
    text: { de: TextBlock; en: TextBlock };
    images: ImageType[]
}

export type SkulpturenType = {
    headline: { de: string; en: string };
    text: { de: TextBlock; en: TextBlock };
}

export type OrtType = {
    zoom: number;
    artist: string;
    name: string;
    image: ImageType;
    glb: { asset: { url: string } }
    coordinates: { longitude: number, latitude: number }
}

export type AnleitungType = {
    headline: { de: string; en: string };
    text: { de: TextBlock; en: TextBlock };
    diagram: { asset: { url: string, _id: string }, alt: string }
}

export type ProjectSectionType = {
    headline: { de: string; en: string };
    text: { de: TextBlock; en: TextBlock };
    images: ImageType[]
}