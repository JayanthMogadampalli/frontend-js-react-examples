function jsonStringify(value) {

 if(Array.isArray(value)) {
  const arrayValues = value.map((item) => jsonStringify(item));
  return `[${arrayValues.join(',')}]`;
 }

 if(typeof value === 'object' && value !== null) {
   const objectEntries = Object.entries(value).map(([key,val])=> `"${key}":${jsonStringify(val)}`);
   return `{${objectEntries.join(',')}}`; 
 }

 if(typeof value === 'string') {
  return `"${value}"`;
 }

 return String(value);
}