<template lang="pug">
#listOfButtons
  h1.type--pos-xlarge-bold Sup Designer!<br />Let's get some DS consistency?
  .divider

  ul.disclosure

    li.disclosure__item
      .disclosure__label.disclosure__section Corner Radius
      #discloseCornerRadius.disclosure__content
        label 
          strong Click to set corner radius to 16px
        button.button.button--secondary(v-for='corner in corners')(
          @click='setCornerRadius(corner.value)'
        ) {{ corner.name }}

    li.disclosure__item
      .disclosure__label.disclosure__section Quick Components
      .disclosure__content
        label.sectionTitle Click to create components
        button.button.button--primary(@click='createTableHeader()') Create Table header

    li.disclosure__item
      .disclosure__label.disclosure__section Autolayout Spacings
      .disclosure__content

    li.disclosure__item.disclosure--expanded
      .disclosure__label.disclosure__section Design Linter
      .disclosure__content
        label.sectionTitle Select layers to look for missing color style
        button.button.button--primary(@click='lintFillStyle()') Search missing color style
        button.button.button--primary(@click='newLintFillStyle()') New search missing color style
        button.button.button--secondary(@click='lintPageFillStyle()') Search in page

        .errorListContainer
          ul.errorList

            li.errorList__item(v-for='nodeWithError in nodesWithError')
              label.errorList__item-label {{ nodesWithError.type }} / {{ nodeWithError.name }}
              button.button.button-secondary(@click='zoomNode(nodeWithError)') Select

            li.errorList__item(v-for='pageNodeWithError in pageNodesWithError')
              label.errorList__item-label {{ nodesWithError.type }} / {{ pageNodeWithError.name }}
              button.button.button-secondary(@click='zoomNode(pageNodeWithError)') Select

</template>

<script>
import { dispatch, handleEvent } from './uiMessageHandler';

// Add these lines to import the interactive figma-ui components as needed.
import './figma-ui/js/selectMenu';
import './figma-ui/js/iconInput';
import './figma-ui/js/disclosure';

export default {
  data() {
    return {
      corners: [
        { value: '4', name: 'XXX-Small-Card' },
        { value: '8', name: 'XX-Small-Card' },
        { value: '12', name: 'X-Small-Card' },
        { value: '16', name: 'X-Medium Card' },
        { value: '20', name: 'Medium Card' },
        { value: '24', name: 'Large Card' },
      ],
      nodesWithError: [],
      pageNodesWithError: [],
    };
  },
  mounted() {
    // Add these lines to initialize the interactive figma-ui components as needed.
    window.selectMenu.init();
    window.iconInput.init();
    window.disclosure.init();

    // The following shows how messages from the main code can be handled in the UI code.
    handleEvent('nodesWithError', (errorNodes) => {
      this.nodesWithError = errorNodes;
    });

    // The following shows how messages from the main code can be handled in the UI code.
    handleEvent('pageNodesWithError', (errorNodes) => {
      this.pageNodesWithError = errorNodes;
    });
  },
  methods: {
    setCornerRadius(cornerRadiusValue) {
      // This shows how the UI code can send messages to the main code.
      dispatch('setCornerRadius', cornerRadiusValue);
    },
    createTableHeader() {
      // This shows how the UI code can send messages to the main code.
      dispatch('createTableHeader');
    },
    lintFillStyle() {
      // This shows how the UI code can send messages to the main code.
      dispatch('lintFillStyle');
    },
    lintPageFillStyle() {
      // This shows how the UI code can send messages to the main code.
      dispatch('lintPageFillStyle');
    },
    nextErrorOccurence() {
      // This shows how the UI code can send messages to the main code.
      dispatch('nextErrorOccurence');
    },
    zoomNode(nodeWithError) {
      // This shows how the UI code can send messages to the main code.
      dispatch('zoomNode', nodeWithError);
    },
    previousErrorOccurence() {
      // This shows how the UI code can send messages to the main code.
      dispatch('previousErrorOccurence');
    },
  },
};
</script>

<style lang="scss">
@import './figma-ui/figma-plugin-ds';
</style>
