import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import * as R from './Rotation.js';
import { isMobile } from './mobile_detect.js';
export const scene = new THREE.Scene();

function main() {

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15);
    const canvas = document.querySelector('#canvas');
    const pixelRatio = window.devicePixelRatio;
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    let prevWidth = canvas.width;
    let prevHeight = canvas.height;
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = false; //rotate as if it has a inertia
    controls.target.set(0, 0, 0);
    controls.update();

    let isDrag=false;
    let isDown=false;
    let isTouchMove=false;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight); //setting drawing buffersize
    renderer.setClearColor(0xdee2e6);
    document.body.appendChild(renderer.domElement);

    const COLOR_DIRECTIONS = {
        "UP": new THREE.Color("white"),
        "DOWN": new THREE.Color("yellow"),
        "RIGHT": new THREE.Color("blue"),
        "LEFT": new THREE.Color("green"),
        "FRONT": new THREE.Color("red"),
        "BACK": new THREE.Color("orange"),
    }

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


    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        /*      const light = new THREE.DirectionalLight(color, intensity);
         
        /*    light.position.set(-1, 2, 4);
         */
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);

    }

let renderRequested = false;

    function render() {
        if ((!isMobile) && ((prevWidth !== canvas.width) || (prevHeight !== canvas.heigth))) { //size change
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
        controls.update();
        renderer.render(scene, camera);
        renderRequested = undefined;
    }

    render();

    function requestRender() {

        if (!renderRequested) {
            renderRequested = true;
            requestAnimationFrame(render);
        }

    }

    let countClick = 0;
    let isRunning = false;
    let ran_num=0;
    function requestRenderClick() {
        //console.log(!isRunning+" click "+countClick+" ran: "+ran_num);
            countClick++;
        if (!isRunning) {
            isRunning = true;
            requestAnimationFrame(animate);
        }
    }

        let i = 0;

        function animate(time) {

            if (i++ == 60) {
                i = 0;
                ran_num=parseInt(Math.random()*5+1);
                isRunning = undefined;
                return;
            }
            switch (ran_num) {
                case 3:
                    R.RotateAxis(cubeGroup, "X", -1);
                    break;
                case 1:
                    R.RotateAxis(cubeGroup, "Y", 1);
                    break;
                case 2:
                    R.RotateAxis(cubeGroup, "Z", 0);
                    break;
                case 0:
                    R.RotateAxis(cubeGroup, "X", 1);
                    break;
                case 4:
                    R.RotateAxis(cubeGroup, "X", 1);
                    break;
                case 5:
                    R.RotateAxis(cubeGroup, "Y", 1);
                    break;
                default:
                    R.RotateAxis(cubeGroup, "Z", 1);
                    break;
            }
            
            // pause(time); 왜 멈추지 대체
        
            if ((!isMobile) && (prevWidth !== canvas.width) || (prevHeight !== canvas.heigth)) { //size change
                canvas.width = window.innerWidth * pixelRatio;
                canvas.height = window.innerHeight * pixelRatio; //change canvas size
                prevWidth = canvas.width;
                prevHeight = canvas.height; //store prev value to compare
                renderer.setSize(window.innerWidth, window.innerHeight); //change render size
                // setting camera aspect to prevent view from crushing
                camera.aspect = canvas.width / canvas.height;
                camera.updateProjectionMatrix();
            }
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
         
        }
        //########  Desktop 
        function onDown(){
            isDown=true;
            console.log("ondown isdown: "+isDown);
        }
        function onUp(){
            console.log("on up");
            console.log(isDrag);
            isDown=false;
            if(isDrag){
                isDrag=false;
                console.log("is drag");
                return;
            }
            else requestRenderClick();
        }


        function onMouseMove(){
            console.log("onmouse MOve!!!");
            if(isDown){
                isDrag=true;
                requestRender();
                console.log("isDrag in is Donw "+isDrag);
            }
            return ;
        }
        //######

        //#####  Mobile
        function onTouchStart(){
            console.log("onTouchstart");
          
                isDown=true;
             
        }

        function onTouchMove(){
            console.log("onTouchMove");
            if(isDown){
            isTouchMove=true;
            }
            requestRender();
        }

        function onTouchEnd(){
            console.log("onTouchEnd");
            if(isTouchMove){
                isTouchMove=false;
                return;
            }
            requestRenderClick();
        }
        //######



        controls.addEventListener('change', requestRender, false); //called first at initializing
        window.addEventListener('pointerup', onUp, false);
        window.addEventListener('pointerdown', onDown, false);
        window.addEventListener('pointermove', onMouseMove, false);
        window.addEventListener('resize', requestRender, false);
       // window.addEventListener('touchstart', onTouchStart, false);
       // window.addEventListener('touchmove', onTouchMove, false);
       // window.addEventListener('touchend', onTouchEnd, false);



        function makeInstanceCube() {
            const Cubegeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    for (let k = -1; k < 2; k++) {

                        const boxmaterials = new THREE.MeshBasicMaterial({});
                        const cubeMaterialColors = setMaterialColors(i, j, k, boxmaterials);
                        const cube = new THREE.Mesh(Cubegeometry, cubeMaterialColors);
                        cubeGroup[i + 1][j + 1].push(cube);
                        cube.position.x = i;
                        cube.position.y = j;
                        cube.position.z = k;
                        const initPosition = { x: i, y: j, z: k };
                        const angle = { x: 0, y: 0, z: 0 };
                        const storePosition = { x: 0, y: 0, z: 0, stored: false };
                        const rotAxisYMatrix = math.matrix([
                            [1, 0, 0],
                            [0, 1, 0],
                            [0, 0, 1]
                        ]);
                        const rotAxisZMatrix = math.matrix([
                            [1, 0, 0],
                            [0, 1, 0],
                            [0, 0, 1]
                        ]);
                        const AxisDeterm = 0;

                        cubeGroup[i + 1][j + 1][k + 1] = {
                            cube,
                            initPosition,
                            storePosition,
                            angle,
                            rotAxisYMatrix,
                            rotAxisZMatrix,
                            AxisDeterm
                        };
                        scene.add(cube);

                    }
                }
            }
        }
    }
    main();