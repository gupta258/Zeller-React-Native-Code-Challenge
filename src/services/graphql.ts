import { GraphQLClient } from 'graphql-request';
import awsconfig from '../../aws-exports';
import { ZellerCustomerConnection, ZellerCustomer } from '../types';
import { normalizeRole } from '../utils/roleNormalizer';

const client = new GraphQLClient(awsconfig.aws_appsync_graphqlEndpoint, {
  headers: {
    'x-api-key': awsconfig.aws_appsync_apiKey,
  },
});

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

export const fetchZellerCustomers = async (): Promise<ZellerCustomer[]> => {
  try {
    const data = await client.request<{ listZellerCustomers: ZellerCustomerConnection }>(
      LIST_ZELLER_CUSTOMERS
    );
    
    const rawCustomers = data.listZellerCustomers.items || [];
    const customers: ZellerCustomer[] = rawCustomers.map(customer => ({
      ...customer,
      role: normalizeRole(customer.role),
    }));
    
    return customers;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

