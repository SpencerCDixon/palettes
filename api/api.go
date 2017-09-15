package api

import (
	"encoding/json"
	"net/http"

	"github.com/apex/log"
	lru "github.com/hashicorp/golang-lru"
	"github.com/pressly/chi"
	"github.com/spencercdixon/palettes/crawler"
)

// Config supplies infrastructure for the API
type Config struct {
	Logger log.Interface
	Cache  *lru.Cache
}

// Handler serves the palettes API
type Handler struct {
	*Config
	router chi.Router
}

// New creates a configured API handler
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

// Seed kick starts common crawls to populate the cache to increase performance
// on initial load.
func (h *Handler) Seed() {
	urls := []string{
		"https://facebook.com",
		"https://twitter.com",
		"https://nytimes.com",
		"https://google.com",
		"https://github.com",
		"https://youtube.com",
		"https://wikipedia.org",
		"https://baidu.com",
		"https://reddit.com",
		"https://amazon.com",
		"https://instagram.com",
		"https://uber.com",
		"https://airbnb.com",
		"https://linkedin.com",
		"https://ebay.com",
		"https://imgur.com",
		"https://bing.com",
		"https://twitch.tv",
		"https://tubmlr.com",
	}

	for _, u := range urls {
		go func(url string) {
			h.Logger.Infof("Seeding %s", u)
			c := crawler.New(h.Logger, h.Cache)
			c.Crawl(url)
		}(u)
	}
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

	c := &crawler.Crawler{Logger: h.Logger, Cache: h.Cache}

	results, err := c.Crawl(url)
	if err != nil {
		h.Logger.Error(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	top := results.Top(25)

	h.renderJSON(w, 200, top)
}
