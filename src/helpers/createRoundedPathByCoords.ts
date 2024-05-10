import { getPointsFromPath } from "@/helpers/getPointsFromPath.ts";

export const createRoundedPathByCoords = (pathCoords: { x: number, y: number }[]) => {
    const path = [];
    const curveRadius = 3;

    pathCoords = pathCoords.slice();

    for (let i = 0; i < pathCoords.length; i++) {
        const c2Index = ((i + 1) > pathCoords.length - 1) ? (i + 1) % pathCoords.length : i + 1;
        const c3Index = ((i + 2) > pathCoords.length - 1) ? (i + 2) % pathCoords.length : i + 2;

        const c1 = pathCoords[i];
        const c2 = pathCoords[c2Index];
        const c3 = pathCoords[c3Index];

        const c1c2Distance = Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
        const c1c2DistanceRatio = (c1c2Distance - curveRadius) / c1c2Distance;
        const c1c2CurvePoint = [
            ((1 - c1c2DistanceRatio) * c1.x + c1c2DistanceRatio * c2.x).toFixed(1),
            ((1 - c1c2DistanceRatio) * c1.y + c1c2DistanceRatio * c2.y).toFixed(1)
        ];

        const c2c3Distance = Math.sqrt(Math.pow(c2.x - c3.x, 2) + Math.pow(c2.y - c3.y, 2));
        const c2c3DistanceRatio = curveRadius / c2c3Distance;
        const c2c3CurvePoint = [
            ((1 - c2c3DistanceRatio) * c2.x + c2c3DistanceRatio * c3.x).toFixed(1),
            ((1 - c2c3DistanceRatio) * c2.y + c2c3DistanceRatio * c3.y).toFixed(1)
        ];

        if (i === pathCoords.length - 1) {
            path.unshift('M' + c2c3CurvePoint.join(','));
        }

        path.push('L' + c1c2CurvePoint.join(','));
        path.push('Q' + c2.x + ',' + c2.y + ',' + c2c3CurvePoint.join(','));
    }
    path.push('Z');

    return path.join(' ');
};

export const createRoundedPathByString = (pathString: string): string => {
    return createRoundedPathByCoords(getPointsFromPath(pathString));
};