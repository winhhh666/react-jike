const path = require('path')

module.exports = {
    //webpack配置
    webpack:{
        
            //约定：使用@ 表示src文件所在路径
            alias: {
                '@':path.resolve(__dirname, 'src')
            }
        
    }
}