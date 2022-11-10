export function stringToColour (str: string): { red: number, green: number, blue: number } {
    const hash = [...str].reduce((hash, char) => char.charCodeAt(0) + (hash << 5) - hash, 0);
    const hashToColor = (i: number) => (hash >> (i * 8)) & 0xFF;
    return {
        red: hashToColor(0),
        green: hashToColor(1),
        blue: hashToColor(2)
    };
}