import Appointment from "../entities/Appointment"
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO"

export default interface IAppointmentsReposotory {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
