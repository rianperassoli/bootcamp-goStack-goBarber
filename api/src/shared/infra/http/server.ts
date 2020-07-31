import "reflect-metadata"
import "dotenv/config"

import express, { Request, Response, NextFunction } from "express"
import "express-async-errors"
import { errors } from "celebrate"
import cors from "cors"
import uploadConfig from "@config/upload"
import AppError from "@shared/errors/AppError"
import rateLimiter from "./middlewares/rateLimiter"
import routes from "./routes"
import "@shared/infra/typeorm"
import "@shared/container"

const app = express()

app.use(rateLimiter)
app.use(express.json())
app.use(cors())

app.use("/files", express.static(uploadConfig.uploadsFolder))

app.use(routes)

app.use(errors())

// tratamento global de erros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    })
  }

  console.error(err)

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

app.get("/", (request, response) => {
  const teste = {
    babba: 1,
    spa: 2,
    asd: 2,
  }

  return response.json({ message: "running", teste })
})

app.listen(3333, () => {
  console.log("server started on port 3333")
})
