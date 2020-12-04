// Check if object is empty
function isEmptyObject(obj: Record<string, unknown>): boolean {
  if (!obj) {
    return false;
  }
  return Object.keys(obj).length === 0;
}

export default isEmptyObject;
