import AppError from "@shared/errors/AppError"
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import CreateUserService from "./CreateUserService"
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider"

describe("CreateUser", () => {
  it("should be able to create a new user", async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    expect(user).toHaveProperty("id")
  })

  it("should not be able to create a new user with same email from another", async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    await createUser.execute({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    expect(
      createUser.execute({
        name: "John Doe",
        email: "johndoe@gmaul.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})