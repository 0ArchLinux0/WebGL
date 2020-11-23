import * as Control from './CameraControl.js'
import { rotateAgain } from './RubixCube.js';


const CLOCKWISE = 1;
const ANTICLOCKWISE = -1;

let storedX;
let storedY;
let storedZ;
let count = 0;
let Initialized = false;

export const solveCube = (cubeGroup) => {
    step1(cubeGroup);


}

export const step1 = (cubeGroup) => { //Make white face look up
    let needExecute;
    if (!Initialized) { //Store init position just one time
        Initialized = true;
        storedX = cubeGroup[1][2][1].cube.position.x; //Position of the white face center cube
        storedY = cubeGroup[1][2][1].cube.position.y;
        storedZ = cubeGroup[1][2][1].cube.position.z;
    }

    switch (storedY) {
        case 0: //White face center cube is placed on one of the side faces. Rotate properly to face up
            if (storedX != 0) { Control.rotateCameraToPoint(cubeGroup, "Z", ANTICLOCKWISE * storedX); } else { Control.rotateCameraToPoint(cubeGroup, "X", CLOCKWISE * storedZ); }
            needExecute = 1;
            break;
        case 1:
            needExecute = 1; //If white face center cube is on it's right position
            break;
        case -1: //On opsite side of cube.InitPosition	Have to rotate one more time
            Control.rotateCameraToPoint(cubeGroup, "X", CLOCKWISE);
            needExecute = 2;
            break;
    }
    if (count++ == 59) { //step1 is called only 60times therefore set the number to 59
        count = 0;
        Initialized = false;
        return needExecute;
    }
    return needExecute;
}