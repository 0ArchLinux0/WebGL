import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15);
    /*PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
    fov — Camera frustum vertical field of view. degrees
    aspect — Camera frustum aspect ratio. 
    near — Camera frustum near plane.
    far — Camera frustum far plane.*/

    const canvas = document.querySelector('#canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let prevWidth = canvas.width;
    let prevHeight = canvas.height;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight); //setting drawing buffersize
    //dirrent to canvas size setting in css
    document.body.appendChild(renderer.domElement);


    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); //object contains all the verticles and faces of the cube.
    const materialNotAffectedByLights = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); //material to color it(+extra)
    const materialAfftectedByLights = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); //takes geometry and applies a material merging
    const cubes = [
        makeInstanceCube("red", -1, 0, 0),
        makeInstanceCube("red", 0, 0, 0),
        makeInstanceCube("red", 1, 0, 0),
        makeInstanceCube("green", -1, 1, 0),
        makeInstanceCube("green", 0, 1, 0),
        makeInstanceCube("green", 1, 1, 0),
        makeInstanceCube("blue", -1, -1, 0),
        makeInstanceCube("blue", 0, -1, 0),
        makeInstanceCube("blue", 1, -1, 0),

        makeInstanceCube("red", -1, 0, 1),
        makeInstanceCube("red", 0, 0, 1),
        makeInstanceCube("red", 1, 0, 1),
        makeInstanceCube("green", -1, 1, 1),
        makeInstanceCube("green", 0, 1, 1),
        makeInstanceCube("green", 1, 1, 1),
        makeInstanceCube("blue", -1, -1, 1),
        makeInstanceCube("blue", 0, -1, 1),
        makeInstanceCube("blue", 1, -1, 1),

        makeInstanceCube("red", -1, 0, -1),
        makeInstanceCube("red", 0, 0, -1),
        makeInstanceCube("red", 1, 0, -1),
        makeInstanceCube("green", -1, 1, -1),
        makeInstanceCube("green", 0, 1, -1),
        makeInstanceCube("green", 1, 1, -1),
        makeInstanceCube("blue", -1, -1, -1),
        makeInstanceCube("blue", 0, -1, -1),
        makeInstanceCube("blue", 1, -1, -1),
    ];


    camera.position.x = 4;
    camera.position.y = -4;
    camera.position.z = 4;

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    let renderRequested = false;

    function render() {
        console.log("render start");
        renderRequested = undefined;
        const pixelRatio = window.devicePixelRatio;
        console.log(pixelRatio);
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        if ((prevWidth !== canvas.width) || (prevHeight !== canvas.hegith)) { //size change
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio; //change canvas size
            prevWidth = canvas.width;
            prevHeight = canvas.height; //store prev value to compare
            renderer.setSize(window.innerWidth, window.innerHeight); //change render size
            renderer.setClearColor(0xffffff);
            // setting camera aspect to prevent view from crushing
            camera.aspect = canvas.width / canvas.height;
            camera.updateProjectionMatrix();
            //
        }
        /* cube.rotation.x += 0.01;
         cube.rotation.y += 0.01
         cubes.forEach((cube, index) => {
             cube.rotation.x += -0.01;
             cube.rotation.y += 0.01;
         });*/
        controls.update();
        renderer.render(scene, camera);
    }
    render();

    function requestRenderIfNotRequested() {
        if (!renderRequested) {
            renderRequested = true;
            requestAnimationFrame(render);
        }
    }

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested); // 역할 찾아보기

    function makeInstanceCube(color, x, y, z) {
        const materialNotAffectedByLights = new THREE.MeshPhongMaterial({ color });
        const cube = new THREE.Mesh(geometry, materialNotAffectedByLights)
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        scene.add(cube);
        return cube;
    }
}

main();