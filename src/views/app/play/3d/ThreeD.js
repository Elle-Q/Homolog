import React, {useEffect} from 'react';
import * as THREE from "three";

const cavasHeight = 600

function ThreeD(props) {
    const aspect = window.innerWidth / window.innerHeight;
    const cavasWidth = cavasHeight * aspect;

    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera( 55, aspect, 0.1, 1000 );

        const canvas = document.getElementById("3d-canvas")
        const renderer = new THREE.WebGLRenderer({
            canvas:canvas
        });

        renderer.setSize( cavasWidth, cavasHeight);
        // document.body.appendChild( renderer.domElement);

        const geometry = new THREE.ConeBufferGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 'red' } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame( animate );

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render( scene, camera);
        }

        animate();
    },[])


    return (
        // <Box>
        <canvas width={cavasWidth} height={cavasHeight} id="3d-canvas"> < /canvas>
        // </Box>
    );
}

export default ThreeD;