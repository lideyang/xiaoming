<template>
  <div>
    <ZuHePage></ZuHePage>
  </div>
</template>
<script>
import ZuHePage from "./ZuHePage"
export default {
  components: {
    ZuHePage,
  },
  data() {
    return {
      showPage:0
    };
  },
  methods:{
     onItemClick (index) {
       this.showPage=index;
    }
  }
};
</script>
