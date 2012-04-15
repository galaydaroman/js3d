c3dl_require = function(path) {
    /*
    $('<script>', {
        type: "text/javascript",
        src: "c3dl/" + path
    }).appendTo('head');
    */
    document.write('<' + 'script');
    document.write(' language="javascript"');
    document.write(' type="text/javascript"');
    document.write(' src="c3dl/' + path + '">');
    document.write('</' + 'script' + '>');
}

/*
 * Binding volume
 */
c3dl_require('addons/enclosure/boundingsphere.js');
c3dl_require('addons/enclosure/boundingvolume.js');
c3dl_require('addons/enclosure/visualboundingsphere.js');
c3dl_require('addons/enclosure/obb.js');
c3dl_require('addons/enclosure/aabb.js');

/*
 * shapes
 */
c3dl_require('addons/shapes/shape.js');
c3dl_require('addons/shapes/sphere.js');

/*
 * Const
 */
c3dl_require('addons/constants.js');

/**
 * Disabled standart imports
 */
/*
c3dl_require('c3dlnamespace.js');
c3dl_require('constants.js');
c3dl_require('effects/effect_docs.js');
c3dl_require('debug.js');
c3dl_require('renderer/renderer.js');
c3dl_require('renderer/rendererwebgl.js');
c3dl_require('renderer/programobject.js');
c3dl_require('math/mjs.js');
c3dl_require('math/mathutils.js');
c3dl_require('math/vector.js');
c3dl_require('math/matrix.js');
c3dl_require('math/quaternion.js');
c3dl_require('matrixstack.js');
c3dl_require('camera/camera.js');
c3dl_require('camera/freecamera.js');
c3dl_require('camera/orbitcamera.js');
c3dl_require('enclosure/boundingsphere.js');
c3dl_require('enclosure/visualboundingsphere.js');
c3dl_require('enclosure/boundingbox.js');
c3dl_require('actors/actor.js');
c3dl_require('actors/primitive.js');
c3dl_require('actors/point.js');
c3dl_require('actors/line.js');
c3dl_require('frustum_culling/frustum.js');
c3dl_require('frustum_culling/plane.js');
c3dl_require('scene.js');
c3dl_require('texture/texture.js');
c3dl_require('texture/texturemanager.js');
c3dl_require('texture/textureutils.js');
c3dl_require('collada/colladamanager.js');
c3dl_require('collada/colladaloader.js');
c3dl_require('collada/colladaqueue.js');
c3dl_require('collada/geometry.js');
c3dl_require('collada/primitiveset.js');
c3dl_require('light/light.js');
c3dl_require('light/positionallight.js');
c3dl_require('light/directionallight.js');
c3dl_require('light/spotlight.js');
c3dl_require('material.js');
c3dl_require('collada/collada.js');
c3dl_require('scenegraph/scenenode.js');
c3dl_require('utilities/utilities.js');
c3dl_require('shaders/model/light/light_vs.js');
c3dl_require('shaders/model/material/material.js');
c3dl_require('shaders/model/standard/model_fs.js');
c3dl_require('shaders/model/standard/model_vs.js');
c3dl_require('shaders/model/standard/std_callback.js');
c3dl_require('shaders/particle_system/psys_vs.js');
c3dl_require('shaders/particle_system/psys_fs.js');
c3dl_require('shaders/point/point/point_vs.js');
c3dl_require('shaders/point/point/point_fs.js');
c3dl_require('shaders/point/sphere/point_sphere_vs.js');
c3dl_require('shaders/point/sphere/point_sphere_fs.js');
c3dl_require('shaders/line/line_vs.js');
c3dl_require('shaders/line/line_fs.js');
c3dl_require('shaders/bounding_sphere/bounding_sphere_vs.js');
c3dl_require('shaders/bounding_sphere/bounding_sphere_fs.js');
c3dl_require('shaders/model/greyscale/greyscale_vs.js');
c3dl_require('shaders/model/greyscale/greyscale_fs.js');
c3dl_require('shaders/model/greyscale/greyscale_callback.js');
c3dl_require('shaders/model/sepia/sepia_vs.js');
c3dl_require('shaders/model/sepia/sepia_fs.js');
c3dl_require('shaders/model/sepia/sepia_callback.js');
c3dl_require('shaders/model/cartoon/cartoon_vs.js');
c3dl_require('shaders/model/cartoon/cartoon_fs.js');
c3dl_require('shaders/model/cartoon/cartoon_callback.js');
c3dl_require('shaders/model/gooch/gooch_vs.js');
c3dl_require('shaders/model/gooch/gooch_fs.js');
c3dl_require('shaders/model/gooch/gooch_callback.js');
c3dl_require('shaders/model/solid_color/solid_color_vs.js');
c3dl_require('shaders/model/solid_color/solid_color_fs.js');
c3dl_require('shaders/model/solid_color/solid_color_callback.js');
c3dl_require('effects/effecttemplate.js');
c3dl_require('effects/effect.js');
c3dl_require('particle_system/particlesystem.js');
c3dl_require('particle_system/particle.js');
c3dl_require('init.js');
c3dl_require('interaction/picking.js');
c3dl_require('interaction/pickingresult.js');
*/