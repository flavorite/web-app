/* tslint:disable */
/* eslint-disable */
/**
 * Flavorite - OpenAPI 3.0
 * This is a Flavorite Server based on the OpenAPI 3.0 specification.
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime'
/**
 *
 * @export
 * @interface CreateUser
 */
export interface CreateUser {
  /**
   *
   * @type {string}
   * @memberof CreateUser
   */
  username: string
  /**
   *
   * @type {string}
   * @memberof CreateUser
   */
  firstName: string
  /**
   *
   * @type {string}
   * @memberof CreateUser
   */
  lastName: string
  /**
   *
   * @type {string}
   * @memberof CreateUser
   */
  email: string
  /**
   *
   * @type {string}
   * @memberof CreateUser
   */
  password: string
}

export function CreateUserFromJSON(json: any): CreateUser {
  return CreateUserFromJSONTyped(json, false)
}

export function CreateUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateUser {
  if (json === undefined || json === null) {
    return json
  }
  return {
    username: json['username'],
    firstName: json['firstName'],
    lastName: json['lastName'],
    email: json['email'],
    password: json['password'],
  }
}

export function CreateUserToJSON(value?: CreateUser | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    username: value.username,
    firstName: value.firstName,
    lastName: value.lastName,
    email: value.email,
    password: value.password,
  }
}
