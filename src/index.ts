import {
  ContainerGroup,
  ContainerInstanceManagementClient,
} from "@azure/arm-containerinstance";
import * as dotenv from "dotenv";

dotenv.config();

const clientId = process.env["CLIENT_ID"] || "";
const secret = process.env["CLIENT_SECRET"] || "";
const tenantId = process.env["TENANT_ID"] || "";
const domain = process.env["DOMAIN"] || "";
const subscriptionId = process.env["SUBSCRIPTION_ID"] || "";
const resourceGroup = process.env["RESOURCE_GROUP"] || "";
const containerName = 'test-container'

import { ClientSecretCredential } from "@azure/identity";
const credentials = new ClientSecretCredential(tenantId, clientId, secret);

const client = new ContainerInstanceManagementClient(credentials, subscriptionId);
const containerGroup: ContainerGroup = {
  osType: 'Linux',
  containers: [
    {
      name: "test-container",
      command: [],
      environmentVariables: [],
      image: "python:3.11",
      resources: {
        requests: {
          cpu: 1,
          memoryInGB: 1.5
        },
      },
      ports: [
        {
          port: 80,
          protocol: "TCP"
        }
      ],
    }
  ],
  location: "Japan East",
  ipAddress: {
    type: 'Public',
    ports: [{ protocol: 'Tcp', port: 80 }]
  }
};

client.containerGroups.beginCreateOrUpdate(resourceGroup, containerName, containerGroup);