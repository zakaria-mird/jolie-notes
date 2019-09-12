type LoginRequest: void {
  .username: string
  .password: string
}

type LoginResponse: void {
  .success: bool
  .auth_token: string
}

type VerifyTokenRequest:void {
  .token: string
}

type VerifyTokenResponse: void {
  .success: bool
  .username: string
}

interface AccountsInterface {
  RequestResponse:
    login(LoginRequest)(LoginResponse),
    verifyToken(VerifyTokenRequest)(VerifyTokenResponse)
}
