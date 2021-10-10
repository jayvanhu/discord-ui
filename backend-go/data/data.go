package data

///
type Message struct {
	id     int32
	sender int32
	body   string
}

func CreateMessage() {
	//
}

func DeleteMessage() {
	//
}

///
type Conversation struct {
	id           int32
	participants []int32
}
