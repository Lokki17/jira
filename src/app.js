import { request } from './request.js';
import { config } from './config/app.config.js';
import * as dotenv from 'dotenv'
import {exportData} from "./export.js";
dotenv.config()

const run = async () => {
		const [components, issues] = await Promise.all([
				request(config.componentsUrl),
				getIssues(config.componentsUrl)
		])

		const normalizedEmptyComponents = {};
		components.forEach(item => {
				if (!item.lead) {
						normalizedEmptyComponents[item.id] = item
				}
		});
		const componentsById = {}

		issues.forEach(issue => {
				(issue?.fields?.components || []).forEach(component => {
						const freeComponent = normalizedEmptyComponents[component.id];
						if (freeComponent) {
								if (!componentsById[component.id]) {
										componentsById[component.id] = [];
								}
								componentsById[component.id].push(issue)
						}
				})
		})

		const result = Object.keys(componentsById).map(id => ({ ...normalizedEmptyComponents[id], countOfIssues: componentsById[id].length }))

		exportData(result)
}

const getIssues = async (startAt = 0, result = [], maxResults = config.pagination.maxResults) => {
		const query = {
				startAt,
				maxResults
		}
		const { issues, total } = await request(config.issuesUrl, query)

		result.push(...issues)
		if (result.length < total) {
				return getIssues(result.length, result)
		}

		return result
}

await run()
	.catch(e => console.log(`An error occurred: ${e}`))
