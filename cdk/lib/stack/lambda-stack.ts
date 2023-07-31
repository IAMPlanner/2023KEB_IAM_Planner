import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { SYSTEM_NAME } from "../config/commons";
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
//npm install @aws-cdk/aws-lambda-python-alpha 로 다운 받으세요
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from "path";
import { ManagedPolicy, Role, ServicePrincipal, CompositePrincipal, PolicyDocument, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";

export class PlannerLambdaStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        const lambdaRole = new Role(this, `${SYSTEM_NAME}-lambda-role`, {
            roleName: `planner-lambda-role`,
            assumedBy: new CompositePrincipal(
                new ServicePrincipal('lambda.amazonaws.com'),
            ),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('AmazonCognitoPowerUser')
            ]
        })

        // index.py -> lambda_handler
        /*EXAMPLE
        new PythonFunction(this, `${SYSTEM_NAME}-TEST`, {
            functionName: `TEST`,
            entry: path.join(__dirname, '../../../app/backend'),
            index: 'create_file.py',
            runtime: Runtime.PYTHON_3_10,
            role: lambdaRole,
            environment: {
                'BUCKET_NAME': props.s3Stack!.bucket.bucketName,
            }
        })*/
       
    }
}