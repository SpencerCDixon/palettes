// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>
//

package cmd

import (
	"fmt"

	"github.com/apex/log"
	"github.com/apex/log/handlers/cli"
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
			"env": "development",
		})
		crawl := &crawler.Crawler{
			Logger: ctx,
		}
		results, _ := crawl.Crawl("https://nytimes.com")
		top := results.Top(25)
		for _, c := range top {
			fmt.Println(c)
		}
	},
}

func init() {
	RootCmd.AddCommand(crawlCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// crawlCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// crawlCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
