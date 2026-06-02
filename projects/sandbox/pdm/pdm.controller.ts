import { NextFunction, Request, Response } from 'express';
import data from './data';
import { compileAttributes, compileColor, compileLumens, compileVoltage, compileWatts } from './pdm.utils';


export const getPDM = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result: any = [];
      
        data.forEach(item => {
            const wattsValues: any = compileAttributes([item], 'Watts');
            const wattsCompiled = compileWatts(wattsValues);
            const watts = wattsCompiled[0] !== Infinity ? wattsCompiled : undefined

            const lumenValues: any = compileAttributes([item], 'Lumens');
            const lumensCompiled = compileLumens(lumenValues);
            const lumens = lumensCompiled[0] !== Infinity ? lumensCompiled : undefined
            
            const voltageValues: any = compileAttributes([item], 'Voltage');
            const voltageCompiled: any = compileVoltage(voltageValues)
            const voltage = voltageCompiled[0] !== Infinity ? voltageCompiled : undefined

            const colorValues: any = compileAttributes([item], 'Color Temp');
            const colorCompiled = compileColor(colorValues);
            const color = colorCompiled[0] !== Infinity ? colorCompiled : undefined

            result.push({
                sku: item.sku,
                // watts,
                // lumens,
                // voltage
                colorValues
            })
        })

        res.json(result)
    } catch (err) {
        next(err)
    }
}