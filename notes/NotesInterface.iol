type AddRequest: void {
  .token: string
  .title: string
  .content: string
}

type AddResponse: void {
  .success: bool
  .message: string
}

type DeleteRequest: void {
  .token: string
  .noteId: int
}

type DeleteResponse: void {
  .success: bool
  .message: string
}

type ListRequest: void {
  .token: string
}

type Note: void {
  .noteId: int
  .title: string
  .content: string
}

type ListResponse: void {
  .success: bool
  .notes[0,*]: Note
}

interface NotesInterface {
  RequestResponse:
    add(AddRequest)(AddResponse),
    delete(DeleteRequest)(DeleteResponse),
    list(ListRequest)(ListResponse)
}
