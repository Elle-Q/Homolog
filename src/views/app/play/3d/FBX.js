import React from 'react';
import gsap from "gsap";
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const Model = ({rsc}) => {
    const fbx = useLoader(FBXLoader, rsc)

    let tl = gsap.timeline()
    //models
    fbx.scene.rotation.set(6.4, 1.2, 6.3)
    fbx.scene.scale.set(1.2, 1.2, 1.2)
    tl.to(fbx.scene.rotation, {y: -6.9, duration: 2})
    tl.to(fbx.scene.scale, {x: 2, y: 2, z: 2, duration: 1}, "-=.5")
    tl.to(fbx.scene.position, {y: .8, duration: 1}, "-=.5")

    return (
        <group dispose={null}>
            <primitive object={fbx.scene} scale={1}/>
        </group>
    );
};


function FBX({rsc}) {
    return (
        <Model rsc={rsc}/>
    )
}

export default FBX;