import { Request, Response } from "express"
import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService"
import { container } from "tsyringe"

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { day, month, year } = request.query

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    )

    const appointments = await listProviderAppointments.execute({
      provider_id: user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    })

    return response.json(appointments)
  }
}
