module.exports = {
  base: "/",
  plugins: [
    ['vuepress-plugin-right-anchor', {
      expand: {
        trigger: 'click',
        clickModeDefaultOpen: true
      },
    }]
  ],
  locales: {
    '/': {
      label: 'English',
      lang: 'en-US',
      title: 'OpenComputers Document',
    },
    '/cn/': {
      lang: 'zh-CN',
      title: 'OpenComputers 中文文档',
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        nav: [
          { text: "Home", link: "/" },
          { text: "Official Document", link: "https://ocdoc.cil.li/" },
          { text: "GitHub", link: "https://github.com/MightyPirates/OpenComputers" }
        ]
      },
      '/cn/': {
        selectText: '语言',
        label: '简体中文',
        ariaLabel: '语言',
        nav: [
          { text: "首页", link: "/" },
          { text: "官方文档", link: "https://ocdoc.cil.li/" },
          { text: "GitHub", link: "https://github.com/MightyPirates/OpenComputers" }
        ]
      }
    },
    search: true,
    searchMaxSuggestions: 5,
    smoothScroll: true,
    lastUpdated: "Last edited",
    displayAllHeaders: false,
    sidebarDepth: 2,
    activeHeaderLinks: true
  },
};
