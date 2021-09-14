---
title: 5分钟搭建属于自己的博客
date: 2021-09-10
tags:
    - 其他
categories:
    - 其他
---
## 介绍
本文主要介绍用VuePress配合vuepress-theme-reco主题搭建一个属于自己的博客,本文主要以搭建流程为主，相关文档会提供链接
## 文档链接
>[VuePress](https://vuepress.vuejs.org/zh/)  
>[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)

## 创建工程
**以下的npm如果太慢可自行用cnpm或者yarn**  
```bash
# 安装vuepress

yarn global add vuepress 或者：npm install -g vuepress

# 安装脚手架工具

yarn global add vuepress-theme-reco 或者 npm install @vuepress-reco/theme-cli -g

# 创建项目

theme-cli init 项目名称
```
> 上述命令执行后，在命令行窗口会进行一系列的信息配置

```bash
? What's the title of your project?  #键入您的项目标题

? What's the description of your project? #键入您的项目描述

? What's the author's name? #键入作者姓名

? What style do you want your home page to be?(Select afternoon-grocery, if you

want to download reco_luan's '午后南杂') (Use arrow keys)

❯ blog  # 此处通过方向键选择您首页风格，这里我们选择blog

  doc

  afternoon-grocery
```
> 启动项目
```bash
# 接入项目目录

cd 项目名称

# 安装npm

npm install 或者 yarn

# 运行测试环境

npm run dev
```

## 项目配置
``` Makefile
├─ node_modules #存放着项目所需的依赖，我们不需要关心

├─ docs  #该目录下存放您编写的文档

│  └─ theme-reco #以下都是demo可删除

│    ├─ api.md

│    ├─ plugin.md

│    ├─ theme.md

│    └─ README.md

├─ blogs #该目录下存放您编写的博客文章

│    ├─ category1 #以下都是demo可删除

│    │  ├─ 2018

│    │  │  └─ 121501.md

│    │  └─ 2019

│    │    └─ 092101.md

│    ├─ category2

│    │  ├─ 2016

│    │  │  └─ 121501.md

│    │  └─ 2017

│    │    └─ 092101.md

│    └─ other

│        └─ guide.md

├─ .vuepress # 该目录下存放项目配置文件与静态资源

│  ├─ config.js #该文件用于配置项目

│  └─ public # 该目录下存放网页中所需的静态资源

│    ├─ hero.png # 首页大图

│    ├─ logo.png # 站点logo

│    ├─ favicon.ico #站点图标

│    └─ avatar.png #头像

├─ package.json #依赖管理文件

└─ README.md #这里存放着博客首页的内容
```

## 页面布局配置
打开根目录下的README.md 
::: tip
**以下的图片均以.vuepress/public 为根目录**
:::
``` yaml
---
home: true #指定该文件为您的首页，改为false则不作为首页
heroText: 总是有学不完的东西，搬不完的砖~ #首页居中显示的文本
tagline: study hard and make progress every day! #首页居中显示的文本
# heroImage: /hero.png  #首页显示的主图，默认被注释，取消注释可显示图片
# heroImageStyle:
#     {
#         width: '100%',
#         display: block,
#         margin: '6rem auto 1.5rem',
#         boxShadow: '0 5px 18px rgba(0,0,0,0.2)',
#     }
bgImageStyle:
    {
        width: '100%',
        height: '350px',
        backgroundSize: 'cover',
        maxWidth: '100%',
    }
# 以下内容基本上不生效，可删除
isShowTitleInHome: false
actionText: Guide
actionLink: /views/other/guide
features:
    - title: Yesterday
      details: 开发一款看着开心、写着顺手的 vuepress 博客主题
    - title: Today
      details: 希望帮助更多的人花更多的时间在内容创作上，而不是博客搭建上
    - title: Tomorrow
      details: 希望更多的爱好者能够参与进来，帮助这个主题更好的成长
---
```
## 基本信息配置
> .vuepress/config为配置基本信息<https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html>
```yaml
module.exports = {
    title: '阿饼的学习记录', // 页面标题
    description: 'study hard and make progress every day', // 页面进入加载时显示
    dest: 'public', // 文件目录
    head: [ #页面头部
        [
            'link',
            {
                rel: 'icon',
                href: '/favicon.ico',
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
    theme: 'reco', // 主题
    themeConfig: { // 头部tab
        nav: [
            {
                text: 'Home',
                link: '/',
                icon: 'reco-home',
            },
            {
                text: 'TimeLine',
                link: '/timeline/',
                icon: 'reco-date',
            },
            {
                text: 'Docs',
                icon: 'reco-message',
                items: [ // 折叠导航
                    {
                        text: 'vuepress-reco',
                        link: '/docs/theme-reco/',
                    },
                ],
            },
            {
                text: 'Contact',
                icon: 'reco-message',
                items: [
                    {
                        text: 'GitHub',
                        link: 'https://github.com/study-bing',
                        icon: 'reco-github',
                    },
                ],
            },
        ],
        sidebar: 'auto',
        type: 'blog',
        blogConfig: { // 头部tab的添加，Category和Tag项则跟您的文章中标注的分类和标签自动生成
            category: {
                location: 2, // tab位置
                text: 'Category', // tab名称
            },
            tag: {
                location: 3,
                text: 'Tag',
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
        logo: '/bin.jpeg', // logo
        search: true, // 是否添加搜索
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        author: '阿饼', //版权信息，与昵称为同一数据
        authorAvatar: '/bin.jpeg', // 头像
        // 底部信息
        record: '',
        startYear: '2021',
    },
    markdown: {
        lineNumbers: true,
    },
    plugins: [ // 插件
    ],
}

```
## 文档编写
```yaml
// 头部
---
title: 5分钟搭建属于自己的博客 // 文档title
date: 2021-09-09, // 文档时间，首页会根据时间自动排序
tags: // 所属标签（会自动分配到首页的标签选择中）
    - 其他
categories: // 所属类别（会自动分配到首页的类别选择中）
    - 其他
---
xxxxxx
```
常用变量说明：

`title` :文章标题，放弃通过一级目录定义标题的方式，改在 Front Matter 中定义。

`date` :文章创建日期，格式 2019-08-08 或 2019-08-08 08:08:08。

`sidebar` :是否开启侧边栏。

`categories` :所属分类。

`tags` :所属标签。

`keys` : 所属标签。

`publish` :文章是否发布

## github发布
[官网](https://vuepress.vuejs.org/zh/guide/deploy.html#%E4%BA%91%E5%BC%80%E5%8F%91-cloudbase)

此时就大功告成了！撒花完结！ :tada::tada::tada: