import React from 'react';
import {useFrame} from '@react-three/fiber'
import gsap from "gsap";
import * as THREE from "three";
import {useGLTF} from "@react-three/drei";

const Model = ({rsc, onComplete}) => {

    const gltf = useGLTF(rsc)
    let tl = gsap.timeline()

    //models
    gltf.scene.position.set(1, 1, 0);
    gltf.scene.rotation.set(0, .5, 0);
    gltf.scene.scale.set(.008, .008, .008);
    // gltf.scene.scale.set(1, 1, 1);

    tl.to(gltf.scene.rotation, {y: -6.9, duration: 2})
    // tl.to(gltf.scene.scale, {x: 2, y: 2, z: 2, duration: 1}, "-=.5")
    tl.to(gltf.scene.position, {y: .8, duration: 1}, "-=.5")


    let mixer
    if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach(clip => {
            const action = mixer.clipAction(clip)
            action.play();
        });
    }

    useFrame((state, delta) => {
        mixer?.update(delta)
    })

    //加载完成
    onComplete(false)

    return (
        //todo: 大开心啊大开心, 搞抑郁了都 2022-3-16
        <group dispose={null}>
            <primitive object={gltf.scene} />
        </group>
    );
};


function GLB(props) {

    return (
        <Model {...props} />
    )
}

export default GLB;