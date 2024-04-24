import { WatchedList } from './watched-lits'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('watched list tests', () => {
  test('Deve ser possível criar uma watched list com initial items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    expect(list.currentItems).toHaveLength(3)
  })

  test('Deve ser possível adicionar items novos na lista', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4])
  })

  test('Deve ser possível remover items na lista', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([2])
  })

  test('Deve ser possível adicionar um item mesmo que ele já tenha sido removido anteriormente', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)
    list.add(2)

    expect(list.currentItems).toHaveLength(3)

    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  test('Deve ser possível remover um item mesmo que ele já tenha sido removido anteriormente', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)
    list.remove(4)

    expect(list.currentItems).toHaveLength(3)

    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  test('Deve ser possível atualizar um item da watched list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.update([1, 3, 5])

    expect(list.getRemovedItems()).toEqual([2])
    expect(list.getNewItems()).toEqual([5])
    expect(list.currentItems).toHaveLength(3)
  })
})
