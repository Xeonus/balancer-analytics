import type { CodegenConfig } from "@graphql-codegen/cli";

const graphKey = process.env.REACT_APP_PERSONAL_GRAPH_KEY;

const blocksSubgraph = "9A6bkprqEG2XsZUYJ5B2XXp6ymz9fNcn4tVPxMWDztYC";
const balancerV2Subgraph =
  "C4ayEZP2yTXRAB8vSaTrgN4m9anTe9Mdm2ViyiAuV9TV";
const gaugesDeployment = "QmNrMRgSeUUkQsvhE6ExBEPETZ6P2jiJL3SzXftNQcAEcW";

function theGraphSchema(subgraphId: string) {
  return {
    [`https://gateway.thegraph.com/api/subgraphs/id/${subgraphId}`]: {
      headers: {
        Authorization: `Bearer ${graphKey}`,
      },
    },
  };
}

function theGraphDeployment(deploymentId: string) {
  return {
    [`https://gateway.thegraph.com/api/deployments/id/${deploymentId}`]: {
      headers: {
        Authorization: `Bearer ${graphKey}`,
      },
    },
  };
}

const config: CodegenConfig = {
  schema: [
    theGraphSchema(blocksSubgraph),
    theGraphSchema(balancerV2Subgraph),
    theGraphDeployment(gaugesDeployment),
    "https://api-v3.balancer.fi/",
  ],
  documents: [
    "src/data/blocks/*.gql",
    "src/data/balancer/*.gql",
    "src/data/balancer-gauges/*.gql",
    "src/data/balancer-api-v3/*.gql",
  ],
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  generates: {
    // Generates a full copy of the remote schema
    "src/apollo/generated/schema.graphql": {
      plugins: ["schema-ast"],
    },

    // Generates fragment metadata needed by apollo cache
    "src/apollo/generated/fragmentMetadata.json": {
      plugins: ["fragment-matcher"],
    },

    // Generates query and mutation documents
    "src/apollo/generated/operations.ts": {
      plugins: ["typescript-document-nodes"],
    },

    // Generates query and mutation documents and types for ethereum-blocks and balancer-v2 subgraphs
    "src/apollo/generated/graphql-codegen-generated.ts": {
      schema: [
        theGraphSchema(blocksSubgraph),
        theGraphSchema(balancerV2Subgraph),
      ],
      documents: [
        "src/data/balancer/*.gql",
        "src/data/blocks/*.gql",
      ],
      plugins: [
        { add: { content: "/* tslint:disable */" } },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "fragment-matcher",
      ],
      config: {
        declarationKind: "interface",
        enumsAsTypes: true,
        nonOptionalTypename: true,
        preResolveTypes: true,
        scalars: {
          BigInt: "string",
          BigDecimal: "string",
          Bytes: "string",
        },
      },
    },

    // Generates query and mutation documents and types for balancer gauges subgraph
    "src/apollo/generated/graphql-gauges-codegen-generated.ts": {
      schema: [
        theGraphDeployment(gaugesDeployment),
      ],
      documents: ["src/data/balancer-gauges/*.gql"],
      plugins: [
        { add: { content: "/* tslint:disable */" } },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "fragment-matcher",
      ],
      config: {
        declarationKind: "interface",
        enumsAsTypes: true,
        nonOptionalTypename: true,
        preResolveTypes: true,
        scalars: {
          BigInt: "string",
          BigDecimal: "string",
          Bytes: "string",
        },
      },
    },

    // Generates query and mutation documents and types for balancer v3 API
    "src/apollo/generated/graphql-balancer-v3-codegen-generated.ts": {
      schema: ["https://api-v3.balancer.fi/"],
      documents: ["src/data/balancer-api-v3/*.gql"],
      plugins: [
        { add: { content: "/* tslint:disable */" } },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "fragment-matcher",
      ],
      config: {
        declarationKind: "interface",
      },
    },
  },
};

export default config;
