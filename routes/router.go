package routes

import (
	"crud/controllers"
	"net/http"
)

func RoutesHandle(mux *http.ServeMux) {
	mux.HandleFunc("/", controllers.TodoController)
	mux.Handle("/statics/", http.StripPrefix("/statics/",http.FileServer(http.Dir("statics"))))
}
