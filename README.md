# frist-test

#配置文件
webpack.base.config.js 文件是生成第三方的js压缩文件和自己写的压缩js文件，所以在首页，只要导入这些压缩的js文件就可以了；
webpack.dev.config.js  网页掐头去尾，优化运行程序；
webpack.prod.config.js  用来生成压缩后的js文件的hash名称；

.babelrc 转换es6到es5的Babel的配置文件；
.eslintrc 统一代码风格，运行或测试的时候编译报错；
.gitignore 用来上传git上时，不需要上传的一些测试文件之类；

package.json 是列举出这个项目所用的包，用npm install可直接安装这个文件中所有的包；以及启动start服务，dev开发服务等；
index.js 是用来启动server端的app；app会调用views\index.pug视图；
main是从client前端reader()来的；

#运行程序文件
server/app.js 用来路径、安全、视图、压缩、解析。。。设置；还有启动服务的一些设置；上面运行过后可能出现的报错设置；
app.js从模板路径进去，引用了pug模板；
server/views是定义的基本视图模板；
server/routes/index.js 来区分路由，api是版本的路由；web是网页端请求数据的路由；

启动服务后，会运行bin文件夹的www文件
www 设置监听端口

client 前端的东西
client/index.jsx 渲染./components/Todo.jsx的内容
client\todo\components 是组件的内容
client\todo\common\res是依赖的最基本的variables.less文件
client\todo\common\vendor.js 是要使用的第三方的js的集合，直接import

dist 是要发布的内容，主要是public

#运行
cmd到cd 本文件夹，
npm install;
npm run dev; http://localhost:8888/;
npm run build;是用webpack.prod.config.js来hash assets.json的压缩内容.

