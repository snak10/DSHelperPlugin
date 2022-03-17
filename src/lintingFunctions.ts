// Linting functions

// Generic function for creating an error object to pass to the app.
export function createErrorObject(node, type, message, value?) {
  let error = {
    message: '',
    type: '',
    node: '',
    value: '',
  };

  error.message = message;
  error.type = type;
  error.node = node;

  if (value !== undefined) {
    error.value = value;
  }

  return error;
}

// Determine a nodes fills
export function determineFill(fills) {
  let fillValues = [];

  fills.forEach((fill) => {
    if (fill.type === 'SOLID') {
      let rgbObj = convertColor(fill.color);
      fillValues.push(RGBToHex(rgbObj['r'], rgbObj['g'], rgbObj['b']));
    } else if (fill.type === 'IMAGE') {
      fillValues.push('Image - ' + fill.imageHash);
    } else {
      const gradientValues = [];
      fill.gradientStops.forEach((gradientStops) => {
        let gradientColorObject = convertColor(gradientStops.color);
        gradientValues.push(
          RGBToHex(
            gradientColorObject['r'],
            gradientColorObject['g'],
            gradientColorObject['b']
          )
        );
      });
      let gradientValueString = gradientValues.toString();
      fillValues.push(`${fill.type} ${gradientValueString}`);
    }
  });

  return fillValues[0];
}

// Lint border radius
export function checkRadius(node, errors, radiusValues) {
  let cornerType = node.cornerRadius;

  if (typeof cornerType !== 'symbol') {
    if (cornerType === 0) {
      return;
    }
  }

  // If the radius isn't even on all sides, check each corner.
  if (typeof cornerType === 'symbol') {
    if (radiusValues.indexOf(node.topLeftRadius) === -1) {
      return errors.push(
        createErrorObject(
          node,
          'radius',
          'Incorrect Top Left Radius',
          node.topRightRadius
        )
      );
    } else if (radiusValues.indexOf(node.topRightRadius) === -1) {
      return errors.push(
        createErrorObject(
          node,
          'radius',
          'Incorrect top right radius',
          node.topRightRadius
        )
      );
    } else if (radiusValues.indexOf(node.bottomLeftRadius) === -1) {
      return errors.push(
        createErrorObject(
          node,
          'radius',
          'Incorrect bottom left radius',
          node.bottomLeftRadius
        )
      );
    } else if (radiusValues.indexOf(node.bottomRightRadius) === -1) {
      return errors.push(
        createErrorObject(
          node,
          'radius',
          'Incorrect bottom right radius',
          node.bottomRightRadius
        )
      );
    } else {
      return;
    }
  } else {
    if (radiusValues.indexOf(node.cornerRadius) === -1) {
      return errors.push(
        createErrorObject(
          node,
          'radius',
          'Incorrect border radius',
          node.cornerRadius
        )
      );
    } else {
      return;
    }
  }
}

// Custom Lint rule that isn't being used yet!
// that ensures our text fills aren't using styles (design tokens) meant for backgrounds.
export function customCheckTextFills(node, errors) {
  // Here we create an array of style keys (https://www.figma.com/plugin-docs/api/PaintStyle/#key)
  // that we want to make sure our text layers aren't using.
  const fillsToCheck = [
    '5417d9f065908c97e6f96e9bd796420f74ba4e64',
    '4b93d40f61be15e255e87948a715521c3ae957e6',
    'b702400eccad9a1aa42e4153115e7cdc3c2b9f32',
    'c7797740643a0ecf88ac2b01d0d60490ee0d6920',
    '9d5f22ae1e9133f327e3a5fb8c9a9b200b871777',
    '5f23966ec7efc9ca1fcf71b856302b08e6bad34b',
    '68407b8bf004bb0bc3aedc2a3ff60323bf2e4ff6',
    '075b8ea4849bd12b3e9be39cd300896d45d55ae7',
    '6314f78c3536d86f935f413850c3e8e0d4cdb456',
    '3ca6042dbf2fb59d1fbedc60eeebe64b83c219ec',
    '48f48368f7c3e8ca32877bf3e1b8559c12018e7b',
    '942a415d788a8e3069f31a68896bb3367f8bace2',
    'b37d2ce7fce66fa6d3155439f7aadf63239ff0c9',
    '63d350fd359f1d960d479b8aa963bc10cb9fc234',
    'd8b1e022cdeae152afe652e3b180b10157b47ea0',
    '8bb285926ca945d3c278c2dc0b474ad9fc6bc5fd',
    '28c6d3560d5ddaf101a622bd108e95409d3f37e0',
    'b336528eb4a33104d5a8d2c7c5573f4d9759f1e4',
    'b5f65c52992751ae73b8473aa902f17bc07a1e9b',
    '25ec8d4f518b41fe13b076c9c9f4d81ea73685ab',
    '778b72bbbf274f0adda1fe3051e9eede1fe9ba45',
    'eea43b1a1118e07afeb7f85cbe9d8baed9236d26',
    '9975bbc909f6a2db4bb2efda3921f94ff03498d8',
    'b68f523bc267b85eed4d9bb0c6db85b4c49c09a7',
    '3ef7ac1ab17ac9b9d28714765219c24d9d9945eb',
    'b4dd75ae0dfee3c24884edf745942de17fb4a284',
    'f8d971c048988ead253985a83ddf241b4101db1a',
    '00d0de4dce7c7cb4eb65b976b3e472b09745c092',
    'e1bead442e6eec4d6009541add33bf2d505f3f44',
    '5f74bdea3411c7660425c4b28ad83563c3b06135',
    'f5118d3f85d054ddcaab539f6323979ba20c2c25',
    'a30e8812d9014670965dff679fe6ef5f57c0ea0e',
    '0a78212b0d89925caf43ea7e789d578cad30730d',
    '68e234d8bcbd5733e3251928d35ea8f9de87f534',
    '108c7e81a73ba83fe1f04ce8d04290e8f6b29a7e',
    'a218ad0a9d8a1b70b3f594cdce4c5f6ea40f67e1',
    'd698f6efb39c782b7af54029047ec77490e9c55c',
    '4e5c475dfc8bc7b11f8698e7ec93c04d9cc99423',
    'S29b78fd87442715b48a80be05a712886769611ca',
    'baf76954c29e7c4f8ad30ea4441c1c13487f48cf',
    'f8526696771c8e3d15c30e86c3e9c6b38306cddf',
    '83c356d787f4b442d7265d140aa717975952b483',
    'a21dd0614917986b92744d57c0dcf8ab03c01545',
    '401152a4aea82462a018f2a0eee525d0f8bde245',
    // To collect style keys, use a plugin like Inspector, or use console commands like figma.getLocalPaintStyles();
    // in your design system file.
  ];

  const filteredList = node.filter((selection) => {
    // Get style if there's any
    const style = figma.getStyleById(selection.fillStyleId);

    // If node has a style AND that style is inside the fillsToCheck, than returns nothing.
    // Otherwise, return the selected node not following the DS Style
    return style && fillsToCheck.includes(style.key) ? null : selection;
  });

  console.log(
    "Nodes that don't match the fillStyleId from the Design System",
    filteredList
  );

  return filteredList;

  // let nodeFillStyle = node.fillStyleId;

  // // If there are multiple text styles on a single text layer, we can't lint it
  // // we can return an error instead.
  // if (typeof nodeFillStyle === 'symbol') {
  //   return errors.push(
  //     createErrorObject(
  //       node, // Node object we use to reference the error (id, layer name, etc)
  //       'fill', // Type of error (fill, text, effect, etc)
  //       'Mixing two styles together', // Message we show to the user
  //       'Multiple Styles' // Normally we return a hex value here
  //     )
  //   );
  // }

  // // We strip the additional style key characters so we can check
  // // to see if the fill is being used incorrectly.
  // //   nodeFillStyle = nodeFillStyle.replace("", "");
  // //   nodeFillStyle = nodeFillStyle.split(",")[0];

  // // If the node (layer) has a fill style, then check to see if there's an error.
  // if (nodeFillStyle !== '') {
  //   // If we find the layer has a fillStyle that matches in the array create an error.
  //   if (fillsToCheck.includes(nodeFillStyle)) {
  //     return errors.push(
  //       createErrorObject(
  //         node, // Node object we use to reference the error (id, layer name, etc)
  //         'fill', // Type of error (fill, text, effect, etc)
  //         'Incorrect text color use', // Message we show to the user
  //         'Using a background color on a text layer' // Determines the fill, so we can show a hex value.
  //       )
  //     );
  //   }
  //   // If there is no fillStyle on this layer,
  //   // check to see why with our default linting function for fills.
  // } else {
  //   checkFills(node, errors);
  // }
}

// Check for effects like shadows, blurs etc.
export function checkEffects(node, errors) {
  if (node.effects.length) {
    if (node.effectStyleId === '') {
      const effectsArray = [];

      node.effects.forEach((effect) => {
        let effectsObject = {
          type: '',
          radius: '',
          offsetX: '',
          offsetY: '',
          fill: '',
          value: '',
        };

        // All effects have a radius.
        effectsObject.radius = effect.radius;

        if (effect.type === 'DROP_SHADOW') {
          effectsObject.type = 'Drop Shadow';
        } else if (effect.type === 'INNER_SHADOW') {
          effectsObject.type = 'Inner Shadow';
        } else if (effect.type === 'LAYER_BLUR') {
          effectsObject.type = 'Layer Blur';
        } else {
          effectsObject.type = 'Background Blur';
        }

        if (effect.color) {
          let effectsFill = convertColor(effect.color);
          effectsObject.fill = RGBToHex(
            effectsFill['r'],
            effectsFill['g'],
            effectsFill['b']
          );
          effectsObject.offsetX = effect.offset.x;
          effectsObject.offsetY = effect.offset.y;
          effectsObject.value = `${effectsObject.type} ${effectsObject.fill} ${effectsObject.radius}px X: ${effectsObject.offsetX}, Y: ${effectsObject.offsetY}`;
        } else {
          effectsObject.value = `${effectsObject.type} ${effectsObject.radius}px`;
        }

        effectsArray.unshift(effectsObject);
      });

      let currentStyle = effectsArray[0].value;

      return errors.push(
        createErrorObject(
          node,
          'effects',
          'Missing effects style',
          currentStyle
        )
      );
    } else {
      return;
    }
  }
}

export function checkFills(node, errors) {
  if (node.fills.length && node.visible === true) {
    if (
      node.fillStyleId === '' &&
      node.fills[0].type !== 'IMAGE' &&
      node.fills[0].visible === true
    ) {
      // We may need an array to loop through fill types.
      return errors.push(
        createErrorObject(
          node,
          'fill',
          'Missing fill style',
          determineFill(node.fills)
        )
      );
    } else {
      return;
    }
  }
}

export function checkStrokes(node, errors) {
  if (node.strokes.length) {
    if (node.strokeStyleId === '' && node.visible === true) {
      let strokeObject = {
        strokeWeight: '',
        strokeAlign: '',
        strokeFills: [],
      };

      strokeObject.strokeWeight = node.strokeWeight;
      strokeObject.strokeAlign = node.strokeAlign;
      strokeObject.strokeFills = determineFill(node.strokes);

      let currentStyle = `${strokeObject.strokeFills} / ${strokeObject.strokeWeight} / ${strokeObject.strokeAlign}`;

      return errors.push(
        createErrorObject(node, 'stroke', 'Missing stroke style', currentStyle)
      );
    } else {
      return;
    }
  }
}

export function checkType(node, errors) {
  if (node.textStyleId === '' && node.visible === true) {
    let textObject = {
      font: '',
      fontStyle: '',
      fontSize: '',
      lineHeight: {},
    };

    textObject.font = node.fontName.family;
    textObject.fontStyle = node.fontName.style;
    textObject.fontSize = node.fontSize;

    // Line height can be "auto" or a pixel value
    if (node.lineHeight.value !== undefined) {
      textObject.lineHeight = node.lineHeight.value;
    } else {
      textObject.lineHeight = 'Auto';
    }

    let currentStyle = `${textObject.font} ${textObject.fontStyle} / ${textObject.fontSize} (${textObject.lineHeight} line-height)`;

    return errors.push(
      createErrorObject(node, 'text', 'Missing text style', currentStyle)
    );
  } else {
    return;
  }
}

// Utility functions for color conversion.
const convertColor = (color) => {
  const colorObj = color;
  const figmaColor = {};

  Object.entries(colorObj).forEach((cf) => {
    const [key, value] = cf;

    if (['r', 'g', 'b'].includes(key)) {
      figmaColor[key] = (255 * (value as number)).toFixed(0);
    }
    if (key === 'a') {
      figmaColor[key] = value;
    }
  });
  return figmaColor;
};

function RGBToHex(r, g, b) {
  r = Number(r).toString(16);
  g = Number(g).toString(16);
  b = Number(b).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  return '#' + r + g + b;
}
