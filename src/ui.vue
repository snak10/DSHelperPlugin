<template lang="pug">
#listOfButtons
  h1.type--pos-xlarge-bold Sup Designer!<br />Let's get some DS consistency?
  .divider
  ul.disclosure
    li.disclosure__item
      .disclosure__label.disclosure__section Corner Radius
      .disclosure__content
        p.type.type--pos-small-normal Click to set corner radius to 16px
        button.button.button--secondary(v-for="corner in corners")(
          @click="setCornerRadius(corner.value)"
        ) {{ corner.name }}
    li.disclosure__item
      .disclosure__label.disclosure__section Autolayout Spacings
      .disclosure__content
    li.disclosure__item
      .disclosure__label.disclosure__section Design Linter
      .disclosure__content
        label.sectionTitle Select layers to look for missing color style
        button.button.button--secondary(@click="lintFillStyle()") Search and select
        .container
          ul
            li(v-for="nodeWithError in nodesWithError")
              button.button.button-secondary Select
                label {{ nodeWithError.name }}
</template>

<script>
import { dispatch, handleEvent } from './uiMessageHandler'

// Add these lines to import the interactive figma-ui components as needed.
import './figma-ui/js/selectMenu'
import './figma-ui/js/iconInput'
import './figma-ui/js/disclosure'

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
    }
  },
  mounted() {
    // Add these lines to initialize the interactive figma-ui components as needed.
    window.selectMenu.init()
    window.iconInput.init()
    window.disclosure.init()

    // The following shows how messages from the main code can be handled in the UI code.
    handleEvent('nodesWithError', (errorNodes) => {
      this.$set(this.nodesWithError, null, errorNodes)
    })
  },
  methods: {
    setCornerRadius(cornerRadiusValue) {
      // This shows how the UI code can send messages to the main code.
      dispatch('setCornerRadius', cornerRadiusValue)
    },
    lintFillStyle() {
      // This shows how the UI code can send messages to the main code.
      dispatch('lintFillStyle')
    },
    nextErrorOccurence() {
      // This shows how the UI code can send messages to the main code.
      dispatch('nextErrorOccurence')
    },
    previousErrorOccurence() {
      // This shows how the UI code can send messages to the main code.
      dispatch('previousErrorOccurence')
    },
  },
}
</script>

<style lang="scss">
@import './figma-ui/figma-plugin-ds';
</style>
