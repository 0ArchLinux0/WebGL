import * as MakeCube from './MakeCube.js';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { scene } from './RubixCube.js';
//import * as math from 'https://unpkg.com/mathjs@8.0.1/lib/browser/math.js';
//import * as math from 'https://unpkg.com/mathjs@8.0.1/lib/browser/math.js';
/*"mathjs/lib/browser/math.js" since mathjs@8.0.0. ' +
  'Please load the bundle via the new path.')*/
const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);



let countexe = 0;
let count = 0;
let resetCount = 1;
let ZERO = 1e-1;
const rotXmatrix = math.matrix([
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0]
]);
const rotYmatrix = math.matrix([
    [0, 0, 1],
    [0, 1, 0],
    [-1, 0, 0]
]);
const rotZmatrix = math.matrix([
    [0, 1, 0],
    [-1, 0, 0],
    [0, 0, 1]
]);
let AxisDeterm = 0;

export const RotateAxis = (cubeGroup, axisName, value) => {
    count++;
    countexe++;
    cubeGroup.forEach((cubeinPlane) => {
        cubeinPlane.forEach((cubeinLine) => {
            cubeinLine.forEach((cubeElement) => {
                //   console.log("check"+cubeElement.rotAxisZMatrix);
                switch (axisName) {

                    case "X":
                        if (cubeElement.cube.position.x == value) {
                            if (!cubeElement.stored) {

                                cubeElement.storePosition.z = cubeElement.cube.position.z;
                                cubeElement.storePosition.y = cubeElement.cube.position.y;
                                cubeElement.stored = true;
                                cubeElement.AxisDeterm = math.inv(cubeElement.rotAxisZMatrix).subset(math.index(0, 0)) +
                                    +math.inv(cubeElement.rotAxisZMatrix).subset(math.index(0, 1)) * 2 +
                                    math.inv(cubeElement.rotAxisZMatrix).subset(math.index(0, 2)) * 4;
                            }

                            cubeElement.angle.x += Math.PI / 120;
                            cubeElement.cube.position.z = Math.cos(cubeElement.angle.x) * cubeElement.storePosition.z - Math.sin(cubeElement.angle.x) * cubeElement.storePosition.y;
                            cubeElement.cube.position.y = Math.sin(cubeElement.angle.x) * cubeElement.storePosition.z + Math.cos(cubeElement.angle.x) * cubeElement.storePosition.y;
                            //cubeElement.cube.rotationOrder='XYZ';
                            //cubeElement.cube.rotation.x -= Math.PI / 120;
                            pivot.attach(cubeElement.cube);
                            pivot.rotation.x -= Math.PI / 120;
                            pivot.updateMatrixWorld();
                            scene.attach(cubeElement.cube);
                            //cubeElement.cube.rotationOrder='XYZ';
                            /*switch (cubeElement.AxisDeterm) {
                                case 1:
                                    cubeElement.cube.rotation.x -= Math.PI / 120;
                                    console.log("case1");
                                    console.log("check" + cubeElement.rotAxisZMatrix);
                                    break;
                                case -1:
                                    console.log("case-1");
                                    console.log("check" + cubeElement.rotAxisZMatrix);
                                    cubeElement.cube.rotationOrder = 'XYZ';
                                    cubeElement.cube.rotation.x += Math.PI / 120;
                                    break;
                                case 2:
                                    console.log("case2");
                                    console.log("check" + cubeElement.rotAxisZMatrix);
                                    cubeElement.cube.rotation.y -= Math.PI / 120;
                                    break;
                                case -2:
                                    console.log("case-2");
                                    console.log("check" + cubeElement.rotAxisZMatrix);
                                    cubeElement.cube.rotation.y += Math.PI / 120;
                                    break;
                                case 4:
                                    console.log("case4");
                                    console.log("check" + cubeElement.rotAxisZMatrix);
                                    cubeElement.cube.rotation.z -= Math.PI / 120;
                                    break;
                                case -4:
                                    console.log("case-4");
                                    console.log("check" + cubeElement.rotAxisZMatrix);
                                    cubeElement.cube.rotation.z += Math.PI / 120;
                                    break;
                            }*/

                            if (count == 60) {

                                cubeElement.stored = false;
                                //cubeElement.cube.rotation.y -= Math.PI / 120;
                                cubeElement.cube.position.y = Math.round(cubeElement.cube.position.y);
                                cubeElement.cube.position.z = Math.round(cubeElement.cube.position.z);

                                if (cubeElement.initPosition.x == 1 && cubeElement.initPosition.y == 1 && cubeElement.initPosition.z == 1) {
                                    console.log("!!!!!!!");
                                    console.log("original" + cubeElement.rotAxisZMatrix);
                                    console.log("calc: " + math.multiply(cubeElement.rotAxisZMatrix, rotXmatrix));
                                }
                                ///$$$$
                                cubeElement.rotAxisZMatrix = math.multiply(rotXmatrix, cubeElement.rotAxisZMatrix);
                                cubeElement.rotAxisYMatrix = math.multiply(rotXmatrix, cubeElement.rotAxisYMatrix);

                                if (cubeElement.initPosition.x == 1 && cubeElement.initPosition.y == 1 && cubeElement.initPosition.z == 1) {
                                    console.log("this one" + cubeElement.rotAxisZMatrix);
                                }

                                cubeElement.angle.x = 0;
                                pivot.rotation.set(0, 0, 0);
                                pivot.updateMatrixWorld();

                                console.log(cubeElement.cube.position.y);
                                if (resetCount++ == 9) {
                                    console.log("reset count X");
                                    count = 0;
                                    resetCount = 1;
                                }
                            }
                            console.log("X" + countexe);
                            console.log("x " + cubeElement.cube.position.x + " y " + cubeElement.cube.position.y + " z " + cubeElement.cube.position.z);
                        }
                        break;

                    case "Y":
                        if (cubeElement.cube.position.y == value) {
                            if (!cubeElement.stored) {
                                if (cubeElement.initPosition.x == 1 && cubeElement.initPosition.y == 1 && cubeElement.initPosition.z == 1) {
                                    console.log("!!!!!!!");
                                    console.log("Y stored" + cubeElement.rotAxisZMatrix);
                                }

                                cubeElement.storePosition.x = cubeElement.cube.position.x;
                                cubeElement.storePosition.z = cubeElement.cube.position.z;
                                cubeElement.stored = true;
                                //const rotateAxisDeterm=math.subset(math.inv(cubeElement.rotAxisZMatrix),math.index(1,[0,1,2]));
                                cubeElement.AxisDeterm = math.inv(cubeElement.rotAxisYMatrix).subset(math.index(1, 0)) +
                                    +math.inv(cubeElement.rotAxisZMatrix).subset(math.index(1, 1)) * 2 +
                                    math.inv(cubeElement.rotAxisZMatrix).subset(math.index(1, 2)) * 4;

                            }

                            cubeElement.angle.y += Math.PI / 120;
                            cubeElement.cube.position.x = Math.cos(cubeElement.angle.y) * cubeElement.storePosition.x - Math.sin(cubeElement.angle.y) * cubeElement.storePosition.z;
                            cubeElement.cube.position.z = Math.sin(cubeElement.angle.y) * cubeElement.storePosition.x + Math.cos(cubeElement.angle.y) * cubeElement.storePosition.z;
                            pivot.attach(cubeElement.cube);
                            pivot.rotation.y -= Math.PI / 120;
                            pivot.updateMatrixWorld();
                            scene.attach(cubeElement.cube);
                            //  cubeElement.cube.eulerOrder='YXZ';
                            // cubeElement.cube.rotation.y -= Math.PI / 120;
                            /*if(countexe>40&&(cubeElement.initPosition.x == 1 && cubeElement.initPosition.y == 1 && cubeElement.initPosition.z == 1)){
                               // cubeElement.cube.rotation.y -= Math.PI / 120;
                                console.log("fuck");
                            }else{*/
                            /*switch (cubeElement.AxisDeterm) {
                                case 1:
                                    cubeElement.cube.rotation.x -= Math.PI / 120;
                                    console.log("case1Y");
                                    break;
                                case -1:
                                    console.log("case-1Y");
                                    cubeElement.cube.rotation.x += Math.PI / 120;
                                    break;
                                case 2:
                                    console.log("case2Y");
                                    cubeElement.cube.rotation.y -= Math.PI / 120;
                                    break;
                                case -2:
                                    console.log("case-2Y");
                                    cubeElement.cube.rotation.y += Math.PI / 120;
                                    break;
                                case 4:
                                    console.log("case4Y");
                                    cubeElement.cube.rotation.z -= Math.PI / 120;
                                    break;
                                case -4:
                                    console.log("case-4Y");
                                    cubeElement.cube.rotation.z += Math.PI / 120;
                                    break;
                            }*/
                            //}
                            if (count == 60) {

                                //count=0; 이렇게하면 하나만 반올림됨.
                                cubeElement.stored = false;
                                cubeElement.cube.position.z = Math.round(cubeElement.cube.position.z);
                                cubeElement.cube.position.x = Math.round(cubeElement.cube.position.x);

                                if (cubeElement.initPosition.x == 1 && cubeElement.initPosition.y == 1 && cubeElement.initPosition.z == 1) {
                                    console.log("!!!!!!!");
                                    console.log("original" + cubeElement.rotAxisZMatrix);
                                    console.log("calc: " + math.multiply(cubeElement.rotAxisZMatrix, rotYmatrix));
                                }

                                cubeElement.rotAxisZMatrix = math.multiply(cubeElement.rotAxisZMatrix, rotYmatrix);
                                if (cubeElement.initPosition.x == 1 && cubeElement.initPosition.y == 1 && cubeElement.initPosition.z == 1) {
                                    console.log("this one" + cubeElement.rotAxisZMatrix);
                                }
                                cubeElement.angle.y = 0;
                                pivot.rotation.set(0, 0, 0);
                                pivot.updateMatrixWorld();

                                console.log(cubeElement.cube.position.x);
                                console.log(cubeElement.cube.position.y);
                                console.log(cubeElement.cube.position.z);
                                if (resetCount++ == 9) {
                                    count = 0;
                                    resetCount = 1;
                                    console.log("reset count X");
                                }


                            }
                            console.log("Y" + countexe);
                            console.log("x " + cubeElement.cube.position.x + " y " + cubeElement.cube.position.y + " z " + cubeElement.cube.position.z);
                        }
                        break;

                    case "Z":
                        if (cubeElement.cube.position.z == value) {
                            if (!cubeElement.stored) {
                                cubeElement.storePosition.y = cubeElement.cube.position.y;
                                cubeElement.storePosition.x = cubeElement.cube.position.x;
                                cubeElement.stored = true;
                                cubeElement.AxisDeterm = math.inv(cubeElement.rotAxisZMatrix).subset(math.index(2, 0)) +
                                    +math.inv(cubeElement.rotAxisZMatrix).subset(math.index(2, 1)) * 2 +
                                    math.inv(cubeElement.rotAxisZMatrix).subset(math.index(2, 2)) * 4;
                            }
                            cubeElement.angle.z += Math.PI / 120;
                            cubeElement.cube.position.y = Math.cos(cubeElement.angle.z) * cubeElement.storePosition.y - Math.sin(cubeElement.angle.z) * cubeElement.storePosition.x;
                            cubeElement.cube.position.x = Math.sin(cubeElement.angle.z) * cubeElement.storePosition.y + Math.cos(cubeElement.angle.z) * cubeElement.storePosition.x;

                            pivot.attach(cubeElement.cube);
                            pivot.rotation.z -= Math.PI / 120;
                            pivot.updateMatrixWorld();
                            scene.attach(cubeElement.cube);


                            // cubeElement.cube.rotation.z -= Math.PI / 120;

                            /*switch (cubeElement.AxisDeterm) {
                                case 1:
                                cubeElement.cube.rotationOrder='ZXY';
                                    cubeElement.cube.rotation.x -= Math.PI / 120;
                                    console.log("case1");
                                    break;
                                case -1:
                                    console.log("case-1");
                                    //cubeElement.cube.rotationOrder='ZXY';
                                    cubeElement.cube.rotation.x += Math.PI / 120;
                                    break;
                                case 2:
                                    console.log("case2");
                                    cubeElement.cube.rotation.y -= Math.PI / 120;
                                    break;
                                case -2:
                                    console.log("case-2");
                                    cubeElement.cube.rotationOrder='ZXY';
                                    cubeElement.cube.rotation.y += Math.PI / 120;
                                    break;
                                case 4:
                                    console.log("case4");
                                    cubeElement.cube.rotation.z -= Math.PI / 120;
                                    break;
                                case -4:
                                    console.log("case-4");
                                    cubeElement.cube.rotation.z += Math.PI / 120;
                                    break;
                            }*/
                            /*  var some_quaternion = new THREE.Quaternion();
                              some_quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 120);
                              cubeElement.cube.rotation.setFromQuaternion(some_quaternion, "XYZ", true);*/



                            if (count == 60) {
                                cubeElement.stored = false;
                                cubeElement.cube.position.x = Math.round(cubeElement.cube.position.x);
                                cubeElement.cube.position.y = Math.round(cubeElement.cube.position.y);
                                //  cubeElement.rotAxisZMatrix = math.multiply(cubeElement.rotAxisZMatrix, rotZmatrix);
                                cubeElement.angle.z = 0;
                                pivot.rotation.set(0, 0, 0);
                                pivot.updateMatrixWorld();

                                //cubeElement.cube.position.z=Math.round(cubeElement.cube.position.z);
                                console.log("count" + cubeElement.cube.position.y);
                                if (resetCount++ == 9) {
                                    count = 0;
                                    resetCount = 1;

                                }
                            }
                            console.log("Z" + countexe);
                            console.log("x " + cubeElement.cube.position.x + " y " + cubeElement.cube.position.y + " z " + cubeElement.cube.position.z);
                        }
                        break;
                }
            });
        });

    }); //console.log("count"+count);  /*cubeGroup[i+1][j+1][k+1].cube.position.x==0||
}

let pivot = new THREE.Object3D();
pivot.rotation.set(0, 0, 0);
pivot.updateMatrixWorld();

/*for (var i in active) {

    pivot.attach(active[i]);

}


pivot.updateMatrixWorld();

for (var i in active) {

    scene.attach(active[i]);

}*/

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