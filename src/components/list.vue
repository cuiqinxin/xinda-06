<script>
//  import news from '../api/news' 
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
      this.ajax.post('/xinda-api/product/package/grid',this.qs.stringify({
          start:0,
//        limit:8,
//        productTypeCode: "1",
          providerId: "a7304eecbd7246b4b424874e0359eab0",
          sort:2
          })).then(function(data){
            that.d=data.data.data
            console.log(data.data.data);
           
        });
          },
     watch: { 
         page (val) { 
             this.get() 
        } 
    }, 

    // methods: { 
    //     get () { 
    //         news.getList({ 
    //             page: this.page,
    //             limit: this.limit
    //          },
    //          (err, list) => { 
    //              if (err) {
    //                   console.log(err) 
    //                   } 
    //             else { list.data.forEach((data) => { 
    //              const d = new Date(data.create_at)
    //              data.create_at = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` })
    //             this.list = this.list = list.data } 
    //                }) 
    //             } 
    //         }
    //     } 
 }  
</script>