export function moveUp(array: any[], index: number) {

    const newList = [...array];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    return newList;

}

export function moveDown(array: any, index: number) {
    const newList = [...array];
    [newList[index], newList[index + 1]] =
        [newList[index + 1], newList[index]];
    return newList;

}
