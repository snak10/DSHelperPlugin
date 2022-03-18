import { exists } from 'fs';
import { component } from 'vue/types/umd';
import { node } from 'webpack';
import { dispatch, handleEvent } from './codeMessageHandler';
import { customCheckTextFills, insertToSelectedNode } from './lintingFunctions';

figma.showUI(__html__, { width: 320, height: 600 });

handleEvent('setCornerRadius', (cornerRadiusValue) => {
  for (const node of figma.currentPage.selection) {
    node['cornerRadius'] = parseInt(cornerRadiusValue);
    node['cornerSmoothing'] = 0.6;
    figma.notify(
      'Corner radius set, Smoothing set to iOS default ' + cornerRadiusValue,
      { timeout: 500 }
    );
  }

  dispatch('cornerRadiusSet');
});

handleEvent('lintFillStyle', () => {
  const nodesWithError = customCheckTextFills(figma.currentPage.selection, null);
  const formattedNodes = nodesWithError.map((node) => {
    console.log(node);
    return {
      id: node.id,
      name: node.name,
      parent: node.parent,
      type: node.type,
    };
  });

  dispatch('nodesWithError', formattedNodes);
});

handleEvent('lintPageFillStyle', () => {
  const pageNodesWithError = customCheckTextFills(
    figma.currentPage.findAll(),
    null
  );

  const formattedPageNodes = pageNodesWithError.map((node) => {
    return {
      id: node.id,
      name: node.name,
      parent: node.parent,
    };
  });
  dispatch('pageNodesWithError', formattedPageNodes);
});

handleEvent('zoomNode', (nodeWithError) => {
  const selection = figma.currentPage.selection.slice();
  selection.splice(nodeWithError) //Removes current selection
  selection.push(nodeWithError) //Adds node to the selection
  figma.currentPage.selection = selection
  figma.viewport.scrollAndZoomIntoView([nodeWithError]);
});

handleEvent('addTopRow', async () => {
  
  console.log(figma.currentPage.selection)

  if (figma.currentPage.selection.length == 0) {

    // Check: If the user don't have anything selected
    // 1 - We create a frame with autolayout to them
    // 2 - And select it and instantiate the component
    // 3 - Inside the selected node(layer)
    // 4 - And select back the parent

    // Create and insert in the FRAME in the middle of the screen
    var row = figma.createFrame()
    row.resize(100,100)
    row.primaryAxisSizingMode = "AUTO"
    row.counterAxisSizingMode = "AUTO"
    row.name = "row"
    row.x = (figma.viewport.center.x - 50)
    row.y = (figma.viewport.center.y - 50)
    row.fills = []
    row.cornerRadius = 24
    row.cornerSmoothing = 0.6000000238418579
    row.expanded = false
    row.layoutMode = "VERTICAL"
    row.counterAxisSizingMode = "AUTO"

    let rowNode = figma.getNodeById(row.id)
    console.log(rowNode);
        
    const selection = figma.currentPage.selection.slice();
    selection.splice(rowNode) //Removes current selection
    selection.push(rowNode) //Adds node to the selection
    figma.currentPage.selection = selection
    figma.viewport.scrollAndZoomIntoView([rowNode]);

  }
  
    //Create desired instance
    let component = await figma.importComponentByKeyAsync('6e97ca7a5e326cb46563feab9eb8c7ec09af5d5e');
    let instance = component.createInstance();

    //Insert the instance to the selection
    insertToSelectedNode(instance);
 
})

handleEvent('addInstance', async () => {

  let component = await figma.importComponentByKeyAsync('6e97ca7a5e326cb46563feab9eb8c7ec09af5d5e');
  // const selectionChildren = figma.getNodeById(selectionId)[0].children;
  // console.log(selectionChildren)
  let instance = component.createInstance();
  insertToSelectedNode(instance);

})

  // Working example of making a rectangle and then you just need to add to the selection
  //Set purple localpaintstyle
  // var darkGray = "S:b702400eccad9a1aa42e4153115e7cdc3c2b9f32,7:4"
  // // Create RECTANGLE
  // var rect = figma.createRectangle()
  // rect.fillStyleId = darkGray
  // rect.resize(240.0000000000, 240.0000000000)
  // rect.name = "New rect with Lib fill style"
  // rect.x = 0
  // rect.y = 0
  // rect.constrainProportions = true
  // rect.cornerRadius = 24
  // rect.cornerSmoothing = 0.6  
  
  // Working example of making a duplicate of a existing node in the page by ID
  // const bodyCell = figma.getNodeById("C242:8084;328:41064;461:129690");
  
  // const bodyCell = figma.importComponentByKeyAsync("d14b2f836edb77790bc53670e0862a692030d27d").then((node) => {
    //   const nodeId = node.id;
    //   return nodeId;
    // });
    
    // const componentKey = "6e97ca7a5e326cb46563feab9eb8c7ec09af5d5e";
    // const newMainComponentObject = figma.importComponentByKeyAsync(componentKey)
    

    // Swap instances
    // figma.getNodeById(selectionId).swapComponent(component);