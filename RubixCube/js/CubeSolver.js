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
        //  console.log("execute step2 1");
        step2_1(2, 2, 1);
        return;
    }

    if (!needExecuteInitialized) {
        needExecuteInitialized = true;
        needExecute = step1_2(cubeGroup);
        //   console.log("need init " + needExecute);
    } else {
        step1_2(cubeGroup);
    }

    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(Render_step1_2);
}

let step2_1Count = 0;
let countRender = 0;
const step2_1_execute = () => {
    //console.log("turn~~~ " + step2_1Count);
    //if (step2_1Count == 2)
    switch (step2_1Count) {
        case 0:
            //console.log("turn~~~ " +step2_1Count);
            Control.rotateCube("Y", 1, function() { step2_1(1, 2, 0); });
            break;
        case 1:
            Control.rotateCube("Y", 1, function() { step2_1(0, 2, 1); });
            break;
        case 2:
            Control.rotateCube("Y", 1, function() { step2_1(1, 2, 2); });
            break;
        default:
            Control.rotateCube("Y", 1, function() {
                //  console.log("return Count " + step2_1Count);
            });
            break;
            //step2_1Count = 0;
    }
    controls.update();
    renderer.render(scene, camera);
    if (countRender++ == 59) {
        countRender = 0;
        //console.log("case: " + step2_1Count + "Rotation over ");
        if (step2_1Count++ == 3) {
            step2_1Count = 0;
            step2_2(2, 2, 2);
        }
        return;

    }

    requestAnimationFrame(step2_1_execute);

}

//let step2_1Count = 0;   //check and change to step2_2count or not
//let countRender=0;
const step2_2_execute = () => {
    switch (step2_1Count) {
        case 0:
            //console.log("turn~~~ " + countRender);
            Control.rotateCube("Y", 1, function() { step2_2(2, 2, 0); });
            break;
        case 1:
            Control.rotateCube("Y", 1, function() { step2_2(0, 2, 0); });
            break;
        case 2:
            Control.rotateCube("Y", 1, function() { step2_2(0, 2, 2); });
            break;
        case 3:
            Control.rotateCube("Y", 1, function() {
                // console.log("return Count " + step2_1Count);
            });
            break;
        case 4:
            Control.rotateCube("X", ANTICLOCKWISE, function() {});
            break;
        case 5:
            Control.rotateCube("X", ANTICLOCKWISE, function() {});
            break;
    }
    controls.update();
    renderer.render(scene, camera);
    if (countRender++ == 59) {
        countRender = 0;
        if (step2_1Count == 3||step2_1Count==4) {
            step2_1Count++;
            step2_2_execute();
            return;
        }
        //console.log("case: " + step2_1Count + "Rotation over ");
        if (step2_1Count++ == 5) {
            step2_1Count = 0;
            step3(2, 1, 2);
        }
        return;
    }

    requestAnimationFrame(step2_2_execute);

}

let step3Count = 0;

const step3_execute = () => {
    switch (step3Count) {
        case 0:
            Control.rotateCube("Y", 1, function() { step3(2, 1, 0); });
            break;
        case 1:
            Control.rotateCube("Y", 1, function() { step3(0, 1, 0); });
            break;
        case 2:
            Control.rotateCube("Y", 1, function() { step3(0, 1, 2); });
            break;
        case 3:
            Control.rotateCube("Y", 1, function() {});
            /*console.log("turn~~~ " + countRender);
            Control.rotateCube("Y", 1, function() { step2_2(2, 2, 0); });
            break;*/
            /* case 1:
                 Control.rotateCube("Y", 1, function() { step2_2(0, 2, 0); });
                 break;
             case 2:
                 Control.rotateCube("Y", 1, function() { step2_2(0, 2, 2); });
                 break;*/
        default:
            /*Control.rotateCube("Y", 1, function() {
                console.log("return Count " + step3Count);
            });*/
            break;
    }
    controls.update();
    renderer.render(scene, camera);
    if (countRender++ == 59) {
        countRender = 0;
       /* if (step3Count == 0) {
            step3Count++;
            step3_execute();
            return;
        }*/
        if (step3Count++ == 3) {
            step3Count = 0;
            //step3_execute();
        }
        return;
    }

    requestAnimationFrame(step3_execute);

}






export const step2_1 = (i, j, k) => {
    console.log("step2 called");
    const cube = cubeGroup[i][j][k].cube; //Start with cube [1,1,0]
    const matrix = cubeGroup[i][j][k].axisDirection;
    console.log(cube.position.x + ", " + cube.position.y + ", " + cube.position.z);
    if (matrix.subset(math.index(1, 0)) == 1) { //Facing +X
        console.log("x");

        if (cube.position.y == 1) { //checked
            rotate_X_1(); ////minjun chekced!!!!!!!!!
        } else if (cube.position.y == -1) {
            rotate_X_2(); //minjun chekced!!!!!!!!!
        } else if (cube.position.y == 0) {
            if (cube.position.z == 1)
                rotate_X_0_1(); ////minjun chekced!!!!!!!!!
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
                rotate_minusX_0_1(); //minjun chekced!!!!!!!!!
            else rotate_minusX_0_2(); //minjun chekced!!!!!!!!!
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
            rotate_minusY_0(); //////////////Checked!
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
            rotate_Z_1(); //minjun chekced!!!!!!!!!
        } else if (cube.position.y == -1) {
            rotate_Z_2(); //minjun chekced!!!!!!!!!
        } else if (cube.position.x == 1) {
            rotate_Z_0_1(); //minjun chekced!!!!!!!!!??????????????????
        } else if (cube.position.x == -1) {
            rotate_Z_0_2(); //minjun chekced!!!!!!!!!
        }
    } else if (matrix.subset(math.index(1, 2)) == -1) { //Facing -Z
        console.log("-z");
        if (cube.position.y == 1) {
            rotate_minusZ_1(); /////////////////minjun checked DDDDDDDDDD
        } else if (cube.position.y == -1) {
            rotate_minusZ_2(); ////////////////minjun checked
        } else if (cube.position.x == 1) {
            rotate_minusZ_0_1(); ////////////////minjun checked
        } else if (cube.position.x == -1) {
            rotate_minusZ_0_2(); //d
        }
    }
}

export const step2_2 = (i, j, k) => {
    //console.log("step2 called");
    const cube = cubeGroup[i][j][k].cube; //Start with cube [1,1,0]
    const matrix = cubeGroup[i][j][k].axisDirection;
    console.log("in step2_2" + cube.position.x + ", " + cube.position.y + ", " + cube.position.z);
    if (matrix.subset(math.index(1, 0)) == 1) { //Facing +X
        console.log("in step2_2 x");

        if (cube.position.y == 1) {
            if (cube.position.z == 1) rotate_step2_X_1();
            else rotate_step2_X_2(); //right

        } else if (cube.position.y == -1) {
            if (cube.position.z == 1) rotate_step2_X_3(); //basic
            else rotate_step2_X_4(); //maybe right
        }
    } else if (matrix.subset(math.index(1, 0)) == -1) { //Facing -X
        console.log("in step2_2 -x");

        if (cube.position.y == 1) {
            if (cube.position.z == 1) rotate_step2_minusX_1();
            else rotate_step2_minusX_2(); //RIGHT!
        } else if (cube.position.y == -1) {
            if (cube.position.z == 1) rotate_step2_minusX_3(); //basic
            else rotate_step2_minusX_4();
        }
    } else if (matrix.subset(math.index(1, 1)) == 1) { //Facing +Y axis
        console.log("in step2_2 y");
        if (cube.position.z == 1) {
            if (cube.position.x == 1) step2_2_execute(); //right!
            else rotate_step2_Y_1(); //right!
        } else {
            if (cube.position.x == 1) rotate_step2_Y_2(); //right!!!!!
            else rotate_step2_Y_3();
        }

    } else if (matrix.subset(math.index(1, 1)) == -1) { //Facing -Y axis 
        console.log("in step2_2 -y");
        if (cube.position.z == 1) {
            if (cube.position.x == 1) rotate_step2_minusY_0(); ///right
            else rotate_step2_minusY_1(); //right

        } else {
            if (cube.position.x == 1) rotate_step2_minusY_2(); //right
            else rotate_step2_minusY_3();
        }
    } else if (matrix.subset(math.index(1, 2)) == 1) { //Facing Z
        console.log("in step2_2 z");
        if (cube.position.y == 1) {
            if (cube.position.x == 1) rotate_step2_Z_0();
            else rotate_step2_Z_1(); //MINJUNCheck real! right!

        } else {
            if (cube.position.x == 1) rotate_step2_Z_2(); //RIGHT
            else rotate_step2_Z_3();
        }
    } else if (matrix.subset(math.index(1, 2)) == -1) { //Facing -Z
        console.log("in step2_2 -z");
        if (cube.position.y == 1) {
            if (cube.position.x == 1) rotate_step2_minusZ_0();
            else rotate_step2_minusZ_1(); //MINJUNCheck real! right!

        } else {
            if (cube.position.x == 1) rotate_step2_minusZ_2(); //HAS LINK
            else rotate_step2_minusZ_3();
        }
    }
}

export const step3 = (i, j, k) => {
    //console.log("step2 called");
    const cube = cubeGroup[i][j][k].cube; //Start with cube [1,1,0]
    const matrix = cubeGroup[i][j][k].axisDirection;
    console.log("in step3 " + cube.position.x + ", " + cube.position.y + ", " + cube.position.z);
    if (matrix.subset(math.index(2, 0)) == 1) { //If cube element's Axis Z Facing +X(Orange face at start)
        console.log("in step3 x");
        if (cube.position.y == 1) {
            rotate_step3_X_1();
        } else if (cube.position.z == 1) {
            rotate_step3_X_2();
        } else {
            rotate_step3_X_3();
        }
    } else if (matrix.subset(math.index(2, 0)) == -1) { //If cube element's Axis Z Facing -X
        console.log("in step3 -x");

        if (cube.position.y == 1) {
            rotate_step3_minusX_1();
        } else if (cube.position.z == 1) {
            rotate_step3_minusX_2();
        } else {
            rotate_step3_minusX_3();
        }
    } else if (matrix.subset(math.index(2, 1)) == 1) { //If cube element's Axis Z Facing +Y axis
        console.log("in step3 y");
        if (cube.position.x == 1) {
            rotate_step3_Y_1();
        } else if (cube.position.z == 1) {
            rotate_step3_Y_2();
        } else if (cube.position.z==-1) {
            rotate_step3_Y_3();
        } else{
            rotate_step3_Y_4();
        }
    }  else if (matrix.subset(math.index(2, 2)) == 1) { //If cube element's Axis Z Facing Z
        if (cube.position.y == 1) {
            rotate_step3_Z_1();
        } else if (cube.position.x == -1) {
            rotate_step3_Z_2();
        } else {
            step3_execute();
        }
    } else if (matrix.subset(math.index(2, 2)) == -1) { //If cube element's Axis Z Facing -Z
        console.log("in step3 -z");
        if (cube.position.y == 1) {
            rotate_step3_minusZ_1();
        } else if (cube.position.x == 1) {
            rotate_step3_minusZ_2();
        } else {
            rotate_step3_minusZ_3();
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


let step2_1_count = 0


function rotate_X_1() {
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
            R.RotateAxis("X", -1, 1);
            break;
        case 1:
            R.RotateAxis("Y", 1, 1)
            break;
        case 2:
            R.RotateAxis("Z", -1, 1);
            break;
        case 3:
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
            R.RotateAxis("Z", 1, 1);
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
    if (step2_1_count == 3) {
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
            R.RotateAxis("X", -1, -1);
            break;
        case 1:
            R.RotateAxis("X", -1, -1);
            break;
        case 2:
            R.RotateAxis("Y", -1, -1);
            break;
        case 3:
            R.RotateAxis("X", 1, -1);
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
            R.RotateAxis("Z", -1, 1);
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
    if (step2_1_count == 6) {
        i = 0;
        step2_1_count = 0;
        step2_1_execute();
        return;
    }
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
            R.RotateAxis("Y", -1, -1);
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
    requestAnimationFrame(rotate_Y_1);
}

function rotate_Y_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 5) {
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
            R.RotateAxis("Z", 1, 1);
            break;
        case 2:
            R.RotateAxis("Y", -1, -1);
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
    requestAnimationFrame(rotate_Y_2);
}

function rotate_Y_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 5) {
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
            R.RotateAxis("Z", 1, -1);
            break;
        case 2:
            R.RotateAxis("Y", 1, -1);
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
            R.RotateAxis("Z", 1, -1);
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
    if (step2_1_count == 5) {
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
            R.RotateAxis("Z", -1, -1);
            break;
        case 2:
            R.RotateAxis("X", -1, 1);
            break;
        case 3:
            R.RotateAxis("Z", -1, -1);
            break;
        case 4:
            R.RotateAxis("Z", -1, -1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_minusZ_0_2);
}

//////////////////////////////////////////////////step2_2////////////

function rotate_step2_X_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 8) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
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
            R.RotateAxis("X", 1, 1);
            break;
        case 3:
            R.RotateAxis("Y", -1, -1);
            break;
        case 4:
            R.RotateAxis("Y", -1, -1);
            break;
        case 5:
            R.RotateAxis("Z", 1, 1);
            break;
        case 6:
            R.RotateAxis("Y", 1, -1);
            break;
        case 7:
            R.RotateAxis("Z", -1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_X_1);
}

function rotate_step2_X_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        rotate_step2_minusY_0(); //check????????????????????
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", 1, -1);
            break;
        case 1:
            R.RotateAxis("Y", 1, -1);
            break;
        case 2:
            R.RotateAxis("Z", -1, -1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_X_2);
}

function rotate_step2_X_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 4) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", -1, -1);
            break;
        case 1:
            R.RotateAxis("Z", 1, 1);
            break;
        case 2:
            R.RotateAxis("Y", 1, -1);
            break;
        case 3:
            R.RotateAxis("Z", -1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_X_3);
}

function rotate_step2_X_4() {
    if (i++ == 60) {
        i = 0;
        rotate_step2_Z_2(); //check????????????????????
        return;
    }
    R.RotateAxis("Y", 1, -1);

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_X_4);
}

function rotate_step2_minusX_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 5) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }
    switch (step2_1_count) {
        /*case 0:
            R.RotateAxis("X", 1, 0);
            break;
        case 1:
            R.RotateAxis("Z", 1, 1);
            break;
        case 2:
            R.RotateAxis("X", -1, 0);
            break;*/ //RIGHT WAY BUT BELOW IS BETTER TO LEARN
        case 0:
            R.RotateAxis("X", -1, -1);
            break;
        case 1:
            R.RotateAxis("X", -1, 1);
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

    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusX_1);
}

function rotate_step2_minusX_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 6) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("X", 1, -1);
            break;
        case 1:
            R.RotateAxis("Y", 1, -1);
            break;
        case 2:
            R.RotateAxis("X", -1, -1);
            break;
        case 3:
            R.RotateAxis("Z", 1, 1);
            break;
        case 4:
            R.RotateAxis("Y", 1, -1);
            break;
        case 5:
            R.RotateAxis("Z", -1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusX_2);
}

function rotate_step2_minusX_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("X", -1, 1);
            break;
        case 1:
            R.RotateAxis("Y", -1, -1);
            break;
        case 2:
            R.RotateAxis("X", 1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusX_3);
}

function rotate_step2_minusX_4() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 2) {
        i = 0;
        step2_1_count = 0;
        rotate_step2_X_3();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", -1, -1);
            break;
        case 1:
            R.RotateAxis("Y", -1, -1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusX_4);
}

function rotate_step2_Y_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 7) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
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
            R.RotateAxis("Z", 1, 1);
            break;
        case 5:
            R.RotateAxis("Y", 1, -1);
            break;
        case 6:
            R.RotateAxis("Z", -1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_Y_1);
}


function rotate_step2_Y_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        rotate_step2_Z_2();
        return;
    }
    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", 1, -1);
            break;
        case 1:
            R.RotateAxis("Y", 1, -1);
            break;

        case 2:
            R.RotateAxis("Z", -1, -1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_Y_2);
}

function rotate_step2_Y_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 6) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
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
            R.RotateAxis("Z", 1, 1);
            break;
        case 3:
            R.RotateAxis("Y", 1, -1);
            break;
        case 4:
            R.RotateAxis("Z", -1, 1);
            break;
        case 5:
            R.RotateAxis("Z", 1, -1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_Y_3);
}

function rotate_step2_minusY_0() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 4) {
        i = 0;
        step2_1_count = 0;
        rotate_step2_Z_3();
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
            R.RotateAxis("X", 1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusY_0);
}

function rotate_step2_minusY_1() {
    if (i++ == 60) {
        i = 0;
        rotate_step2_minusY_0(); //check????????????????????
        return;
    }

    R.RotateAxis("Y", -1, -1);


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusY_1);
}

function rotate_step2_minusY_2() {
    if (i++ == 60) {
        i = 0;
        rotate_step2_minusY_0(); //check????????????????????
        return;
    }

    R.RotateAxis("Y", 1, -1);


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusY_2);
}

function rotate_step2_minusY_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 2) {
        i = 0;
        step2_1_count = 0;
        rotate_step2_minusY_0();
        return;
    }

    R.RotateAxis("Y", 1, -1);

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusY_3);
}

function rotate_step2_Z_0() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 2) {
        i = 0;
        step2_1_count = 0;
        rotate_step2_X_4();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", 1, 1);
            break;
        case 1:
            R.RotateAxis("Y", -1, -1);
            break;
        case 2:
            R.RotateAxis("Z", -1, 1);
            break;
    }


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_Z_0);
}

function rotate_step2_Z_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 7) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
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
            R.RotateAxis("Y", -1, -1);
            break;
        case 3:
            R.RotateAxis("Z", 1, 1);
            break;
        case 4:
            R.RotateAxis("Z", 1, 1);
            break;
        case 5:
            R.RotateAxis("Y", 1, -1);
            break;
        case 6:
            R.RotateAxis("Z", -1, 1);
            break;
    }


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_Z_1);
}

function rotate_step2_Z_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 4) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", 1, -1);
            break;
        case 1:
            R.RotateAxis("X", -1, 1);
            break;
        case 2:
            R.RotateAxis("Y", -1, -1);
            break;
        case 3:
            R.RotateAxis("X", 1, 1);
            break;
    }


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_Z_2);
}

function rotate_step2_Z_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 5) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", -1, -1);
            break;
        case 1:
            R.RotateAxis("Y", -1, -1);
            break;
        case 2:
            R.RotateAxis("Z", 1, 1);
            break;
        case 3:
            R.RotateAxis("Y", 1, -1);
            break;
        case 4:
            R.RotateAxis("Z", -1, 1);
            break;
    }


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_Z_3);
}

function rotate_step2_minusZ_0() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 5) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", 1, -1);
            break;
        case 1:
            R.RotateAxis("Z", 1, 1);
            break;
        case 2:
            R.RotateAxis("Y", 1, -1);
            break;
        case 3:
            R.RotateAxis("Z", -1, 1);
            break;
        case 4:
            R.RotateAxis("Z", -1, -1);
            break;
    }


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusZ_0);
}

function rotate_step2_minusZ_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 6) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", -1, -1);
            break;
        case 1:
            R.RotateAxis("Y", -1, -1);
            break;
        case 2:
            R.RotateAxis("X", -1, 1);
            break;
        case 3:
            R.RotateAxis("Y", -1, -1);
            break;
        case 4:
            R.RotateAxis("X", 1, 1);
            break;
        case 5:
            R.RotateAxis("Z", 1, -1);
            break;
    }


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusZ_1);
}

function rotate_step2_minusZ_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 3) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", 1, 1);
            break;
        case 1:
            R.RotateAxis("Y", 1, -1);
            break;
        case 0:
            R.RotateAxis("Z", -1, 1);
            break;
    }


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusZ_2);
}

function rotate_step2_minusZ_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 4) {
        i = 0;
        step2_1_count = 0;
        step2_2_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", -1, -1);
            break;
        case 1:
            R.RotateAxis("X", -1, 1);
            break;
        case 2:
            R.RotateAxis("Y", -1, -1);
            break;
        case 3:
            R.RotateAxis("X", 1, 1);
            break;
    }


    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step2_minusZ_3);
}

////////////////////step 3//////////////////////////////////////////////////////////////////////////////

function rotate_step3_X_1() {
    if (i++ == 60) {
        i = 0;
        rotate_step3_Z_1(); //check????????????????????
        return;
    }


    R.RotateAxis("Y", 1, 1);

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_X_1);
}

function rotate_step3_X_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 9) {
        i = 0;
        step2_1_count = 0;
        rotate_step3_Z_1();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("X", 1, 1);
            break;
        case 1:
            R.RotateAxis("Y", -1, 1);
            break;
        case 2:
            R.RotateAxis("X", -1, 1);
            break;
        case 3:
            R.RotateAxis("Y", -1, 1);
            break;
        case 4:
            R.RotateAxis("Z", -1, 1);
            break;
        case 5:
            R.RotateAxis("Y", 1, 1);
            break;
        case 6:
            R.RotateAxis("Z", 1, 1);
            break;
        case 7:
            R.RotateAxis("Y", 1, 1);
            break;
        case 8:
            R.RotateAxis("Y", 1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_X_2);
}


function rotate_step3_X_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 11) {
        i = 0;
        step2_1_count = 0;
        rotate_step3_Y_1();
        return;
    }

    switch (step2_1_count) {
        case 0:
            Control.rotateCube("Y", 1, function() {});
        case 1:
            R.RotateAxis("X", 1, 1);
            break;
        case 2:
            R.RotateAxis("Y", -1, 1);
            break;
        case 3:
            R.RotateAxis("X", -1, 1);
            break;
        case 4:
            R.RotateAxis("Y", -1, 1);
            break;
        case 5:
            R.RotateAxis("Z", -1, 1);
            break;
        case 6:
            R.RotateAxis("Y", 1, 1);
            break;
        case 7:
            R.RotateAxis("Z", 1, 1);
            break;
        case 8:
            R.RotateAxis("Y", 1, 1);
            break;
        case 9:
            R.RotateAxis("Y", 1, 1);
            break;
        case 10:
            Control.rotateCube("Y", -1, function() {});
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_X_3);
}

function rotate_step3_minusX_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 7) {
        i = 0;
        step2_1_count = 0;
        step3_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("X", 1, 1);
            break;
        case 1:
            R.RotateAxis("Y", -1, 1);
            break;
        case 2:
            R.RotateAxis("X", -1, 1);
            break;
        case 3:
            R.RotateAxis("Y", -1, 1);
            break;
        case 4:
            R.RotateAxis("Z", -1, 1);
            break;
        case 5:
            R.RotateAxis("Y", 1, 1);
            break;
        case 6:
            R.RotateAxis("Z", 1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_minusX_1);
}

function rotate_step3_minusX_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 9) {
        i = 0;
        step2_1_count = 0;
        rotate_step3_Y_1();
        return;
    }

    switch (step2_1_count) {
        case 0:
            Control.rotateCube("Y", -1, function() {});
        case 1:
            R.RotateAxis("X", 1, 1);
            break;
        case 2:
            R.RotateAxis("Y", -1, 1);
            break;
        case 3:
            R.RotateAxis("X", -1, 1);
            break;
        case 4:
            R.RotateAxis("Y", -1, 1);
            break;
        case 5:
            R.RotateAxis("Z", -1, 1);
            break;
        case 6:
            R.RotateAxis("Y", 1, 1);
            break;
        case 7:
            R.RotateAxis("Z", 1, 1);
            break;
        case 8:
            Control.rotateCube("Y", 1, function() {});
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_minusX_2);
}

function rotate_step3_minusX_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 11) {
        i = 0;
        step2_1_count = 0;
        rotate_step3_Z_1();
        return;
    }

    switch (step2_1_count) {
        case 0:
            Control.rotateCube("Y", 1, function() {});
        case 1:
            Control.rotateCube("Y", 1, function() {});
        case 2:
            R.RotateAxis("X", 1, 1);
            break;
        case 3:
            R.RotateAxis("Y", -1, 1);
            break;
        case 4:
            R.RotateAxis("X", -1, 1);
            break;
        case 5:
            R.RotateAxis("Y", -1, 1);
            break;
        case 6:
            R.RotateAxis("Z", -1, 1);
            break;
        case 7:
            R.RotateAxis("Y", 1, 1);
            break;
        case 8:
            R.RotateAxis("Z", 1, 1);
            break;
        case 9:
            Control.rotateCube("Y", 1, function() {});
        case 10:
            Control.rotateCube("Y", 1, function() {});
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_minusX_3);
}

function rotate_step3_Y_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 8) {
        i = 0;
        step2_1_count = 0;
        step3_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", -1, 1);
            break;
        case 1:
            R.RotateAxis("Z", -1, 1);
            break;
        case 2:
            R.RotateAxis("Y", 1, 1);
            break;
        case 3:
            R.RotateAxis("Z", 1, 1);
            break;
        case 4:
            R.RotateAxis("Y", 1, 1);
            break;
        case 5:
            R.RotateAxis("X", 1, 1);
            break;
        case 6:
            R.RotateAxis("Y", -1, 1);
            break;
        case 7:
            R.RotateAxis("X", -1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_Y_1);
}

function rotate_step3_Y_2() {
    if (i++ == 60) {
        i = 0;
        rotate_step3_Y_1(); //check????????????????????
        return;
    }

    R.RotateAxis("Y", -1, 1);
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_Y_2);
}

function rotate_step3_Y_3() {
     if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 7) {
        i = 0;
        step2_1_count = 0;
        step3_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Z", -1, 1);
            break;
        case 1:
            R.RotateAxis("Y", 1, 1);
            break;
        case 2:
            R.RotateAxis("Z", 1, 1);
            break;
        case 3:
            R.RotateAxis("Y", 1, 1);
            break;
        case 4:
            R.RotateAxis("X", 1, 1);
            break;
        case 5:
            R.RotateAxis("Y", -1, 1);
            break;
        case 6:
            R.RotateAxis("X", -1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_Y_3);
}

function rotate_step3_Y_4() {
      if (i++ == 60) {
        i = 0;
        rotate_step3_Y_1(); //check????????????????????
        return;
    }

    R.RotateAxis("Y", 1, 1);
           
    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_Y_4);
}

function rotate_step3_Z_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 8) {
        i = 0;
        step2_1_count = 0;
        step3_execute();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", 1, 1);
            break;
        case 1:
            R.RotateAxis("X", 1, 1);
            break;
        case 2:
            R.RotateAxis("Y", -1, 1);
            break;
        case 3:
            R.RotateAxis("X", -1, 1);
            break;
        case 4:
            R.RotateAxis("Y", -1, 1);
            break;
        case 5:
            R.RotateAxis("Z", -1, 1);
            break;
        case 6:
            R.RotateAxis("Y", 1, 1);
            break;
        case 7:
            R.RotateAxis("Z", 1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_Z_1);
}

function rotate_step3_Z_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 9) {
        i = 0;
        step2_1_count = 0;
        rotate_step3_X_1();
        return;
    }

    switch (step2_1_count) {
        case 0:
            Control.rotateCube("Y", -1, function() {});
        case 1:
            R.RotateAxis("X", 1, 1);
            break;
        case 2:
            R.RotateAxis("Y", -1, 1);
            break;
        case 3:
            R.RotateAxis("X", -1, 1);
            break;
        case 4:
            R.RotateAxis("Y", -1, 1);
            break;
        case 5:
            R.RotateAxis("Z", -1, 1);
            break;
        case 6:
            R.RotateAxis("Y", 1, 1);
            break;
        case 7:
            R.RotateAxis("Z", 1, 1);
            break;
        case 8:
            Control.rotateCube("Y", 1, function() {});
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_Z_2);
}

function rotate_step3_minusZ_1() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 2) {
        i = 0;
        step2_1_count = 0;
        rotate_step3_Z_1();
        return;
    }

    switch (step2_1_count) {
        case 0:
            R.RotateAxis("Y", 1, 1);
            break;
        case 1:
            R.RotateAxis("Y", 1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_minusZ_1);
}


function rotate_step3_minusZ_2() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 10) {
        i = 0;
        step2_1_count = 0;
        rotate_step3_Y_1();
        return;
    }

    switch (step2_1_count) {
        case 0:
            Control.rotateCube("Y", 1, function() {});
        case 1:
            R.RotateAxis("Z", -1, 1);
            break;
        case 2:
            R.RotateAxis("Y", 1, 1);
            break;
        case 3:
            R.RotateAxis("Z", 1, 1);
            break;
        case 4:
            R.RotateAxis("Y", 1, 1);
            break;
        case 5:
            R.RotateAxis("X", 1, 1);
            break;
        case 6:
            R.RotateAxis("Y", -1, 1);
            break;
        case 7:
            R.RotateAxis("X", -1, 1);
            break;
        case 8:
            Control.rotateCube("Y", -1, function() {});
        case 9:
            R.RotateAxis("Y", -1, 1);
            break;
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_minusZ_2);
}


function rotate_step3_minusZ_3() {
    if (i++ == 60) {
        i = 1;
        step2_1_count++;
    }
    if (step2_1_count == 13) {
        i = 0;
        step2_1_count = 0;
        rotate_step3_X_1();
        return;
    }

    switch (step2_1_count) {
        case 0:
            Control.rotateCube("Y", 1, function() {});
        case 1:
            Control.rotateCube("Y", 1, function() {});
        case 2:
            R.RotateAxis("Z", -1, 1);
            break;
        case 3:
            R.RotateAxis("Y", 1, 1);
            break;
        case 4:
            R.RotateAxis("Z", 1, 1);
            break;
        case 5:
            R.RotateAxis("Y", 1, 1);
            break;
        case 6:
            R.RotateAxis("X", 1, 1);
            break;
        case 7:
            R.RotateAxis("Y", -1, 1);
            break;
        case 8:
            R.RotateAxis("X", -1, 1);
            break;
        case 9:
            Control.rotateCube("Y", -1, function() {});
        case 10:
            R.RotateAxis("Y", -1, 1);
            break;
        case 11:
            Control.rotateCube("Y", 1, function() {});
        case 12:
            Control.rotateCube("Y", 1, function() {});
    }

    controls.update(); //Update
    renderer.render(scene, camera); //render to display on screen
    requestAnimationFrame(rotate_step3_minusZ_3);
}