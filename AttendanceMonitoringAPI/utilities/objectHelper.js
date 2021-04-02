class ObjectHelper {
  isEmpty = (obj) => {
    if (obj === undefined || obj === null) return true;
    return Object.keys(obj).length === 0;
  };

  asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };
}

module.exports = new ObjectHelper();
