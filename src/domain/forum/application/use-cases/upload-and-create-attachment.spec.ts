import { FakeUploader } from 'test/storage/fake-uploader'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment'
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachment-repository'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type-error'

let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let fakeUploader: FakeUploader
let sut: UploadAndCreateAttachmentUseCase

describe('Upload and create attachment tests ', () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository()
    fakeUploader = new FakeUploader()
    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentRepository,
      fakeUploader,
    )
  })

  test('Deve ser possível fazer um upload e criar um arquivo', async () => {
    const result = await sut.execute({
      fileName: 'any_file_name.png',
      fileType: 'image/png',
      body: Buffer.from('any_buffer'),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({ fileName: 'any_file_name.png' }),
    )
  })

  test('Não deve ser possível criar um arquivo com o tipo inválido', async () => {
    const result = await sut.execute({
      fileName: 'any_file_name.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})
