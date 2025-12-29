/**
 * Quick test script to check if GraphQL API is working
 * Run with: npx ts-node test-api.ts
 * Or compile first: npx tsc test-api.ts && node test-api.js
 */

import { GraphQLClient } from 'graphql-request';
import awsconfig from './aws-exports';
import { ZellerCustomerConnection } from './src/types';

const LIST_ZELLER_CUSTOMERS = `
  query ListZellerCustomers($filter: TableZellerCustomerFilterInput, $limit: Int, $nextToken: String) {
    listZellerCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        role
      }
      nextToken
    }
  }
`;

async function testAPI(): Promise<void> {
  const client = new GraphQLClient(awsconfig.aws_appsync_graphqlEndpoint, {
    headers: {
      'x-api-key': awsconfig.aws_appsync_apiKey,
    },
  });

  try {
    console.log('Testing GraphQL API...');
    console.log('Endpoint:', awsconfig.aws_appsync_graphqlEndpoint);
    
    const data = await client.request<{ listZellerCustomers: ZellerCustomerConnection }>(LIST_ZELLER_CUSTOMERS);
    
    const customers = data.listZellerCustomers.items || [];
    console.log('\n✅ SUCCESS!');
    console.log('Fetched', customers.length, 'customers:');
    console.log(JSON.stringify(customers, null, 2));
  } catch (error) {
    console.error('\n❌ ERROR:');
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Check if error has response property (graphql-request specific)
      if ('response' in error && error.response) {
        console.error('Response:', error.response);
      }
    } else {
      console.error('Unknown error:', error);
    }
  }
}

// Run the test
testAPI().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

