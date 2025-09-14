import {useMemo, useEffect, useState, useRef} from "react"
import {LiquidGlass} from "@specy/liquid-glass-react"

function Card({children}) {
    const [key, setKey] = useState(0);
    const liquidGlassRef = useRef(null);

    useEffect(() => {
        const onPageShow = () => setKey(k => k + 1);
        window.addEventListener("pageshow", onPageShow);
        return () => window.removeEventListener("pageshow", onPageShow)
    }, []);

    const targetElement = useMemo(() => document.documentElement, []);

    useEffect(() => {
        liquidGlassRef?.current.forceUpdate(targetElement);
    });

    const glassStyle = useMemo(() => ({
        depth: 10,
        segments: 128,
        radius: 10,
        tint: 0xBBBBBB,
        reflectivity: 1,
        thickness: 50,
        dispersion: 10,
        roughness: 0.2,
    }), []);

    return (
        <div className="flex h-fit max-w-[100%] lg:max-w-[25%]">
            <LiquidGlass
                key={key}
                ref={liquidGlassRef}
                glassStyle={glassStyle}
                wrapperStyle={{display: "flex", maxWidth: "100%"}}
                style={"display: flex; align-items: center; min-width: 5rem; min-height: 5rem; max-width: 100%; padding: 1rem;"}
                targetElement={targetElement}
            >
                {children}
            </LiquidGlass>
        </div>
  )
}

export default Card
