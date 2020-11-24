import * as Control from './CameraControl.js'
import { controls, camera, scene, renderer, cubeGroup } from './RubixCube.js';
import * as R from './Rotation.js';


const CLOCKWISE = 1;
const ANTICLOCKWISE = -1;

let storedX;
let storedY;
let storedZ;
let count = 0;
let Initialized = false
let isRunning = false;

let i = 0;
let countExecute = 0;
let needExecute = 1; //Number of times the fucntion has to be executed
let Execute = 0;
let needExecuteInitialized = false;
//let isSolving = false;

export const solveCubeStart = () => { //Solve Cube when solve button clicked

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
        step1_1();
    }

    //camera.translateY(-1); //Move camea's relative position(sphere Y is limeted to -PI/2 to PI/2)
    //camera.position.x+=1; //Move camera's absolute position

    controls.update();
    renderer.render(scene, camera);
    return true;

}

export const step1_1 = () => { //Make white face look up

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
        case -1: //On opsite side of cube.InitPosition  Have to rotate one more time
            Control.rotateCube(cubeGroup, "X", CLOCKWISE);
            Execute = 2;
            break;
    }
    if (count++ == 59) {
        count = 0;
        Initialized = false;
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
    if (count++ == 59) {
        count = 0;
        Initialized = false;
    }
    return needExecute;
}

const Render_step1_2 = () => {

    if (i++ == 60) { //Reset when rotates PI/2
        i = 1;
        countExecute++;
    }
    if (countExecute == needExecute) {
        i = 0;
        countExecute = 0;
        needExecute = 1;
        needExecuteInitialized = false;
        console.log("execute step2 1");
        step2_1();
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

export const step2_1 = () => {
    const cube = cubeGroup[2][2][1].cube; //Start with cube [1,1,0]
    const matrix = cubeGroup[2][2][1].axisDirection;
    console.log(matrix);
    console.log(matrix.subset(math.index(1, 1)));
    switch (cube.position.y) {
        case 1:
            if (matrix.subset(math.index(1, 1)) == 1) {
                console.log("passed");
                if(cube.position.x==1){}
                else if(cube.position.x==-1){R.RotateAxisRender("Y", 1, 1, 2);}
                else if(cube.position.z==1){R.RotateAxisRender("Y", -1, 1, 1);}
                else if(cube.position.z==-1){R.RotateAxisRender("Y", 1, 1, 1);}

            } else{}
            /*case 0:if()
            case 1:if()*/
    }
}


const step2_2_pieces = (x, y, z) => {
    const cube = cubeGroup[x + 1][y + 1][z + 1].cube;
    const matrix = cubeGroup[x + 1][y + 1][z + 1];
    if (cube.position.y == 1) {
        switch (rotTotal % 3) {
            case 0:
                if (cube.x == x && cube.y == y) {}
            case 1:
            case 2:
        }
    }
    if (cube.y == 0) {

    }
    if (cube.y == -1) {

    }
}