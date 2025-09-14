import Card from "./Card.jsx"
import FullBar from "./FullBar.jsx"
import {useState, useEffect} from "react"
import decodeAPNG from "./apng_decoder.js"
import boykisserImg from "./assets/boykisser.avif"
import backgroundImg from "./assets/background.png"

function App() {
    const [frameQueue, setFrameQueue] = useState([]);

    useEffect(() => {
        let stop = false;
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        (async function initAnimation() {
            const res = await decodeAPNG(backgroundImg);
            let i = 0;
            while (!stop && res.length) {
                setFrameQueue(prev => {
                    let newFrameQueue = [res[i]];
                    if (prev[0]) {
                        newFrameQueue.push(prev[0]);
                    }
                    return newFrameQueue
                });
                const delay = res[i].delayMs ?? 100;
                i = (i + 1) % res.length;
                await sleep(delay);
            }
        })();
        return () => {stop = true}
    }, []);

    const current = frameQueue[0]?.url;
    const previous = frameQueue[1]?.url;

    return (
        <div
            className="flex flex-col overflow-x-hidden overflow-y-auto w-dvw h-dvh bg-cover bg-scroll bg-center [image-rendering:pixelated]"
            style={current ? {backgroundImage: `url(${current}), url(${previous || backgroundImg})`} : {backgroundImage: `url(${backgroundImg})`}}
        >
            <div className="flex w-full p-[1rem]">
                <FullBar>
                    <p className="font-extrabold">
                        Hello, world! :3
                    </p>
                </FullBar>
            </div>
            <div className="flex w-full flex-wrap gap-[1rem] px-[1rem]">
                <Card>My username is typically v2ray, also known as LagPixelLOL.</Card>
                <Card>
                    <img className="rounded-[10px] h-[6rem]" src={boykisserImg}></img>
                </Card>
                <Card>
                    <p>
                        Email: 2282688304@qq.com<br/>
                        GitHub: <a href="https://github.com/LagPixelLOL" target="_blank">LagPixelLOL</a><br/>
                        HuggingFace: <a href="https://huggingface.co/v2ray" target="_blank">v2ray</a><br/>
                        Discord: <a href="https://discord.gg/r4Wj97nZ" target="_blank">@v2ray</a>
                    </p>
                </Card>
                <Card>Lead of Project Looking Glass, operator of Straylight, searching for Rainbows in Starlights.</Card>
            </div>
            <footer className="text-center mt-auto py-2.5 font-mono">Made with GEX && React && Tailwind</footer>
        </div>
    )
}

export default App
