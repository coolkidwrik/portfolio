import { useEffect , useRef} from 'react'
import './App.css'

import * as THREE from 'three';
import { setup } from './utils/setup.js';
// import bgimage from './assets/images/image.png';

import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/////////////////////////////////////////////////////////
// get glsl code
/////////////////////////////////////////////////////////
// import raw code from files
// diamond shader
import diamondVS from './utils/glsl/Diamond/diamond.vs.glsl?raw';
import diamondFS from './utils/glsl/Diamond/diamond.fs.glsl?raw';

/////////////////////////////////////////////////////////

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
  
    const { renderer, scene, camera } = setup(canvasRef.current);

    // post processing
    const renderPass = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);

    // Bloom pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    );

    composer.addPass(bloomPass);



    // Load background texture
    // const loader = new THREE.TextureLoader();
    // loader.load(bgimage, (texture) => {
    //   texture.colorSpace = THREE.SRGBColorSpace; // Ensures correct color space
    //   scene.background = texture;
    // }, undefined, (error) => {
    //   console.error('Error loading texture:', error);
    // });
  
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // time ticks
    const ticks = { type: "f", value: 0.0 };

    // define geometry
    /////////////////////////////////////////////////////////
    // sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(0.8, 12);;

    /////////////////////////////////////////////////////////

    // define materials
    /////////////////////////////////////////////////////////
    // DIAMOND
    const diamondMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ticks: ticks
      },
      vertexShader: diamondVS,
      fragmentShader: diamondFS,
      transparent: true,
      depthWrite: false, // Prevents z-fighting issues with transparent objects
    });
    
    /////////////////////////////////////////////////////////

    // define mesh
    /////////////////////////////////////////////////////////
    const ball = new THREE.Mesh(sphereGeometry, diamondMaterial);
  


    // add elements to the scene
    /////////////////////////////////////////////////////////
    scene.add(ball);




    let isMounted = true;
  
    function update() {
      if (!isMounted) return;  // Prevent updates after unmount

      // update uniforms
      ticks.value += 0.01;


      ball.rotation.x += 0.01;
      ball.rotation.y += 0.01;
      // renderer.render(scene, camera);
      composer.render();
      requestAnimationFrame(update);
    }
  
    update();
  
    return () => {
      isMounted = false; // Stop animation
      renderer.dispose(); // Dispose of the WebGL context
      window.removeEventListener('resize', () => {}); // Remove resize listener
    };
  }, []);





  return (
    <div className="App">
      <canvas id="threejscanvas" ref={canvasRef} />
    </div>
  )
}

export default App
