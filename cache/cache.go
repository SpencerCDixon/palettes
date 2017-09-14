package cache

import (
	"github.com/hashicorp/golang-lru"
)

// ColorCache is an LRU cache for saving the crawled CSS colors of various
// websites.  Results are stored on the url that was searched
type ColorCache struct {
	cache *lru.Cache
}

func New(size int) (*ColorCache, error) {
	cache, err := lru.New(size)
	if err != nil {
		return nil, err
	}

	return &ColorCache{cache}, nil
}
