var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var babelify = require("babelify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");

// crea una nueva tarea
gulp.task("styles", function(){
	// src , objeto de la tarea
	gulp
	.src("index.scss")
	// pipes son los pasos a seguir, que llama pipes
	.pipe(sass()) // retorna  
	// donde lo quiero poner
	.pipe(rename("app.css"))
	.pipe(gulp.dest("public"));
});

//otra tarea..
gulp.task("assets", function(){
	//glob ( apuntar a la carpeta ) y los archivos indicados
	gulp
	.src("assets/*")
	.pipe(gulp.dest("public"));
});


//otra tarea..
// con babelify puedo usar babel dentro de babelify
gulp.task("script", function(){
	// broserify este es tu archivo
	browserify("./src/index.js")
	// aplicale 
	.transform(babelify,{presets:["es2015"]})
	.bundle() // leer mas
	// intermediario entre gulp y broserify
	// vynil source
	.pipe(source("index.js"))
	.pipe(gulp.dest("public"));
});


// dejar por defecto unas tareas
gulp.task("default", ["script"]);
