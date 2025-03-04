import { useEffect , useRef} from 'react'
import './App.css'

import * as THREE from 'three';
import { setup } from './utils/setup.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import bgimage from './assets/images/image.png';

// Import the GLB file
import spaceBoi from './assets/glb/space_boi.glb';
import spaceMan from './assets/glb/space_man.glb';

// post processing
/////////////////////////////////////////////////////////
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
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clockRef = useRef(new THREE.Clock());

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

    // define glb
    /////////////////////////////////////////////////////////
    // define glb
    let anti_spiral_glb: THREE.Group | undefined;
    let astronaut_glb: THREE.Group | undefined;

    {
      interface GLTFLoaderResult {
        scene: THREE.Group;
      }

      const gltfLoader = new GLTFLoader();

      // load anti spiral
      gltfLoader.load(
        spaceBoi,
        (gltf) => {
          anti_spiral_glb = gltf.scene;
          scene.add(anti_spiral_glb); // Add the loaded model to the scene
        },
        undefined, // Progress callback (optional)
        (error) => {
          console.error('Error loading GLB model:', error);
        }
      );

      // load astronaut
      // Load the Spaceman GLB model (animated)
      gltfLoader.load(
        spaceMan, // Use the imported URL
        (gltf) => {
          const spaceman = gltf.scene;
          spaceman.scale.set(1, 1, 1); // Adjust scale if needed
          spaceman.position.set(2, 2, 7); // Adjust position if needed
          spaceman.rotation.set(0, 2.0, 0); // Adjust rotation if needed
          scene.add(spaceman); // Add the loaded model to the scene

          // Set up the animation mixer
          mixerRef.current = new THREE.AnimationMixer(spaceman);

          // Play the "Idle" animation
          const clip = THREE.AnimationClip.findByName(gltf.animations, 'Idle');
          const action = mixerRef.current.clipAction(clip);
          action.play();
        },
        undefined, // Progress callback (optional)
        (error) => {
          console.error('Error loading Spaceman GLB model:', error);
        }
      );
    }

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
    // scene.add(ball);





    let isMounted = true;
    // animate
    function update() {
      if (!isMounted) return;  // Prevent updates after unmount

      // update uniforms
      ticks.value += 0.01;

      // rotate
      // ball.rotation.x += 0.01;
      // ball.rotation.y += 0.01;
      if (anti_spiral_glb) {
        anti_spiral_glb.rotation.y += 0.001;
      }

      if (mixerRef.current) {
        const delta = clockRef.current.getDelta(); // Get the time delta
        mixerRef.current.update(delta); // Advance the animation
      }


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
