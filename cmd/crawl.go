// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>

package cmd

import (
	"fmt"

	"github.com/apex/log"
	"github.com/apex/log/handlers/cli"
	lru "github.com/hashicorp/golang-lru"
	"github.com/spencercdixon/palettes/crawler"
	"github.com/spf13/cobra"
)

// crawlCmd represents the crawl command
var crawlCmd = &cobra.Command{
	Use:   "crawl",
	Short: "Let's you crawl for colors",
	Run: func(cmd *cobra.Command, args []string) {
		log.SetHandler(cli.Default)
		log.SetLevel(log.DebugLevel)

		ctx := log.WithFields(log.Fields{
			"app": "palletes",
			"env": "cli",
		})
		cache, err := lru.New(100)
		if err != nil {
			log.Fatal(err.Error())
		}
		crawl := crawler.New(ctx, cache)
		results, err := crawl.Crawl(args[0])
		if err != nil {
			ctx.Error(err.Error())
		}
		top := results.Top(25)
		for _, c := range top {
			fmt.Println(c)
		}
	},
}

func init() {
	RootCmd.AddCommand(crawlCmd)
}
