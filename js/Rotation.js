import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import { scene } from './RubixCube.js';
/*const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);*/


/*let countexe = 0;*/
let count = 0;
let resetCount = 1;
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

export const RotateAxis = (cubeGroup, axisName, value) => {
    count++;
/*    countexe++;*/
    cubeGroup.forEach((cubeinPlane) => {
        cubeinPlane.forEach((cubeinLine) => {
            cubeinLine.forEach((cubeElement) => {
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

                            if (count == 60) {

                                cubeElement.stored = false;
                                //cubeElement.cube.rotation.y -= Math.PI / 120;
                                cubeElement.cube.position.y = Math.round(cubeElement.cube.position.y);
                                cubeElement.cube.position.z = Math.round(cubeElement.cube.position.z);

                                cubeElement.rotAxisZMatrix = math.multiply(rotXmatrix, cubeElement.rotAxisZMatrix);
                                cubeElement.rotAxisYMatrix = math.multiply(rotXmatrix, cubeElement.rotAxisYMatrix);

                                cubeElement.angle.x = 0;
                                pivot.rotation.set(0, 0, 0);
                                pivot.updateMatrixWorld();

                             /*   console.log(cubeElement.cube.position.y);*/
                                if (resetCount++ == 9) {
                                    /*console.log("reset count X");*/
                                    count = 0;
                                    resetCount = 1;
                                }
                            }
                         /*   console.log("X" + countexe);
                            console.log("x " + cubeElement.cube.position.x + " y " + cubeElement.cube.position.y + " z " + cubeElement.cube.position.z);*/
                        }
                        break;

                    case "Y":
                        if (cubeElement.cube.position.y == value) {
                            if (!cubeElement.stored) {
                                /*if (cubeElement.initPosition.x == 1 && cubeElement.initPosition.y == 1 && cubeElement.initPosition.z == 1) {
                                    console.log("!!!!!!!");
                                    console.log("Y stored" + cubeElement.rotAxisZMatrix);
                                }
*/
                                cubeElement.storePosition.x = cubeElement.cube.position.x;
                                cubeElement.storePosition.z = cubeElement.cube.position.z;
                                cubeElement.stored = true;
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

                            if (count == 60) {

                                cubeElement.stored = false;
                                cubeElement.cube.position.z = Math.round(cubeElement.cube.position.z);
                                cubeElement.cube.position.x = Math.round(cubeElement.cube.position.x);

                                cubeElement.rotAxisZMatrix = math.multiply(cubeElement.rotAxisZMatrix, rotYmatrix);
                            
                                cubeElement.angle.y = 0;
                                pivot.rotation.set(0, 0, 0);
                                pivot.updateMatrixWorld();

                               /* console.log(cubeElement.cube.position.x);
                                console.log(cubeElement.cube.position.y);
                                console.log(cubeElement.cube.position.z);*/
                                if (resetCount++ == 9) {
                                    count = 0;
                                    resetCount = 1;
                                  /*  console.log("reset count X");*/
                                }


                            }
                           /* console.log("Y" + countexe);
                            console.log("x " + cubeElement.cube.position.x + " y " + cubeElement.cube.position.y + " z " + cubeElement.cube.position.z);*/
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

                            /*  var some_quaternion = new THREE.Quaternion();
                              some_quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 120);
                              cubeElement.cube.rotation.setFromQuaternion(some_quaternion, "XYZ", true);*/

                            if (count == 60) {
                                cubeElement.stored = false;
                                cubeElement.cube.position.x = Math.round(cubeElement.cube.position.x);
                                cubeElement.cube.position.y = Math.round(cubeElement.cube.position.y);
                                cubeElement.angle.z = 0;
                                pivot.rotation.set(0, 0, 0);
                                pivot.updateMatrixWorld();

                                if (resetCount++ == 9) {
                                    count = 0;
                                    resetCount = 1;

                                }
                            }
                           /* console.log("Z" + countexe);
                            console.log("x " + cubeElement.cube.position.x + " y " + cubeElement.cube.position.y + " z " + cubeElement.cube.position.z);*/
                        }
                        break;
                }
            });
        });

    });
}

let pivot = new THREE.Object3D();
pivot.rotation.set(0, 0, 0);

