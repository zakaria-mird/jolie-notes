type EncodeTokenRequest: void {
  .secret: string
  .username: string
}

type EncodeTokenResponse: void {
  .token: string
}

type DecodeTokenRequest: void {
  .secret: string
  .token: string
}

type DecodeTokenResponse: void {
  .success: string
  .username: string
}

interface JWTokensInterface {
  RequestResponse: 
    EncodeToken(EncodeTokenRequest)(EncodeTokenResponse),
    DecodeToken(DecodeTokenRequest)(DecodeTokenResponse)
}
