
export default {
  name: 'WechatMiao',
  data () {
    const TAB = {
      MESSAGE: 0,
      JUMP: 1,
      FUNCTION: 2
    }
    return {
      TAB,
      currentMenuType: TAB.MESSAGE,
      currentMenuIndex: 0, // 当前点击的menu索引 (X轴与Y轴共用)
      visibleMenuYs: [false, false, false], // Y轴上的menu是否可见
      visibleBtnAddX: true, // X轴上的add是否可见
      visibleBtnAddYs: [true, true, true], // Y轴上的add是否可见
      labelPosition: 'left',
      foo: {
        image_url: '',
        type: 'view',
        name: '商城',
        key: '',
        url: 'https://www.mzbjd.com/addons/yun_shop/?menu#/home?i=5',
        media_id: '',
        appid: '',
        pagepath: '',
        sub_button: null
      },
      form: {
        action: '',
        url: '',
        menuList: [
          {
            image_url: '',
            type: 'view',
            name: '商城0',
            key: '',
            url: 'https://www.mzbjd.com/addons/yun_shop/?menu#/home?i=5',
            media_id: '',
            appid: '',
            pagepath: '',
            sub_button: [
              {
                image_url: '',
                type: 'view',
                name: '商城0.1',
                key: '',
                url: 'http://shop/addons/yun_shop/?menu#/member/balance?i=5',
                media_id: '',
                appid: '',
                pagepath: '',
                sub_button: null
              },
              {
                image_url: '',
                type: 'view',
                name: '商城0.2',
                key: '',
                url: 'http://shop/addons/yun_shop/?menu#/member/balance?i=5',
                media_id: '',
                appid: '',
                pagepath: '',
                sub_button: null
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    isShowSendMessage () {
      return this.currentMenuType === this.TAB.MESSAGE
    },
    isShowJump () {
      return this.currentMenuType === this.TAB.JUMP
    }
  },
  mounted () {
    const message = {
      user: {
        firstName: null
      }
    }
    // let firstName = message?.user?.firstName || []
    // firstName.push('aaa')
    if (!(message?.user?.firstName instanceof Array)) {
      message.user.firstName = []
      message.user.firstName.push('aaa')
    }
    // console.log(message.user.firstName)
  },
  methods: {
    onSetMenuVisiable (index) {
      this.currentMenuIndex = index
      this.visibleMenuYs = [false, false, false]
      this.visibleMenuYs[index] = true
      // console.log('索引', index, this.visibleMenuYs[index])
      console.log('数组', this.visibleMenuYs)
    },
    onAddMenuX () {
      if (this.form.menuList.length === 2) {
        this.visibleBtnAddX = false
      }
      // console.log('商城',this.form.menuList.length)
      const newMenu = {
        image_url: '',
        type: 'view',
        name: `商城${this.form.menuList.length}`,
        key: '',
        url: '',
        media_id: '',
        appid: '',
        pagepath: '',
        sub_button: null
      }
      this.form.menuList.push(newMenu)
    },
    onAddMenuY () {
      const subMenu = {
        image_url: '',
        type: 'view',
        name: `商城${this.currentMenuIndex}.${this.currentMenuIndex}`,
        key: '',
        url: '',
        media_id: '',
        appid: '',
        pagepath: '',
        sub_button: null
      }
      const condition = this.form.menuList[this.currentMenuIndex]?.sub_button
      if (!(condition instanceof Array)) {
        this.form.menuList[this.currentMenuIndex].sub_button = []
        this.form.menuList[this.currentMenuIndex].sub_button.push(subMenu)
        console.log('无子菜单')
      } else {
        console.log('有子菜单')
        console.log('子菜单个数', this.form.menuList[this.currentMenuIndex].sub_button.length)
        if (this.form.menuList[this.currentMenuIndex].sub_button.length === 4) {
          this.visibleBtnAddYs = [true, true, true]
          this.visibleBtnAddYs[this.currentMenuIndex] = false
          console.log('停', this.visibleBtnAddYs)
        }
        this.form.menuList[this.currentMenuIndex].sub_button.push(subMenu)
      }
    }
  }
}
