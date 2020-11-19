/*const yAxis = new THREE.Vector3(0, 1, 0);*/
import * as MakeCube from './MakeCube.js';
export const RotateAxisY = () => {
    /*let count=0;*/
    MakeCube.cubeGroup.forEach((cubeinPlane) => {
        cubeinPlane.forEach((cubeinLine) => {
            cubeinLine.forEach((cubeElement) => {
                if (cubeElement.cube.position.y == 1) {
                    cubeElement.angle.y += Math.PI / 120;
                    cubeElement.cube.position.x = Math.cos(cubeElement.angle.y) * cubeElement.initPosition.x - Math.sin(cubeElement.angle.y) * cubeElement.initPosition.z;
                    cubeElement.cube.position.z = Math.sin(cubeElement.angle.y) * cubeElement.initPosition.x + Math.cos(cubeElement.angle.y) * cubeElement.initPosition.z;
                    cubeElement.cube.rotation.y = -cubeElement.angle.y;
                }

                scene.add(cubeElement.cube);
            })
        });

    });
}