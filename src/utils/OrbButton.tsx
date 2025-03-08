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
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(2, 2, 2);
    scene.add(light);


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
            lightPosition: { value: light.position },
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

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer"
      style={{ width: "120px", height: "120px" }} // Exact size of the orb
    >
      <canvas ref={canvasRef} className="absolute" />
    </div>
  );
};

export default OrbButton;
