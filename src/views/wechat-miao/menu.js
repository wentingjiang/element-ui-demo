// import { getMenuButton } from '@/api/wechat'
export default {
  name: 'officialAccountsMenu',
  data () {
    const TAB = {
      MESSAGE: 0,
      JUMP: 1,
      FUNCTION: 2
    }
    return {
      a: 10,
      TAB,
      currentMenuType: TAB.MESSAGE,
      currentIndexX: 0, // 当前点击的主菜单索引（X轴）
      currentIndexY: -1, // 当前点击的子菜单索引（Y轴）,默认值-1（无选中状态）
      visibleMenuYs: [true, false, false], // 子菜单是否可见（Y轴）
      visibleAddX: true, // 主菜单上的add是否可见（X轴）
      visibleAddYs: [true, true, true], // 子菜单上的add是否可见（Y轴）
      labelPosition: 'left',
      form: {
        action: '',
        url: '',
        txt: '商城',
        menuList: [
          {
            image_url: '',
            type: 'view', // click 发送消息-文字；media_id 发送消息-图片；miniprogram 跳转小程序；view 跳转链接
            name: '商城0', // 菜单标题
            key: '', // click等点击类型必须  === 内容
            url: 'https://www.mzbjd.com/addons/yun_shop/?menu#/home?i=5', // 网页链接, iew/miniprogram类型必须
            media_id: '', // 永久素材接口返回的合法media_id
            appid: '', // 小程序的appid
            pagepath: '', // 小程序的页面路径
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
    },
    // 当前菜单名称
    currentMenuName () {
      // 当前没有主菜单，返回空
      if (this.currentIndexX === -1) {
        return ''
      }
      // 当前没有子菜单，返回主菜单名称
      if (this.currentIndexY === -1) {
        return this.form.menuList[this.currentIndexX].name
      }
      // 返回子菜单名称
      return this.form.menuList[this.currentIndexX].sub_button[this.currentIndexY].name
    }
  },
  methods: {
    /**
     * 添加主菜单
     */
    onAddMenuX () {
      // 添加一个主菜单
      const newMenu = {
        id: new Date().getTime(),
        image_url: '',
        type: 'view',
        name: `商城${this.form.menuList.length}`,
        key: '',
        url: '',
        media_id: '',
        appid: '',
        pagepath: '',
        sub_button: []
      }
      this.form.menuList.push(newMenu)
      // 隐藏当前主菜单
      this.visibleMenuYs.splice(this.currentIndexX, 1, false)
      // 设置当前主菜单索引指向新添加的主菜单
      this.currentIndexX = this.form.menuList.length - 1
      // 显示新添加的主菜单
      this.visibleMenuYs.splice(this.currentIndexX, 1, true)
      // 设置当前子菜单索引等于-1
      this.currentIndexY = -1
      // 有3个主菜单时，隐藏添加主菜单按钮
      if (this.form.menuList.length === 3) {
        this.visibleAddX = false
      }
    },
    /**
     * 子菜单的弹出与隐藏
     * @param {*} index
     */
    onSetMenuY (index) {
      // 重复点击
      if (this.currentIndexX === index) {
        return
      }
      // 隐藏当前主菜单
      this.visibleMenuYs.splice(this.currentIndexX, 1, false)
      // 显示点击的主菜单
      this.visibleMenuYs.splice(index, 1, true)
      // 设置当前主菜单索引指向点击的主菜单
      this.currentIndexX = index
      // 设置当前子菜单索引等于-1
      this.currentIndexY = -1
    },
    /**
     * 添加子菜单
     */
    onAddMenuY () {
      const condition = this.form.menuList[this.currentIndexX]?.sub_button
      // 判断是否是null
      if (!(condition instanceof Array)) {
        this.form.menuList[this.currentIndexX].sub_button = []
      }
      // 添加一个子菜单
      const subMenu = {
        id: new Date().getTime(),
        image_url: '',
        type: 'view',
        name: `商城${this.currentIndexX}.${this.form.menuList[this.currentIndexX].sub_button.length + 1}`,
        key: '',
        url: '',
        media_id: '',
        appid: '',
        pagepath: '',
        sub_button: null
      }
      this.form.menuList[this.currentIndexX].sub_button.push(subMenu)
      // 设置当前子菜单索引指向新添加的子菜单
      this.currentIndexY = this.form.menuList[this.currentIndexX].sub_button.length - 1
      // 有5个子菜单时，隐藏添加子菜单按钮
      if (this.form.menuList[this.currentIndexX].sub_button.length === 5) {
        this.visibleAddYs.splice(this.currentIndexX, 1, false)
      }
    },
    foo (index) {
      this.currentIndexY = index
    },
    /**
     * 删除菜单
     * @returns
     */
    onDelete () {
      // 当前在主菜单
      if (this.currentIndexY === -1) {
        if (this.currentIndexX === -1) {
          return
        }
        // 删除当前主菜单
        this.form.menuList.splice(this.currentIndexX, 1)
        // 删除当前子菜单在“是否可见列表”中的位置，并在末尾补充一个标志
        this.visibleMenuYs.splice(this.currentIndexX, 1)
        this.visibleMenuYs.push(false)
        // 删除当前子菜单在“add是否可见”中的位置，并在末尾补充一个标志
        this.visibleAddYs.splice(this.currentIndexX, 1)
        this.visibleAddYs.push(true)
        // 显示添加主菜单按钮
        this.visibleAddX = true
        // 设置当前主菜单索引等于-1
        this.currentIndexX = -1
        return
      }
      // 删除当前子菜单
      this.form.menuList[this.currentIndexX].sub_button.splice(this.currentIndexY, 1)
      // 显示添加子菜单按钮
      this.visibleAddYs.splice(this.currentIndexX, 1, true)
      // 设置当前子菜单索引等于-1
      this.currentIndexY = -1
    }
  }
}
