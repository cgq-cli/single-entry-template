module.exports = {
    presets: [
        ['@vue/cli-plugin-babel/preset', {
          polyfills: [
            'es.promise',
            'es.symbol'
          ]
        }]
    ],
    "plugins": [
        // [
        //     'import',
        //     {
        //       libraryName: 'vant-green',
        //       libraryDirectory: 'es',
        //       // 指定样式路径
        //       style: name => `${name}/style/less`
        //     },
        //     'vant-green'
        // ],
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            },
            "syntax-dynamic-import"
        ]
    ]
};
  