import { scene , camera } from './RubixCube.js';
import * as R from './Rotation.js';

let exeCount =0;
let i=0;

export const rotateCameraToPoint= (cubeGroup,Axis,Clockwise)=> { 

        R.RotateAll(cubeGroup,Axis,Clockwise);
         if (i++ == 59) {  	//rotateCameraToPoint is called only 60times so we have to place if statement under and set the number to 59
            i = 0; 
       
            return ;
        }
    }