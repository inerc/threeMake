window.onload = function () {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 1000);

    var render = new THREE.WebGLRenderer({antialias: true});
    render.setSize(window.innerWidth, window.innerHeight);
    render.setClearColor( 0xFFFFFF );
    document.body.appendChild(render.domElement);

    camera.position.z = -180;

    var manager = new THREE.LoadingManager();
    var loader = new THREE.ImageLoader(manager);

    var textureBody = new THREE.Texture();

    loader.load('model/textures/male_casualsuit01_diffuse.png', function (image) {
        textureBody.image = image;
        textureBody.needsUpdate = true;
    });


    var meshes = [];

    var objLoader = new THREE.OBJLoader();

    objLoader.load('model/Skin02.obj', function ( object ) {
        console.log(object);

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh){
                meshes.push(child);
            }
        });

        var base = meshes[0];
        var poly = meshes[1];
        var casual = meshes[2];

        console.log(meshes);
        base.position.y = -80;
        poly.position.y = -80;
        casual.position.y = -80;

        scene.add(base);
        scene.add(poly);
        scene.add(casual);

    });


    var rendering =  function () {
        requestAnimationFrame(rendering);

        render.render(scene, camera);
    };

    rendering();
};