package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/apex/log"
	"github.com/apex/log/handlers/cli"
	"github.com/pressly/chi"
	"github.com/spencercdixon/palettes/crawler"
)

type Handler struct {
	router chi.Router
}

func New() *Handler {
	h := &Handler{router: chi.NewRouter()}
	h.router.Post("/palette", h.handlePalette)
	return h
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.router.ServeHTTP(w, r)
}

func (h *Handler) renderJSON(w http.ResponseWriter, status int, data interface{}) {
	jsonData, err := json.Marshal(data)

	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(jsonData)
}

func (h *Handler) handlePalette(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error parsing form.", http.StatusBadRequest)
		return
	}

	url := r.Form.Get("url")
	fmt.Println("Url: " + url)

	log.SetHandler(cli.Default)
	log.SetLevel(log.DebugLevel)

	ctx := log.WithFields(log.Fields{
		"app": "palletes",
		"env": "development",
	})

	c := &crawler.Crawler{ctx}
	results, err := c.Crawl(url)
	if err != nil {
		log.Fatal(err.Error())
	}

	top := results.Top(25)

	h.renderJSON(w, 200, top)
}
