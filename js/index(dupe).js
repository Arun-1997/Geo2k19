function earthView(){
if (!scene){
    main(); // create three js basic code(camera, renderer etc.)
}

// create the geometry sphere stars
var geometry  = new THREE.SphereBufferGeometry(6371000000, 36, 36)
// create the material, using a texture of startfield
var material  = new THREE.MeshBasicMaterial()
material.map   = THREE.ImageUtils.loadTexture('images/earthView/ESO_-_Milky_Way.jpg')
material.side  = THREE.BackSide
// create the mesh based on geometry and material
var mesh  = new THREE.Mesh(geometry, material)
mesh.position.set(0,0,-6371000)

scene.add(mesh)
/*
var geometry = new THREE.SphereGeometry(5000,10,10);
var material = new THREE.MeshBasicMaterial({color:"0xff0000"});
var mesh_test = new THREE.Mesh(geometry,material);
scene.add(mesh_test);*/


//earth
var geometry   = new THREE.SphereBufferGeometry(6371000, 36, 36)
var material  = new THREE.MeshPhongMaterial()
var earthMesh = new THREE.Mesh(geometry, material)
earthMesh.position.set(0,0,-6371000)
earthMesh.rotation.set(Math.PI/2,Math.PI/2,0)
earthMesh.rotation.y -=22.87*Math.PI/180//rightturn ^
earthMesh.rotation.x +=49.02*Math.PI/180//rightturn ^
helper = new THREE.EdgesHelper( earthMesh );
helper.material.color.set( 0xffffff );


material.map    = THREE.ImageUtils.loadTexture('images/earthView/earthmap1k.jpg')
material.bumpMap    = THREE.ImageUtils.loadTexture('images/earthView/earthbump1k.jpg')
material.bumpScale = 100


material.specularMap = THREE.ImageUtils.loadTexture('images/earthView/earthspec1k.jpg')

scene.add(earthMesh);
scene.add( helper );

//atmosphere
var geometry   = new THREE.SphereBufferGeometry(9371000, 36, 36)
var material  = new createAtmosphereMaterial()
material.uniforms.glowColor.value.set(0x00b3ff)
material.uniforms.coeficient.value  = 0.02
material.uniforms.power.value       = 2.5
material.side = THREE.DoubleSide
var earthAtmo = new THREE.Mesh(geometry, material)
earthAtmo.position.set(0,0,-6371000)

scene.add(earthAtmo);

/**
 * from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-  halo.html
* @return {[type]} [description]
*/

function createAtmosphereMaterial(){
  var vertexShader  = [
    'varying vec3 vNormal;',
    'void main(){',
    '   // compute intensity',
    '   vNormal     = normalize( normalMatrix * normal );',
    '   // set gl_Position',
    '   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '}',
].join('\n')
var fragmentShader  = [
    'uniform float coeficient;',
    'uniform float power;',
    'uniform vec3  glowColor;',

    'varying vec3  vNormal;',

    'void main(){',
    '   float intensity = pow( coeficient - dot(vNormal, vec3(0.0, 0.0, 1.0)), power );',
    '   gl_FragColor    = vec4( glowColor * intensity, 1.0 );',
    '}',
].join('\n')

// create custom material from the shader code above
//   that is within specially labeled script tags
var material    = new THREE.ShaderMaterial({
    uniforms: {
        coeficient  : {
            type    : "f",
            value   : 1.0
        },
        power       : {
            type    : "f",
            value   : 2
        },
        glowColor   : {
            type    : "c",
            value   : new THREE.Color('blue')
        },
    },
    vertexShader    : vertexShader,
    fragmentShader  : fragmentShader,
    side        : THREE.BackSide,
    blending    : THREE.AdditiveBlending,
    transparent : true,
    depthWrite  : false,
});

return material
}


}
