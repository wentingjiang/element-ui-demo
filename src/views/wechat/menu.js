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
      visibleA: false,
      visibleB: false,
      isOpenMenuList: [],
      currentMenuIndex: -1,
      currentSubMenuIndex: -1,
      isShowAddSubMenuButtonList: [],
      labelPosition: 'left',
      TAB,
      currentMenuType: TAB.MESSAGE,
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
        menuList: [],
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
    // 是否显示新增菜单按钮
    isShowAddMenuButton () {
      return this.form?.menuList?.length < 3
    },
    // 当前菜单名称
    currentMenuName () {
      if (!this.form.menuList.length) {
        return ''
      }
      if (this.currentSubMenuIndex > -1) {
        return this.form.menuList[this.currentMenuIndex].sub_button[this.currentSubMenuIndex].name
      }
      if (this.currentMenuIndex > -1) {
        return this.form.menuList[this.currentMenuIndex].name
      }
    }
  },
  watch: {
    currentMenuIndex (newVal, oldVal) {
      // 关闭上一个打开的当前菜单
      if (this.isOpenMenuList[oldVal]) {
        this.$set(this.isOpenMenuList, oldVal, false)
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    /**
     * 删除菜单
     */
    async  onDeleteMenu () {
      try {
        await this.$confirm(`删除后“${this.currentMenuName}”菜单下设置的内容将被删除`, '提示', {
          type: 'warning'
        })
      } catch (error) {
        return
      }
      if (this.currentSubMenuIndex > -1) {
        const index = this.currentMenuIndex
        const subIndex = this.currentSubMenuIndex
        this.currentSubMenuIndex = -1
        this.currentMenuIndex = -1
        this.form.menuList[index].sub_button.splice(subIndex, 1)
        return
      }
      if (this.currentMenuIndex > -1) {
        const index = this.currentMenuIndex
        this.currentMenuIndex = -1
        this.form.menuList.splice(index, 1)
      }
    },
    /**
     * 点击菜单
     * @param {*} index
     */
    onClickMenu (index) {
      this.currentMenuIndex = index
      this.currentSubMenuIndex = -1
      this.$set(this.isOpenMenuList, index, !this.isOpenMenuList[index])
    },
    /**
     * 点击子菜单
     * @param {*} index
     */
    onClickSubMenu (index) {
      this.currentSubMenuIndex = index
    },
    async init () {
      this.form = await this.getWechatData()
      const menuList = this.form.menuList
      if (menuList?.length) {
        this.isOpenMenuList = new Array(menuList.length).fill(false)
        this.isShowAddSubMenuButtonList = menuList.map(item => item.sub_button?.length < 5)
      }
    },
    getWechatData () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const params = {
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
                    name: '商城0.0',
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
                    name: '商城0.1',
                    key: '',
                    url: 'http://shop/addons/yun_shop/?menu#/member/balance?i=5',
                    media_id: '',
                    appid: '',
                    pagepath: '',
                    sub_button: null
                  }
                ]
              }
            ],
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          }
          resolve(params)
        })
      }, 2000)
    },
    onSubmit () {},
    /**
     * 添加菜单
     */
    onAddMenu () {
      const newMenu = {
        image_url: '',
        type: 'view',
        name: `商城${this.form.menuList.length}`,
        key: '',
        url: 'https://www.mzbjd.com/addons/yun_shop/?menu#/home?i=5',
        media_id: '',
        appid: '',
        pagepath: '',
        sub_button: []
      }
      this.form.menuList.push(newMenu)
      this.isOpenMenuList.push(false)
      this.isShowAddSubMenuButtonList.push(true)
    },
    /**
     * 添加子菜单
     */
    onAddSubMenu () {
      const subMenuCount = this.form.menuList[this.currentMenuIndex].sub_button.length
      if (subMenuCount === 4) {
        this.$set(this.isShowAddSubMenuButtonList, this.currentMenuIndex, false)
      }
      const subMenu = {
        image_url: '',
        type: 'view',
        name: `商城${this.currentMenuIndex}.${subMenuCount}`,
        key: '',
        url: 'http://shop/addons/yun_shop/?menu#/member/balance?i=5',
        media_id: '',
        appid: '',
        pagepath: '',
        sub_button: null
      }
      this.form.menuList[this.currentMenuIndex].sub_button.push(subMenu)
    }
  }
}
