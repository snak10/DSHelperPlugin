import { dispatch, handleEvent } from './codeMessageHandler';
import { customCheckTextFills } from './lintingFunctions';

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

handleEvent('createTableHeader', () => {
});