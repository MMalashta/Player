
export function serialize(obj, part = "") {
    return Object.keys(obj).map(key => {
        const value = obj[key]
        if (typeof value === 'string' || typeof value === 'number') {
            if (part != "") {
                return `${part}[${encodeURIComponent(key)}]=${encodeURIComponent(value)}`
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            }
        } else if (Array.isArray(value)) {
            if (part != "") {
                return value.map((item, index) => serialize(item, `${part}[${key}][${index}]`)).join('&')
            } else {
                return value.map((item, index) => serialize(item, `${key}[${index}]`)).join('&')
            }
        } else {
            if (part != "") {
                return Object.keys(value).map(key => serialize(value[key], `${part}[${key}]`)).join('&')
            } else {
                return Object.keys(value).map(key => serialize(value[key], `${key}`)).join('&')
            }
        }
    }).join('&')
}