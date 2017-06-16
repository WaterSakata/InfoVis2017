function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    var reflection = true;
    var shading = true;

    var isovalue = 128;

    var RGB = [ 1.0, 0.0, -1.0 ];

    var slider = document.querySelector(".slider"), 
        display = new Display(".value", 128);

    slider.addEventListener("input", function() {
        // ドラッグ中のイベント
        display.setValue(this.value);
    }, false);

    slider.addEventListener("change", function() {
        // マウスアップした際のイベント
        isovalue = this.value;
        display.setValue(this.value);
        redrawIsosurfaces( volume, isovalue, screen.light, screen.camera, reflection, shading, RGB );
    }, false);



    var lamb_button = document.getElementById("lamb_ref");
    var phong_button = document.getElementById("phong_ref");

    lamb_button.addEventListener("click", function() {
        reflection = true;
        redrawIsosurfaces( volume, isovalue, screen.light, screen.camera, reflection, shading, RGB );
    }, false);
    phong_button.addEventListener("click", function() {
        reflection = false;
        redrawIsosurfaces( volume, isovalue, screen.light, screen.camera, reflection, shading, RGB );
    }, false);

    var gouraud_button = document.getElementById("gouraud_shad");
    var phong_shad_button = document.getElementById("phong_shad");

    gouraud_button.addEventListener("click", function() {
        shading = true;
        redrawIsosurfaces( volume, isovalue, screen.light, screen.camera, reflection, shading, RGB );
    }, false);
    phong_shad_button.addEventListener("click", function() {
        shading = false;
        redrawIsosurfaces( volume, isovalue, screen.light, screen.camera, reflection, shading, RGB );
    }, false);



    var sliderR = document.querySelector(".sliderR"), 
        displayR = new Display(".valueR", 1);

    sliderR.addEventListener("input", function() {
        // ドラッグ中のイベント
        displayR.setValue(this.value);
    }, false);

    sliderR.addEventListener("change", function() {
        // マウスアップした際のイベント
        RGB = [ this.value, RGB[1], RGB[2] ];
        displayR.setValue(this.value);
        redrawIsosurfaces( volume, isovalue, screen.light, screen.camera, reflection, shading, RGB );
    }, false);

    var sliderG = document.querySelector(".sliderG"), 
        displayG = new Display(".valueG", 0);

    sliderG.addEventListener("input", function() {
        // ドラッグ中のイベント
        displayG.setValue(this.value);
    }, false);

    sliderR.addEventListener("change", function() {
        // マウスアップした際のイベント
        RGB = [ RGB[0], this.value, RGB[2] ];
        displayG.setValue(this.value);
        redrawIsosurfaces( volume, isovalue, screen.light, screen.camera, reflection, shading, RGB );
    }, false);

    var sliderB = document.querySelector(".sliderB"), 
        displayB = new Display(".valueB", -1);

    sliderB.addEventListener("input", function() {
        // ドラッグ中のイベント
        displayB.setValue(this.value);
    }, false);

    sliderB.addEventListener("change", function() {
        // マウスアップした際のイベント
        RGB = [ RGB[0], RGB[1], this.value ];
        displayB.setValue(this.value);
        redrawIsosurfaces( volume, isovalue, screen.light, screen.camera, reflection, shading, RGB );
    }, false);






    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var surfaces = Isosurfaces( volume, isovalue, screen.light, screen.camera, reflection, shading, RGB );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    screen.loop();


    function Display(selector, initVal) {
        var elm = document.querySelector(selector);

        _init(initVal);

        function _init(initVal) {
            setValue(initVal);
        }

        function setValue(value) {
            elm.innerText = value - 0;
        }

        function getValue() {
            return elm.innerText - 0;
        }

        return{
            setValue: setValue,
            getValue: getValue,
        };
    }

    function redrawIsosurfaces(volume, isovalue, light, camera, reflection, shading, RGB) {
        screen.scene.remove( surfaces );
        surfaces = Isosurfaces( volume, isovalue, light, camera, reflection, shading, RGB );
        screen.scene.add( surfaces );        
    }

}
