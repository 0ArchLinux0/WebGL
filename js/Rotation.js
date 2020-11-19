import * as MakeCube from './MakeCube.js';
   

let countexe = 1;
let count=0;
let ZERO=1e-1;
export const RotateAxis = (cubeGroup, axisName, value) => {
    count++;
    cubeGroup.forEach((cubeinPlane) => {
        cubeinPlane.forEach((cubeinLine) => {
            cubeinLine.forEach((cubeElement) => {
                //console.log("axis:"+axisName);
                switch (axisName) {

                   case "X":
                        if (cubeElement.cube.position.x == value) {

                            if (!cubeElement.stored) {
                                cubeElement.storePosition.z = cubeElement.cube.position.z;
                                cubeElement.storePosition.y = cubeElement.cube.position.y;
                                cubeElement.stored = true;
                            }

                            cubeElement.angle.x += Math.PI / 120;
                            cubeElement.cube.position.z = Math.cos(cubeElement.angle.x) * cubeElement.storePosition.z - Math.sin(cubeElement.angle.x) *  cubeElement.storePosition.y;
                            cubeElement.cube.position.y = Math.sin(cubeElement.angle.x) * cubeElement.storePosition.z + Math.cos(cubeElement.angle.x) *  cubeElement.storePosition.y;
                            cubeElement.cube.rotation.x = -cubeElement.angle.x;
                            if(countexe++==540){
                                countexe=1;
                                cubeElement.stored=false;
                                
                            }
                            if(count==60){
                                cubeElement.cube.position.y=Math.round(cubeElement.cube.position.y);
                                cubeElement.cube.position.z=Math.round(cubeElement.cube.position.z);
                                console.log(cubeElement.cube.position.y);
                            }
                            console.log("X"+countexe);
                        }
                        break;

                    case "Y":

                        if (cubeElement.cube.position.y == value) {
                            if (!cubeElement.stored) {
                                cubeElement.storePosition.x = cubeElement.cube.position.x;
                                cubeElement.storePosition.z = cubeElement.cube.position.z;
                                cubeElement.stored = true;
                            }
                            cubeElement.angle.y += Math.PI / 120;
                            cubeElement.cube.position.x = Math.cos(cubeElement.angle.y) * cubeElement.storePosition.x - Math.sin(cubeElement.angle.y) * cubeElement.storePosition.z;
                            cubeElement.cube.position.z = Math.sin(cubeElement.angle.y) * cubeElement.storePosition.x + Math.cos(cubeElement.angle.y) * cubeElement.storePosition.z;
                            cubeElement.cube.rotation.y = -cubeElement.angle.y;
                            
                            if(countexe++==540){
                                countexe=1;
                                cubeElement.stored=false;
                                cubeElement.cube.position.x=Math.round(cubeElement.cube.position.x);
                                cubeElement.cube.position.z=Math.round(cubeElement.cube.position.z);
                            }
                             if(count==60){
                                cubeElement.cube.position.z=Math.round(cubeElement.cube.position.z);
                                cubeElement.cube.position.x=Math.round(cubeElement.cube.position.x);
                                console.log(cubeElement.cube.position.y);
                            }
                            console.log("Y"+countexe);
                        }
                        break;

                    case "Z":
                        if (cubeElement.cube.position.z == value) {
                            if (!cubeElement.stored) {
                                cubeElement.storePosition.y = cubeElement.cube.position.y;
                                cubeElement.storePosition.x = cubeElement.cube.position.x;
                                cubeElement.stored = true;
                            }
                            cubeElement.angle.z += Math.PI / 120;
                            cubeElement.cube.position.y = Math.cos(cubeElement.angle.z) *  cubeElement.storePosition.y - Math.sin(cubeElement.angle.z) *cubeElement.storePosition.x ;
                            cubeElement.cube.position.x = Math.sin(cubeElement.angle.z) *  cubeElement.storePosition.y + Math.cos(cubeElement.angle.z) *cubeElement.storePosition.x ;
                            cubeElement.cube.rotation.z = -cubeElement.angle.z;
                            if(countexe++==540){
                                countexe=1;
                                cubeElement.stored=false;
                                cubeElement.cube.position.x=Math.round(cubeElement.cube.position.x);
                                cubeElement.cube.position.y=Math.round(cubeElement.cube.position.y);
                            }
                             if(count==60){
                                cubeElement.cube.position.x=Math.round(cubeElement.cube.position.x);
                                cubeElement.cube.position.y=Math.round(cubeElement.cube.position.y);
                                console.log(cubeElement.cube.position.y);
                            }
                            console.log("Z"+countexe);
                            console.log("x "+cubeElement.cube.position.x+" y "+cubeElement.cube.position.y+" z "+cubeElement.cube.position.z);
                        break;
                    }
                }
            });
        });

    }); //console.log("count"+count);  /*cubeGroup[i+1][j+1][k+1].cube.position.x==0||
}
/*let countexe=1;
export const RotateAxis = (cubeGroup, axisName,value) => {
	let count=0;
    for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                for (let k = -1; k < 2; k++) {
                switch (axisName) {

                    case "X":
                        if (cubeElement.cube.position.x == value) {
                            cubeElement.angle.y += Math.PI / 120;
                            cubeElement.cube.position.z = Math.cos(cubeElement.angle.x) * cubeElement.initPosition.z - Math.sin(cubeElement.angle.x) * cubeElement.initPosition.y;
                            cubeElement.cube.position.y = Math.sin(cubeElement.angle.x) * cubeElement.initPosition.z + Math.cos(cubeElement.angle.x) * cubeElement.initPosition.y;
                            cubeElement.cube.rotation.x = -cubeElement.angle.x;
                        } break;

                    case "Y":

                        if (cubeGroup[i+1][j+1][k+1].cube.position.y == value) {
                            cubeGroup[i+1][j+1][k+1].angle.y +=Math.PI /120;
                            cubeGroup[i+1][j+1][k+1].cube.position.x = Math.cos(cubeGroup[i+1][j+1][k+1].angle.y) * cubeGroup[i+1][j+1][k+1].initPosition.x - Math.sin(cubeGroup[i+1][j+1][k+1].angle.y) * cubeGroup[i+1][j+1][k+1].initPosition.z;
                            cubeGroup[i+1][j+1][k+1].cube.position.z = Math.sin(cubeGroup[i+1][j+1][k+1].angle.y) * cubeGroup[i+1][j+1][k+1].initPosition.x + Math.cos(cubeGroup[i+1][j+1][k+1].angle.y) * cubeGroup[i+1][j+1][k+1].initPosition.z;
                            cubeGroup[i+1][j+1][k+1].cube.rotation.y = -cubeGroup[i+1][j+1][k+1].angle.y;
                            count++;
                            let dis=cubeGroup[i+1][j+1][k+1].cube.position.y;
                           // console.log("changed"+i+","+j+","+k,+" to:"+dis);
                        } break;

                    case "Z":
                        if (cubeGroup[i+1][j+1][k+1].cube.position.z == value) {
                            cubeGroup[i+1][j+1][k+1].angle.y += Math.PI / 120;
                            cubeGroup[i+1][j+1][k+1].cube.position.x = Math.cos(cubeGroup[i+1][j+1][k+1].angle.y) * cubeGroup[i+1][j+1][k+1].initPosition.x - Math.sin(cubeGroup[i+1][j+1][k+1].angle.y) * cubeGroup[i+1][j+1][k+1].initPosition.z;
                            cubeGroup[i+1][j+1][k+1].cube.position.z = Math.sin(cubeGroup[i+1][j+1][k+1].angle.y) * cubeGroup[i+1][j+1][k+1].initPosition.x + Math.cos(cubeGroup[i+1][j+1][k+1].angle.y) * cubeGroup[i+1][j+1][k+1].initPosition.z;
                            cubeGroup[i+1][j+1][k+1].cube.rotation.y = -cubeGroup[i+1][j+1][k+1].angle.y;
                        }break;

                }
            }
        }

    }
}*/

/*export const adjust=(cubeGroup, axisName,value) => {
	let count=0;
    cubeGroup.forEach((cubeinPlane) => {
        cubeinPlane.forEach((cubeinLine) => {
            cubeinLine.forEach((cubeElement) => {
                //console.log("axis:"+axisName);
                switch (axisName) {

                    case "X":
                        if (cubeElement.cube.position.x == value) {
                            cubeElement.angle.y += Math.PI / 120;
                            cubeElement.cube.position.z = Math.cos(cubeElement.angle.x) * cubeElement.initPosition.z - Math.sin(cubeElement.angle.x) * cubeElement.initPosition.y;
                            cubeElement.cube.position.y = Math.sin(cubeElement.angle.x) * cubeElement.initPosition.z + Math.cos(cubeElement.angle.x) * cubeElement.initPosition.y;
                            cubeElement.cube.rotation.x = -cubeElement.angle.x;
                        }

                    case "Y":

                        if (cubeElement.cube.position.y == value) {
                  
                            cubeElement.cube.position.x = cubeElement.initPosition.x;
                            cubeElement.cube.position.z = cubeElement.initPosition.z;
                            cubeElement.cube.rotation.y = 0;
                            //console.log(cubeElement.cube.position.y+","+value)
                            count++
                        }

                    case "Z":
                        if (cubeElement.cube.position.z == value) {
                            cubeElement.angle.y += Math.PI / 120;
                            cubeElement.cube.position.x = Math.cos(cubeElement.angle.y) * cubeElement.initPosition.x - Math.sin(cubeElement.angle.y) * cubeElement.initPosition.z;
                            cubeElement.cube.position.z = Math.sin(cubeElement.angle.y) * cubeElement.initPosition.x + Math.cos(cubeElement.angle.y) * cubeElement.initPosition.z;
                            cubeElement.cube.rotation.y = -cubeElement.angle.y;
                        }

                }
            });
        });

    });console.log("count"+count); 
}*/

export const adjust = (cubeGroup, axisName, value) => {
    let count = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 2; k++) {

                /*switch (axisName) {*/

                /* case "X":
                     if (cubeGroup.cube.position.x == value) {
                         cubeGroup.angle.y += Math.PI / 120;
                         cubeGroup.cube.position.z = Math.cos(cubeGroup.angle.x) * cubeGroup.initPosition.z - Math.sin(cubeGroup.angle.x) * cubeGroup.initPosition.y;
                         cubeGroup.cube.position.y = Math.sin(cubeGroup.angle.x) * cubeGroup.initPosition.z + Math.cos(cubeGroup.angle.x) * cubeGroup.initPosition.y;
                         cubeGroup.cube.rotation.x = -cubeGroup.angle.x;
                     }*/

                /* case "Y":*/

                if (cubeGroup[i + 1][j + 1][k + 1].cube.position.y == value) {
                    console.log(cubeGroup[i + 1][j + 1][k + 1].initPosition.x);
                    cubeGroup[i + 1][j + 1][k + 1].cube.position.x = cubeGroup[i + 1][j + 1][k + 1].initPosition.x;
                    cubeGroup[i + 1][j + 1][k + 1].cube.position.y = cubeGroup[i + 1][j + 1][k + 1].initPosition.y;
                    cubeGroup[i + 1][j + 1][k + 1].cube.position.z = cubeGroup[i + 1][j + 1][k + 1].initPosition.z;
                    cubeGroup[i + 1][j + 1][k + 1].cube.rotation.x = 0;
                    cubeGroup[i + 1][j + 1][k + 1].cube.rotation.y = 0;
                    cubeGroup[i + 1][j + 1][k + 1].cube.rotation.z = 0;
                    //console.log(i+" "+j+" "+k+"is :"+cubeGroup[i+1][j+1][k+1].cube.position.x+","+cubeGroup[i+1][j+1][k+1].cube.position.z);
                    count++
                }

                /*  case "Z":
                      if (cubeGroup.cube.position.z == value) {
                          cubeGroup.angle.y += Math.PI / 120;
                          cubeGroup.cube.position.x = Math.cos(cubeGroup.angle.y) * cubeGroup.initPosition.x - Math.sin(cubeGroup.angle.y) * cubeGroup.initPosition.z;
                          cubeGroup.cube.position.z = Math.sin(cubeGroup.angle.y) * cubeGroup.initPosition.x + Math.cos(cubeGroup.angle.y) * cubeGroup.initPosition.z;
                          cubeGroup.cube.rotation.y = -cubeGroup.angle.y;
                      }*/

            }
        }

    }
}
/*;console.log("aaaaaa"+cubeGroup[2][2][2].cube.rotation.y); 
}
*/