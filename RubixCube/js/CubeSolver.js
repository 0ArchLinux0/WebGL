import * as Control from './CameraControl.js'
import { controls, camera, scene, renderer, cubeGroup } from './RubixCube.js';


const CLOCKWISE = 1;
const ANTICLOCKWISE = -1;

let storedX;
let storedY;
let storedZ;
let count = 0;
let Initialized = false;

let i = 0;
let countExecute = 0;
let needExecute = 1; //Number of times the fucntion has to be executed
let Execute = 0;
let needExecuteInitialized = false;
//let isSolving = false;

export const solveCube = ( /*cubeGroup*/ ) => {
    step1(cubeGroup);


}

export const step1_1 = ( /*cubeGroup*/ ) => { //Make white face look up

    if (!Initialized) { //Store init position just one time
        Initialized = true;
        storedX = cubeGroup[1][2][1].cube.position.x; //Position of the white face center cube
        storedY = cubeGroup[1][2][1].cube.position.y;
        storedZ = cubeGroup[1][2][1].cube.position.z;
    }

    switch (storedY) {
        case 0: //White face center cube is placed on one of the side faces. Rotate properly to face up
            if (storedX != 0) {
                Control.rotateCube(cubeGroup, "Z", ANTICLOCKWISE * storedX);
            } else {
                Control.rotateCube(cubeGroup, "X", CLOCKWISE * storedZ);
            }
            Execute = 1;
            break;
        case 1: //If white face center cube is on it's right position
            Execute = 0;
            Initialized = false;
            return 0;
        case -1: //On opsite side of cube.InitPosition	Have to rotate one more time
            Control.rotateCube(cubeGroup, "X", CLOCKWISE);
            Execute = 2;
            break;
    }
    if (count++ == 59) { //step1 is called only 60times therefore set the number to 59
        count = 0;
        Initialized = false;
        console.log("step init")
    }
    return Execute;
}
const step1_2 = () => {
    let needExecute;
    if (!Initialized) { //Store init position just one time
        Initialized = true;
        storedX = cubeGroup[2][1][1].cube.position.x; //Position of the white face center cube
        storedZ = cubeGroup[2][1][1].cube.position.z;
    }

    if (storedZ == 1) {
        Control.rotateCube(cubeGroup, "Y", ANTICLOCKWISE);
        needExecute = 1;
    } else if (storedZ == -1) {
        Control.rotateCube(cubeGroup, "Y", CLOCKWISE);
        needExecute = 1;
    } else if (storedX == -1) {
        Control.rotateCube(cubeGroup, "Y", CLOCKWISE);
        needExecute = 2;
    } else {
        needExecute = 0;
        Initialized = false;
        return 0;
    }
    if (count++ == 59) { //step1 is called only 60times therefore set the number to 59
        count = 0;
        Initialized = false;
        console.log("step 2 niitttt|");
    }
    return needExecute;
}

const Render_step1_2 = ( /*cubeGroup*/ ) => { //Solve Cube when solve button clicked

    if (i++ == 60) { //Reset when rotates PI/2
        i = 1;
        countExecute++;
    }
    if (countExecute == needExecute) {
        i = 0;
        countExecute = 0;
        needExecute = 1;
        needExecuteInitialized = false;
        console.log("step2");
        console.log("count" + countExecute);
        return;
    }

    if (!needExecuteInitialized) {
        needExecuteInitialized = true;
        needExecute = step1_2(cubeGroup);
        console.log("need init " + needExecute);
    } else {
        step1_2(cubeGroup);
    }

    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(Render_step1_2);
}


export const solveCubeStart = ( /*buttonDown , isSolving*/ /*, cubeGroup*/ ) => { //Solve Cube when solve button clicked

    if (i++ == 60) { //Reset when rotates PI/2
        i = 1;
        countExecute++;
    }
    if (countExecute == needExecute) {
        i = 0;
        countExecute = 0;
        needExecute = 1;
        needExecuteInitialized = false;
        //console.log("solveCubeButton init");
        Render_step1_2();
        return false;
    }

    if (!needExecuteInitialized) {
        needExecuteInitialized = true;
        needExecute = step1_1();
        // console.log("need init "+needExecute);
    } else {
        step1_1( /*cubeGroup*/ );
    }

    //camera.translateY(-1); //Move camea's relative position(sphere Y is limeted to -PI/2 to PI/2)
    //camera.position.x+=1; //Move camera's absolute position

    controls.update();
    renderer.render(scene, camera);
    return true;

}