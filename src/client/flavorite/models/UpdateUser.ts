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
import {
  FavoriteFood,
  FavoriteFoodFromJSON,
  FavoriteFoodFromJSONTyped,
  FavoriteFoodToJSON,
  User,
  UserFromJSON,
  UserFromJSONTyped,
  UserToJSON,
} from './'

/**
 *
 * @export
 * @interface UpdateUser
 */
export interface UpdateUser {
  /**
   *
   * @type {string}
   * @memberof UpdateUser
   */
  username?: string
  /**
   *
   * @type {string}
   * @memberof UpdateUser
   */
  firstName?: string
  /**
   *
   * @type {string}
   * @memberof UpdateUser
   */
  lastName?: string
  /**
   *
   * @type {string}
   * @memberof UpdateUser
   */
  email?: string
  /**
   *
   * @type {string}
   * @memberof UpdateUser
   */
  password?: string
  /**
   *
   * @type {Array<FavoriteFood>}
   * @memberof UpdateUser
   */
  favoriteFoods?: Array<FavoriteFood>
  /**
   *
   * @type {Array<User>}
   * @memberof UpdateUser
   */
  friends?: Array<User>
}

export function UpdateUserFromJSON(json: any): UpdateUser {
  return UpdateUserFromJSONTyped(json, false)
}

export function UpdateUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateUser {
  if (json === undefined || json === null) {
    return json
  }
  return {
    username: !exists(json, 'username') ? undefined : json['username'],
    firstName: !exists(json, 'firstName') ? undefined : json['firstName'],
    lastName: !exists(json, 'lastName') ? undefined : json['lastName'],
    email: !exists(json, 'email') ? undefined : json['email'],
    password: !exists(json, 'password') ? undefined : json['password'],
    favoriteFoods: !exists(json, 'favoriteFoods')
      ? undefined
      : (json['favoriteFoods'] as Array<any>).map(FavoriteFoodFromJSON),
    friends: !exists(json, 'friends')
      ? undefined
      : (json['friends'] as Array<any>).map(UserFromJSON),
  }
}

export function UpdateUserToJSON(value?: UpdateUser | null): any {
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
    favoriteFoods:
      value.favoriteFoods === undefined
        ? undefined
        : (value.favoriteFoods as Array<any>).map(FavoriteFoodToJSON),
    friends:
      value.friends === undefined ? undefined : (value.friends as Array<any>).map(UserToJSON),
  }
}
