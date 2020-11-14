
   
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15);

    /*PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
    fov — Camera frustum vertical field of view. degrees
    aspect — Camera frustum aspect ratio. 
    near — Camera frustum near plane.
    far — Camera frustum far plane.*/

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    const boxWidth=1;
    const boxHeight=1;
    const boxDepth=1;
    const geometry = new THREE.BoxGeometry(boxWidth,boxHeight,boxDepth); //object contains all the verticles and faces of the cube.
    const materialNotAffectedByLights = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); //material to color it(+extra)
    const materialAfftectedByLights=new THREE.MeshPhongMaterial( {color:0x00ff00});
    const cube = new THREE.Mesh(geometry, materialAfftectedByLights); //takes geometry and applies a material merging
   	const cubes=[makeInstanceCube("red",2),
   				 makeInstanceCube("blue",-2),
   				 ];

    scene.add(cube); //add to the coordinates(0,0,0);

    camera.position.z = 5;

   {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

    function animate(t) {
        requestAnimationFrame(animate);
        cube.rotation.x+=0.01;
        cube.rotation.y+=0.01;
        renderer.render(scene, camera);
        cubes.forEach((cube,index)=>{
        	cube.rotation.x+=-0.01;
        	cube.rotation.y+=0.01;
        	console.log(index);
        })
    }

    function makeInstanceCube(color,x){
    	const materialNotAffectedByLights=new THREE.MeshPhongMaterial({color});
    	const cube=new THREE.Mesh(geometry,materialNotAffectedByLights)
    	cube.position.x=x;
    	scene.add(cube);
    	return cube;
    }
    animate();