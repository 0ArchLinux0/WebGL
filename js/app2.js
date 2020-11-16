const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 50);
camera.position.set(0, 30, 0);
camera.up.set(0, 1,0 );
camera.lookAt(0, 0, 0);

const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let prevWidth = canvas.width;
let prevHeight = canvas.height;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.widht, canvas.height);
document.body.appendChild(renderer.domElement)

const objects = [];

const solarSystem= new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem)

const radius = 1;
const widthSegment = 6;
const heightSegment = 6;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegment, heightSegment);
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
//emissive property is basically the color that will be drawn with no light hitting the surface. Light is added to that color.
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
//#### set with line 34 scene.add(sunMesh);

const earthOrbit= new THREE.Object3D();
earthOrbit.position.x=10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
//scene.add(earthMesh);
//####set with line 27 sunMesh.add(earthMesh);
earthOrbit.add(earthMesh);
objects.push(earthMesh)

const moonOrbit=new THREE.Object3D();
moonOrbit.position.x=2;
earthOrbit.add(moonOrbit);
objects.push(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh=new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(.5,.5,.5);
moonOrbit.add(moonMesh);
objects.push(moonMesh)

/*objects.forEach((node)=>{
    const axes=new THREE.AxesHelper();
    axes.material.depthTest=false; //axes to appear even though they are inside the spheres
    //depthTest to false which means they will not check to see if they are drawing behind something else
    axes.rednerOrder=1; //default is 0 draw atfter the spheres
    node.add(axes);
})*/
class AxisGridHelper{
    constructor(node,units=10){
        const axes=new THREE.AxesHelper();
        axes.material.depthTest=false;
        axes.renderOrder=2;
        node.add(axes);

        const grid=new THREE.GridHelper(units,units);
        grid.material.depthTest=false;
        grid.renderOrder=1;
        node.add(grid);

        this.grid=grid;
        this.axes=axes;
        this.visible=false;
    }

    get visible(){
        return this._visible;
    }

    set visible(v){
        this._visible=v;
        this.grid.visible=v;
        this.axes.visible=v;
    }
}
let gui=new dat.GUI();
//guiFolder=gui.addFolder("Planet!");

function makeAxisGrid(node, label, units) {
  const helper = new AxisGridHelper(node, units);
  
  gui.add(helper, 'visible').name(label);
}
 
makeAxisGrid(solarSystem, 'solarSystem', 25);
makeAxisGrid(sunMesh, 'sunMesh');
makeAxisGrid(earthOrbit, 'earthOrbit');
makeAxisGrid(earthMesh, 'earthMesh');
makeAxisGrid(moonOrbit, 'moonOrbit');
makeAxisGrid(moonMesh, 'moonMesh');

//Light
{
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
}


function animate(time) {
    requestAnimationFrame(animate);
    const pixelRatio = window.devicePixelRatio;
    console.log(pixelRatio);
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    if ((prevWidth !== canvas.width) || (prevHeight !== canvas.hegith)) { //size change
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio; //change canvas size
        prevWidth = canvas.width;
        prevHeight = canvas.height; //store prev value to compare
        renderer.setSize(window.innerWidth, window.innerHeight); //change render size
        // setting camera aspect to prevent view from crushing
        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
        //
    }
    renderer.render(scene,camera)
    objects.forEach((obj) => {
    obj.rotation.y = time/800;
    })

}
    animate();
