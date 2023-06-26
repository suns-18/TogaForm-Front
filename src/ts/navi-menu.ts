export default [
    {
        title: '主页',
        icon: 'mdi mdi-home-circle',
        path: '/admin',
    }, {
        title: '用户管理',
        icon: 'mdi mdi-account-check-outline',
        subItems: [{
            title: '正常状态用户',
            icon: 'mdi mdi-account-check-outline',
            path: '/manage/user',
        }, {
            title: '已关闭用户',
            icon: 'mdi mdi-account-check-outline',
            path: '/manage/user/closed'
        }]
    }, {
        title: '项目管理',
        icon: 'mdi mdi-account-check-outline',
        path: '/manage/project',
    }, {
        title: '模板管理',
        icon: 'mdi mdi-account-check-outline',
        path: '/manage/template',
    }, {
        title: '问卷管理',
        icon: 'mdi mdi-account-check-outline',
        subItems: [{
            title: '项目问卷',
            icon: 'mdi mdi-account-check-outline',
            path: '/manage/project/quesnaireList',
        }, {
            title: '问卷统计',
            icon: 'mdi mdi-account-check-outline',
            path: '/manage/project/quesnaireStatistics'
        }]
    },{
        title: '个人信息',
        icon: 'mdi mdi-account',
        path: '/personalInfo'
    },
    {
        title: '使用帮助',
        icon: 'mdi mdi-help',
        path: '/help'
    }, {
        title: '关于本系统',
        icon: 'mdi mdi-information',
        path: '/about'
    }, {
        title: '退出登陆',
        icon: 'mdi mdi-exit-run',
        path: '/logout'
    }
]