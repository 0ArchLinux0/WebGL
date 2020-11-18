import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15);

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

    const COLOR_DIRECTIONS = {
        "UP": new THREE.Color("white"),
        "DOWN": new THREE.Color("yellow"),
        "RIGHT": new THREE.Color("blue"),
        "LEFT": new THREE.Color("green"),
        "FRONT": new THREE.Color("red"),
        "BACK": new THREE.Color("orange"),
    }


    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); //object contains all the verticles and faces of the cube.
    const materialNotAffectedByLights = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); //material to coboxlor it(+extra)
    const materialAfftectedByLights = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); //takes geometry and applies a material merging
    const PIECE_MATERIAL = new THREE.MeshPhysicalMaterial({
        color: "white",
        vertexColors: THREE.FaceColors,
        metalness: 0,
        roughness: 0,
        clearcoat: 1,
        reflectivity: 1
    });

    const setMaterialColors = (x, y, z, materials) => {

        const colorMaterials = [];

        for (let i = 0; i < 6; i++) {
            colorMaterials.push(new THREE.MeshBasicMaterial({ color: "#282828" }));
        }
        x == 1 && (colorMaterials[0] = new THREE.MeshBasicMaterial({ color: COLOR_DIRECTIONS["RIGHT"] }));
        x == -1 && (colorMaterials[1] = new THREE.MeshBasicMaterial({ color: COLOR_DIRECTIONS["LEFT"] }));
        y == 1 && (colorMaterials[2] = new THREE.MeshBasicMaterial({ color: COLOR_DIRECTIONS["UP"] }));
        y == -1 && (colorMaterials[3] = new THREE.MeshBasicMaterial({ color: COLOR_DIRECTIONS["DOWN"] }));
        z == 1 && (colorMaterials[4] = new THREE.MeshBasicMaterial({ color: COLOR_DIRECTIONS["FRONT"] }));
        z == -1 && (colorMaterials[5] = new THREE.MeshBasicMaterial({ color: COLOR_DIRECTIONS["BACK"] }));

        return colorMaterials;
    }

    const testcube = new THREE.Mesh(geometry, PIECE_MATERIAL);
    testcube.position.x = 0;
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
        /*      const light = new THREE.DirectionalLight(color, intensity);
         */
        /*    light.position.set(-1, 2, 4);
         */
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);

    }

    let renderRequested = false;
    //scene.add(testcube);

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
            //renderer.setClearColor(0xffffff);
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

    /*function makeInstanceCube(x, y, z,color) {
        const cubegeometry = new THREE.BoxGeometry(1, 1, 1); //object contains all the verticles and faces of the cube.
        //const cube_geometry_ = setGeometryFaceColors(piece, pieceGeometry)
        const materialNotAffectedByLights = new THREE.MeshPhongMaterial({ color });
        const cube = new THREE.Mesh(geometry, materialNotAffectedByLights)
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
       // scene.add(cube);
        return cube;
    }*/

    function makeInstanceCube() {
        const Cubegeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                for (let k = -1; k < 2; k++) {
                    const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
                    const boxmaterials = [
                        /* new THREE.MeshBasicMaterial({color:"blue"}),
                         new THREE.MeshBasicMaterial({color: "blue"}),
                         new THREE.MeshBasicMaterial({color: "blue"}),
                         new THREE.MeshBasicMaterial({color: "blue"}),
                         new THREE.MeshBasicMaterial({color: "blue"}),*/
                        new THREE.MeshBasicMaterial({ color: "blue" }),
                    ];
                    const check = new THREE.Mesh(boxGeometry, boxmaterials);

                    const cubeMaterialColors = setMaterialColors(i, j, k, boxmaterials);
                    const cube = new THREE.Mesh(Cubegeometry, cubeMaterialColors);

                    cube.position.x = i;
                    cube.position.y = j;
                    cube.position.z = k;
                    scene.add(cube);
                }
            }
        }
    }

}

main();