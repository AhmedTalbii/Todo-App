package rendrers

import (
	"crud/configs"
	"net/http"
	"text/template"

)

func PageRender(w http.ResponseWriter, temp string, status int, data any) {
	templateCompressed, errParsing := template.ParseFiles(configs.ViewsPath+"layout.html",configs.PagesPath+temp)
	if errParsing != nil {
		w.Write([]byte("Error Parsing files"))
		w.WriteHeader(status)
		return
	}
	templateCompressed.ExecuteTemplate(w , "Layout", data)
}
