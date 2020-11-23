import * as Control from './CameraControl.js'
import { rotateAgain } from './RubixCube.js';


const CLOCKWISE = 1;
const ANTICLOCKWISE = -1;

let storedX;
let storedY;
let storedZ;
let count = 0;
let Initialized = false;
let needExecute; //Rotate one more time or not(=2: one more)

export const solveCube = (cubeGroup) => {
    step1(cubeGroup);


}

export const step1_1 = (cubeGroup) => { //Make white face look up

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
            needExecute = 1;
            break;
        case 1: //If white face center cube is on it's right position
            needExecute = 0;
            Initialized=false;
            return 0;
        case -1: //On opsite side of cube.InitPosition	Have to rotate one more time
            Control.rotateCube(cubeGroup, "X", CLOCKWISE);
            needExecute = 2;
            break;
    }
    if (count++ == 59) { //step1 is called only 60times therefore set the number to 59
        count = 0;
        Initialized = false;
        console.log("step init")
    }
    return needExecute;
}

export const step1_2 = (cubeGroup) => {
    let needExecute;
    if (!Initialized) { //Store init position just one time
        Initialized = true;
        storedX = cubeGroup[2][1][1].cube.position.x; //Position of the white face center cube
        storedZ = cubeGroup[2][1][1].cube.position.z;
        /*if (storedZ == 1) needExecute = 1;
		else if (storedZ == -1) needExecute = 1;
    	else if (storedX == -1) needExecute = 2;*/
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
    } else{
    	needExecute=0;
    	Initialized=false;
    	return 0;
    }
    if (count++ == 59) { //step1 is called only 60times therefore set the number to 59
        count = 0;
        Initialized = false;
        console.log("step 2 niitttt|");
    }
    return needExecute;
}