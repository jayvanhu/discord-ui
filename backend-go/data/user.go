package data

type User struct {
	Id       int
	Name     string
	Email    string
	Password string
}

var (
	userIdCounter int = 0
)

func UserRepository() {
	//
}

func CreateUser(name, email, password string) {
	userIdCounter++
	user := User{
		Id:       userIdCounter,
		Name:     name,
		Email:    email,
		Password: password,
	}
	payload := 123
	RedisSetInt(user.Id, payload)
}

func GetUser(id int) User {
	payload := RedisGetInt(id)
	result := payload.(User)
	return result
}

func UpdateUser(id int32) {
	//
}
