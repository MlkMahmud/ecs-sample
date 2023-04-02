import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import path from 'path';

class ApplicationStack extends cdk.Stack {
  constructor (scope: cdk.App, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });

    const cluster = new ecs.Cluster(this, 'EcsCluster', { vpc });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'FargateTaskDefinition', {
      cpu: 512,
      memoryLimitMiB: 1024
    });

    taskDefinition.addContainer('WebContainer', {
      image: ecs.ContainerImage.fromAsset(path.join(__dirname, '..')),
      logging: ecs.LogDriver.awsLogs({
        logGroup: new cdk.aws_logs.LogGroup(this, 'LogGroup', {
          logGroupName: '/aws/ecs/web',
          removalPolicy: cdk.RemovalPolicy.DESTROY,
          retention: cdk.aws_logs.RetentionDays.ONE_DAY
        }),
        streamPrefix: 'my-logs'
      }),
      portMappings: [{ containerPort: 8080 }]
    });

    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Fargateservice', {
      cluster,
      desiredCount: 2,
      publicLoadBalancer: true,
      taskDefinition
    });
  }
}

const app = new cdk.App();
new ApplicationStack(app, 'ApplicationStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
