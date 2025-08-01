package rendrers

import (
	"crud/configs"
	"net/http"
	"text/template"

)

func PageRender(w http.ResponseWriter, temp string, status int, data any) {
	templateCompressed, errParsing := template.ParseFiles(configs.ViewsPath+"layout.html",configs.PagesPath+temp)
	if errParsing != nil {
		w.WriteHeader(status)
		w.Write([]byte("Error Parsing files" + errParsing.Error()))
		return
	}
	templateCompressed.ExecuteTemplate(w , "Layout", data)
}
