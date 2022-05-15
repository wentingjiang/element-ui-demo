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
      currentMenuIndex: 0,
      isShowAddMenuButton: true,
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
  watch: {
    'form.menuList.length': {
      handler (newVal, oldVal) {
        this.isOpenMenuList = new Array(newVal)
        this.isOpenMenuList.fill(false)
        this.isShowAddSubMenuButtonList = new Array(newVal)
        this.isShowAddSubMenuButtonList.fill(true)
        // 新增一个菜单时，将新增项设置为当前菜单并打开
        if (newVal - oldVal === 1) {
          this.$set(this.isOpenMenuList, oldVal, true)
          this.currentMenuIndex = oldVal
        }
      },
      immediate: true
    }
  },
  created () {

  },
  methods: {
    onSubmit () {},
    setMenuVisiableA (index) {
      if (this.currentMenuIndex !== index) {
        if (this.isOpenMenuList[this.currentMenuIndex]) {
          this.$set(this.isOpenMenuList, this.currentMenuIndex, false)
        }
        this.currentMenuIndex = index
      }
      this.$set(this.isOpenMenuList, index, !this.isOpenMenuList[index])
    },
    setMenuVisiableB () {
      this.visibleA = false
      this.visibleB = true
    },
    /**
     * 添加菜单
     */
    onAddMenu () {
      if (this.form.menuList.length === 2) {
        this.isShowAddMenuButton = false
      }
      const newMenu = {
        image_url: '',
        type: 'view',
        name: `商城${this.currentMenuIndex + 1}`,
        key: '',
        url: 'https://www.mzbjd.com/addons/yun_shop/?menu#/home?i=5',
        media_id: '',
        appid: '',
        pagepath: '',
        sub_button: []
      }
      this.form.menuList.push(newMenu)
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
