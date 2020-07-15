import { container } from "tsyringe"

import "./providers"
import "@modules/users/providers"

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"
import IAppointmentsReposotory from "@modules/appointments/repositories/IAppointmentsRepository"

import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository"
import IUsersRepository from "@modules/users/repositories/IUsersRepository"

container.registerSingleton<IAppointmentsReposotory>(
  "AppointmentsRepository",
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)
