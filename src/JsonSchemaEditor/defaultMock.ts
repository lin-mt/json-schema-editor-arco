//默认的mock数据
export const defaultSchemaMock = {
  type: 'object',
  properties: {
    field: {
      title: '默认标题',
      type: 'object',
      properties: {
        name: {
          title: '',
          type: 'string',
        },
      },
    },
    col: {
      title: '默认标题',
      type: 'object',
      properties: {
        age: {
          title: '',
          type: 'string',
          description: '默认描述',
        },
      },
    },
  },
};
