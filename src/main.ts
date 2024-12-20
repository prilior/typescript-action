import * as core from '@actions/core'

// import { wait } from './wait'
// import { getPullRequestsAssociatedWithCommits } from './get-pr'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */

async function ticketValidation(ticketPrefix: string, validationObj: string) {
  if (validationObj.startsWith(ticketPrefix)) {
    return true
  } else {
    return false
  }
}

export async function run(): Promise<void> {
  try {
    const ticketPrefix: string = core.getInput('ticketPrefix')
    const prTitle: string = core.getInput('prTitle')

    core.debug('ticketPrefix: ' + ticketPrefix)
    core.debug('prTitle: ' + prTitle)

    if (await ticketValidation(ticketPrefix, prTitle)) {
      core.debug('Title starting with the prefix')
      core.setOutput('ticketValidationStatus', true)
    } else {
      core.debug('Title not starting with the prefix')
      core.setOutput('ticketValidationStatus', false)
      throw new Error('Ticket Prefix Missing')
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
