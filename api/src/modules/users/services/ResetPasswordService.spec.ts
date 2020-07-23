import AppError from "@shared/errors/AppError"
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository"
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider"
import ResetPasswordService from "./ResetPasswordService"

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeHashProvider: FakeHashProvider
let resetPassword: ResetPasswordService

describe("ResetPasswordService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    )
  })

  it("should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash")

    await resetPassword.execute({
      token,
      password: "123123123",
    })

    const userUpdated = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith("123123123")
    expect(userUpdated?.password).toBe("123123123")
  })

  it("should not be able to reset the password with non-existing token", async () => {
    await expect(
      resetPassword.execute({
        token: "non-existing token",
        password: "asdasd",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to reset the password with non-existing user", async () => {
    const { token } = await fakeUserTokensRepository.generate(
      "non-existing user"
    )

    await expect(
      resetPassword.execute({
        token,
        password: "asdasd",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to reset the password if passed more than 2 hours", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPassword.execute({
        token,
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
