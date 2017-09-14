package api

import (
	"encoding/json"
	"net/http"

	"github.com/apex/log"
	"github.com/pressly/chi"
	"github.com/spencercdixon/palettes/crawler"
)

// Config supplies infrastructure for the API
type Config struct {
	Logger log.Interface
}

// Handler serves the palettes API
type Handler struct {
	*Config
	router chi.Router
}

func New(c *Config) *Handler {
	h := &Handler{Config: c, router: chi.NewRouter()}
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

//---------
// Handlers
//---------

func (h *Handler) handlePalette(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error parsing form.", http.StatusBadRequest)
		return
	}

	url := r.Form.Get("url")

	c := &crawler.Crawler{h.Logger}

	results, err := c.Crawl(url)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	top := results.Top(25)

	h.renderJSON(w, 200, top)
}
