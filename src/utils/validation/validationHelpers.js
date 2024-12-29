export const findItemOrError = (items, id, idField = 'id') => {
    const matchedItemIndex = items.findIndex(item => item[idField] == id)

    if (matchedItemIndex === -1)
        return { error: `No item with id: ${id} was found.`, status: 404 }

    return {
        matchedItemIndex,
        matchedItem: items[matchedItemIndex]
    }
}