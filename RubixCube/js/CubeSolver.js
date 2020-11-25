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
                Control.rotateCube("Z", ANTICLOCKWISE * storedX, function() {});
            } else {
                Control.rotateCube("X", CLOCKWISE * storedZ, function() {});
            }
            Execute = 1;
            break;
        case 1: //If white face center cube is on it's right position
            Execute = 0;
            Initialized = false;
            return 0;
        case -1: //On opsite side of cube.InitPosition  Have to rotate one more time
            Control.rotateCube("X", CLOCKWISE, function() {});
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
        Control.rotateCube("Y", ANTICLOCKWISE, function() {});
        needExecute = 1;
    } else if (storedZ == -1) {
        Control.rotateCube("Y", CLOCKWISE, function() {});
        needExecute = 1;
    } else if (storedX == -1) {
        Control.rotateCube("Y", CLOCKWISE, function() {});
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
        step2_1(2, 2, 1);
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

let step2Count = 0;
let countRender=0;
const step2_1_execute = () => {
    switch (step2Count) {
        case 0:
            console.log("turn~~~ "+countRender);
            Control.rotateCube("Y", 1, function() { step2_1(1, 2, 0); });
            break;
        case 1:
            Control.rotateCube("Y", 1, function() { step2_1(0, 2, 1); });
            break;
        case 2:
            Control.rotateCube("Y", 1, function() { step2_1(1, 2, 2); });
            break;
        default:
            step2Count=0;
            console.log("return")+countRender;
            return;
    }
    controls.update();
    renderer.render(scene, camera);
    if (countRender++ == 59) {
        countRender = 0;
        console.log("case: "+count+"Rotation over ");
        step2Count++;
        return;
    }
   
    requestAnimationFrame(step2_1_execute);

}

export const step2_1 = (i, j, k) => {
    console.log("step2 called");
    const cube = cubeGroup[i][j][k].cube; //Start with cube [1,1,0]
    const matrix = cubeGroup[i][j][k].axisDirection;
    console.log(cube.position.x+", "+cube.position.y+", "+cube.position.z);
    if (matrix.subset(math.index(1, 0)) == 1) { //Facing +X
      //  console.log("x");

        if (cube.position.y == 1) { //checked
            rotate_X_1();
        } else if (cube.position.y == -1) {
            rotate_X_2(); //checked
        } else if (cube.position.y == 0) {
            if (cube.position.z == 1)
                rotate_X_0_1(); //////dd
            else rotate_X_0_2();
        }
    } else if (matrix.subset(math.index(1, 0)) == -1) { //Facing -X
        console.log("-x");

        if (cube.position.y == 1) {
            rotate_minusX_1(); ///////?dd
        } else if (cube.position.y == -1) {
            rotate_minusX_2(); //dd
        } else if (cube.position.y == 0) {
            if (cube.position.z == 1)
                rotate_minusX_0_1(); //dd
            else rotate_minusX_0_2(); //dd
        }
    } else if (matrix.subset(math.index(1, 1)) == 1) { //Facing +Y axis
        console.log("y");

        if (cube.position.x == 1) {
            step2_1_execute();
        } else if (cube.position.x == -1) {
            rotate_Y_1();
        } else if (cube.position.z == 1) {
            rotate_Y_2();
        } else if (cube.position.z == -1) {
            rotate_Y_3();
        }

    } else if (matrix.subset(math.index(1, 1)) == -1) { //Facing -Y axis
        console.log("-y");
        if (cube.position.x == 1) {
            rotate_minusY_0(); //dd
        } else if (cube.position.x == -1) {
            rotate_minusY_1(); //dd
        } else if (cube.position.z == 1) {
            rotate_minusY_2(); //dd
        } else if (cube.position.z == -1) {
            rotate_minusY_3(); //////////////Checked!
        }
    } else if (matrix.subset(math.index(1, 2)) == 1) { //Facing Z
        console.log("z");
        if (cube.position.y == 1) {
            rotate_Z_1(); //d
        } else if (cube.position.y == -1) {
            rotate_Z_2(); //////////checked
        } else if (cube.position.x == 1) {
            rotate_Z_0_1(); //Chcked            //double checked!
        } else if (cube.position.x == -1) {
            rotate_Z_0_2(); //checked
        }
    } else if (matrix.subset(math.index(1, 2)) == -1) { //Facing -Z
        console.log("-z");
        if (cube.position.y == 1) {
            rotate_minusZ_1(); //////!!!!!!!!!!!!!!!!!!!!!!checked
        } else if (cube.position.y == -1) {
            rotate_minusZ_2(); //dd
        } else if (cube.position.x == 1) {
            rotate_minusZ_0_1(); //d
        } else if (cube.position.x == -1) {
            rotate_minusZ_0_2(); //d
        }
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


let step2_1_count=0


function rotate_X_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("X", -1, 1);
            break;
        case 0:
            R.RotateAxis("Y", 1, 1)
            break;
        case 1:
            R.RotateAxis("Z", -1, 1);
            break;
        case 2:
            R.RotateAxis("Y", -1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_X_1);
}

function rotate_X_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 4) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", 1, -1);
            break;
        case 1:
            R.RotateAxis("Z", -1, 1);
            break;
        case 2:
            R.RotateAxis("X", 1, 1);
            break;
        case 3:
            R.RotateAxis("Z", -1, 1);
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_X_2);
}

function rotate_X_0_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 2) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", 1, 1);
            break;
        case 1:
            R.RotateAxis("Z", -1, 1);
            break;
        case 2:
            R.RotateAxis("Y", -1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_X_0_1);
}

function rotate_X_0_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", -1, 1);
            break;
        case 1:
            R.RotateAxis("Z", -1, -1);
            break;
        case 2:
            R.RotateAxis("Y", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_X_0_2);
}


function rotate_minusX_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 7) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    console.log(step2_1_count);
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("X", 1, -1);
            break;
        case 1:
            R.RotateAxis("X", 1, -1);
            break;
        case 2:
            R.RotateAxis("Y", -1, -1);
            break;
        case 3:
            R.RotateAxis("X", 1, 1);
            break;
        case 4:
            R.RotateAxis("Z", -1, 1);
            break;
        case 5:
            R.RotateAxis("X", 1, 1);
            break;
        case 6:
            R.RotateAxis("Z", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusX_1);
}

function rotate_minusX_2() { // !!!!!!!!!!!!!!!!!!!!!!!!chekced
    if (i++ == 60) { //Reset when rotates PI/2
        i = 1; //To match execute time to 60
        step2_1_count++; //Increase execution time to compare with SHUFFLE_TIME
    }
    if (step2_1_count == 4) { //When matches to SHUFFLE_TIME reset step2_1_count and i to intial vaule.
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", -1, -1);
            break;
        case 1:
            R.RotateAxis("Z", 1, -1);
            break;
        case 2:
            R.RotateAxis("X", 1, 1);
            break;
        case 3:
            R.RotateAxis("Z", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusX_2);
}

function rotate_minusX_0_1() {
    if (i++ == 60) { //Reset when rotates PI/2
        i = 1; //To match execute time to 60
        step2_1_count++; //Increase execution time to compare with SHUFFLE_TIME
    }
    if (step2_1_count == 5) { //When matches to SHUFFLE_TIME reset step2_1_count and i to intial vaule.
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", -1, 1);
            break;
        case 1:
            R.RotateAxis("Y", -1, -1);
            break;
        case 2:
            R.RotateAxis("Z", 1, 1);
            break;
        case 3:
            R.RotateAxis("X", 1, 1);
            break;
        case 4:
            R.RotateAxis("X", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusX_0_1);
}

function rotate_minusX_0_2() {
    if (i++ == 60) { //Reset when rotates PI/2
        i = 1; //To match execute time to 60
        step2_1_count++; //Increase execution time to compare with SHUFFLE_TIME
    }
    if (step2_1_count == 5) { //When matches to SHUFFLE_TIME reset step2_1_count and i to intial vaule.
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", -1, -1);
            break;
        case 1:
            R.RotateAxis("Y", 1, -1);
            break;
        case 2:
            R.RotateAxis("Z", 1, -1);
            break;
        case 3:
            R.RotateAxis("X", 1, 1);
            break;
        case 4:
            R.RotateAxis("X", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusX_0_2);
}

function rotate_Y_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 2) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    R.RotateAxis("Y", 1, 1);
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_Y_1);
}

function rotate_Y_2() {
    if (i++ == 60) { //Reset when rotates PI/2
        i = 0;
        step2_1_execute();
        return;
    }

    R.RotateAxis("Y", -1, 1);
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_Y_2);
}

function rotate_Y_3() {
    if (i++ == 60) { //Reset when rotates PI/2
        i = 0;
        step2_1_execute();
        return;
    }
    R.RotateAxis("Y", 1, 1);
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_Y_3);
}

function rotate_minusY_0() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 2) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    R.RotateAxis("X", 1, 1);
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusY_0);
}


function rotate_minusY_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 4) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", 1, -1);
            break;
        case 1:
            R.RotateAxis("Y", 1, -1);
            break;
        case 2:
            R.RotateAxis("X", 1, 1);
            break;
        case 3:
            R.RotateAxis("X", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusY_1);
}

function rotate_minusY_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", -1, -1);
            break;
        case 1:
            R.RotateAxis("X", 1, 1);
            break;
        case 2:
            R.RotateAxis("X", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusY_2);
}

function rotate_minusY_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", 1, -1);
            break;
        case 1:
            R.RotateAxis("X", 1, 1);
            break;
        case 2:
            R.RotateAxis("X", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusY_3);
}

function rotate_Z_1() { //!!!!!!!!!!!!!!!!!!!!!!checked
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 2) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", 1, 1);
            break;
        case 1:
            R.RotateAxis("X", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_Z_1);
}

function rotate_Z_2() { //checked
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", -1, 1);
            break;
        case 1:
            R.RotateAxis("X", 1, 1);
            break;
        case 2:
            R.RotateAxis("Z", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_Z_2);
}

function rotate_Z_0_1() {
    if (i++ == 60) {
        i = 0;
        step2_1_execute();
        return;
    }

    R.RotateAxis("X", 1, 1);
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_Z_0_1);
}

function rotate_Z_0_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 6) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("X", -1, -1);
            break;
        case 1:
            R.RotateAxis("Y", -1, -1);
            break;
        case 2:
            R.RotateAxis("Y", -1, -1);
            break;
        case 3:
            R.RotateAxis("X", 1, -1);
            break;
        case 4:
            R.RotateAxis("X", 1, 1);
            break;
        case 5:
            R.RotateAxis("X", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_Z_0_2);
}

function rotate_minusZ_1() { ///////////!!!!!!!!!!!Checked
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 2) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", 1, -1);
            break;
        case 1:
            R.RotateAxis("X", -1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusZ_1);
}


function rotate_minusZ_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", -1, -1);
            break;
        case 1:
            R.RotateAxis("X", -1, 1);
            break;
        case 2:
            R.RotateAxis("Z", 1, 1);
            break;
    }
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusZ_2);
}

function rotate_minusZ_0_1() {
    if (i++ == 60) {
        i = 0;
        step2_1_execute();
        return;
    }

    R.RotateAxis("X", -1, 1);

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusZ_0_1);
}

function rotate_minusZ_0_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 6) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("X", -1, 1);
            break;
        case 1:
            R.RotateAxis("Y", 1, -1);
            break;
        case 2:
            R.RotateAxis("Y", 1, -1);
            break;
        case 3:
            R.RotateAxis("X", -1, -1);
            break;
        case 4:
            R.RotateAxis("X", 1, 1);
            break;
        case 5:
            R.RotateAxis("X", 1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusZ_0_2);
}