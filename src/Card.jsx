import {useMemo, useEffect, useRef} from "react"
import {LiquidGlass} from "@specy/liquid-glass-react"

function Card({children}) {
    const liquidGlassRef = useRef(null);

    useEffect(() => {
        liquidGlassRef?.current.forceUpdate(document.documentElement);
    });

    const glassStyle = useMemo(() => ({
        depth: 10,
        segments: 128,
        radius: 10,
        tint: null,
        reflectivity: 1,
        thickness: 50,
        dispersion: 10,
        roughness: 0.2,
    }), []);

    return (
        <LiquidGlass
            ref={liquidGlassRef}
            glassStyle={glassStyle}
            wrapperStyle={{display: "flex", maxWidth: "100%"}}
            style={"display: flex; min-width: 5rem; min-height: 5rem; max-width: 100%; padding: 1rem; margin-left: 1rem; margin-right: 1rem; margin-top: 1rem;"}
            targetElement={document.documentElement}
        >
            {children}
        </LiquidGlass>
  )
}

export default Card
