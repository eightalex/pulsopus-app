const createPathElement = (pathData: string): SVGPathElement => {
    const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tempPath.setAttribute("d", pathData);
    return tempPath;
};

export const getPointsFromPath = (path: string): { x: number, y: number; }[] => {
    const p = createPathElement(path);
    const length = p.getTotalLength();
    return [...Array(length).keys()].reduce((acc, key) => {
        if(key % 5 !== 0) return acc;
        const point = p.getPointAtLength(key);
        return [...acc, { x: point.x, y: point.y }];
    }, [] as { x: number, y: number; }[]);
};