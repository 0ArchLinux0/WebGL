import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import * as R from './Rotation.js';
import { isMobile } from './mobile_detect.js';
import * as CubeSolver from './CubeSolver.js'
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15);
export const rotateAgain=(solveCubeButtonListener)=>{
 
    };

function main() {

    const SHUFFLE_TIME = 6;
    const CLOCKWISE = 1;
    const ANTICLOCKWISE = -1;

    const canvas = document.querySelector('#canvas');
    const pixelRatio = window.devicePixelRatio;
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    let prevWidth = canvas.width;
    let prevHeight = canvas.height;

    const controls = new OrbitControls(camera, canvas); //Enable camera rotation when drag
    controls.enableDamping = false; //rotate as if it has a inertia
    controls.target.set(0, 0, 0); //Center of rotation
    controls.update();

    let isDrag = false;
    let isDown = false;
    let isTouchMove = false;
    let buttonDown = false;

    const renderer = new THREE.WebGLRenderer({ canvas }); //Render on canvas
    renderer.setSize(window.innerWidth, window.innerHeight); //setting drawing buffersize
    renderer.setClearColor(0xdee2e6); //Background color 
    document.body.appendChild(renderer.domElement); //Push

    const COLOR_DIRECTIONS = {
        "UP": new THREE.Color("white"),
        "DOWN": new THREE.Color("yellow"),
        "RIGHT": new THREE.Color("blue"),
        "LEFT": new THREE.Color("green"),
        "FRONT": new THREE.Color("red"),
        "BACK": new THREE.Color("orange"),
    }

    const setMaterialColors = (x, y, z, materials) => { //Create Materials with Color on each face

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


    camera.position.x = 4; //Set camera's default position
    camera.position.y = 4;
    camera.position.z = 4;

    { //Set light
        const color = 0xFFFFFF;
        const intensity = 1;
        /*      const light = new THREE.DirectionalLight(color, intensity); //Direct Light
         
        /*    light.position.set(-1, 2, 4);
         */
        const light = new THREE.AmbientLight(color, intensity); //Light up the entire space
        scene.add(light); //Add

    }

    let renderRequested = false;

    function render(time) { //Render(When camera rotate or etc...)
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

    function requestRender() { //Check if Render is running

        if (!renderRequested) {
            renderRequested = true;
            requestAnimationFrame(render); //Callback render
        }

    }
    /*
        function requestRender_shuffle_once() { //Check if Render is running

            if (!renderRequested) {
                renderRequested = true;
                requestAnimationFrame(animate_click); //Callback render
            }

        }*/

    let isRunning = false;
    let ran_num = parseInt(Math.random() * 3 - 0.1);

    function requestRenderShuffle() {
        buttonDown = true;
        if (!isRunning) { //Check if animate or animate_shuffle is running at the spot. Prevent malfunctioning caused by click event's asynchronism(rotate in different ways at same time so it stops rotating or rotate to wrong way)
            isRunning = true;
            requestAnimationFrame(animate_shuffle); //Callback animate_shuffle
        }
    }

    let i = 0;
    let arg1 = String.fromCharCode(88 + ran_num); //88 is 'X'
    let arg2 = (parseInt(Math.random() * 100) % 3 - 1);;

    function animate(time) {
        isRunning = true;   //Prevent malfunctioning when click multiple times in a row,'isRunning=undefiend' in line 159 causes  when button clicked
        if (i++ == 60) { //R.RotateAxis rotates PI/120 so we need 60times of execution to rotate PI/2 radians.
            i = 0; //Reset i
            ran_num = parseInt(Math.random() * 3 - 0.1);
            isRunning = undefined; //When rotating PI/2 is done,notify it is not runnig anymore
            arg1 = String.fromCharCode(88 + ran_num); //Random char among X,Y,Z
            arg2 = (parseInt(Math.random() * 100) % 3 - 1); //Random int from -1 to 1
            return;
        }

       // R.RotateAxis(cubeGroup, arg1, ANTICLOCKWISE, arg2); //Rotate in Axis arg1, at row index arg2
       R.RotateAxis(cubeGroup, "X", ANTICLOCKWISE, 0);
        if ((!isMobile) && (prevWidth !== canvas.width) || (prevHeight !== canvas.heigth)) { //Update when screen size change
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio; //change canvas size
            prevWidth = canvas.width;
            prevHeight = canvas.height; //store prev value to compare
            renderer.setSize(window.innerWidth, window.innerHeight); //change render size
            // setting camera aspect to prevent view from crushing
            camera.aspect = canvas.width / canvas.height;
            camera.updateProjectionMatrix();
        }
        controls.update(); //Update
        renderer.render(scene, camera); //render to display on screen
        requestAnimationFrame(animate);

    }

    /*function solveCubeButtonListener(time) { //Solve Cube when solve button clicked
        buttonDown = true;
        if (isRunning) return;

        if (i++ == 60) { //Reset when rotates PI/2
            i = 0;
            buttonDown = false;
            return;
        }
        CubeSolver.solveCube(cubeGroup);
        //camera.translateY(+0.01);
        //console.log("button");
        // camera.rotation+=0.1;
        //camera.translateZ(1);

        //camera.translateY(-1); //Move camea's relative position(sphere Y is limeted to -PI/2 to PI/2)
        //camera.position.x+=1; //Move camera's absolute position
        
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(solveCubeButtonListener);
    }*/
    let countExecute=0;
    let needExecute=1;
    let needExecuteInitialized=false;
     function solveCubeButtonListener(time) { //Solve Cube when solve button clicked
        buttonDown = true;
        if (isRunning) return;

        if (i++ == 60) { //Reset when rotates PI/2
            i = 1;
            buttonDown = false;
            countExecute++;
            console.log("check1");
        }
        console.log("countexe"+countExecute);
        console.log("needexe"+needExecute);
        if(countExecute==needExecute){
            console.log("check2");
            i=0;
            countExecute=0;
            needExecute=1;
            buttonDown = false;
            needExecuteInitialized=false;
              console.log("buttonDown"+buttonDown);
            return;
        }
        //camera.translateY(+0.01);
        //console.log("button");
        // camera.rotation+=0.1;
        //camera.translateZ(1);

         if(!needExecuteInitialized){
            needExecuteInitialized=true;
            needExecute=CubeSolver.step1(cubeGroup);
         }else{
            CubeSolver.step1(cubeGroup);
         }

        //camera.translateY(-1); //Move camea's relative position(sphere Y is limeted to -PI/2 to PI/2)
        //camera.position.x+=1; //Move camera's absolute position
        
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(solveCubeButtonListener);
    }



    let exeCount = 0;

    function animate_shuffle(time) { //To shuffle the Rubix Cube, we need to execute animate() for certain SHUFFLE_TIME.

        if (i++ == 60) { //Reset when rotates PI/2
            i = 1; //To match execute time to 60
            ran_num = parseInt(Math.random() * 3 - 0.1);
            isRunning = undefined;
            exeCount++; //Increase execution time to compare with SHUFFLE_TIME
            arg1 = String.fromCharCode(88 + ran_num);
            arg2 = (parseInt(Math.random() * 100) % 3 - 1);
        }
        if (exeCount == SHUFFLE_TIME) { //When matches to SHUFFLE_TIME reset exeCount and i to intial vaule.
            exeCount = 0;
            i = 0;
            buttonDown = false;
            return;
        }
        buttonDown = true;
        R.RotateAxis(cubeGroup, arg1, 1, arg2); //Rotate

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
        requestAnimationFrame(animate_shuffle);

    }
    /*
        function animate_click(time) { 

            if (i++ == 60) { //Reset when rotates PI/2
                i = 0; //Reset
                ran_num = parseInt(Math.random() * 3 - 0.1);
                isRunning = undefined;
                arg1 = String.fromCharCode(88 + ran_num);
                arg2 = (parseInt(Math.random() * 100) % 3 - 1);
                return;
            }

          
            R.RotateAxis(cubeGroup, arg1, arg2); //Rotate

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
            requestAnimationFrame(animate_shuffle);

        }*/

    //########  Desktop 
    let pos_down = [];
    let pos_up = [];

    function onDown(e) {
        pos_down[0] = e.pageX;
        pos_down[1] = e.pageY;
        isDown = true;
        //console.log("ondown");
    }

    const onUp = (e) => {
        // setTimeout(()=>{
        pos_up[0] = e.pageX;
        pos_up[1] = e.pageY;
        console.log("onup");
        const v = Math.abs(pos_up[0] - pos_down[0]) + Math.abs(pos_up[1] - pos_down[1]);
        // console.log(v);
        console.log("bdown" + buttonDown);
        if (buttonDown || ((Math.abs(pos_up[0] - pos_down[0]) + Math.abs(pos_up[1] - pos_down[1])) > 20)) {
            console.log("return");
            buttonDown = false;
            return;
        } 
        animate();
        isRunning = true;
        isDown = false;
        buttonDown = false;
        //}, 50);
    };

    /*  function onMouseMove(){
          console.log("onmouse MOve!!!");
          if(isDown){
              isDrag=true;
              requestRender();
              console.log("isDrag in is Donw "+isDrag);
          }
          return ;
      }*/

    //###############On mobile, touchmove and pointermove didnt't worked either 
    //###############So I handled distinguishing click event and drag event 
    //by distance of two coordinates of pointerdown and pointerup.
    //######

    //#####  Mobile
    /*    function onTouchStart(){
            console.log("onTouchstart");
          
                isDown=true;
             
        }

        function onTouchMove(e){
             e.preventDefault();
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
            requestRenderShuffle();
        }*/
    //######
    const btn_solve = document.getElementById("solve");
    const btn_shuffle = document.getElementById("shuffle");
    controls.addEventListener('change', requestRender, false); //called first at initializing
    btn_shuffle.addEventListener('pointerup', requestRenderShuffle, false);
    btn_solve.addEventListener('pointerup', solveCubeButtonListener, false);

    window.addEventListener('pointerup', onUp, false);
    window.addEventListener('pointerdown', onDown, false);
    //window.addEventListener('pointermove', onMouseMove, false);
    window.addEventListener('resize', requestRender, false);
    //window.addEventListener('dbclick', solveCubeButtonListener, false);
    //window.addEventListener('touchstart', onTouchStart, false);
    //window.addEventListener('touchmove', onTouchMove, false);
    //window.addEventListener('touchend', onTouchEnd, false);

    function makeInstanceCube() { //Create and initialize 27 cubes
        const Cubegeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                for (let k = -1; k < 2; k++) {

                    const boxmaterials = new THREE.MeshBasicMaterial({});
                    const cubeMaterialColors = setMaterialColors(i, j, k, boxmaterials);
                    const cube = new THREE.Mesh(Cubegeometry, cubeMaterialColors);
                    cubeGroup[i + 1][j + 1].push(cube); //Can get init position by simple subtraction
                    cube.position.x = i;
                    cube.position.y = j;
                    cube.position.z = k;

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
                        cube, //Object contains cube element

                        storePosition, //store the position of each rotation of PI/2 ends(makes the rotation more accurate)
                        angle, //store the rotation angle while rotation of PI/2
                        /*  rotAxisYMatrix,   
                          rotAxisZMatrix,
                          AxisDeterm*/ //

                        //express the change of coordinate axis in a matrix (save only the cumulative value by multiplication of the matrix).
                        //By using the fact that the y-axis is affected by rotation of Axis x and the z-axis is affected by rotation of Axis x and x- and y-axes, 
                        //the rotAxisY was saved by multiplying only the X-axis transformation matrix, 
                        //and rotAxisZ was saved by multiplying x-axis and Y-axis transformation matrix
                        //(Be careful of order you multiply the matrix!) 
                        //but failed to correspond to the original coordinate system. 
                        //Eventually, the final problem was gimbal lock.
                        //When I turned the clock 90 degrees on the y-axis and 90 degrees on the z-axis, I was caught by a gb lock.

                    };
                    scene.add(cube);

                }
            }
        }
    }
}
main();