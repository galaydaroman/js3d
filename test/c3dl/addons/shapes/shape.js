/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.Shape = c3dl.inherit(c3dl.Primitive, function () {
  c3dl._superc(this);
  this.boundingVolume = new c3dl.BoundingVolume();
  this.boundingVolume.centered = true;
  this.renderObb = false;
  this.renderAabb = false;
  this.renderBoundingSphere = false;
  this.shape = new c3dl.Primitive();
  this.firstTimeRender = true;
  this.primitiveSets = [];
});

c3dl.Shape.prototype.getAngularVel = function () {
  if (this.isReady()) {
    return this.shape.getAngularVel();
  }
}


c3dl.Shape.prototype.getLinearVel = function () {
  if (this.isReady()) {
    return this.shape.getLinearVel();
  }
}

c3dl.Shape.prototype.getPosition = function () {
  if (this.isReady()) {
    return this.shape.getPosition();
  }
}


c3dl.Shape.prototype.setAngularVel = function (vec) {
  if (this.isReady()) {
    this.shape.setAngularVel(vec);
  }
}

c3dl.Shape.prototype.getUp = function () {
  if (this.isReady()) {
    return this.shape.getUp();
  }
}

c3dl.Shape.prototype.getLeft = function () {
  if (this.isReady()) {
    return this.shape.getLeft();
  }
}

c3dl.Shape.prototype.getDirection = function () {
  if (this.isReady()) {
    return this.shape.getDirection();
  }
}

c3dl.Shape.prototype.getPickable = function () {
  if (this.isReady()) {
    return this.shape.getPickable();
  }
}

c3dl.Shape.prototype.setPickable = function (isPickable) {
  if (this.isReady()) {
    this.shape.setPickable(isPickable);
  }
}

c3dl.Shape.prototype.setLinearVel = function (vec) {
  if (this.isReady()) {
    this.shape.setLinearVel(vec);
  }
}

c3dl.Shape.prototype.init = function () {
}

c3dl.Shape.prototype.update = function (timeStep) {
  if (!this.isStatic() || this.isStatic() && this.isDirty()) {
    c3dl.multiplyVector(this.shape.linVel, timeStep, c3dl.vec1);
    c3dl.addVectors(this.shape.pos, c3dl.vec1, this.shape.pos);
    this.shape.pitch(this.shape.angVel[0] * timeStep);
    this.shape.yaw(this.shape.angVel[1] * timeStep);
    this.shape.roll(this.shape.angVel[2] * timeStep);
    if (this.isStatic()) {
      this.setDirty(false);
    }
    var pos = this.shape.pos;
    var rotateMat = this.shape.getRotateMat();
    var scaleVec = this.shape.scaleVec;
    this.boundingVolume.set(pos,rotateMat,scaleVec);
  }
}

c3dl.Shape.prototype.render = function (glCanvas3D, scene) {
  if (this.isVisible()) {
    c3dl.pushMatrix();
    c3dl.multMatrix(this.shape.getTransform());
    if (this.firstTimeRender == true) {
      this.primitiveSets[0].setupVBO(glCanvas3D);
      this.firstTimeRender = false;
    }
    scene.getRenderer().renderShape(this, scene);
    c3dl.popMatrix();
    if (scene.getBoundingVolumeVisibility()) {
      this.boundingVolume.renderObb(scene);
      this.boundingVolume.renderAabb(scene);
      this.boundingVolume.renderSphere(scene);
    }
    if (this.renderObb) {
      this.boundingVolume.renderObb(scene);
    }
    if (this.renderAabb) {
      this.boundingVolume.renderAabb(scene);
    }
    if (this.renderBoundingSphere) {
      this.boundingVolume.renderSphere(scene);
    }
    scene.getRenderer().texManager.updateTexture(this.primitiveSets[0].texture);
  }
} 

c3dl.Shape.prototype.scale = function (scaleVec) {
  if (this.isReady()) {
    this.shape.scale(scaleVec);
    this.boundingVolume.scale(scaleVec);
    this.setDirty(true);
  }
}

c3dl.Shape.prototype.translate = function (trans) {
  if (this.isReady()) {
    this.shape.translate(trans);
    this.boundingVolume.setPosition(this.shape.pos);
    this.setDirty(true);
  }
}

c3dl.Shape.prototype.setPosition = function (pos) {
  if (this.isReady()) {
    this.shape.setPosition(pos);
    this.boundingVolume.setPosition(pos);
    this.setDirty(true);
  }
  
}

c3dl.Shape.prototype.setTexture = function (texturePath) {
  if (this.isReady()) {
    this.primitiveSets[0].setTexture(texturePath);
  }
}

c3dl.Shape.prototype.rotateOnAxis = function (axisVec, angle) {
  if (this.isReady()) {
    this.shape.rotateOnAxis(axisVec, angle);
    this.boundingVolume.rotateOnAxis(axisVec, angle);
    this.setDirty(true);
  }
}

c3dl.Shape.prototype.yaw = function (angle) {
  if (this.isReady()) {
    this.shape.yaw(angle);
    this.boundingVolume.rotateOnAxis(this.shape.up, angle);
    this.setDirty(true);
  }
}

/**
 Rotate around the side vector by a hard amount.
 
 @param {float} angle in radians.
 */
c3dl.Shape.prototype.pitch = function (angle) {
  if (this.isReady()) {
    this.shape.pitch(angle);
    this.boundingVolume.rotateOnAxis(this.shape.left, angle);
    this.setDirty(true);
  }
}

/**
 @private
 */
c3dl.Shape.prototype.isReady = function () {
  return this.shape != null ? true : false;
}

c3dl.Shape.prototype.roll = function (angle) {
  if (this.isReady()) {
    this.shape.roll(angle);
    this.boundingVolume.rotateOnAxis(this.shape.dir, angle);
    this.setDirty(true);
  }
}


c3dl.Shape.prototype.getCopy = function () {
  var Shape = new Shape();
  Shape.clone(this);
  return Shape;
}

c3dl.Shape.prototype.getTransform = function () {
  if (this.shape) {
    return this.shape.getTransform();
  }
}
/**
 @private
 */
c3dl.Shape.prototype.clone = function (other) {
  c3dl._super(this, arguments, "clone");

  this.path = other.path;
  this.shape = other.shape.getCopy();
  this.boundingVolume = other.boundingVolume.getCopy();
}

/**
 @private
 Does the given ray intersect with this object? This function will
 test the ray against all the geometry nodes in the shape and
 return true as soon as it finds an intersection.
 
 @param {Array} rayOrigin The ray's origin in view space.
 @param {Array} rayDir The ray's direction in view space.
 
 @returns {bool} true if the ray intersects with one of the geometry nodes
 in the shape.
 */
c3dl.Shape.prototype.rayIntersectsEnclosures = function (rayOrigin, rayDir) {
  if (c3dl.rayIntersectsSphere(rayOrigin, rayDir, this.boundingVolume.getPosition(), this.boundingVolume.getRadius()) && 
    c3dl.rayAABBIntersect(rayOrigin, rayDir, this.boundingVolume.aabb.maxMins) &&
    c3dl.rayOBBIntersect(rayOrigin, rayDir, this.boundingVolume.getPosition(), this.boundingVolume.getAxis(),this.boundingVolume.getSizeInAxis())) {
    return true;
  }
  return false;
}

c3dl.Shape.prototype.rayIntersectsTriangles = function (rayOrigin, rayDir) {
  c3dl.pushMatrix();
  c3dl.multMatrix(this.getTransform());
  var mat = c3dl.inverseMatrix(c3dl.peekMatrix());
  var rayorigin = c3dl.multiplyMatrixByVector(mat, rayOrigin);
  var raydir = c3dl.normalizeVector(c3dl.multiplyMatrixByDirection(mat, rayDir));
  c3dl.popMatrix();
  // allocate and resuse these vertices to prevent allocation and deletion every face.
  var vert1 = new C3DL_FLOAT_ARRAY(3);
  var vert2 = new C3DL_FLOAT_ARRAY(3);
  var vert3 = new C3DL_FLOAT_ARRAY(3);
  var vertices = this.primitiveSets[0].getVertices();
  // Iterate over each face of the object and test it against the ray.
  for (var j = 0, len2 = vertices.length; j < len2; j += 9) {
    // 3 points of a triangle with the object's position offset
    vert1[0] = vertices[j];
    vert1[1] = vertices[j + 1]
    vert1[2] = vertices[j + 2];
 
    vert2[0] = vertices[j + 3];
    vert2[1] = vertices[j + 4];
    vert2[2] = vertices[j + 5];

    vert3[0] = vertices[j + 6];
    vert3[1] = vertices[j + 7];
    vert3[2] = vertices[j + 8];
    if (c3dl.rayIntersectsTriangle(rayorigin, raydir, vert1, vert2, vert3)) {
      return true;
    }   
  }
  return false;
}

c3dl.Shape.prototype.getObjectType = function () {
  return c3dl.SHAPE;
}

c3dl.Shape.prototype.getBoundingVolumes = function () {
  return [this.boundingVolume];
}

c3dl.Shape.prototype.getHeight = function () {
  if (this.isReady()) {
    return this.boundingVolume.getHeight();
  }
}

c3dl.Shape.prototype.getWidth = function () {
  if (this.isReady()) {
    return this.boundingVolume.getWidth();
  }
}

c3dl.Shape.prototype.getLength = function () {
  if (this.isReady()) {
    return this.boundingVolume.getLength();
  }
}

c3dl.Shape.prototype.getSize = function () {
  if (this.isReady()) {
    return [this.boundingVolume.getLength(),this.boundingVolume.getWidth(),this.boundingVolume.getHeight()];
  }
}

c3dl.Shape.prototype.setHeight = function (height) {
    this.setSize(1, 1, height);
}

c3dl.Shape.prototype.setLength = function (length) {
    this.setSize(length, 1, 1);
}

c3dl.Shape.prototype.setWidth = function (width) {
    this.setSize(1, width, 1);
}

c3dl.Shape.prototype.setSize = function (length, width, height) {
  var scaleVec = [
    parseFloat(length) / this.boundingVolume.getLength(),
    parseFloat(height) / this.boundingVolume.getHeight(),
    parseFloat(width)  / this.boundingVolume.getWidth()
  ];
  this.scale(scaleVec);
}

c3dl.Shape.prototype.setRenderObb = function (renderObb) {
  this.renderObb = renderObb;
}

c3dl.Shape.prototype.setRenderAabb = function (renderAabb) {
  this.renderAabb = renderAabb;
}

c3dl.Shape.prototype.setRenderBoundingSphere = function (renderBoundingSphere) {
  this.renderBoundingSphere = renderBoundingSphere;
}

c3dl.Shape.prototype.getBoundingVolume = function () {
  return this.boundingVolume;
}
c3dl.Shape.prototype.getPrimitiveSets = function () {
  return this.primitiveSets;
}