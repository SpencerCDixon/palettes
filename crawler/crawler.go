package crawler

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"os"
	"regexp"
	"sort"
	"strings"
	"sync"

	"github.com/apex/log"
	"github.com/hashicorp/golang-lru"
	"github.com/pkg/errors"
	"golang.org/x/net/html"
)

// ColorRe is used for determining if a string has a valid CSS color
var ColorRe = regexp.MustCompile(`(#([0-9a-f]{3}){1,2}|(rgba|hsla)\(\d{1,3}%?(,\s?\d{1,3}%?){2},\s?(1|0|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))`)

// ColorPair holds the results from searching a stylesheets contents
type ColorPair struct {
	Key   string `json:"color"` // Color code (hex, rgba, hsl)
	Value int    `json:"count"` // Amount of times it's shown up
}

func (cp ColorPair) String() string {
	return fmt.Sprintf("Color: %s, Amount: %d", cp.Key, cp.Value)
}

// ColorList makes sorting result sets easier
type ColorList []ColorPair

func (cl ColorList) Len() int           { return len(cl) }
func (cl ColorList) Swap(i, j int)      { cl[i], cl[j] = cl[j], cl[i] }
func (cl ColorList) Less(i, j int) bool { return cl[i].Value < cl[j].Value }

// ColorResults returns the color codes with their quantity.  We leverage the
// syncmap so multiple goroutines can be incrementing the values.
type ColorResults struct {
	lock sync.Mutex
	Map  map[string]int
}

// Top returns the top amt of colors found when parsing
func (cr *ColorResults) Top(amt int) ColorList {
	length := len(cr.Map)
	if length == 0 {
		return ColorList{}
	}

	cl := make(ColorList, length)
	i := 0
	for k, v := range cr.Map {
		cl[i] = ColorPair{k, v}
		i++
	}
	sort.Sort(sort.Reverse(cl))

	// if there's only a few just return them all
	if length < amt {
		return cl
	}
	return cl[:amt]
}

// NewColorResults is an initializer for color results
func NewColorResults() *ColorResults {
	return &ColorResults{
		lock: sync.Mutex{},
		Map:  map[string]int{},
	}
}

// Crawler is in charge of crawling for css
type Crawler struct {
	Logger log.Interface
	Cache  *lru.Cache
}

// New creates a Crawler with the proper configuration
func New(l log.Interface, c *lru.Cache) *Crawler {
	return &Crawler{Logger: l, Cache: c}
}

// Crawl is how we get CSS color codes
func (c Crawler) Crawl(url string) (*ColorResults, error) {
	ctx := c.Logger.WithField("url", url)

	cached, ok := c.Cache.Get(url)
	if ok {
		ctx.Infof("Found website %s in cache", url)
		if results, ok := cached.(*ColorResults); ok {
			ctx.Info("Returning color results")
			return results, nil
		}
	}

	ctx.Info("Starting crawl")
	results := NewColorResults()

	// do initial fetch of our website
	resp, err := http.Get(url)
	if err != nil {
		return nil, errors.Wrap(err, "initial fetch of website")
	}
	defer resp.Body.Close()

	z := html.NewTokenizer(resp.Body)
	var wg sync.WaitGroup

	for {
		tt := z.Next()

		if tt == html.StartTagToken || tt == html.SelfClosingTagToken {
			t := z.Token()

			isLink := t.Data == "link"
			if isLink {
				isStyle, href := isStylesheet(t.Attr)

				if isStyle {
					wg.Add(1)
					cssURL := resolveCSSURL(url, href)
					go c.fetchAndScan(cssURL, results, &wg)
				}
			}

			// inline style tag handle it right now
			isStyle := t.Data == "style"
			if isStyle {
				if tt = z.Next(); tt == html.TextToken {
					ctx.Info("Scanning style tag")
					scanForColors(strings.NewReader(z.Token().Data), results)
				}
			}
		}

		if tt == html.ErrorToken {
			ctx.Debug("End of parsing")
			break
		}
	}

	// Wait until all external CSS has been fetched and parsed 
	wg.Wait()

	// Add results to cache for future requests
	c.Cache.Add(url, results)

	return results, nil
}

func (c Crawler) fetchAndScan(url string, results *ColorResults, wg *sync.WaitGroup) {
	defer wg.Done()
	ctx := c.Logger.WithField("url", url)
	ctx.Info("Fetching css")
	resp, err := http.Get(url)
	if err != nil {
		ctx.Error("Error fetching")
		return
	}
	defer resp.Body.Close()
	scanForColors(resp.Body, results)
	ctx.Info("Done scanning")
}

// scanForColors takes in a reader and result set and counts how many times the
// different colors appear
func scanForColors(body io.Reader, cr *ColorResults) *ColorResults {
	cr.lock.Lock()
	defer cr.lock.Unlock()
	scanner := bufio.NewScanner(body)
	scanner.Split(bufio.ScanWords)
	for scanner.Scan() {
		word := scanner.Text()

		if ColorRe.MatchString(word) {
			matches := ColorRe.FindAllString(word, -1)
			for _, m := range matches {
				if _, ok := cr.Map[m]; !ok {
					cr.Map[m] = 1
				} else {
					cr.Map[m]++
				}
			}
		}
	}
	return cr
}

//------------------
// Utility Functions
//------------------

// resolveCSSURL finds the proper href to use to fetch the stylesheet
func resolveCSSURL(url string, href string) string {
	// is using relative protocol idiom.  Default add https
	if strings.HasPrefix(href, "//") {
		return fmt.Sprintf("https:%s", href)
		// is a stylesheet that lives somewhere else just return the FQDN
	} else if strings.HasPrefix(href, "http") {
		return href
		// we have a relative path concat the href to the original url
	} else {
		return url + href
	}
}

// isStylesheet determines if the Link html attribute is actually a css
// stylesheet
func isStylesheet(attrs []html.Attribute) (bool, string) {
	isStyle := false
	href := ""
	for _, a := range attrs {
		if a.Key == "rel" && a.Val == "stylesheet" {
			isStyle = true
		}
		if a.Key == "href" {
			href = a.Val
		}
	}
	return isStyle, href
}

// isTest is used to be able to use mock data instead of making HTTP requests
// while working on the airplane :-)
func isTest() bool {
	return os.Getenv("GO_ENV") == "test"
}
