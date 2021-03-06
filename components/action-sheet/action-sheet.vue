<template>
    <div class="ion-action-sheet" :class="[modeClass,cssClass]">
        <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss"
                  :isActive="isActive"></Backdrop>
        <transition
                name="action-sheet"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="action-sheet-wrapper" v-show="isActive">
                <div class="action-sheet-container">
                    <!--group normal-->
                    <div class="action-sheet-group">
                        <div class="action-sheet-title" v-if="title">
                            <span>{{title}}</span>
                            <div class="action-sheet-sub-title" v-if="subTitle">{{subTitle}}</div>
                        </div>
                        <div class="action-sheet-buttons">
                            <Button role="action-sheet-button" @click="click(b)" v-for="(b,index) of normalButtons"
                                    :key="index"
                                    :class="[b.cssClass,{'icon-left':b.icon}]">
                                <Icon :name="b.icon" v-if="b.icon" class="action-sheet-icon"></Icon>
                                <span>{{b.text}}</span>
                            </Button>
                        </div>
                    </div>
                    <!--group cancel-->
                    <div class="action-sheet-group" v-if="cancelButton">
                        <Button role="action-sheet-button" @click="click(cancelButton)"
                                class="action-sheet-cancel" :class="cancelButton.cssClass">
                            <Icon :name="cancelButton.icon" v-if="cancelButton.icon"
                                  class="action-sheet-icon"></Icon>
                            <span>{{cancelButton.text || 'Cancel'}}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
  import { urlChange } from '../util/util'
  import { Backdrop } from '../backdrop/index'
  import { Button } from '../button/index'
  import { Icon } from '../icon/index'

  const noop = () => {}

  export default {
    name: 'ActionSheet',
    props: {
      title: String,
      subTitle: String,
      cssClass: String,
      buttons: {
        type: Array,
        default: []
      },
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },
      dismissOnPageChange: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        /**
         * ActionSheet State
         * @private
         * */
        isActive: false,    // ActionSheet 开启状态
        enabled: false,     // 是否在过渡态的状态判断，如果在动画中则为false

        /**
         * ActionSheet 计算属性
         * 因为实例化后computed也就无效了，
         * 故这部分在watch处理
         * @private
         * */
        normalButtons: [],  // 普通按钮组
        cancelButton: null, // 取消按钮(组)，一般放在下面

        // promise
        presentCallback: noop,
        dismissCallback: noop,

        unReg: null         // 页面变化的解绑函数
      }
    },
    computed: {
      modeClass () {
        return `action-sheet-${this.mode}`
      }
    },
    methods: {
      /**
       * ActionSheet Animate Hooks
       * @private
       * */
      beforeEnter () {
        this.enabled = false // 不允许过渡中途操作
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterEnter () {
        this.presentCallback()
        this.focusOutActiveElement()
        let focusableEle = document.querySelector('button')
        if (focusableEle) {
          focusableEle.focus()
        }
        this.enabled = true
      },
      beforeLeave () {
        this.enabled = false
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterLeave () {
        this.dismissCallback()
        // 删除DOM
        this.$el.remove()
        this.enabled = true
      },

      /**
       * ActionSheet启动之前去除focus效果，因为存在键盘
       * @private
       * */
      focusOutActiveElement () {
        // only button？
        const activeElement = document.activeElement
        activeElement && activeElement.blur && activeElement.blur()
      },

      /**
       * @function bdClick
       * @description
       * 点击backdrop,关闭ActionSheet
       * 如存在cancel按钮的handler，则点击backdrop执行此handler
       * @private
       */
      bdClick () {
        if (this.enabled && this.enableBackdropDismiss) {
          if (this.cancelButton) {
            this.click(this.cancelButton)
          } else {
            this.dismiss()
          }
        }
      },

      /**
       * @function click
       * @description
       * 点击下方按钮
       * @param {object} button Button Click Handler
       * @private
       */
      click (button) {
        if (!this.enabled) {
          return
        }
        let shouldDismiss = true
        if (button.handler) {
          // a handler has been provided, execute it
          if (button.handler() === false) {
            // if the return value of the handler is false then do not dismiss
            shouldDismiss = false
          }
        }

        // 当前不是在过渡动画中(dismissing中)，
        // 如果是在dismissing中，则意味着正在关闭，
        // 这里不必进行
        if (this.enabled && shouldDismiss) {
          this.dismiss()
        }
      },

      /**
       * @function present
       * @description
       * 打开ActionSheet
       * @returns {Promise}  结果返回Promise, 当动画完毕后执行resolved
       * @private
       */
      present () {
        this.isActive = true
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * @function dismiss
       * @description
       * 关闭ActionSheet
       * @return {Promise} 结果返回Promise, 当动画完毕后执行resolved
       * @private
       * */
      dismiss () {
        if (this.isActive) {
          this.isActive = false
          this.unReg && this.unReg()
          if (!this.enabled) {
            this.$nextTick(() => {
              this.dismissCallback()
              this.$el.remove()
              this.enabled = true
            })
          }
          return new Promise((resolve) => { this.dismissCallback = resolve })
        } else {
          return new Promise((resolve) => { resolve() })
        }
      },

      /**
       * 初始化buttons
       * @private
       * */
      init () {
        let arr = this.buttons
        let _buttons = []
        if (!Array.isArray(arr)) {
          return
        }
        arr.forEach((button) => {
          if (typeof button === 'string') {
            button = {text: button}
          }

          if (!button.cssClass) {
            button.cssClass = ''
          } else {
            // 去除收尾空格
            button.cssClass = button.cssClass.trim()
          }

          if (button.role === 'cancel') {
            this.cancelButton = button
          } else {
            if (button.role === 'destructive') {
              button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive'
            } else if (button.role === 'selected') {
              button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-selected'
            }
            _buttons.push(button)
          }
        })
        this.normalButtons = _buttons
      }
    },
    created () {
      this.init()
      // mounted before data ready, so no need to judge the `dismissOnPageChange` value
      if (this.dismissOnPageChange) {
        this.unReg = urlChange(() => {
          this.isActive && this.dismiss()
        })
      }
    },
    components: {
      Backdrop,
      Button,
      Icon
    }
  }
</script>
<style lang="less">
    @import "action-sheet";
    @import "action-sheet.ios.less";
    @import "action-sheet.md.less";

    // transitioName = 'action-sheet'
    .action-sheet-enter-active, .action-sheet-leave-active {
        transform: translateY(0%);
    }

    .action-sheet-enter, .action-sheet-leave-active {
        transform: translateY(100%);
    }
</style>
