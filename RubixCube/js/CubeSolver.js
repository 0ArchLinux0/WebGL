import * as Control from './CameraControl.js'


const CLOCKWISE = 1;
const ANTICLOCKWISE = -1;

let storedX;
let storedY;
let storedZ;
let count=0;
let Initialized = false;

export const solveCube = (cubeGroup) => {
    step1(cubeGroup);
   // console.log("count");

}

const step1 = (cubeGroup) => {
	//console.log(count);
	if(count++==60){
		count=0;
		console.log("end");
		Initialized=false;
		return;
		
	}
	/*if (exeCount == SHUFFLE_TIME) { //When matches to SHUFFLE_TIME reset exeCount and i to intial vaule.
            exeCount = 0;
            count=0;
           	Initialized=false;
            return;
        }*/
    if (!Initialized) {
        Initialized = true;
        storedX = cubeGroup[1][2][1].cube.position.x;
        storedY = cubeGroup[1][2][1].cube.position.y;
        storedZ = cubeGroup[1][2][1].cube.position.z;
    }
    console.log(count);
    switch (storedY) {
        case 1:
            break;
        case 0:
            if (storedX != 0) { Control.rotateCameraToPoint(cubeGroup, "Z", ANTICLOCKWISE * storedX); } 
            else { Control.rotateCameraToPoint(cubeGroup, "X", CLOCKWISE * storedZ); }
            break;
        case -1:
            Control.rotateCameraToPoint(cubeGroup, "X", CLOCKWISE);
            break;
    }
    //Control.rotateCameraToPoint(cubeGroup,"Z",-1);
}