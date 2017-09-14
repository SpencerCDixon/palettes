// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>
//

package cmd

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"github.com/spencercdixon/palettes/api"
	"github.com/spf13/cobra"
)

// serverCmd represents the server command
var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Starts API",
	Run: func(cmd *cobra.Command, args []string) {
		// TODO: figure out real logger
		logger := log.New(os.Stdout, "", log.LstdFlags|log.LUTC)

		router := chi.NewRouter()
		router.Use(middleware.RequestID)
		router.Use(middleware.RealIP)
		router.Use(middleware.RequestLogger(&middleware.DefaultLogFormatter{Logger: logger}))
		router.Use(middleware.Recoverer)
		router.Use(middleware.Heartbeat("/ping"))

		apiHandler := api.New()
		router.Mount("/api", apiHandler)

		fmt.Println("Listening on 8080")
		http.ListenAndServe(":4001", router)
	},
}

func init() {
	RootCmd.AddCommand(serverCmd)
}
