const ExampleSchema = {
    type: ['number', 'string', 'object'],
    properties: {
        value: { type: 'string' },
        summary: { type: 'string' },
    },
    additionalProperties: true
}

const ParamSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        required: { type: 'array', items: { type: 'string' } },
        allowEmptyValue: { type: 'boolean' },
        allowReserved: { type: 'boolean' },
        deprecated: { type: 'boolean' },
        style: { type: 'string' },
        explode: { type: 'boolean' },
        schema: { type: 'object' }, // need further validation, this is a schema itself?
        example: ExampleSchema,
        examples: {
            type: 'object',
            patternProperties: {
                "^.*$": ExampleSchema
            }
        },
        content: {
            type: 'object',
            patternProperties: {
                // extend further ? or need generic schema... schema
                "^.*/.*$": { type: 'object' }
            }
        },
    }
}

export default {
    type: 'object',
    properties: {
        documentation: {
            type: 'object',
            properties: {
                operationId: { type: 'string' },
                summary: { type: 'string' },
                description: { type: 'string' },
                tags: { type: 'array' },
                deprecated: { type: 'boolean' },
                // generated
                // requestBody
                requestModels: {
                    type: 'object',
                    patternProperties: {
                        "^.*/.*$": { type: 'string' }
                    }
                },
                // parameters                
                pathParams: {
                    type: 'array',
                    items: ParamSchema
                },
                queryParams: {
                    type: 'array',
                    items: ParamSchema
                },
                requestHeaders: {
                    type: 'array',
                    items: ParamSchema
                },
                cookieParams: {
                    type: 'array',
                    items: ParamSchema
                },
                // responses
                methodResponses: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            statusCode: { type: 'number' },
                            responseBody: { type: 'object', properties: { description: { type: 'string' } } },
                            responseHeaders: {
                                type: 'array', items: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        description: { type: 'string' },
                                        schema: { type: 'object' } // further validation for schema?
                                    }
                                }
                            },
                            responseModels: {
                                type: 'object',
                                patternProperties: {
                                    "^.*/.*$": { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
