package data

import (
	"context"
	"goserver/util"
	"strconv"

	"github.com/go-redis/redis/v8"
)

// TODO can i test this using go to create a redis docker container? see gruntwork docker code

var ctx = context.Background()
var rdb = redis.NewClient(&redis.Options{
	Addr:     "localhost:todo",
	Password: "",
	DB:       0,
})

func Redis() {
	//
}

// todo
func RedisSet(key string, val interface{}) {
	err := rdb.Set(ctx, key, val, 0).Err()
	util.HandleErr(err)
}

// todo
func RedisSetInt(key int, val interface{}) {
	err := rdb.Set(ctx, strconv.Itoa(key), val, 0).Err()
	util.HandleErr(err)
}

// todo
func RedisGet(key string) interface{} {
	val, err := rdb.Get(ctx, key).Result()
	if err == redis.Nil {
		return nil
	} else if err != nil {
		util.HandleErr(err)
		return nil
	} else {
		return val
	}
}

// todo
func RedisGetInt(key int) interface{} {
	val, err := rdb.Get(ctx, strconv.Itoa(key)).Result()
	if err == redis.Nil {
		return nil
	} else if err != nil {
		util.HandleErr(err)
		return nil
	} else {
		return val
	}
}
