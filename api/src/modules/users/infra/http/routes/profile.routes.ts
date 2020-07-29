import { Router } from "express"
import { celebrate, Segments, Joi } from "celebrate"

import ensureAutheticated from "../middlewares/ensureAuthenticated"

import ProfileController from "../controllers/ProfileController"

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAutheticated)

profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref("password")),
    },
  }),
  profileController.update
)
profileRouter.get("/", profileController.show)

export default profileRouter
