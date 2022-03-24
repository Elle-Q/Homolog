import React, {Suspense} from 'react';
import Box from "@mui/material/Box";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import GLTF from "../play/3d/GLTF";

function Partner(props) {

    const doOnCanvasCreate = ({ gl,  scene}) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        gl.outputEncoding = THREE.sRGBEncoding
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
        gl.antialias = true
        gl.setClearAlpha(true)
        scene.background = new THREE.Color( '#25a18e' );
    }

    return (
        <Box sx={{
            height:  '100%' ,
            width:   '100%' ,
            position:  'fixed' ,
            // mixBlendMode:  "exclusion",
            // zIndex:99999,
            top:0,
            left:0,
        }}>
            <Canvas style={{ borderRadius: '20px'}} onCreated={doOnCanvasCreate} >
                <Suspense fallback={null}>
                    <fog attach="fog" color={0x59472b} near={1} far={10} />
                    <ambientLight position={[5, 0, 0]} color='white' intensity={2}/>
                    <pointLight position={[-6, 5.08, 1.33]} color={0x60bc} intensity={6}/>
                    <pointLight position={[2.13, -1.7, -2.1]} color={0xff0000} intensity={1.26}/>
                    <GLTF rsc='/3d/gltf/mirror/mirror.gltf'/>
                    <OrbitControls/>
                </Suspense>
            </Canvas>
        </Box>
    );
}

export default Partner;