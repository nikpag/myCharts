import csvToJSON from "@/utils/csvToJSON";
import Papa from "papaparse";

// Using the csvToJSON() function allows any change to the CSV templates to propagate to the JSON descriptions,
// essentially providing a source-of-truth for all the application's chart examples, complying with the
// DRY principle
const chartTemplates = {
	line: `(Insert title for line chart here)
,2022,2023
January,2,4
February,3,9
March,4,16
April,5,25
May,6,36`,

	multi: `(Insert title for multi axis line chart here)
,2022,left,2023,right
January,2,,4
February,3,,9
March,4,,16
April,5,,25
May,6,,36`,

	radar: `(Insert title for radar chart here)
,2022,2023
January,0,3
February,2,1
March,2,1
April,2,1
May,2,1`,

	scatter: `(Insert title for scatter chart here)
,2022,,2023
January,2,2,2,6
February,3,3,3,9
March,4,4,4,12
April,5,5,5,15
May,6,6,6,18`,

	bubble: `(Insert title for bubble chart here)
,2022,,,2023
January,2,2,2,2,6,6
February,3,3,3,3,9,9
March,4,4,4,4,12,12
April,5,5,5,5,15,15
May,6,6,6,6,18,18`,

	polar: `(Insert title for polar area chart here)
,2022,2023
January,2,4
February,3,6
March,4,8
April,5,10
May,6,12`,
};

const chartDemoData = {};

for (const type in chartTemplates) {
	chartDemoData[type] = csvToJSON(Papa.parse(chartTemplates[type]).data, type);
}

export { chartTemplates, chartDemoData };
