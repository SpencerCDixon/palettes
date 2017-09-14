package crawler

import (
	"testing"

	"strings"

	"golang.org/x/net/html"
)

func TestUrlResolver(t *testing.T) {
	type testCase struct {
		url      string
		href     string
		expected string
		name     string
	}
	type testCases []testCase

	cases := testCases{
		testCase{
			url:      "https://launchacademy.com",
			href:     "/assets/app.css",
			expected: "https://launchacademy.com/assets/app.css",
			name:     "with relative path",
		},
		testCase{
			url:      "https://launchacademy.com",
			href:     "http://someothersite.com/assets/app.css",
			expected: "http://someothersite.com/assets/app.css",
			name:     "with full hrefs",
		},
		testCase{
			url:      "https://launchacademy.com",
			href:     "//othersite.com/assets/app.css",
			expected: "https://othersite.com/assets/app.css",
			name:     "with '//' convention",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			resolved := resolveCSSURL(tc.url, tc.href)
			if resolved != tc.expected {
				t.Errorf("Expected: %s. Got: %s", tc.expected, resolved)
			}
		})
	}
}

func TestIsStylesheet(t *testing.T) {
	cases := []struct {
		name  string
		attrs []html.Attribute
		ok    bool
		href  string
	}{
		{
			name: "returns href when it is a stylesheet",
			attrs: []html.Attribute{
				html.Attribute{Key: "rel", Val: "stylesheet"},
				html.Attribute{Key: "href", Val: "/assets/styles.css"},
			},
			ok:   true,
			href: "/assets/styles.css",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			ok, href := isStylesheet(tc.attrs)
			if ok != tc.ok {
				t.Errorf("Expected %v. Got: %v", tc.ok, ok)
			}
			if ok {
				if tc.href != href {
					t.Errorf("Expected %s. Got: %s", tc.href, href)
				}
			}
		})
	}
}

func TestScanForColors(t *testing.T) {
	cases := []struct {
		name     string
		expected map[string]int
		input    string
	}{
		{
			name:     "works with hex codes",
			expected: map[string]int{"#000000": 2},
			input:    "#000000\n#000000",
		},
		{
			name:     "works with multiple color values",
			expected: map[string]int{"#000000": 2, "#eee": 3},
			input:    "#000000\n#000000\n#eee\n#eee\n#eee",
		},
		{
			name:     "works with rgba colors",
			expected: map[string]int{"rgba(0,0,0,0.5)": 1},
			input:    "body { background: rgba(0,0,0,0.5) }",
		},
		{
			name:     "works with hsl colors",
			expected: map[string]int{"hsl(0,0,0)": 1},
			input:    "body { background: hsl(0,0,0) }",
		},
		{
			name:     "works with rgb colors",
			expected: map[string]int{"rgb(0,0,0)": 1},
			input:    "body { background: rgb(0,0,0) }",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			cr := NewColorResults()
			body := strings.NewReader(tc.input)
			scanForColors(body, cr)

			for color, expected := range tc.expected {
				got := cr.Map[color]
				if got != expected {
					t.Errorf("Expected: %d, got: %d, for: %s", expected, got, color)
				}
			}
		})
	}
}
