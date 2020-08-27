---
layout: post
title:  "Automating ETL with AWS Lambda"
subtitle : Package and deploy a serverless ETL pipeline using AWS Lambda
author: Ashwin
categories: [ AWS, tutorial ]
image: assets/images/AWS_ETL/hasan-almasi-SpCrTUG2nu8-unsplash.jpg
tags: [sticky]
---
The world around us is changing faster than ever before. The amount of data we produce every day is truly mind-boggling. There are 2.5 quintillion bytes of data created each day, which means the data we use today might not be relevant tomorrow. So, we need a way to completely automate our data flow process, the good news is you don't need to worry about having fancy servers and expensive hardware to do so, AWS lets you do this with the added advantage of high performance and scalability.
In this post, we will only be using AWS free tier offerings. So you can follow along. Before we jump into the process we need to understand the 3 AWS services we are going to use EC2, AWS Lambda, and Cloudwatch.
## EC2
Amazon Elastic Compute Cloud (EC2) is a service that lets you rent virtual machines. We can launch a Virtual machine with any configuration we want(Operating system, Storage,etc.) for any amount of time we want.
## Lambda
AWS Lambda is a serverless computing service that runs us code in response to events and automatically manages the underlying computing resources for us. We can use AWS Lambda to extend other AWS services with custom logic or create our back-end services. AWS Lambda can automatically run code in response to multiple events, such as HTTP requests via Amazon API Gateway, modifications to objects in Amazon S3 buckets, table updates in Amazon DynamoDB. In our case, it will run the code according to schedule.
## Cloudwatch
As the word suggests, CloudWatch collects monitoring and operational data in the form of logs, metrics, and events, providing us with a unified view of AWS resources, applications, and services that run on AWS and on-premises servers. We can use CloudWatch to detect anomalous behavior in our environments, set alarms, visualize logs and metrics side by side, take automated actions, troubleshoot issues, and discover insights to keep our applications running smoothly.
##### <center>* * *</center>
AWS Lambda is the platform where we do the programming to perform ETL, but AWS lambda doesn't include most packages/Libraries which are used on a daily basis (Pandas, Requests) and the standard pip install pandas won't work inside AWS lambda. So there is a need to install packages/libraries locally or on an EC2 virtual machine, upload it as a zip file to S3, and attach it as a layer to Lambda function.

Here is an illustration of the workflow I’m talking about,
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/aws-lambda-workflow.png)
## Create and launch an EC2 Linux instance with an S3 access role
Log into the AWS console. Under services, select EC2 then Launch Instance:
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/1.png)
Step 1: Select the operating system for our EC2 instance, I selected Ubuntu Server 18.04 LTS (HVM), But you can select Amazon Linux 2 AMI (HVM) or any other environment you are comfortable with.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/2.png)
Step 2: Choose an instance type, select the t2.micro(Its Included in the free tier, we get up to 750 hours of micro instances each month).

Step 3: Configure instance details, leave everything else to its default except for the IAM role. Create a new role with S3 access. Select “Create new IAM role”.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/3.jpeg)
We will be redirected to “IAM Roles” page where we can select create a role, followed by EC2
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/4.jpeg)
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/5.png)
Attach the “AmazonS3FullAccess” policy to read and write to S3 buckets and give a name to the role. Hit create a role.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/6.jpeg)
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/7.jpeg)
Head back to the Launch instance page and hit refresh next to the “IAM role”, select the role we just created, and hit review and launch. We can also set storage, tags, and configure security groups if needed, but for now, the defaults are good.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/8.png)
We will be moved to Step 7: Review instance launch - hit launch. We will be prompted to create or select a key pair. Select create a new pair and give it a name, download the key pair, and hit launch instance.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/9.png)
Once our instance is created select view instance. Then select the Instance we just created and hit connect.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/10.png)
Copy the “Example” code and go the command prompt on your computer to connect to the instance.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/11.png)
Paste the ssh command as shown in the example, change the path of the key(my_key.pem), and hit enter. Once we are connected to our command prompt it should look something like this.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/12.png)
## Install all dependencies(Libraries) we need in the virtual environment, package the dependencies in a zip file and export it to S3
<script src="https://gist.github.com/mashwinmuthiah/17fe55953d014d80e687cd4c8b370cd9.js"></script>
Follow the above code and we have successfully exported our packaged zip file to an S3 bucket.
## Create and Adding Lambda Layers
Select Services on the top left corner of the AWS console and navigate to AWS lambda and then to Layers. Select Create Layer.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/13.png)

Copy the object URL of the zip file we uploaded to the S3 bucket and paste it on to the “Amazon S3 link URL” text box. Hit create.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/14.png)

![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/15.png)

Select add a layer and select the layers we created and the version. Hit add.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/16.png)

![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/17.png)

## Creating a Lambda Function

On the AWS lambda console, select functions, and hit create functions. Give the function a name and choose the language to use to write the function. Hit create.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/18.png)

![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/19.png)

Update your Lambda function to extract, transform, and load the data. Here I’m reading a CSV file using pandas and storing it in an S3 bucket. This is the place where we can perform transformations and decide where we are going to load the data, in our case its an S3 bucket.

<script src="https://gist.github.com/mashwinmuthiah/5333a06a4bdd2d009be7670a55ee329b.js"></script>
Select test, enter a name for the test event and leave the rest to default. Hit save. Hit test again and the code performs our ETL process.

![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/20.png)
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/21.png)
## One Final Step: Schedule your ETL process
Select Services on the top left corner of the AWS console and navigate to CloudWatch followed by event and then to rules. Select create a rule.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/23.png)
Step 1: Select schedule followed by Cron expression, enter the Cron expression (4 * * ? * *)to run the Lambda function every day at 4:00 GMT.
Learn more about Cron's expressions [here][cron-docs].

Step 2: Enter the name and description. Select create a rule.
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/24.png)
![Workflow]({{ site.baseurl }}/assets/images/AWS_ETL/25.png)
Congratulations 👏 !! Our ETL process is automated and will be updated every 24 hours at exactly 4:00GMT.

PS: Make sure to terminate EC2 along with any Elastic Block Store (EBS) so that you don't go beyond free tier usage.

Good luck with your serverless journey! I hope this post is helpful, and feel free to reach out if you may have any questions.

[cron-docs]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#CronExpressions