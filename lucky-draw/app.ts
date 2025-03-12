import { PostConfirmationTriggerEvent } from 'aws-lambda'

const tableName = process.env.USER_TABLE_NAME as string

export const postConfirmationHandler = async (
  event: PostConfirmationTriggerEvent
): Promise<PostConfirmationTriggerEvent> => {
  const email = event?.request?.userAttributes?.email

  const params = {
    TableName: tableName,
    Item: {
      email: { S: email },
    },
  }

  return event
}
