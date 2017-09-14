// Copyright © 2017 Spencer Dixon <spencercdixon@gmail.com>
//

package cmd

import (
	"fmt"
	"net/http"
	"os"

	"github.com/apex/log"
	"github.com/apex/log/handlers/json"
	"github.com/pressly/chi"
	"github.com/pressly/chi/middleware"
	"github.com/spencercdixon/palettes/api"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// serverCmd represents the server command
var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "Starts API",
	Args:  cobra.NoArgs,
	Run: func(cmd *cobra.Command, args []string) {
		// Fetch configuration variables
		env := viper.GetString("go_env")
		port := viper.GetString("port")

		// Set up JSON structured logging
		log.SetHandler(json.New(os.Stderr))
		ctx := log.WithFields(log.Fields{
			"app": "palettes",
			"env": env,
		})

		// Create our app server with useful middleware
		router := chi.NewRouter()
		router.Use(middleware.RequestID)
		router.Use(middleware.RealIP)
		router.Use(middleware.Recoverer)
		router.Use(middleware.Heartbeat("/ping"))

		// Create and mount our API
		config := &api.Config{
			Logger: ctx,
		}
		apiHandler := api.New(config)
		router.Mount("/api", apiHandler)

		// Start listening
		fmt.Println("Listening on: " + port)
		err := http.ListenAndServe(":"+port, router)
		ctx.Error(err.Error())
	},
}

func init() {
	RootCmd.AddCommand(serverCmd)
	serverCmd.Flags().String("port", "4000", "Port to run palettes server on")
	serverCmd.Flags().String("go_env", "development", "Environment to run the server in")
	viper.BindPFlag("port", serverCmd.Flags().Lookup("port"))
	viper.BindPFlag("go_env", serverCmd.Flags().Lookup("go_env"))
}
