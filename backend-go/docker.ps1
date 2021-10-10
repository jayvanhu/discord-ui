docker run --rm -it `
	-v ${pwd}:/go/app `
	-p 8080:8080 `
	golang:1.17-alpine `
	/bin/sh -c "cd app && /bin/sh"
