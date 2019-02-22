const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');     //引入html压缩模块
const cleanCSS = require('gulp-clean-css');  //引入css压缩模块
const uglify = require('gulp-uglify');       //引入js压缩模块
const imagemin = require('gulp-imagemin');   //引入图片压缩模块
const connect = require('gulp-connect');     //引入连接服务器插件模块
const babel = require('gulp-babel');         //引入es6转es5插件模块
const rev = require('gulp-rev');             //引入生成文件名的hash值


gulp.task('default', function () {
  // 将你的默认的任务代码放在这
  console.log("默认任务");
});


//开启服务器任务
gulp.task('connect',function(){
    connect.server();     //开启服务器
    console.log("连接服务器");
})

//压缩css任务
gulp.task('minicss', function () {
    gulp.src([,'app/**/*.css'])                //查找app目录下所有css文件
    .pipe(cleanCSS({ compatibility: 'ie8' })) //压缩css文件
    .pipe(rev())         //生成hash值
    .pipe(gulp.dest('dist/'))              //把压缩后的文件输出到dist文件目录下面
    .pipe(connect.reload())    //连接服务器
    console.log("压缩css")
});


//压缩html任务
gulp.task('minihtml', function () {
    //查找app目录下所有html文件
    gulp.src(['rev/*json','app/**/*.html'])       
    .pipe(htmlmin({
        collapseWhitespace: true,
        minifyJS: true,             //配置文件 压缩html页面中的JS
        minifyCSS: true             //配置文件 压缩html页面中的CSS
    })) //压缩html
    .pipe(gulp.dest('dist'))   //把压缩的html文件放到dist文件中
  console.log("压缩html");
});

//压缩js任务,并且把js的es6转为es5语法
gulp.task('minijs', function () {
    gulp.src('app/**/*.js')       //查找app目录下所有js文件
    .pipe(babel({
        presets: ['@babel/env']   //ES6转为ES5语法
    }))
    .pipe(uglify())             //压缩js文件
    .pipe(gulp.dest('dist/'));  //把压缩的文件放入到dist目录中
  console.log("压缩js");
});


//压缩图片任务
gulp.task('miniimg', function(){
    gulp.src('app/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
    console.log("压缩图片啊");
});


//监听文件,如果发生改变就重新压缩
gulp.task('watch',function(){
    gulp.watch('app/**/*.html',['minihtml']); //监听html文件
    gulp.watch('app/**/*.css',['minicss'])    //监听css文件
    gulp.watch('app/**/*.js',['minijs'])      //监听js文件
    gulp.watch('app/images/*',['miniimg'])    //监听图片文件

})

gulp.task('all', ['minicss', 'minihtml', 'minijs','miniimg','connect'], function () {
  console.log("压缩任务完成");
});