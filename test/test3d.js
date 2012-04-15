const SENSITIVITY = 2;

var isDragging = false;
var rotationStartCoords = [0,0];



/* Start 3D */
c3dl.addMainCallBack(canvasMain, "test");


/*
 * Functions
 */

function drawAxises() {
    var axis = function(vec, len, width) {
        var len = len || 4;
        var vec = c3dl.multiplyVector(vec, len);
        var color = vec;

        var line = new c3dl.Line();
        line.setCoordinates([0,0,0], vec);
        line.setColors(color, color);
        line.setWidth(width || 1);
        scn.addObjectToScene(line);
        
        var point = new c3dl.Point();
        point.setPosition(vec);
        point.setColor(color);
        scn.addObjectToScene(point);        
    };
    var a = [[1,0,0], [0,1,0], [0,0,1]];
    $.each(a, function() { axis(this); });
}

function drawScene() {
    drawAxises();
}

function canvasMain(canvasName) {
    scn = new c3dl.Scene();
    scn.setCanvasTag(canvasName);
    renderer = new c3dl.WebGL();
    scn.setRenderer(renderer);
    scn.init();
    scn.setAmbientLight([0,0,0]);
    
    cam = new c3dl.OrbitCamera();
    //cam.setOrbitPoint([0,0,0]);
    //cam.goFarther(999);
    cam.setFarthestDistance(100);
    cam.setClosestDistance(6);
    //cam.goFarther(100);
    cam.setDistance(20);
    
    drawScene();
    
    scn.setPointAttenuation([.15,0,0]);
    scn.setPointRenderingMode(c3dl.POINT_MODE_POINT);
    scn.setCamera(cam);
    
    scn.setMouseCallback(mouseUp,mouseDown, mouseMove, camUpdate);
    scn.startScene();
}

function mouseUp(evt)
{
    // user released the LMB.
    isDragging = evt.which != 1;
}

function mouseDown(evt)
{
    // user pressed the LMB.
    if(evt.which == 1)
    {
        isDragging = true;
        rotationStartCoords[0] = xevtpos(evt);
        rotationStartCoords[1] = yevtpos(evt);
    }
}

function mouseMove(evt)
{
    if(isDragging == true)
    {
        var x = xevtpos(evt);
        var y = yevtpos(evt);
        
        // how much was the cursor moved compared to last time
        // this function was called?
        var deltaX = x - rotationStartCoords[0];
        var deltaY = y - rotationStartCoords[1];

        cam.yaw(-deltaX * SENSITIVITY);
        cam.pitch(deltaY * SENSITIVITY);
        
        // now that the camera was updated, reset where the
        // rotation will start for the next time this function is 
        // called.
        rotationStartCoords = [x,y];
    }
}

function camUpdate(event)
{
    
}

function xevtpos(evt)
{
    return 2 * (evt.clientX / evt.target.width) - 1;
}

function yevtpos(evt)
{
    return 2 * (evt.clientY / evt.target.height) - 1;
}

