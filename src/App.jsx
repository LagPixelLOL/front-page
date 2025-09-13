import backgroundImg from "./assets/background.png"
import FullBar from "./FullBar.jsx"
import Card from "./Card.jsx"
import decodeAPNG from "./apng_decoder.js"

import {useState, useEffect} from "react"

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
            <div className="flex w-full">
                <FullBar>
                    <p className="font-extrabold">
                        Hello, world! :3
                    </p>
                </FullBar>
            </div>
            <div className="flex w-full flex-wrap">
                <div className="flex h-fit max-w-[100%] lg:max-w-[25%]">
                    <Card>
                        <div className="flex h-full items-center">
                            My username is typically v2ray, also known as LagPixelLOL.
                        </div>
                    </Card>
                </div>
                <div className="flex h-fit max-w-[100%] lg:max-w-[25%]">
                    <Card>
                        <div className="flex h-full items-center">
                            Yura is gay asf.<br/>
                            Imagine using Rust :33:
                        </div>
                    </Card>
                </div>
                <div className="flex h-fit max-w-[100%] lg:max-w-[25%]">
                    <Card>
                        <div className="flex h-full items-center">
                            <p>
                                Email: 2282688304@qq.com<br/>
                                GitHub: <a href="https://github.com/LagPixelLOL" target="_blank">LagPixelLOL</a><br/>
                                HuggingFace: <a href="https://huggingface.co/v2ray" target="_blank">v2ray</a><br/>
                                Discord: <a href="https://discord.gg/r4Wj97nZ" target="_blank">@v2ray</a>
                            </p>
                        </div>
                    </Card>
                </div>
                <div className="flex h-fit max-w-[100%] lg:max-w-[25%]">
                    <Card>
                        <div className="flex h-full items-center">
                            Lead of Project Looking Glass, operator of Straylight, searching for Rainbows in Starlights.
                        </div>
                    </Card>
                </div>
            </div>
            <footer className="text-center mt-auto py-2.5 font-mono">Made with CUM && React && Tailwind</footer>
        </div>
    )
}

export default App
