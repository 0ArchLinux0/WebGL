import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import * as R from './Rotation.js';

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

    const cubeGroup = [
        [
            [],
            [],
            [],
        ],
        [
            [],
            [],
            []
        ],
        [
            [],
            [],
            []
        ]
    ]; //Better look than initializeing with for loop

    makeInstanceCube();


    camera.position.x = 4;
    camera.position.y = -4;
    camera.position.z = 4;

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        /*      const light = new THREE.DirectionalLight(color, intensity);
         
        /*    light.position.set(-1, 2, 4);
         */
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);

    }

    const yAxis = new THREE.Vector3(0, 1, 0);
    const RotateAxisY = () => {
        /*let count=0;*/
        cubeGroup.forEach((cubeinPlane) => {
            cubeinPlane.forEach((cubeinLine) => {
                cubeinLine.forEach((cubeElement) => {
                    if (cubeElement.cube.position.y == 1) {
                        cubeElement.angle.y += Math.PI / 120;
                        cubeElement.cube.position.x = Math.cos(cubeElement.angle.y) * cubeElement.initPosition.x - Math.sin(cubeElement.angle.y) * cubeElement.initPosition.z;
                        cubeElement.cube.position.z = Math.sin(cubeElement.angle.y) * cubeElement.initPosition.x + Math.cos(cubeElement.angle.y) * cubeElement.initPosition.z;
                        cubeElement.cube.rotation.y = -cubeElement.angle.y;
                    }

                    scene.add(cubeElement.cube);
                })
            });

        });
        /*RotateAxisY();
               if(count>3)*/
    }


    let renderRequested = false;
    //scene.add(testcube);
    let prev_time = 0;
    let clock = new THREE.Clock(true);

    const pause = () => {
        clock.start();
        const start_time = clock.startime;
        while (clock.getElapsedTime() < 5000) {}
        //console.log(clock.getElapsedTime()+"get prev"+prev_time);
        return;
    } //clock

    function render(time) {
        console.log("render");
        let time_var = time / 1000 * 30;
        if (time === undefined) { time_var = 0; }
        renderRequested = undefined;
        // pause(time); 왜 멈추지 대체
        const pixelRatio = window.devicePixelRatio;
        //console.log(pixelRatio); //my pc:1
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        if ((prevWidth !== canvas.width) || (prevHeight !== canvas.heigth)) { //size change
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio; //change canvas size
            prevWidth = canvas.width;
            prevHeight = canvas.height; //store prev value to compare
            renderer.setSize(window.innerWidth, window.innerHeight); //change render size
            //renderer.setClearColor(0xffffff);
            // setting camera aspect to prevent view from crushing
            camera.aspect = canvas.width / canvas.height;
            camera.updateProjectionMatrix();
        }
        console.log(prev_time + " " + time);
        controls.update();
        renderer.render(scene, camera);
        if (time - prev_time > 5000) {
            prev_time = time;
        }

    }

    //render();
    

    function requestRenderIfNotRequested() {

        if (!renderRequested) {
            renderRequested = true;
            requestAnimationFrame(render);           
        }

    }

    function requestRenderIfNotRequestedClick() {
        
        requestAnimationFrame(animate);
        //  console.log(time);
        //
        // console.log("rq:"+renderRequested);
        /* if (!renderRequested) {*/
        /* while (1) {                                                  // ###########render() executed after the fucntion ends... didn't work
             pause();    
             if (runCount++ > 60) { return; }
             renderRequested = false;
             render();
             // requestAnimationFrame(requestRend);
             //  console.log("click");                 
             console.log(runCount);
         }*/

        //}
        /*  if (!renderRequested) {
              renderRequested = true;
              requestAnimationFrame(render);
              // console.log("click"); 
              requestAnimationFrame(render);
              requestAnimationFrame(render);
              requestAnimationFrame(render);

              requestAnimationFrame(render);requestAnimationFrame(render);



              console.log(runCount);
          }*/
    }

     let isInitialized=false;
     let i = 0;

    function animate(time) {
        if(!isInitialized){i=0;isInitialized=true;}
        console.log("animate "+i);

        if (i++ == 60) { i=0; return 1; }
        console.log(i);
        requestAnimationFrame(animate);
        //console.log("render");
        let time_var = time / 1000 * 30;
        if (time === undefined) { time_var = 0; }
        renderRequested = undefined;
        // pause(time); 왜 멈추지 대체
        const pixelRatio = window.devicePixelRatio;
        //console.log(pixelRatio); //my pc:1
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        if ((prevWidth !== canvas.width) || (prevHeight !== canvas.heigth)) { //size change
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio; //change canvas size
            prevWidth = canvas.width;
            prevHeight = canvas.height; //store prev value to compare
            renderer.setSize(window.innerWidth, window.innerHeight); //change render size
            //renderer.setClearColor(0xffffff);
            // setting camera aspect to prevent view from crushing
            camera.aspect = canvas.width / canvas.height;
            camera.updateProjectionMatrix();
        }

        RotateAxisY();

        //console.log(prev_time + " " + time);
        controls.update();
        renderer.render(scene, camera);
        if (time - prev_time > 5000) {
            prev_time = time;
        }

    }



    controls.addEventListener('change', requestRenderIfNotRequested); //called first at initializing
    window.addEventListener('click', requestRenderIfNotRequestedClick);
    window.addEventListener('resize', requestRenderIfNotRequested);



    function makeInstanceCube() {
        const Cubegeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                for (let k = -1; k < 2; k++) {
                    const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
                    const boxmaterials = new THREE.MeshBasicMaterial({ color: "blue" });
                    const check = new THREE.Mesh(boxGeometry, boxmaterials);

                    const cubeMaterialColors = setMaterialColors(i, j, k, boxmaterials);
                    const cube = new THREE.Mesh(Cubegeometry, cubeMaterialColors);
                    //  cubeGroup[i+1][j+1].push(cube);
                    cube.position.x = i;
                    cube.position.y = j;
                    cube.position.z = k;
                    const initPosition = { x: i, y: j, z: k };
                    const angle = { x: 0, y: 0, z: 0 };
                    cubeGroup[i + 1][j + 1][k + 1] = { cube, initPosition, angle };
                    console.log(cube);
                    /* scene.add(cube);*/
                }
            }
        }
    }
    console.log("main");

}

main();