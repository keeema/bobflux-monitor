export function allToString(obj): string {
    if (obj === null)
        return 'null';

    if (obj === undefined)
        return 'undefined';

    if (Array.isArray(obj))
        return `[${(<[]>obj).map(item => allToString(item))}]`;
    
    if(obj instanceof Date){
        return `new Date(${(<Date>obj).getTime()})`;
    }
    
    if (typeof obj === 'object') {
        return `{ ${Object.keys(obj).map(key => `${key}: ${allToString(obj[key])}`).join(', ')} }`;
    }

    if (typeof obj === 'string')
        return `'${obj}'`;

    return obj.toString();
}