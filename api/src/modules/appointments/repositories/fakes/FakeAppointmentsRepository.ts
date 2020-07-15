import { uuid } from "uuidv4"
import { isEqual } from "date-fns"

import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentsRepository"
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO"
import Appointment from "@modules/appointments/entities/Appointment"

class FakeAppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFinded = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    )

    return appointmentFinded
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }
}

export default FakeAppointmentsRepository
