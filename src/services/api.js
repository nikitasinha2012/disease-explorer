// src/services/api.js
import axios from 'axios';
import { lungCarcinomaAssociatedTargets } from '../queries'; // Import the query

const API_URL = 'https://api.platform.opentargets.org/api/v4/graphql'; // Replace with your GraphQL API endpoint

export const fetchData = async () => {
  try {
    const response = await axios.post(API_URL, {
      query: lungCarcinomaAssociatedTargets, // Use the imported query
    });

    return response.data.data;
  } catch (error) {
    console.error('GraphQL request error:', error);
    throw error;
  }
};
