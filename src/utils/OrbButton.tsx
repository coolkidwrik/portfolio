import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// get glsl code
/////////////////////////////////////////////////////////
// import raw code from files
// toon shader
import toonVS from '../utils/glsl/Toon/toon.vs.glsl?raw';
import toonFS from '../utils/glsl/Toon/toon.fs.glsl?raw';
/////////////////////////////////////////////////////////

interface OrbButtonProps {
  onClick?: () => void;
  lightX?: number;
  lightZ?: number;
}


const OrbButton: React.FC<OrbButtonProps> = ({ onClick, lightX = 2.5, lightZ = 4 }) => {
const containerRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
    if (!containerRef.current) return;

    // We create the <canvas> ourselves so it can be thrown away on unmount
    // together with its WebGL context (see cleanup below).
    const canvas = document.createElement("canvas");
    canvas.className = "absolute";
    containerRef.current.appendChild(canvas);

    // set up Three.js
    ////////////////////////////////////////////////////////
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    // Ensure no extra space
    const size = 120; // Adjust the size of the orb
    renderer.setSize(size, size);
    camera.position.z = 1.5;

    const light = new THREE.Vector3(0, 0, 15);


    // Orb shape and material
    // define geometry
    ////////////////////////////////////////////////////////
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);

    // define material
    ////////////////////////////////////////////////////////
    // TOON
    const toonMaterial = new THREE.ShaderMaterial({
        uniforms: {
            lightPosition: { value: light },
            toonColor: { value: new THREE.Color(0.09, 1.0, 0.62) },   // bright part
            toonColor2: { value: new THREE.Color(0.07, 0.2, 0.6) },   // dark part
            outlineColor: { value: new THREE.Color(0.0, 0.14, 0.03) },
            steps: { value: 5.0 }
        },
        vertexShader: toonVS,
        fragmentShader: toonFS
    });

    // define Mesh
    ////////////////////////////////////////////////////////
    const orb = new THREE.Mesh(geometry, toonMaterial);
    scene.add(orb);

    // The orb never moves; only its light changes with scroll position.
    // So instead of re-rendering 60 times a second forever, we render once
    // per animation frame *only* when the user has scrolled.
    let frameId: number | null = null;

    const render = () => {
        frameId = null;
        const scrollFactor = window.scrollY / window.innerHeight;
        const y = 5 - scrollFactor * 10;           // Adjust Y based on scroll
        const x = lightX * (1 - scrollFactor);     // Adjust X based on scroll
        toonMaterial.uniforms.lightPosition.value.set(x, y, lightZ);
        renderer.render(scene, camera);
    };

    const handleScroll = () => {
        if (frameId === null) frameId = requestAnimationFrame(render);
    };

    // Keep a reference to the *same* function so removeEventListener works.
    window.addEventListener("scroll", handleScroll, { passive: true });
    render(); // initial frame, lit correctly for the current scroll position

    return () => {
        // Cleanup Three.js resources on unmount
        window.removeEventListener("scroll", handleScroll);
        if (frameId !== null) cancelAnimationFrame(frameId);
        geometry.dispose();
        toonMaterial.dispose();
        renderer.dispose();
        renderer.forceContextLoss(); // release the WebGL context immediately
        canvas.remove();
    };
}, [lightX, lightZ]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer"
      style={{ width: 'min(20vw, 5rem)', height: 'min(20vw, 5rem)' }}
    />
  );
};

export default OrbButton;
