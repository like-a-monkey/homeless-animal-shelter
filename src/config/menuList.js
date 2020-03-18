const menuList = [ 
  { 
    title: '流浪动物总览', // 菜单标题名称 
    key: '/home', // 对应的 path 
    icon: 'home', // 图标名称 
    isPublic: true
  },
  { 
    title: '流浪动物信息收集处',
    key: '/gather',
    icon: 'appstore',
    children: [ // 子菜单列表 
        { 
        title: '添加动物信息', 
        key: '/gather/add', 
        icon: 'plus' }, 
        { 
          title: '信息订正', 
          key: '/gather/correct', 
          icon: 'edit' 
        },
      ]
  },
      { 
        title: '流浪动物领养处', 
        key: '/adopt', 
        icon: 'user' 
      },
      { 
        title: '爱心捐款处', 
        key: '/contribute', 
        icon: 'heart', 
      },     
  ]
export default menuList