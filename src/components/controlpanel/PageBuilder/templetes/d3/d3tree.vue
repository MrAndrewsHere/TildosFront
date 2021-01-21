<template>

     <div class="t-container t-align_center">
       <div :class="'t-col '+'t-col_'+record.props.tcol.val+' t-prefix_'+record.props.tprefix.val">
           <tree ref="tree"
                 v-model="currentData"
                 :nodeTextDisplay="nodeTextDisplay"
                 :identifier="getId"
                 :nodeTextMargin="nodeTextMargin"
                 :zoomable="zoomable"
                 :data="Graph.tree"
                 :leafTextMargin="leafTextMargin"
                 :node-text="nodeText"
                 :margin-x="Marginx"
                 :margin-y="Marginy"
                 :radius="radius"
                 :type="record.props.treeType.val"
                 :layout-type="record.props.layoutType.val"
                 :linkLayout="record.props.linkLayout.val"
                 :duration="duration"
                 :minZoom="minZoom"
                 :maxZoom="maxZoom"
                 contextMenuPlacement="bottom-start"
                 class="tree"
                 @clickedText="onClick"
                 @expand="onExpand"
                 @retract="onRetract"
                 @clickedNode="onClickNode">


             <template v-if="!ViewOrPreview" #popUp="{data,node}">

                 <v-card
                     class="mx-auto px-2 pt-1"
                     elevation="1"

                 >
                   <div class="mx-2 my-1">
                     <v-text-field
                         label="Name"
                         :value="data.text"
                         hide-details
                         @change="data.text = $event"
                         color="black"
                     ></v-text-field>

                   </div>

                   <v-card-actions>
                     <v-btn
                         text
                        small
                         @click="addFor(data)"

                     >
                      <v-icon small>mdi-plus</v-icon>
                     </v-btn>

                     <v-btn
                         text
                         small
                         @click="remove(data, node)"
                     >
                       <v-icon small>mdi-trash-can-outline</v-icon>
                     </v-btn>
                   </v-card-actions>
                 </v-card>

             </template>
           </tree>
       </div>
     </div>



</template>

<script>
let data = {"Graph":{"tree":{}}};
import {tree} from 'vued3tree'
import {ViewOrPreview} from "@/components/controlpanel/PageBuilder/mixins/ComponentComputed";
Object.assign( data, {


  duration: 400,
  Marginx: 30,
  Marginy: 30,
  radius: 6,
  leafTextMargin: 6,
  nodeTextMargin: 6,
  nodeText: 'text',
  currentData: null,
  zoomable: true,
  isLoading: false,
  isUnderGremlinsAttack: false,
  nodeTextDisplay: 'all',

  minZoom: 0.8,
  maxZoom: 9,
  events: []
})
let currentId = 7
const removeElement = (arr, element) => {
  const index = arr.indexOf(element)
  if (index === -1) {
    return
  }
  arr.splice(index, 1)
}

export default {
  name: "d3tree",
  props:['record'],
  components: {
    tree
  },
  mixins:[ViewOrPreview],
  data() {
    return data
  },


  mounted() {

    data.Graph.tree = this.record.props.data


  },
  methods: {
    async do(action) {
      if (this.currentData) {
        this.isLoading = true
        await this.$refs['tree'][action](this.currentData)
        this.isLoading = false
      }
    },
    getId(node) {
      return node.id
    },
    expandAll() {
      this.do('expandAll')
    },
    collapseAll() {
      this.do('collapseAll')
    },
    showOnly() {
      this.do('showOnly')
    },
    show() {
      this.do('show')
    },
    onClick(evt) {
      this.onEvent('clickedText', evt)
    },
    onClickNode(evt) {
      this.onEvent('clickedNode', evt)
    },
    onExpand(evt) {
      this.onEvent('onExpand', evt)
    },
    onRetract(evt) {
      this.onEvent('onRetract', evt)
    },
    onEvent(eventName, data) {
      this.events.push({eventName, data: data.data})
    },
    addFor(data) {
      const newData = {
        id: currentId++,
        children: [],
        text: Math.random().toString(36).substring(7)
      }
      data.children.push(newData)
    },
    remove(data, node) {
      const parent = node.parent.data
      removeElement(parent.children, data)
    },
    resetZoom() {
      if (!this.$refs['tree']) {
        return
      }
      this.isLoading = true
      this.$refs['tree'].resetZoom().then(() => {
        this.isLoading = false
      })
    },

  }
}
</script>

<style scoped>
.tree {
  height: 100vh;
}
.graph-root {
  height: 100vh;
  width: 100%;
}

</style>