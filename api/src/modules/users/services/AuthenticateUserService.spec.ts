import AppError from "@shared/errors/AppError"
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository"
import CreateUserService from "./CreateUserService"
import AuthenticateUserService from "./AuthenticateUserService"

describe("AuthenticateUser", () => {
  it("should be able to authenticate a user", async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(fakeUsersRepository)
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository)

    await createUser.execute({
      name: "John Doe",
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    const response = await authenticateUser.execute({
      email: "johndoe@gmaul.com",
      password: "123123",
    })

    expect(response).toHaveProperty("token")
  })
})
