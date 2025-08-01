FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY . .

RUN go mod download

RUN go build -o main main.go

FROM alpine:latest

WORKDIR /build

COPY --from=builder /app/main .
COPY --from=builder /app/views ./views
COPY --from=builder /app/statics ./statics

CMD [ "./main" ]