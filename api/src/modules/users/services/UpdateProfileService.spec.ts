import AppError from "@shared/errors/AppError"
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import UpdateProfileService from "./UpdateProfileService"
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider"

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it("should be able to update the profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "Jhon Jhon",
      email: "johndoe@gmail.com",
    })

    expect(updatedUser.name).toBe("Jhon Jhon")
    expect(updatedUser.email).toBe("johndoe@gmail.com")
  })

  it("should not be able to change to another user email", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    const user = await fakeUsersRepository.create({
      name: "E-mail duplicated",
      email: "duplicated@gmail.com",
      password: "asdasd",
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "E-mail duplicated verification",
        email: "johndoe@gmaul.com",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "Jhon Jhon",
      email: "johndoe@gmail.com",
      old_password: "123123",
      password: "123456",
    })

    expect(updatedUser.password).toBe("123456")
  })

  it("should not be able to update the password without old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "Jhon Jhon",
        email: "johndoe@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to update the password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "Jhon Jhon",
        email: "johndoe@gmail.com",
        old_password: "wrong-old-password",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
