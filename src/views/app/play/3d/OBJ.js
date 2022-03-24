import React from 'react';
import gsap from "gsap";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'

const Model = ({rsc}) => {
    const obj = useLoader(OBJLoader, '/Poimandres.obj')

    let tl = gsap.timeline()
    //models
    obj.scene.rotation.set(6.4, 1.2, 6.3)
    obj.scene.scale.set(1.2, 1.2, 1.2)
    tl.to(obj.scene.rotation, {y: -6.9, duration: 2})
    tl.to(obj.scene.scale, {x: 2, y: 2, z: 2, duration: 1}, "-=.5")
    tl.to(obj.scene.position, {y: .8, duration: 1}, "-=.5")

    return (
        <group dispose={null}>
            <primitive object={obj.scene} scale={1}/>
        </group>
    );
};


function OBJ({rsc}) {
    return (
        <Model rsc={rsc}/>
    )
}

export default OBJ;