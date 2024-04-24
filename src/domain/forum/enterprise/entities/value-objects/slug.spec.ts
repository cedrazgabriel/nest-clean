import { expect, test } from 'vitest'
import { Slug } from './slug'

test('it should be able to create a new slug from text ', () => {
  const slug = Slug.createFromText('Teste De Exemplo')

  expect(slug.value).toEqual('teste-de-exemplo')
})
