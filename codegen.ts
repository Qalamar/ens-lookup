import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
    documents: ['utils/**/*.ts'],
    generates: {
        './types/queries/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            }
        }
    },
    ignoreNoDocuments: true,
};

export default config;