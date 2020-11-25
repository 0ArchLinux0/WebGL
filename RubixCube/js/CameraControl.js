import { scene, camera } from './RubixCube.js';
import * as R from './Rotation.js';

let exeCount = 0;
let i = 0;

export const rotateCube = (Axis, Clockwise,callback, ) => {
console.log("turn camera"+i);
    R.RotateAll(Axis, Clockwise);
    if (i++ == 59) { //rotateCube is called only 60times therefore set the number to 59
        i = 0;
        console.log("turn camera");
        callback();
       // console.log("Rotation over");
        return;
    }
}
