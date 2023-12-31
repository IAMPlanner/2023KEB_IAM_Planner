import json
import boto3

REGION = 'ap-northeast-2'

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('team3-icn-planner-table')

def lambda_handler(event, context):
    try:
        # Extract values from JSON payload
        payload = json.loads(event['body'])
        user_id = payload['ID']
        index = payload['Index']

        # Get the item with the specified index from the DynamoDB table
        response = table.get_item(Key={'ID': user_id, 'Index': index})

        if 'Item' in response:
            # Item found, return the item data as a response
            return {
                'statusCode': 200,
                 'headers': {
                    "Access-Control-Allow-Origin": "*",  # 허용할 출처
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",  # 요청에서 허용할 헤더
                    "Access-Control-Allow-Methods": "GET"  # 허용할 메서드
                },
                'body': json.dumps(response['Item'])
            }
        else:
            # Item not found, return 404 Not Found status
            return {
                'statusCode': 404,
                'body': json.dumps('Event not found.')
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps('Error reading event: ' + str(e))
        }
