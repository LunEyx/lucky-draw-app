import { APIGatewayProxyResult } from 'aws-lambda'

export const getInventoryHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify([
        {
          name: '消しゴム（喫茶すみっコでチョコレートフェア・A）',
          image: 'https://shop.san-x.co.jp/img2/SMG/SMG7528_L.jpg',
        },
        {
          name: 'ぷちっとキーホルダー（喫茶すみっコでチョコレートフェア・B）',
          image: 'https://shop.san-x.co.jp/img2/SMG/SMG7535_L.jpg',
        },
      ]),
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
