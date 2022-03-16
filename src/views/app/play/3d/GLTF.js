import React, {useEffect, useState} from 'react';
import {Suspense} from "react";
import {Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {Environment, OrbitControls} from "@react-three/drei";
import BaseCanvas from "./BaseCanvas";
import SwitchBar from "./SwitchBar";
import Box from "@mui/material/Box";
import useWindowDimensions from "../../../../hook/useWindowDimensions";
import gsap from "gsap";
import * as THREE from "three";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

const Model = ({rsc}) => {
    const gltf = useLoader(GLTFLoader, rsc, (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(rsc);
        loader.setDRACOLoader(dracoLoader);
    });
    let tl = gsap.timeline()

    //models
    gltf.scene.rotation.set(6.4, 1.2, 6.3)
    gltf.scene.scale.set(1.2, 1.2, 1.2)
    tl.to(gltf.scene.rotation, {y: -6.9, duration: 2})
    tl.to(gltf.scene.scale, {x: 2, y: 2, z: 2, duration: 1}, "-=.5")
    tl.to(gltf.scene.position, {y: .8, duration: 1}, "-=.5")

    return (
        //todo: 大开心啊大开心, 给老子搞抑郁了都, 解决了一个大问题! 2022-3-16
        <group dispose={null}>
            <primitive object={gltf.scene} scale={1} />
        </group>
    );
};

//canvas的高度
const height = 600

function GLTF(props) {
    const {aspect} = useWindowDimensions()
    const [rsc, setRsc] = useState('/3d/gltf/helmet/DamagedHelmet.gltf')

    const size = {
        height: `${height}px`,
        width: `${height * aspect}px`
    }

    const doOnCanvasCreate = ({ gl,  scene}) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        gl.outputEncoding = THREE.sRGBEncoding
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
        gl.antialias = true
        gl.setClearAlpha(true)

        // scene.fog = new THREE.Fog( 0x59472b, 1000, 3000 );
        // scene.fog.color.set(new THREE.Color( '#25a18e'))
        scene.background = new THREE.Color( '#25a18e' );
    }

    const handleChangeResc = (src) => {
        setRsc(src)
    }

    return (
        <Box sx={{
            height: size.height,
            width: size.width,
            position: "relative",
            mb: '10px',
            boxShadow: "0 0 2px #3399ff",
            borderRadius: '20px',
            mixBlendMode: 'exclusion',
        }}>
            <Canvas style={{ borderRadius: '20px'}} onCreated={doOnCanvasCreate} >
                <Suspense fallback={null}>
                    <fog attach="fog" color={0x59472b} near={1} far={10} />
                    <ambientLight position={[5, 0, 0]} color='white' intensity={1}/>
                    <pointLight position={[-6, 5.08, 1.33]} color={0x60bc} intensity={6}/>
                    {/*<pointLight position={[2.13, -1.7, -2.1]} color={0xff0000} intensity={1.26}/>*/}
                    <Model rsc={rsc}/>
                    <OrbitControls/>
                </Suspense>
            </Canvas>
            <SwitchBar handleChangeResc={handleChangeResc}/>
        </Box>

    )
}

export default GLTF;