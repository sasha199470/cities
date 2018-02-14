function _binarySearch(value, array) {
    let minIndex = 0,
        maxIndex = array.length - 1,
        currentIndex,
        currentElement;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = array[currentIndex];

        if (currentElement < value) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > value) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
    return -1;
}