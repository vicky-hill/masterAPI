import data from './data';

const CHAINED_WATT_LIST_RE = /^(?:\d+(?:\.\d+)?w)(?:\/(?:\d+(?:\.\d+)?w))*$/;
const CHAINED_LUMENS_LIST_RE = /^(?:\d+lm)(?:\/\d+lm)+$/;
const MIN_MAX_LUMENS_RANGE_RE = /^min\s+(\d+)\s*lm\s*~\s*max\s+(\d+)\s*lm$/;


export const compileAttributes = (products: any, target: any) => {
    const values: any = new Set<string>();

    if (!target) {
        return [];
    }

    for (const product of products) {
        for (const attr of product.attributes ?? []) {
            if (typeof attr.attribute !== 'string' || attr.attribute.trim() !== target) {
                continue;
            }
            for (const v of attr.all ?? []) {
                if (typeof v === 'string' && v.length > 0) {
                    values.add(v);
                }
            }
            if (typeof attr.min === 'string' && attr.min.length > 0) {
                values.add(attr.min);
            }
            if (typeof attr.max === 'string' && attr.max.length > 0) {
                values.add(attr.max);
            }
        }
    }

    return Array.from(values)
}

export const compileWatts = (values: string[]) => {
    const upAndDownLights = [];

    const remaining: any = [];
    const clean: any = [];

    const mapWatts: any = {
        "2x3w": [3],
        "0-80w": [80],
        "0.2w+0.5w": [0.2, 0.5],
        "1.2w per head": [1.2],
        "1.5w(2)": [1.5],
        "100w-150w": [100, 150],
        "10w//18w/25w": [10, 18, 25],
        "10x10w": [10],
        "12w / 16w / 20w": [12, 16, 20],
        "12w/16w /20w": [12, 16, 20],
        "135w~450w, specify 3 watt stops": [135, 450],
        "150w~500w, specify 3 watt stops": [150, 500],
        "16w-25w": [16, 25],
        "180w~600w, specify 3 watt stops": [180, 600],
        "192w max.": [192],
        "1w per bulb": [1],
        "1w per head": [1],
        "1w(2)": [1],
        "20w max": [20],
        "20w/ 30w/ 40w": [20, 30, 40],
        "225w~750w, specify 3 watt stops": [225, 750],
        "25w each side": [25],
        "288w max.": [288],
        "2x4.5w/2x9w/2x12w/2x15w": [4.5, 9, 12, 15],
        "2x6w": [6],
        "2x6w/2x12w/2x16w/2x20w": [6, 12, 16, 20],
        "3 x 12w": [12],
        "3 x 4w": [4],
        "3.3w per head": [3.3],
        "300w specify 3 watt stops": [300],
        "300w~1000w, specify 3 watt stops": [300, 1000],
        "30w-60w": [30, 60],
        "360w~1200w, specify 3 watt stops": [360, 1200],
        "3w (2)": [3],
        "3w per ft.": [3],
        "3x6.5w gu10 lamp": [5],
        "40w/20w or 60w": [40, 20, 60],
        "5w (included), 7w led max": [5, 7],
        "5x10w": [10],
        "5x15w": [15],
        "60w/80w/100w selectable": [60, 80, 100],
        "60w~200w, specify 3 watt stops": [60, 200],
        "6w/12w/15w/18w (half on each side)": [6, 12, 15, 18],
        "6x6.5w gu10 lamp": [6.5],
        "75w (25w each side)": [75],
        "7w x 3": [7],
        "7w x3": [7],
        "8w max": [8],
        "90w~300w, specify 3 watt stops": [90, 300],
        "9w x 2": [9],
        "9w x2": [9],
        "led cob 2x18w/2x24w/2x30w": [18, 24, 30],
    };

    values
        .map((value) => value.trim().toLocaleLowerCase())
        .forEach((value) => {
            if (value.includes("0k")) return;

            if (value.includes("up") || value.includes("down")) {
                upAndDownLights.push(value);
            }

            else if (!value.includes("w")) {
                clean.push(Number(value));
            }

            else if (
                value.includes("/") &&
                !/\s/.test(value) &&
                (/^[\d./]+w$/.test(value) || CHAINED_WATT_LIST_RE.test(value))
            ) {
                clean.push(...value.split("/").map((v) => v.replace("w", "")));
            }

            else if (/^\d+(?:\.\d+)?w$/.test(value)) {
                clean.push(value.split("w")[0]);
            }

            else if (mapWatts[value]) {
                clean.push(...mapWatts[value]);
            }

            else {
                remaining.push(value);
            }
        });

    const watts = Array.from(clean).map((c: any) => Number(c));

    return [Math.min(...watts), Math.max(...watts)];
}

export const compileLumens = (values: string[]) => {
    const remaining: any = [];
    const clean: any = [];

    const mapLumens: any = {
        "1050-2100llm": [1050, 2100],
        "1050-2100lm": [1050, 2100],
        "1100m/1650lm/2200lm": [1100, 1650, 2200],
        "110lm/w": [110],
        "1125-1200lm": [1125, 1200],
        "12000lm (per industry standards,  lumens are reported without frosted lens)": [12000],
        "1300lm(warm white), 3200lm(cool white)": [1300, 3200],
        "135lm/w": [135],
        "140lm/w": [140],
        "1600lm down light + 400lm uplight": [1600, 400],
        "1900lm (warm white), 4800lm (cool white)": [1900, 4800],
        "2 x 1050lm": [1050],
        "2100-3450lm": [2100, 3450],
        "23250lm (per industry standards,  lumens are reported without frosted lens)": [23250],
        "23250lm (per industry standards, lumens are reported without frosted lens)": [23250],
        "24000lm (per industry standards,  lumens are reported without frosted lens)": [24000],
        "2700lm(warm white), 7300lm(cool white)": [2700, 7300],
        "290~340lm per ft.": [290, 340],
        "2950-6500lm": [2950, 6500],
        "3 x 1050lm": [1050],
        "3 x 275lm": [275],
        "30000lm (per industry standards,  lumens are reported without frosted lens)":  [30000],
        "3000k": [3000],
        "3150-4600lm": [3150, 4600],
        "3800lm (warm white), 10100lm (cool white)": [3800, 10100],
        "395/220/650lm": [395, 220, 650],
        "3x500lm gu10 lamp": [500],
        "40800lm (per industry standards,  lumens are reported without frosted lens)":  [40800],
        "40800lmv": [40800],
        "4x500lm": [500],
        "54400lm (per industry standards,  lumens are reported without frosted lens)": [54400],
        "550~600lm": [550, 600],
        "550lm/650lm/800lm max": [550, 650, 800],
        "600lm x 3": [600],
        "600lm x3": [600],
        "675-720lm": [675, 720],
        "68000lm (per industry standards,  lumens are reported without frosted lens)": [68000],
        "6x500lm gu10 lamp": [500],
        "700lm (warm white) 1700lm (cool white)": [700, 1700],
        "700lm(warm white), 1700lm(cool white)": [700, 1700],
        "710lm(warm white), 1600lm(cool white)": [700, 1600],
        "750lm/900lm/1100lm max": [750, 900, 1100],
        "75lm per s14 bulb": [75],
        "7750lm (per industry standards,  lumens are reported without frosted lens)": [7750],
        "7800-17000lm": [7800, 17000],
        "80 lm/w": [80],
        "800~850lm": [800, 850],
        "800lm x 2": [800],
        "800lm x2": [800],
        "815/540/1400lm": [815, 540, 1400],
        "8750m/9224lm/9386lm/9420lm": [8750, 9224, 9386, 9420],
        "930lm (warm white) 1300lm (cool white)": [930, 1300],
        "950~1000lm": [950, 1000],
        "950lm/head": [950],
        "max 10500lm": [10500],
        "max 2340lm": [2340],
        "max 4680lm": [4680],
        "max 9800lm": [9800],
        "min 900lm ~ max1069lm": [900, 1069],
    };

    const mapUpDown = [
        "1600LM Down Light + 400LM Uplight",
        "Up: 3000LM Max. Down: 3000LM Max.",
        "Up: 4500LM Max. Down: 4500LM Max.",
        "Up: 6000LM Max. Down: 6000LM Max."
    ];

    values
        .filter((value) => !mapUpDown.includes(value))
        .map((value) =>
            value
                .trim()
                .toLocaleLowerCase()
                .replace("ax.", "ax")
                .replace("in.", "in")
                .replace(/\/ /g, "/")
        )
        .forEach((value) => {
            if (/^\d+lm$/.test(value)) {
                clean.push({
                    values: [Number(value.slice(0, -2))],
                    attribute: value,
                });
            } else if (!/\s/.test(value) && CHAINED_LUMENS_LIST_RE.test(value)) {
                clean.push({
                    values: value
                        .split("/")
                        .map((v) => v.slice(0, -2))
                        .map((v) => Number(v)),
                    attribute: value,
                });
            } else if (/^(\d+)lm\s+max$/.test(value)) {
                clean.push({
                    values: [Number(value.replace(/^(\d+)lm\s+max$/, "$1"))],
                    attribute: value,
                });
            } else if (/^\d+$/.test(value)) {
                clean.push({
                    values: [Number(value)],
                    attribute: value,
                });
            } else if (MIN_MAX_LUMENS_RANGE_RE.test(value)) {
                const m = MIN_MAX_LUMENS_RANGE_RE.exec(value)!;
                clean.push({
                    values: [Number(m[1]), Number(m[2])],
                    attribute: value,
                });
            } else if (mapLumens[value]) {
                clean.push({
                    values: mapLumens[value],
                    attribute: value,
                });
            } else {
                remaining.push(value);
            }
        });

    const allValues = clean.map((c: any) => c.values).flat();
    const allAttributes = clean
        .map((c: any) => c.attribute)
        .flat()
        .sort((a: any, b: any) => a.localeCompare(b));

    return [Math.min(...allValues), Math.max(...allValues)]
};

export const compileVoltage = (values: string[]) => {
    const remaining: any = [];
    const clean: any = [];
    const ac: any = [];
    const dc: any = [];
    const acdc: any = [];
  
    const voltageMapping: any = {
      "12-24v ac/dc": [12, 24],
      "120v ac/dc": [120],
      "12v ac/dc": [12],
      "12v ac/dc (tolerance: 12-18v ac, 10-26v dc)": [12],
      "12v ac/dc (tolerance: 3v ac, 10-26v dc)": [12],
      "12v ac/dc (tolerance: 8-14v ac/dc 7w, 11-14v ac/dc 12w)": [12],
      "12vac/dc": [12],
      "120-277vac 50/60hz": [120, 277],
      "120–277vac": [120, 277],
      "(12v/13v/14v/15v ac)": [12, 13, 14, 15],
      "100-240v ac 50/60hz": [100, 240],
      "100-277v ac 50/60hz": [100, 277],
      "100-277v ac 60/60hz": [100, 277],
      "100-277vac, 50-60hz": [100, 277],
      "100-347vac,50/60hz": [100, 347],
      "100~277vac, 50/60 hz": [100, 277],
      "100~277vac,50/60hz": [100, 277],
      "100v-277v ac": [100, 277],
      "100v-277vac": [100, 277],
      "12-24v ac": [12, 24],
      "120 vac 60hz": [120],
      "120 vac nominal": [120],
      "120-250vac": [120, 250],
      "120-277 v; 50/60hz ac": [120,277],
      "120-277v ac": [120,277],
      "120-277v ac 50/ 60hz": [120,277],
      "120-277v ac 50/60hz": [120,277],
      "120-277v ac 60hz": [120,277],
      "120-277v ac direct": [120,277],
      "120-277v ac, 50/60hz": [120,277],
      "120-277v ac/50~60 hz": [120,277],
      "120-277v; 50/60hz ac": [120,277],
      "120-277vac": [120,277],
      "120-277vac 60hz": [120,277],
      "120-277vac, 50/60hz": [120,277],
      "120-277vac, 60hz": [120,277],
      "120–277v ac, 50/60hz.": [120,277],
      "120–277vac 50/60hz": [120,277],
      "120–277vac, 50/120–277vac, 50/60hz60hz": [120,277, 50,120,277],
      "120–277vac, 50/60hz": [120,277],
      "120~277 vac, 50/60 hz": [120,277],
      "120~277v ac": [120,277],
      "120~277v ac 60hz": [120,277],
      "120~277v ac/50~60 hz": [120,277],
      "120~277v; 60hz ac": [120,277],
      "120~277vac/50~60 hz": [120,277],
      "120v ac": [120],
      "120v ac / 50-60 hz": [120],
      "120v ac 50/60hz": [120],
      "120v ac 50hz": [120],
      "120v ac 60hz": [120],
      "120v ac, 50/60hz": [120],
      "120v ac, 60 hz": [120],
      "120v-277v ac dual voltage operation": [120, 277],
      "120v/277v ac dual voltage operation": [120, 277],
      "120vac": [120],
      "120vac 50/60hz": [120],
      "120vac 60hz": [120],
      "12v ac": [12],
      "200-240vac": [200, 240],
      "277-480v ac 60hz": [277, 480],
      "277v ac": [277],
      "480v ac 60hz": [480],
      "480v ac/50~60 hz": [480],
      "480vac/50~60 hz": [480],
      "ac120v-277v 50/60hz": [120, 277],
      "voltage: 120-277vac 60hz": [120, 277],
      '10-60v dc': [10, 60],
      '10v dc': [10],
      '12-24 vdc': [12, 24],
      '120v dc': [120],
      '120v dc 60hz': [120],
      '12vdc': [12],
      '150v dc': [150],
      '170vdc': [170],
      '175v dc': [175],
      '175vdc': [175],
      '20-300v dc': [20, 30],
      '24vdc (led driver required)': [24],
      '25-48v dc': [25, 48],
      '250v dc': [250],
      '3.6v/6v/9.9v/12 dc': [3.6, 6, 9.9,12],
      '30-400v dc': [30, 400],
      '50-150v dc': [50, 150],
      '6v/12v dc': [6, 12],
      'input voltage: 120-277v, output voltage: 24v dc': [120, 277],
      'voltage: 24vdc (led driver required)': [24],
      '110~240v': [110, 240],
      '120-277v': [120, 277],
      '120-277v / 60hz': [120, 277],
      '120-277v 50/60hz': [120, 277],
      '120/277': [120, 277],
      '120/277v': [120, 277],
      '120v': [120],
      '120v / 60hz': [120],
      '120v, 60hz': [120],
      '120v/277v': [120, 277],
      '120v/60hz': [120],
      '12v': [12],
      '3.6v': [3.6],
      '3.7v': [3.7],
      '347-480v': [347, 480],
      '480v': [480],
      '480v; 50/60hz': [480],
      '6v': [6],
      '9.6v': [9.6],
      'dual 120-277v': [120, 277]
    };
  
    values
      .map((v) => v.trim().toLocaleLowerCase())
      .forEach((value) => {
        if (value.includes("ac/dc")) {
          acdc.push(value);
        } else if (value.includes("ac")) {
          ac.push(value);
        } else if (value.includes("dc")) {
          dc.push(value)
        } else {
          remaining.push(value)
        }
      });
    
    ac.forEach((value: any) => {
      clean.push({
        values: voltageMapping[value],
        mod: 'AC',
        attribute: value
      })
    })
    
     dc.forEach((value: any) => {
      clean.push({
        values: voltageMapping[value],
        mod: 'DC',
        attribute: value
      })
    })
    
     acdc.forEach((value: any) => {
      clean.push({
        values: voltageMapping[value],
        mod: 'AC/DC',
        attribute: value
      })
    })
    
    remaining.forEach((value: any) => {
      clean.push({
        values: voltageMapping[value],
        attribute: value
      })
    })

    if (clean.some((c: any) => clean.mod === 'AC')) {
        const values = clean.map((c: any) => c.values).flat()
        return [Math.min(...values), Math.max(...values), 'AC']
    }

    if (clean.some((c: any) => clean.mod === 'DC')) {
        const values = clean.map((c: any) => c.values).flat()
        return [Math.min(...values), Math.max(...values), 'DC']
    }

    if (clean.some((c: any) => c.mod === 'AC/DC')) {
        const values = clean.map((c: any) => c.values).flat()
        return [Math.min(...values), Math.max(...values), 'AC/DC']
    }

    const cleanValues = clean.map((c: any) => c.values).flat()
    return [Math.min(...cleanValues), Math.max(...cleanValues)]
  };

  export const compileColor = (values: string[]) => {

  }