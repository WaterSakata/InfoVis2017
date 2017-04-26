function main()
{
    var width = 500;
    var height = 500;

    var i;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 6 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
	[-1, 1,-1], // v0
	[-1,-1,-1], // v1
	[ 1,-1,-1], // v2
	[ 1, 1,-1], // v3
	[-1, 1, 1], // v4
	[-1,-1, 1], // v5
	[ 1,-1, 1], // v6
	[ 1, 1, 1]  // v7
    ];

    var faces = [
	[0,1,2], // f0: v0-v1-v2
	[0,2,3], // f0: v0-v2-v3
	[4,5,1], // f0: v0-v1-v2
	[4,1,0], // f0: v0-v1-v2
	[4,0,3], // f0: v0-v1-v2
	[4,3,7], // f0: v0-v1-v2	
	[3,2,6], // f0: v0-v1-v2
	[3,6,7], // f0: v0-v1-v2
	[1,5,6], // f0: v0-v1-v2
	[1,6,2], // f0: v0-v1-v2
	[7,6,5], // f0: v0-v1-v2
	[7,5,4]  // f0: v0-v1-v2
    ];

    var v = new Array();
    for (i = 0; i < 8; i++) {
	v[i] = new THREE.Vector3().fromArray( vertices[i] );
    }
    var f = new Array();

    for (i = 0; i < 12; i++) {
	var id = faces[i];
	f[i] = new THREE.Face3( id[0], id[1], id[2] );
    }

    
    var geometry = new THREE.Geometry();

    for (i = 0; i < 8; i++) {
	geometry.vertices.push( v[i] );
    }

    for (i = 0; i < 12; i++) {
	geometry.faces.push( f[i] );
    }

    geometry.computeFaceNormals();
  
    
    var material = new THREE.MeshLambertMaterial();
    material.side = THREE.DoubleSide;
    material.vertexColors = THREE.FaceColors;
    for(i = 0; i < 12; i++) {
	geometry.faces[i].color = new THREE.Color(1,0,0);
    }
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 1, 1, 100 );
    scene.add( light );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.05;
        renderer.render( scene, camera );
    }
}
