module.exports = {
    title: '阿饼的学习记录',
    description: 'study hard and make progress every day',
    dest: 'public',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/logo.png',
            },
        ],
        [
            'meta',
            {
                name: 'viewport',
                content: 'width=device-width,initial-scale=1,user-scalable=no',
            },
        ],
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
        },
    },
    theme: 'reco',
    themeConfig: {
        nav: [
            {
                text: '首页',
                link: '/',
                icon: 'reco-home',
            },
            {
                text: '时间线',
                link: '/timeline/',
                icon: 'reco-date',
            },
            {
                text: '文档',
                icon: 'reco-message',
                items: [
                    {
                        text: 'vuepress-reco',
                        link: '/docs/theme-reco/',
                    },
                ],
            },
            {
                text: '相关链接',
                icon: 'reco-message',
                items: [
                    {
                        text: 'GitHub',
                        link: 'https://github.com/study-bing',
                        icon: 'reco-github',
                    },
                    {
                        text: 'Vue',
                        link: 'https://cn.vuejs.org/v2/guide/',
                    },
                    {
                        text: 'ES6',
                        link: 'https://es6.ruanyifeng.com/',
                    },
                ],
            },
        ],
        sidebar: 'auto',
        type: 'blog',
        blogConfig: {
            category: {
                location: 2,
                text: '分类',
            },
            tag: {
                location: 3,
                text: '标签',
            },
        },
        friendLink: [
            {
                title: 'vuepress-theme-reco',
                desc: 'A simple and beautiful vuepress Blog & Doc theme.',
                // "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                link: 'https://vuepress-theme-reco.recoluan.com',
            },
        ],
        logo: '/bin.jpeg',
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: '最后编辑时间',
        author: '阿饼',
        authorAvatar: '/bin.jpeg',
        record: '',
        startYear: '2021',
    },
    markdown: {
        lineNumbers: true,
    },
    plugins: [
        [
            '@vuepress/last-updated',
            {
              transformer: (timestamp, lang) => {
                // 不要忘了安装 moment
                const moment = require('moment')
                moment.locale(lang)
                return moment(timestamp).format('LLLL')
              }
            }
          ],
        [
            '@vuepress-reco/vuepress-plugin-kan-ban-niang',
            {
                theme: ['wanko'],
                clean: true,
                modelStyle: {
                    position: 'fixed',
                    right: '100px',
                    bottom: '0px',
                    opacity: '0.9',
                    zIndex: 99999,
                },
            },
        ],
        [
            '@vuepress-reco/vuepress-plugin-bgm-player',
            {
                audios: [
                    {
                        name: '葛顺-夜的钢琴曲5',
                        artist: '',
                        url: '/music/1.mp3',
                        cover:
                            'https://imgessl.kugou.com/stdmusic/20200909/20200909021503363735.jpg',
                    },
                    {
                        name: 'Bandari-Snowdreams (雪的梦幻)',
                        artist: '',
                        url: './music/2.mp3',
                        cover:
                            'https://imgessl.kugou.com/stdmusic/20150718/20150718185436555593.jpg',
                    },
                ],
            },
        ],
        ['vuepress-plugin-boxx'],
        ['cursor-effects'],
    ],
}
