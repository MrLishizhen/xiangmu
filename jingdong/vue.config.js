//这个文件用来存放我们自定义的开发配置，这个文件导出的配置回合默认配置合并
module.exports={
        devServer:{//配置请求代理
                 proxy:{
                         '/':{//配置请求代理
                                 target: 'http://localhost:3000'
                         }
                 }

        }
};