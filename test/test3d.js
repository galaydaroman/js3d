c3dl.addMainCallBack(canvasMain, "test");

function canvasMain(canvasName) {
    scn = new c3dl.Scene();
    scn.setCanvasTag(canvasName);
    renderer = new c3dl.WebGL();
    scn.setRenderer(renderer);
    scn.init();
    
}
