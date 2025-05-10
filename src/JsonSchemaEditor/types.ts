import { CSSProperties } from 'react';

export type SchemaEditorProps = {
  /**
   * @description 初始化数据
   * @default {"type": "object", "properties": {"field": {"type": "string"}}}
   */
  value?: JSONSchema | undefined | string;

  /**
   * @description 样式
   */
  style?: CSSProperties;

  /**
   * @description JSONSchema 右侧树结构默认展现方式  true-展开  false-收起   默认为true
   */
  defaultExpand: boolean | undefined;

  /**
   * @description JsonSchema 变更的回调函数
   */
  onSchemaChange?: (schema: JSONSchema) => void;
  /**
   * @description 点击高级设置的回调
   * @param namePath 点击所在的 JsonSchema 所在的属性路径
   * @param schema 点击的 JsonSchema
   * @param propertyName 属性名称
   */
  handleAdvancedSettingClick?: (
    namePath: number[],
    schema: JSONSchema,
    propertyName?: string,
  ) => boolean;
};

//==================================================================================================
// JSON Schema Draft
//==================================================================================================
// https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
//--------------------------------------------------------------------------------------------------

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export type JSONSchemaTypeName =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null';

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export type JSONSchemaType =
  | string
  | number
  | boolean
  | JSONSchemaObject
  | JSONSchemaArray
  | null;

// Workaround for infinite type recursion
export interface JSONSchemaObject {
  [key: string]: JSONSchemaType;
}

// Workaround for infinite type recursion
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
export type JSONSchemaArray = Array<JSONSchemaType>;

/**
 * Meta schema
 *
 * Recommended values:
 * - 'http://json-schema.org/schema#'
 * - 'http://json-schema.org/hyper-schema#'
 *
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-5
 */
export type JSONSchemaVersion = string;

/**
 * JSON Schema
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
 */
export type JSONSchemaDefinition = JSONSchema | boolean;

export interface JSONSchema {
  $id?: string;
  $ref?: string;
  $schema?: JSONSchemaVersion;
  $comment?: string;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
   */
  type?: JSONSchemaTypeName | JSONSchemaTypeName[];
  enum?: JSONSchemaType[];
  const?: JSONSchemaType;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2
   */
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3
   */
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
   */
  items?: JSONSchemaDefinition | JSONSchemaDefinition[];
  additionalItems?: JSONSchemaDefinition;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  contains?: JSONSchema;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
   */
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  properties?: {
    [key: string]: JSONSchemaDefinition;
  };
  patternProperties?: {
    [key: string]: JSONSchemaDefinition;
  };
  additionalProperties?: JSONSchemaDefinition;
  dependencies?: {
    [key: string]: JSONSchemaDefinition | string[];
  };
  propertyNames?: JSONSchemaDefinition;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
   */
  if?: JSONSchemaDefinition;
  then?: JSONSchemaDefinition;
  else?: JSONSchemaDefinition;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
   */
  allOf?: JSONSchemaDefinition[];
  anyOf?: JSONSchemaDefinition[];
  oneOf?: JSONSchemaDefinition[];
  not?: JSONSchemaDefinition;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
   */
  format?: string;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
   */
  contentMediaType?: string;
  contentEncoding?: string;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-9
   */
  definitions?: {
    [key: string]: JSONSchemaDefinition;
  };

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10
   */
  title?: string;
  description?: string;
  default?: JSONSchemaType;
  readOnly?: boolean;
  writeOnly?: boolean;
  examples?: JSONSchemaType;
}
