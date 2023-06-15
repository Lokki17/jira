import {config} from "./config/app.config.js";
import * as fs from 'fs'
import * as fs_promises from 'fs/promises'

export const exportData = (result) => {
		const stringToExport = JSON.stringify(result, undefined, 4)
		exportToConsole(stringToExport)
		exportToFile(stringToExport)
}

const exportToFile = (data) => {
		if(config.fileToExport) {
				if (!fs.existsSync(config.exportDir)) {
						fs.mkdirSync(config.exportDir)
				}

				const filePath = `${config.exportDir}/${config.fileToExport}`;
				fs_promises.writeFile(filePath, data)
		}

}

const exportToConsole = (data) => {
		if(config.consoleExport) {
				console.log(data)
		}
}
