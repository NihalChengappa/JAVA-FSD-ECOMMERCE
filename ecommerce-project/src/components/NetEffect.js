import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min.js';

const useVantaNetEffect = () => {
    const vantaRef = useRef(null);

    useEffect(() => {
        const initVantaEffect = () => {
            NET({
                el: vantaRef.current,
                THREE: THREE,
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                minHeight: 200.0,
                minWidth: 200.0,
                scale: 1.0,
                scaleMobile: 1.0,
                color: 0x3c62ae,
                backgroundColor: 0xffffff,
                points: 15.0,
                maxDistance: 20.0,
                spacing: 15.0,
            });
        };

        initVantaEffect();

        return () => {
            if (vantaRef.current) {
                vantaRef.current.destroy();
            }
        };
    }, []);

    return vantaRef;
};

export default useVantaNetEffect;
