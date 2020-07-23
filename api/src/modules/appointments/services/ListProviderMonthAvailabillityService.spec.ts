import ListProviderMonthAvailabillityService from "./ListProviderMonthAvailabillityService"
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository"

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailabillityService: ListProviderMonthAvailabillityService

describe("ListProviderMonthAvailabillity", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderMonthAvailabillityService = new ListProviderMonthAvailabillityService(
      fakeAppointmentsRepository
    )
  })

  it("should be able to list the month availability from provider", async () => {
    await fakeAppointmentsRepository.create({
      provider_id: "provider",
      date: new Date(2020, 4, 20, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "provider",
      date: new Date(2020, 4, 20, 10, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "provider",
      date: new Date(2020, 4, 21, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailabillityService.execute({
      provider_id: "provider",
      year: 2020,
      month: 5,
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, availability: true },
        { day: 20, availability: true },
        { day: 21, availability: true },
        { day: 22, availability: true },
      ])
    )
  })
})
