import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)
const userTableName = process.env.USER_TABLE_NAME
const prizeTableName = process.env.PRIZE_TABLE_NAME

export const createPrizeHandler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event?.requestContext?.authorizer?.claims?.sub
    const response = await dynamo.send(
      new GetCommand({
        TableName: userTableName,
        Key: { id },
      }),
    )
    // TODO: check admin role
    console.log(response.Item)

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Bad Request',
        }),
      }
    }

    const body = JSON.parse(event.body)

    const item = {
      id: uuidv4(),
      name: body.name,
      image: body.image,
      count: body.count,
      tier: body.tier,
      drawable: body.drawable,
    }

    await dynamo.send(
      new PutCommand({
        TableName: prizeTableName,
        Item: item,
      }),
    )

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
      }),
    }
  }
}

export const getPrizesHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const response = await dynamo.send(
      new ScanCommand({ TableName: prizeTableName }),
    )
    const items = response.Items

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
      }),
    }
  }
}
