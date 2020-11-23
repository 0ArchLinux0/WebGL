import { scene , camera } from './RubixCube.js';
import * as R from './Rotation.js';

let exeCount =0;
let i=0;

export const rotateCameraToPoint= (/*Axis,count*/cubeGroup,Axis,Clockwise)=> { 
		/*if(Axis=="X")*/


		/*if(Axis=="Y")*/


       
     /*   if (exeCount == count) { //When matches to SHUFFLE_TIME reset exeCount and i to intial vaule.
            exeCount = 0;
            i = 0;
            return;
        }
*/
        R.RotateAll(cubeGroup,Axis,Clockwise);
         if (i++ == 59) { //Reset when rotates PI/2
            i = 0; //To match execute time to 60
          /*  ran_num = parseInt(Math.random() * 3 - 0.1);
            isRunning = undefined;
            exeCount++; //Increase execution time to compare with SHUFFLE_TIME*/
           /* arg1 = String.fromCharCode(88 + ran_num);
            arg2 = (parseInt(Math.random() * 100) % 3 - 1);*/
            return ;
        }

       /* if ((!isMobile) && (prevWidth !== canvas.width) || (prevHeight !== canvas.heigth)) { //size change
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio; //change canvas size
            prevWidth = canvas.width;
            prevHeight = canvas.height; //store prev value to compare
            renderer.setSize(window.innerWidth, window.innerHeight); //change render size
            // setting camera aspect to prevent view from crushing
            camera.aspect = canvas.width / canvas.height;
            camera.updateProjectionMatrix();
        }*/
       

    }