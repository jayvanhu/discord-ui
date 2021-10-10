package util

import (
	"encoding/json"
)

func JsonStringify(data interface{}) string {
	res, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}
	return string(res)
}

func JsonParse(jsonString string) interface{} {
	var data interface{}
	err := json.Unmarshal([]byte(jsonString), &data)
	if err != nil {
		panic(err)
	}
	return data
}
