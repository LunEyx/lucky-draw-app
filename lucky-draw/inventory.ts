import { APIGatewayProxyResult } from 'aws-lambda'

export const getInventoryHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify([]),
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
