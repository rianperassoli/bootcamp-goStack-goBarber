import AppError from "@shared/errors/AppError"
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository"
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository"
import CreateAppointmentService from "./CreateAppointmentService"

let fakeAppointmentRepository: FakeAppointmentsRepository
let fakeNotificationRepository: FakeNotificationsRepository
let createAppointment: CreateAppointmentService

describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    fakeNotificationRepository = new FakeNotificationsRepository()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationRepository
    )
  })

  it("should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: "provider_id",
      user_id: "user_id",
    })

    expect(appointment).toHaveProperty("id")
    expect(appointment.provider_id).toBe("provider_id")
  })

  it("should not be able to create two appointments on the same time", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointmentDate = new Date(2020, 4, 12, 13)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "provider_id",
      user_id: "user_id",
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "provider_id",
        user_id: "user_id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create an appointment on a past day", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: "provider_id",
        user_id: "user_id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: "same_id",
        user_id: "same_id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create an appointment before 8am and after 5pm", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 9, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        provider_id: "user_id",
        user_id: "provider_id",
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 19),
        provider_id: "user_id",
        user_id: "provider_id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
