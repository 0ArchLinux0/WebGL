import * as Rot from './Rotation.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

 const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();

let renderRequested = false;
export function render(time) {
        console.log("render");
        let time_var = time / 1000 * 30;
        if (time === undefined) { time_var = 0; }
        renderRequested = undefined;
        // pause(time); 왜 멈추지 대체
      /*  const pixelRatio = window.devicePixelRatio;
        //console.log(pixelRatio); //my pc:1
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        if ((prevWidth !== canvas.width) || (prevHeight !== canvas.heigth)) { //size change
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio; //change canvas size
            prevWidth = canvas.width;
            prevHeight = canvas.height; //store prev value to compare
            renderer.setSize(window.innerWidth, window.innerHeight); //change render size
            //renderer.setClearColor(0xffffff);
            // setting camera aspect to prevent view from crushing
            camera.aspect = canvas.width / canvas.height;
            camera.updateProjectionMatrix();
        }*/
       /* console.log(prev_time + " " + time);*/
        controls.update();
        renderer.render(scene, camera);
       /* if (time - prev_time > 5000) {
            prev_time = time;
        }*/

    }
     let isInitialized=false;
     let i = 0;


    export function animate(time) {
        if(!isInitialized){i=0;isInitialized=true;}
        console.log("animate "+i);

        if (i++ == 60) { i=0; return 1; }
        console.log(i);
        requestAnimationFrame(animate);
        //console.log("render");
        let time_var = time / 1000 * 30;
        if (time === undefined) { time_var = 0; }
        /*renderRequested = undefined;
        // pause(time); 왜 멈추지 대체
        const pixelRatio = window.devicePixelRatio;
        //console.log(pixelRatio); //my pc:1
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        if ((prevWidth !== canvas.width) || (prevHeight !== canvas.heigth)) { //size change
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio; //change canvas size
            prevWidth = canvas.width;
            prevHeight = canvas.height; //store prev value to compare
            renderer.setSize(window.innerWidth, window.innerHeight); //change render size
            //renderer.setClearColor(0xffffff);
            // setting camera aspect to prevent view from crushing
            camera.aspect = canvas.width / canvas.height;
            camera.updateProjectionMatrix();
        }
*/
        Rot.RotateAxisY();

        //console.log(prev_time + " " + time);
        controls.update();
        renderer.render(scene, camera);
       /* if (time - prev_time > 5000) {
            prev_time = time;
        }*/

    }
