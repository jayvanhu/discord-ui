package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

var queryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return "", nil
			},
		},
		"users":         nil,
		"conversations": nil,
		"servers":       nil,
		"messages":      nil,
	},
})

var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query: queryType,
})

func main() {
	gqlHandler := handler.New(&handler.Config{
		Schema:     &schema,
		Pretty:     true,
		GraphiQL:   true,
		Playground: true,
	})

	users := http.NewServeMux()
	users.HandleFunc("/users/", func(res http.ResponseWriter, req *http.Request) {
		payload := []byte("users")
		res.Write(payload)
	})

	api := http.NewServeMux()
	// TODO the auto trailing slash behavior isn't working properly with strip prefix
	api.Handle("/api/", http.StripPrefix("/api", users))

	api.HandleFunc("/api/foo/", func(w http.ResponseWriter, r *http.Request) {
		payload := []byte("foo")
		w.Write(payload)
	})

	api.Handle("/graphql/", gqlHandler)

	server := &http.Server{
		Addr:    ":8080",
		Handler: api,
	}

	fmt.Println("Listening")
	log.Fatal(server.ListenAndServe())
}
