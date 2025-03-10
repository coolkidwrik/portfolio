import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// get glsl code
/////////////////////////////////////////////////////////
// import raw code from files
// toon shader
import toonVS from '../utils/glsl/Toon/toon.vs.glsl?raw';
import toonFS from '../utils/glsl/Toon/toon.fs.glsl?raw';
/////////////////////////////////////////////////////////


const OrbButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
const canvasRef = useRef<HTMLCanvasElement | null>(null);

useEffect(() => {
    if (!canvasRef.current) return;

    // set up Three.js
    ////////////////////////////////////////////////////////
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    // Ensure no extra space
    const size = 120; // Adjust the size of the orb
    renderer.setSize(size, size);
    camera.position.z = 1.5;
    
    
    // Lighting for depth
    // no need for actual light
    // const light = new THREE.PointLight(0xffffff, 1);
    // light.position.set(2, 2, 5);
    // scene.add(light);
    const light = new THREE.Vector3(0, 0, 5);


    // Orb shape and material
    // define geometry
    ////////////////////////////////////////////////////////
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);

    // define geometry
    ////////////////////////////////////////////////////////
    // TOON
    const toonColor = { type: 'c', value: new THREE.Color(1.0, 0.8, 0.4) };
    const toonColor2 = { type: 'c', value: new THREE.Color(0.85, 0.07, 0.0) };
    const outlineColor = { type: 'c', value: new THREE.Color(0.0, 0.14, 0.03) };

    const toonMaterial = new THREE.ShaderMaterial({
        uniforms: {
            lightPosition: { value: light },
            toonColor: { value: toonColor.value },
            toonColor2: { value: toonColor2.value },
            outlineColor: { value: outlineColor.value },
            steps: { value: 5.0 }
        },
        vertexShader: toonVS,
        fragmentShader: toonFS
    });

    // define Mesh
    ////////////////////////////////////////////////////////
    const orb = new THREE.Mesh(geometry, toonMaterial);

    // Add orb to scene
    scene.add(orb);

    // Track light position based on cursor and scroll
    const updateLightPosition = (event?: MouseEvent) => {
        const scrollFactor = window.scrollY / window.innerHeight;
        let x = 0, y = 0;

        if (event) {
            x = (event.clientX / window.innerWidth) * 2 - 1;
            y = -(event.clientY / window.innerHeight) * 2 + 1;
        }

        toonMaterial.uniforms.lightPosition.value.set(x * 2, y * 2 - scrollFactor * 2, 5);
        // light.set(x * 2, y * 2 - scrollFactor * 2, 5);
        toonMaterial.needsUpdate = true;
        // console.log(light);
        // console.log("uniform: ->>>", toonMaterial.uniforms.lightPosition.value.x);
    };

    // Attach event listeners
    window.addEventListener("mousemove", updateLightPosition);
    window.addEventListener("scroll", () => updateLightPosition());


    const update = () => {
        requestAnimationFrame(update);
        renderer.render(scene, camera);
    };

    update();

    return () => {
        // Cleanup Three.js resources on unmount
        window.removeEventListener("mousemove", updateLightPosition);
        window.removeEventListener("scroll", () => updateLightPosition());
        renderer.dispose();
    };
}, []);

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer"
      style={{ width: '4rem', height: '4rem' }}
    >
      <canvas ref={canvasRef} className="absolute" />
    </div>
  );
};

export default OrbButton;
