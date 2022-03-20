import React, {useEffect, useState} from 'react';
import {useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from "gsap";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {useGLTF} from "@react-three/drei";

const Model = ({rsc}) => {
    const gltf = useGLTF(rsc)
    // const gltf = useLoader(GLTFLoader, rsc, (loader) => {
    //     const dracoLoader = new DRACOLoader();
    //     dracoLoader.setDecoderPath(rsc);
    //     loader.setDRACOLoader(dracoLoader);
    // });
    let tl = gsap.timeline()

    //models
    gltf.scene.rotation.set(6.4, 1.2, 6.3)
    gltf.scene.scale.set(1.2, 1.2, 1.2)
    tl.to(gltf.scene.rotation, {y: -6.9, duration: 2})
    tl.to(gltf.scene.scale, {x: 2, y: 2, z: 2, duration: 1}, "-=.5")
    tl.to(gltf.scene.position, {y: .8, duration: 1}, "-=.5")

    return (
        //todo: 大开心啊大开心, 搞抑郁了都 2022-3-16
        <group dispose={null}>
            <primitive object={gltf.scene} scale={1}/>
        </group>
    );
};


function GLTF({rsc}) {

    return (
        <Model rsc={rsc}/>
    )
}

export default GLTF;