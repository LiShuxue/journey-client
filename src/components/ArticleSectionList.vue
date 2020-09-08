<template>
  <div :class="['article-section-list-wrapper', {'sticky-top': stickyTop}]" ref="stickyWrapper">
    <p class="title">
      <span class="iconfont icon-top-ten"></span>
      <span>文章目录</span>
    </p>
    <div class="title-list">
      <ul>
        <li v-for="(item, index) in titleList" :key="index" :class="'title_' + item.domName" @click.stop="handlePosition(item.id)">
          {{item.text}}
          <ul>
            <li v-for="(item2, index) in item.children" :key="index" :class="'title_' + item2.domName" @click.stop="handlePosition(item2.id)">
              {{item2.text}}
              <ul>
                <li v-for="(item3, index) in item2.children" :key="index" :class="'title_' + item3.domName" @click.stop="handlePosition(item3.id)">
                  {{item3.text}}
                  <ul>
                    <li v-for="(item4, index) in item3.children" :key="index" :class="'title_' + item4.domName" @click.stop="handlePosition(item4.id)">
                      {{item4.text}}
                      <ul>
                        <li v-for="(item5, index) in item4.children" :key="index" :class="'title_' + item5.domName" @click.stop="handlePosition(item5.id)">
                          {{item5.text}}
                          <ul>
                            <li v-for="(item6, index) in item5.children" :key="index" :class="'title_' + item6.domName" @click.stop="handlePosition(item6.id)">
                              {{item6.text}}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'
export default {
  data() {
    return {
      offsetTop: 0,
      stickyTop: false,
      titleList: []
    }
  },
  computed: {
    ...mapState([
      'chooseBlog'
    ])
  },
  created() {
    const tempDocument = $(`<div>${this.chooseBlog.htmlContent}</div>`);
    let nodeList = []
    nodeList = [
      ...this.generateDomList(tempDocument, 'h1', undefined, 'h2'),
      ...this.generateDomList(tempDocument, 'h2', 'h1', 'h3'),
      ...this.generateDomList(tempDocument, 'h3', 'h2', 'h4'),
      ...this.generateDomList(tempDocument, 'h4', 'h3', 'h5'),
      ...this.generateDomList(tempDocument, 'h5', 'h4', 'h6'),
      ...this.generateDomList(tempDocument, 'h6', 'h5', undefined)
    ]
    this.titleList = this.generateTitleList(nodeList)
  },

  mounted() {
    setTimeout(() => {
      // 设置元素渲染之后的距离文档顶端的距离
      this.offsetTop = this.$refs.stickyWrapper.offsetTop;
      // 设置滚动事件
      window.addEventListener('scroll', this.handleScroll)
    }, 1000);
  },
  methods: {
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= this.offsetTop - 70) {
        this.stickyTop = true
      } else {
        this.stickyTop = false
      }
    },

    generateDomList(document, domName, preDomName, nextDomName) {
      let resultList = document.find(domName);
      if (resultList.length > 0) {
        return Array.from(resultList.map(function(index, el) {
          let preEle = preDomName ? $(this).prevAll(preDomName)[0] : undefined;
          return {
            id: el.childNodes[0].id,
            text: el.textContent,
            parentId: preEle ? preEle.childNodes[0].id : undefined,
            domName: domName,
            preDomName: preDomName,
            nextDomName: nextDomName
          }
        }))
      } else {
        return []
      }
    },

    generateTitleList(nodeList) {
      const iniTitleList = this.initList(nodeList)
      this.createChildren(iniTitleList, nodeList)
      return iniTitleList;
    },

    initList(nodeList) {
      let h1list = nodeList.map((item) => {
        if (item.domName === 'h1') {
          return item;
        }
      }).filter((value) => {
        return value !== undefined
      })

      let h2list = nodeList.map((item) => {
        if (item.domName === 'h2') {
          return item;
        }
      }).filter((value) => {
        return value !== undefined
      })

      let h3list = nodeList.map((item) => {
        if (item.domName === 'h3') {
          return item;
        }
      }).filter((value) => {
        return value !== undefined
      })

      return h1list.length > 0 ? h1list : h2list.length > 0 ? h2list : h3list.length > 0 ? h3list : [];
    },

    createChildren(parentList, nodeList) {
      if (parentList.length > 0) {
        parentList.forEach((parent) => {
          parent.children = nodeList.map((item) => {
            if (item.preDomName === parent.domName && item.parentId === parent.id) {
              return item;
            }
          }).filter((value) => {
            return value !== undefined
          })

          let newParentList = parent.children
          this.createChildren(newParentList, nodeList)
        })
      }
    },

    handlePosition(target) {
      if(this.$store.state.isDirectoryOpen){
        this.$store.commit('openOrCloseDirectoryMutation', false);
      }else{
        this.$store.commit('openOrCloseDirectoryMutation', true);
      }

      window.scroll({
        top: $(`#${target}`).offset().top - 80,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.sticky-top{
  position: fixed;
  /* position: sticky; 未来可以用这个属性值*/
  top: 70px;
  margin-top: 0 !important;
  width: $right-width;
  box-sizing: border-box;
}
.article-section-list-wrapper{
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px;
  background: $hui-bai;
  border-radius: 5%;
  color: $hui-hei;
  max-height: calc(100vh - 70px - 75px - 45px);
  overflow: auto;
}

.title{
  padding: 5px 10px 6px 0;
  border-bottom: 1px dashed $shen-hui;
  font-size: $large-size;

  span{
    margin-right: 5px;
  }
}

ul {
  padding-left: 20px;
  li {
    color: #2192F5;
    cursor: pointer;
    padding-top: 10px;
  }
}

.is-mobile .article-section-list-wrapper {
  margin-top: 0;
}
</style>
