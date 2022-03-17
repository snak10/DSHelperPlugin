import { dispatch, handleEvent } from './codeMessageHandler'
import { customCheckTextFills } from './lintingFunctions'

figma.showUI(__html__, { width: 300, height: 600 })

// The following shows how messages from the UI code can be handled in the main code.
handleEvent('setCornerRadius', (cornerRadiusValue) => {
  for (const node of figma.currentPage.selection) {
    node['cornerRadius'] = parseInt(cornerRadiusValue)
    node['cornerSmoothing'] = 0.6
    figma.notify(
      'Corner radius set, Smoothing set to iOS default ' + cornerRadiusValue,
      { timeout: 500 }
    )
  }
  // This shows how the main code can send messages to the UI code.
  dispatch('cornerRadiusSet')
})

// The following shows how messages from the UI code can be handled in the main code.
handleEvent('lintFillStyle', () => {
  const nodesWithError = customCheckTextFills(figma.currentPage.selection, null)

  dispatch('nodesWithError', nodesWithError)
})
// Como eu faço pra fazer uma queue da lista e um botao pra proximo e anterior?
// Como eu checo se os valores na customCheckTextFills(node, errors) somente nos valores que eu passei?
