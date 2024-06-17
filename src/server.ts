import express from "express"
import router from "../routes/gameRoutes.js"
import path from "path"

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static("public"))
app.use("/css", express.static(path.join(import.meta.dirname, "../node_modules/bootstrap/dist/css")))
app.use("/font", express.static(path.join(import.meta.dirname, "../node_modules/bootstrap-icons/font")))
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Server running on: http://localhost:${process.env.PORT}`)
})
