import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import * as R from './Rotation.js';
import { isMobile } from './mobile_detect.js';
import * as CubeSolver from './CubeSolver.js'

export const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15);

const canvas = document.querySelector('#canvas');

export const controls = new OrbitControls(camera, canvas); //Enable camera rotation when drag
controls.enableDamping = false; //rotate as if it has a inertia
controls.target.set(0, 0, 0); //Center of rotation
controls.update();


const SHUFFLE_TIME = 6;
const CLOCKWISE = 1;
const ANTICLOCKWISE = -1;


const pixelRatio = window.devicePixelRatio;
canvas.width = window.innerWidth * pixelRatio;
canvas.height = window.innerHeight * pixelRatio;
let prevWidth = canvas.width;
let prevHeight = canvas.height;

/*{antialias: true}*/
let isDrag = false;
let isDown = false;
let isTouchMove = false;
let buttonDown = false;

export const renderer = new THREE.WebGLRenderer({ antialias: true, canvas /*alpha: true*/ });
renderer.antialias = true; //Render on canvas
renderer.setSize(window.innerWidth, window.innerHeight); //setting drawing buffersize
renderer.setClearColor(0xbac8ff); //Background color 
document.body.appendChild(renderer.domElement); //Push

const COLOR_DIRECTIONS = {
    "UP": new THREE.Color("white"),
    "DOWN": new THREE.Color("yellow"),
    "RIGHT": new THREE.Color("blue"),
    "LEFT": new THREE.Color("green"),
    "FRONT": new THREE.Color("red"),
    "BACK": new THREE.Color("orange"),
}

const geometry = new THREE.Geometry();

for (let i = 0; i < 10000; i++) {
    const star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(2000);
    star.y = THREE.Math.randFloatSpread(2000);
    star.z = THREE.Math.randFloatSpread(2000);

    geometry.vertices.push(star)
}

const material = new THREE.PointsMaterial({
    color: 0xffffff
});
const starField = new THREE.Points(geometry, material);
scene.add(starField);

var loader = new THREE.TextureLoader();

const logoCubeTexture = loader.load('./image/MinJun.png');
const whiteCubeTexture = loader.load('./image/CopyrightTop.png');
const poweredTexture = loader.load('./image/PoweredBy.png');
//fgscene.background = groundTexture;
/*groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 1, 1 );
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;

const groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100 ), groundMaterial );
mesh.position.y = - 250;
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add( mesh );
//scene.background = groundTexture;

*/


const setMaterialColors = (x, y, z) => { //Create Materials with Color on each face

    const colorMaterials = [];

    for (let i = 0; i < 6; i++) {
        colorMaterials.push(new THREE.MeshStandardMaterial({ color: "#282828" }));
    }
    x == 1 && (colorMaterials[0] = new THREE.MeshStandardMaterial({ color: COLOR_DIRECTIONS["RIGHT"], roughness: 0.1, metalness: 0.1 }));
    x == -1 && (colorMaterials[1] = new THREE.MeshStandardMaterial({ color: COLOR_DIRECTIONS["LEFT"], roughness: 0.1, metalness: 0.1 }));
    y == 1 && (colorMaterials[2] = new THREE.MeshStandardMaterial({ color: COLOR_DIRECTIONS["UP"], roughness: 0.1, metalness: 0.1 }));
    y == -1 && (colorMaterials[3] = new THREE.MeshStandardMaterial({ color: COLOR_DIRECTIONS["DOWN"], roughness: 0.1, metalness: 0.1 }));
    z == 1 && (colorMaterials[4] = new THREE.MeshStandardMaterial({ color: COLOR_DIRECTIONS["FRONT"], roughness: 0.1, metalness: 0.1 }));
    z == -1 && (colorMaterials[5] = new THREE.MeshStandardMaterial({ color: COLOR_DIRECTIONS["BACK"], roughness: 0.1, metalness: 0.1 }));
    (y == 1 && x == 0 && z == 0) && (colorMaterials[2] = new THREE.MeshStandardMaterial({ map: logoCubeTexture, roughness: 0.1, metalness: 0.1 }));
    (y == 1 && x == 1 && z == 0) && (colorMaterials[2] = new THREE.MeshStandardMaterial({ map: whiteCubeTexture, roughness: 0.1, metalness: 0.1 }));
    (y == 1 && x == -1 && z == 0) && (colorMaterials[2] = new THREE.MeshStandardMaterial({ map: poweredTexture, roughness: 0.1, metalness: 0.1 }));

    return colorMaterials;
}

export const cubeGroup = [
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
export const cubeRotateState = [math.matrix([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
])];

const settings = {
    radius: { value: 0.2 }
}

/*loader.setCrossOrigin( "" );
loader.setPath( 'https://threejs.org/examples/textures/cube/pisa/' );*/

/*var cubeTexture = loader.load( [
  'px.png', 'nx.png',
  'py.png', 'ny.png',
  'pz.png', 'nz.png'
] );*/

makeInstanceCube();


camera.position.x = 4; //Set camera's default position
camera.position.y = 4;
camera.position.z = 4;

let light = new THREE.DirectionalLight(0xffffff, 0.5);
//light.position.setScalar(10);
light.position.set(4, 4, 4);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));




{ //Set light
    const color = 0xFFFFFF;
    const intensity = 0.2;
    // const light_background = new THREE.DirectionalLight(color, intensity); //Direct Light*/

    // light_background.position.set(-1, 2, 4);

    const light_background = new THREE.AmbientLight(color, intensity); //Light up the entire space
    scene.add(light_background); //Add

}



//var loader = new THREE.CubeTextureLoader();
/*loader.setCrossOrigin( "" );
loader.setPath( 'https://threejs.org/examples/textures/cube/pisa/' );

var cubeTexture = loader.load( [
  'px.png', 'nx.png',
  'py.png', 'ny.png',
  'pz.png', 'nz.png'
] );

scene.background= cubeTexture;/*'#ffffff';*/
function resetCam(){
    buttonDown=true;
    camera.position.x = 4; //Set camera's default position
    camera.position.y = 4;
    camera.position.z = 4;
    render();
    setTimeout(()=>{buttonDown=false;},5);
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

    camera.updateMatrixWorld(); //Update the camera location
    const vector = camera.position.clone(); //Get camera position and put into variable
    vector.applyMatrix4(camera.matrixWorld); //Hold the camera location in matrix world
    light.position.set(vector.x, vector.y, vector.z);
    light.updateMatrixWorld();


    controls.update();
    renderer.render(scene, camera);
    renderRequested = undefined;
}
window.addEventListener("load", render);
//setTimeout(()=>{render();},3);

function requestRender() { //Check if Render is running

    if (!renderRequested) {
        renderRequested = true;
        requestAnimationFrame(render); //Callback render
    }

}

function requestRender_animate() { //Check if Render is running

    if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(animate); //Callback render
    }

}

let isRunning = false;
let ran_num = parseInt(Math.random() * 3 - 0.1);

function requestRenderShuffle() {
    buttonDown = true;
    if (!isRunning && !isSolving) { //Check if animate or animate_shuffle is running at the spot. Prevent malfunctioning caused by click event's asynchronism(rotate in different ways at same time so it stops rotating or rotate to wrong way)
        isRunning = true;
        requestAnimationFrame(animate_shuffle); //Callback animate_shuffle
    }
}

let i = 0;
let arg1 = String.fromCharCode(88 + ran_num); //88 is 'X'
let arg2 = (parseInt(Math.random() * 100) % 3 - 1);;
let clickCount = 0;

function animate(time) {
    isRunning = true; //Prevent malfunctioning when click multiple times in a row,'isRunning=undefiend' in line 159 causes  when button clicked
    if (i++ == 60) { //R.RotateAxis rotates PI/120 so we need 60times of execution to rotate PI/2 radians.
        i = 0; //Reset i
        ran_num = parseInt(Math.random() * 3 - 0.1);
        isRunning = undefined; //When rotating PI/2 is done,notify it is not runnig anymore
        arg1 = String.fromCharCode(88 + ran_num); //Random char among X,Y,Z
        arg2 = (parseInt(Math.random() * 100) % 3 - 1); //Random int from -1 to 1
        clickCount++;
        return;
    }
    //console.log("called animate");
    R.RotateAxis(arg1, 2 * (ran_num % 2) - 1, arg2); //Rotate in Axis arg1, at row index arg2
    /*switch (clickCount) {
        case 0:R.RotateAxis("X", -1, 1);
            // statements_1
            break;
        case 1:R.RotateAxis("Z", 1, 1);
            // statements_def
            break;
        case 2: R.RotateAxis("Z", 1, 1);
    }*/
    //Rotate in Axis arg1, at row index arg2
    //R.RotateAxisRender("X", ANTICLOCKWISE, -1,4);
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

//camera.translateY(+0.01);
//console.log("button");
// camera.rotation+=0.1;
//camera.translateZ(1);

//camera.translateY(-1); //Move camea's relative position(sphere Y is limeted to -PI/2 to PI/2)
//camera.position.x+=1; //Move camera's absolute position

let countExecute = 0;
let needExecute = 1; //Number of times the fucntion has to be executed
let needExecuteInitialized = false;
let isSolving = false;

const solveCubeButtonListener = () => { //Solve Cube when solve button clicked
    if (isRunning || isSolving) return;
    camera.position.x = 4;
    camera.position.y = 4;
    camera.position.z = 4;
    camera.lookAt(-1, -1, -1);
    isSolving = true;
    buttonDown = true;

    CubeSolver.solveCubeStart();

}

export const solveCubeEndNotify = () => {
    isSolving = false;
    buttonDown = false;;
}

let exeCount = 0;

function animate_shuffle(time) { //To shuffle the Rubix Cube, we need to execute animate() for certain SHUFFLE_TIME.
    isRunning = true;
    if (i++ == 60) { //Reset when rotates PI/2
        i = 1; //To match execute time to 60
        ran_num = parseInt(Math.random() * 3 - 0.1);

        exeCount++; //Increase execution time to compare with SHUFFLE_TIME
        arg1 = String.fromCharCode(88 + ran_num);
        arg2 = (parseInt(Math.random() * 100) % 3 - 1);
    }
    if (exeCount == SHUFFLE_TIME) { //When matches to SHUFFLE_TIME reset exeCount and i to intial vaule.
        exeCount = 0;
        i = 0;
        buttonDown = false;
        isRunning = undefined;
        return;
    }
    buttonDown = true;
    R.RotateAxis(arg1, 2 * (ran_num % 2) - 1, arg2); //Rotate

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

//########  Desktop 
let pos_down = [];
let pos_up = [];

function onDown(e) {
    pos_down[0] = e.pageX;
    pos_down[1] = e.pageY;
    isDown = true;
    setTimeout(() => { isDown = false }, 1200);
    //console.log("ondown");
}

const onUp = (e) => {
    // setTimeout(()=>{
    pos_up[0] = e.pageX;
    pos_up[1] = e.pageY;
    // console.log("onup");
    const v = Math.abs(pos_up[0] - pos_down[0]) + Math.abs(pos_up[1] - pos_down[1]);
    // console.log(v);
    // console.log("bdown" + buttonDown);
    //If more than 1.2sec passes or mouse is dragged or something is running return.
    if (!isDown || (buttonDown || ((Math.abs(pos_up[0] - pos_down[0]) + Math.abs(pos_up[1] - pos_down[1])) > 20))) {
        //    console.log("return");    
        return;
    }
    if (isMobile) requestRender_animate();
    else animate();
    isDown = false;
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
const btn_resetCam = document.getElementById("resetCam");
controls.addEventListener('change', requestRender, false); //called first at initializing
btn_shuffle.addEventListener('pointerup', requestRenderShuffle, false);
btn_solve.addEventListener('pointerup', solveCubeButtonListener, false);
btn_resetCam.addEventListener('pointerup', resetCam, false);

window.addEventListener('pointerup', onUp, false);
window.addEventListener('pointerdown', onDown, false);
//window.addEventListener('pointermove', onMouseMove, false);
window.addEventListener('resize', requestRender, false);
//window.addEventListener('dbclick', solveCubeButtonListener, false);
//window.addEventListener('touchstart', onTouchStart, false);
//window.addEventListener('touchmove', onTouchMove, false);
//window.addEventListener('touchend', onTouchEnd, false);
function createBoxWithRoundedEdges(width, height, depth, radius0, smoothness) {
    let shape = new THREE.Shape();
    let eps = 0.0001;
    let radius = radius0 - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
    //////////////////////////////now
    const geometry = new THREE.ExtrudeBufferGeometry(shape, {
        //amount: depth - radius0*2  ,
        depth: depth - radius0 * 2,
        bevelEnabled: true,
        bevelSegments: smoothness * 2,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius0,
        curveSegments: smoothness
    });

    geometry.center();

    return geometry;
}
/*const cubeMat = new THREE.MeshStandardMaterial( {
    color: '#000000', //Math.random() * 0x777777 + 0x777777,
    envMap: cubeTexture,
    metalness: i / 9,
    roughness: 1 - i / 9,
  } );*/
/////////////////////////now



function makeInstanceCube() { //Create and initialize 27 cubes
    const Cubegeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 2; k++) {

                /*  const boxmaterials = new THREE.MeshBasicMaterial({});
                  const cubeMaterialColors = setMaterialColors(i, j, k);
                  const cube = new THREE.Mesh( createBoxWithRoundedEdges( 0.9, 0.9, 0.9 , 2 / 9, 16 ), cubeMaterialColors );*/




                const Boxgeometry = new THREE.BoxBufferGeometry(1, 1, 1, 30, 30, 30);

                const boxmaterials = new THREE.MeshBasicMaterial({});
                const cubeMaterialColors = setMaterialColors(i, j, k);
                var boxMat = new THREE.MeshStandardMaterial({ color: cubeMaterialColors /*, envMap: cubeTexture*/ });

                cubeMaterialColors.forEach((e) => {
                    e.onBeforeCompile = shader => {
                        shader.uniforms.boxSize = {
                            value: new THREE.Vector3(
                                Boxgeometry.parameters.width,
                                Boxgeometry.parameters.height,
                                Boxgeometry.parameters.depth
                            ).multiplyScalar(0.5)
                        };
                        shader.uniforms.radius = settings.radius;
                        shader.vertexShader = `
    uniform vec3 boxSize;
    uniform float radius;
    ` + shader.vertexShader;
                        shader.vertexShader = shader.vertexShader.replace(
                            `#include <begin_vertex>`,
                            `#include <begin_vertex>
    
    float maxRadius = clamp(radius, 0.0, min(boxSize.x, min(boxSize.y, boxSize.z)));
    vec3 signs = sign(position);
    
    vec3 subBox = boxSize - vec3(maxRadius);
    
    vec3 absPos = abs(transformed); 
    // xy
    vec2 sub = absPos.xy - subBox.xy;
    if (absPos.x > subBox.x && absPos.y > subBox.y && absPos.z <= subBox.z) {
      transformed.xy = normalize(sub) * maxRadius + subBox.xy;
      transformed.xy *= signs.xy;
    }
    // xz
    sub = absPos.xz - subBox.xz;
    if (absPos.x > subBox.x && absPos.z > subBox.z && absPos.y <= subBox.y) {
      transformed.xz = normalize(sub) * maxRadius + subBox.xz;
      transformed.xz *= signs.xz;
    }
    // yz
    sub = absPos.yz - subBox.yz;
    if (absPos.y > subBox.y && absPos.z > subBox.z && absPos.x <= subBox.x) {
      transformed.yz = normalize(sub) * maxRadius + subBox.yz;
      transformed.yz *= signs.yz;
    }
    
    // corner
    if (all(greaterThan(absPos, subBox))){
      vec3 sub3 = absPos - subBox;
      transformed = (normalize(sub3) * maxRadius + subBox) * signs;
    }
    
    // re-compute normals for correct shadows and reflections
    objectNormal = all(equal(position, transformed)) ? normal : normalize(position - transformed); 
    transformedNormal = normalMatrix * objectNormal; 

    `
                        );
                    };
                });
                const cube = new THREE.Mesh(Boxgeometry, cubeMaterialColors);
                cubeGroup[i + 1][j + 1].push(cube); //Can get init position by simple subtraction
                cube.position.x = i;
                cube.position.y = j;
                cube.position.z = k;

                const angle = { x: 0, y: 0, z: 0 };
                const storePosition = { x: 0, y: 0, z: 0, stored: false };

                const axisDirection = math.matrix([
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ]);
                cubeGroup[i + 1][j + 1][k + 1] = {
                    cube, //Object contains cube element

                    storePosition, //store the position of each rotation of PI/2 ends(makes the rotation more accurate)
                    angle, //store the rotation angle while rotation of PI/2
                    axisDirection,
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

    /*const resetCam=()=>{
        camera.position.x = 4; //Set camera's default position
        camera.position.y = 4;
        camera.position.z = 4;
        camera.updateMatrixWorld();
        console.log("cllicked");
    }*/


}