package controllers

import (
	"crud/controllers/rendrers"
	"net/http"
)

func TodoController(w http.ResponseWriter, r *http.Request) {
	rendrers.PageRender(w, "todoPage.html", 200, "")
}
