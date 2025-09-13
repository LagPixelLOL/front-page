import UPNG from "upng-js"

export default async function decodeAPNG(apngUrl) {
    const res = await fetch(apngUrl, {mode: "cors"});
    const buf = await res.arrayBuffer();

    const apng = UPNG.decode(buf);
    const rgbaFrames = UPNG.toRGBA8(apng);

    const w = apng.width;
    const h = apng.height;

    const out = [];
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < rgbaFrames.length; i++) {
        const data = new Uint8ClampedArray(rgbaFrames[i]);
        const imgData = new ImageData(data, w, h);
        ctx.putImageData(imgData, 0, 0);

        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
        const url = URL.createObjectURL(blob);

        const meta = apng.frames[i] || {};
        const delayMs = Number(meta.delay ?? meta.duration ?? 100);

        out.push({url, delayMs});
    }

    return out;
}
