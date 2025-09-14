import {useMemo, useEffect, useState, useRef} from "react"
import {LiquidGlass} from "@specy/liquid-glass-react"

function FullBar({children}) {
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
        <LiquidGlass
            key={key}
            ref={liquidGlassRef}
            glassStyle={glassStyle}
            wrapperStyle={{display: "flex", width: "100%"}}
            style={"display: flex; align-items: center; width: 100%; height: 4rem; padding: 1rem;"}
            targetElement={targetElement}
        >
            {children}
        </LiquidGlass>
  )
}

export default FullBar
