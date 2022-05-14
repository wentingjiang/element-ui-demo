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
      visibleBtnAdd: true,
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
        menuLists: [
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
  watch () {
    // visibleBtnAdd:function(){

    // }
  },
  methods: {
    setMenuVisiableA () {
      this.visibleA = true
      this.visibleB = false
    },
    setMenuVisiableB () {
      this.visibleA = false
      this.visibleB = true
    },
    onAddMenuMain () {
      if (this.form.menuLists.length + 1 > 3) {
        console.log('按钮超过三个了', this.form.menuLists.length + 1)
        // onRemoveBtnAdd()
      } else {
        console.log('按钮少于三个，可以添加')
        this.form.menuLists.push(
          {
            image_url: '',
            type: 'view',
            name: '商城1',
            key: '',
            url: 'https://www.mzbjd.com/addons/yun_shop/?menu#/home?i=5',
            media_id: '',
            appid: '',
            pagepath: '',
            sub_button: [
              {
                image_url: '',
                type: 'view',
                name: '商城1.1',
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
                name: '商城1.2',
                key: '',
                url: 'http://shop/addons/yun_shop/?menu#/member/balance?i=5',
                media_id: '',
                appid: '',
                pagepath: '',
                sub_button: null
              }
            ]
          }
        )
      }
    },
    onAddMenuSub () {
      console.log(222)
    },
    onRemoveBtnAdd () {
      this.visibleBtnAdd = false
    }
  }
}
