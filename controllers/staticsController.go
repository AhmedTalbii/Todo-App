package controllers

import (
	"net/http"
	"strings"
)

func StaticsController(w http.ResponseWriter, r *http.Request) {
	if strings.HasSuffix(r.URL.Path, ".css") {
		http.StripPrefix("/statics/", http.FileServer(http.Dir("statics"))).ServeHTTP(w, r)
	}
	w.Write([]byte("cant serve file : "+ r.URL.Path))
}
