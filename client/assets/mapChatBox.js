/**
 * @license
 *
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Map Label.
 *
 * @author Luke Mahe (lukem@google.com),
 *         Chris Broadfoot (cbro@google.com)
 */

/**
 * Creates a new Map Label
 * @constructor
 * @extends google.maps.OverlayView
 * @param {Object.<string, *>=} opt_options Optional properties to set.
 */
function MapChatBox(pos, map) {
  // this.set('fontFamily', 'sans-serif');
  // this.set('fontSize', 12);
  // this.set('fontColor', '#000000');
  // this.set('strokeWeight', 4);
  // this.set('strokeColor', '#ffffff');
  // this.set('align', 'center');
  this.set('offsetY', 12);

  this.set('zIndex', 1e3);

  this.set('position', pos);
  this.set('map', map);

  // this.setValues(opt_options);
}
MapChatBox.prototype = new google.maps.OverlayView;

window['MapChatBox'] = MapChatBox;


/** @inheritDoc */
MapChatBox.prototype.changed = function(prop) {
  switch (prop) {
    // case 'fontFamily':
    // case 'fontSize':
    // case 'fontColor':
    // case 'strokeWeight':
    // case 'strokeColor':
    // case 'align':
    // case 'text':
    //   return this.drawCanvas_();
    case 'maxZoom':
    case 'minZoom':
    case 'position':
    // case 'offsetY':
      return this.draw();
  }
};

MapChatBox.prototype.addMessage = function(messageString) {
  // if (!this.containerDiv_) {
  // // onAdd has not been called yet.
  // return;
  // }
  var bgDiv = this.bgDiv_;
  var chatDiv = this.chatDiv_;

  if (bgDiv.children === null || bgDiv.children.length === 0) {
    bgDiv.appendChild(chatDiv);
  };
  
  var pElement = document.createElement('p');
  pElement.innerHTML = messageString;
  pElement.className += ' chat-message';
  chatDiv.appendChild(pElement);
  setTimeout(function(){
    chatDiv.removeChild(pElement);
    if (chatDiv.children === null || chatDiv.children.length === 0) {
      bgDiv.removeChild(chatDiv);
    };
  }, 5450)
}
MapChatBox.prototype['addMessage'] = MapChatBox.prototype.addMessage;


/**
 * Draws the label to the canvas 2d context.
 * @private
 */
// MapChatBox.prototype.drawCanvas_ = function() {
//   var canvas = this.canvas_;
//   if (!canvas) return;

//   var style = canvas.style;
//   style.zIndex = /** @type number */(this.get('zIndex'));

//   var ctx = canvas.getContext('2d');
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.strokeStyle = this.get('strokeColor');
//   ctx.fillStyle = this.get('fontColor');
//   ctx.font = this.get('fontSize') + 'px ' + this.get('fontFamily');

//   var strokeWeight = Number(this.get('strokeWeight'));

//   var text = this.get('text');
//   if (text) {
//     if (strokeWeight) {
//       ctx.lineWidth = strokeWeight;
//       ctx.strokeText(text, strokeWeight, strokeWeight);
//     }

//     ctx.fillText(text, strokeWeight, strokeWeight);

//     var textMeasure = ctx.measureText(text);
//     var textWidth = textMeasure.width + strokeWeight;
//     style.marginLeft = this.getMarginLeft_(textWidth) + 'px';
//     // Bring actual text top in line with desired latitude.
//     // Cheaper than calculating height of text.
//     style.marginTop = '-0.4em';
//   }
// };

/**
 * @inheritDoc
 */
MapChatBox.prototype.onAdd = function() {
  var containerDiv = this.containerDiv_ = document.createElement('div');
  var bgDiv = this.bgDiv_ = document.createElement('div');
  var iconSpan = document.createElement('span');
  iconSpan.className = 'fa fa-male fa-lg user-icon';
  // var canvas = this.canvas_ = document.createElement('canvas');
  var style = containerDiv.style;
  style.position = 'absolute';
  style.marginLeft = this.getMarginLeft_('something') + 'px';
  style.zIndex = /** @type number */(this.get('zIndex'));
  bgDiv.className = 'custom-window';

  var chatDiv = this.chatDiv_ = document.createElement('div');
  chatDiv.className = 'chat-div';

  containerDiv.appendChild(iconSpan);
  containerDiv.appendChild(bgDiv);

  // var ctx = canvas.getContext('2d');
  // ctx.lineJoin = 'round';
  // ctx.textBaseline = 'top';

  // this.drawCanvas_();
  //this.addMessage('Hello');

  var panes = this.getPanes();
  if (panes) {
    panes.mapPane.appendChild(containerDiv);
    // // MapChatBox life cycle
    // setTimeout(function(){
    //   // Begin fading the color
    //   var opacity = 1;
    //   setInterval(function(){
    //     opacity -= 0.05;
    //     self.set('fontColor', 'rgba(255, 255, 255, ' + opacity + ')');
    //   }, 25);
    //   // Then remove the element
    //   setTimeout(function(){
    //     self.onRemove();
    //   }, 500);
    // }, 5000);
    
  }
};
MapChatBox.prototype['onAdd'] = MapChatBox.prototype.onAdd;

/**
 * Gets the appropriate margin-left for the canvas.
 * @private
 * @param {number} textWidth  the width of the text, in pixels.
 * @return {number} the margin-left, in pixels.
 */
MapChatBox.prototype.getMarginLeft_ = function(textWidth) {
  // switch (this.get('align')) {
  //   case 'left':
  //     return 0;
  //   case 'right':
  //     return -textWidth;
  // }
  // return textWidth / -2;
  return 0;
};

/**
 * @inheritDoc
 */
MapChatBox.prototype.draw = function() {
  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  if (!this.containerDiv_) {
    // onAdd has not been called yet.
    return;
  }

  var latLng = /** @type {google.maps.LatLng} */ (this.get('position'));
  if (!latLng) {
    return;
  }
  var pos = projection.fromLatLngToDivPixel(latLng);

  var style = this.containerDiv_.style;

  style['top'] = (pos.y - this.get('offsetY')) + 'px';
  style['left'] = pos.x + 'px';

  style['visibility'] = this.getVisible_();
};
MapChatBox.prototype['draw'] = MapChatBox.prototype.draw;

/**
 * Get the visibility of the label.
 * @private
 * @return {string} blank string if visible, 'hidden' if invisible.
 */
MapChatBox.prototype.getVisible_ = function() {
  var minZoom = /** @type number */(this.get('minZoom'));
  var maxZoom = /** @type number */(this.get('maxZoom'));

  if (minZoom === undefined && maxZoom === undefined) {
    return '';
  }

  var map = this.getMap();
  if (!map) {
    return '';
  }

  var mapZoom = map.getZoom();
  if (mapZoom < minZoom || mapZoom > maxZoom) {
    return 'hidden';
  }
  return '';
};

MapChatBox.prototype.setVisibility = function(setOn) {
  var containerDiv = this.containerDiv_;
  if (containerDiv) {
    if (setOn) {
      containerDiv.style.display = 'block';
    }
    else {
      containerDiv.style.display = 'none';
    }
  };
};
MapChatBox.prototype['setVisibility'] = MapChatBox.prototype.setVisibility;

/**
 * @inheritDoc
 */
MapChatBox.prototype.onRemove = function() {
  var containerDiv = this.containerDiv_;
  if (containerDiv && containerDiv.parentNode) {
    containerDiv.parentNode.removeChild(containerDiv);
  }
};
MapChatBox.prototype['onRemove'] = MapChatBox.prototype.onRemove;