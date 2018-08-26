<script>
//  import news from '../api/news'
import store from '../store';
 export default {
     data () {
          return {
               list: [],
               limit: 10
               }
            },
    props: {
        page: {
             type: Number,
             default: 1
        }
    },
    created () {
        //  this.get()

        var that = this;
        store.commit('loading',true)
      this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
          start:0,
          providerId: "a7304eecbd7246b4b424874e0359eab0",
          sort:2
          })).then(function(data){
            that.d=data.data.data
            store.commit('loading',false)
        });
          },
     watch: {
         page (val) {
             this.get()
        }
    },
 }
</script>
