package server

import (
	"crud/configs"
	"crud/routes"
	"log"
	"net/http"
)

// this func is simply for starting the server + create our handler so that we have the freedom
func StartServer() {
	// start new handler
	mux := http.NewServeMux()
	// routes handle
	routes.RoutesHandle(mux)
	// config of the server
	serve := &http.Server{
		Addr: configs.Port,
		Handler: mux,
	}
	// print the server so acces it easy 
	log.Println("Server Listening on http://localhost"+configs.Port)
	// listen and serve + if error log the error
	log.Fatal(serve.ListenAndServe())
}
