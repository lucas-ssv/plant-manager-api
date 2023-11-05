import { ValidateUuidAdapter } from '@/infra'
import { faker } from '@faker-js/faker'

describe('ValidateUuidAdapter', () => {
  it('should return false if value provided is not uuid', () => {
    const sut = new ValidateUuidAdapter()

    const isValid = sut.validate(faker.lorem.word())

    expect(isValid).toBe(false)
  })

  it('should return true if value provided is uuid', () => {
    const sut = new ValidateUuidAdapter()

    const isValid = sut.validate(faker.string.uuid())

    expect(isValid).toBe(true)
  })
})
