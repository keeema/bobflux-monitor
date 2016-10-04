export function allToString(obj?: Object[] | Date | Object | string): string {
    if (obj === null)
        return 'null';

    if (obj === undefined)
        return 'undefined';

    if (Array.isArray(obj))
        return `[${(<Object[]>obj).map(item => allToString(item))}]`;

    if (obj instanceof Date) {
        return `new Date(${(<Date>obj).getTime()})`;
    }

    if (typeof obj === 'object') {
        return `{ ${Object.keys(obj).map(key => `${key}: ${allToString((<{ [key: string]: string }>obj)[key])}`).join(', ')} }`;
    }

    if (typeof obj === 'string')
        return `'${obj}'`;

    return (<{ toString: Function }>obj).toString();
}