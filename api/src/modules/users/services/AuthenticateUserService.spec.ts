import AppError from "@shared/errors/AppError"
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import CreateUserService from "./CreateUserService"
import AuthenticateUserService from "./AuthenticateUserService"
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider"

describe("AuthenticateUser", () => {
  it("should be able to authenticate a user", async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    const response = await authenticateUser.execute({
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    expect(response).toHaveProperty("token")
    expect(response.user).toEqual(user)
  })
})
