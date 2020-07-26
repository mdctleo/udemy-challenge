export let BASE_API = ""
if (process.env.NODE_ENV !== 'production') {
    BASE_API = "http://127.0.0.1:5000"
} else {
    BASE_API = "/api"
}
