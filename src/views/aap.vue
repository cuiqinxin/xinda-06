<template>
 <div id="aap">
      <ol> 
          <list :page="page"></list>
           <li v-for="(news,item)of list" :key="item"> 
              <p class="title">{{ news.title }}</p> 
              <p class="date">{{ news.create_at }}</p> 
              <p class="author">By: {{ news.author.loginname }}</p>
          </li> 
          <a class="button" @click="next" >GO NEXT<span>CURRENT:{{page}}</span></a>
          <a class="button" @click="previous" >PRIVIOUS<span>CURRENT:{{page}}</span></a>
        </ol>       
      </div> 
      </template> 
      <script> 
      import List from './components/List' 
      export default {
           components: { 
               List 
            }, 
           data () { 
               return { page: 1 } 
               }, 
               methods: { 
                   next () {this.page++  } ,
                   previous() {this.page--}
                   } 
            } 
            </script>
             <style scoped> 
            ol { margin-left: 2rem; 
             list-style: outside decimal; 
             } 
            li { line-height: 1.5;
              padding: 1rem;
               border-bottom: 1px solid #b6b6b6;
            } 
            .title { font-weight: bold; 
                font-size: 1.3rem;
            } 
            .date { font-size: .8rem;
                  color: #d6d6d6; 
            } 
            </style>