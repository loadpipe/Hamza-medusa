import { BaseResource, ResponsePromise } from "@medusajs/medusa-js"
import { User } from "../models/user"
declare class AdminPostAuthReq {
  wallet_address: string
}
export type AdminBearerAuthRes = {
  access_token: string
}

export type AdminAuthRes = {
  user: Omit<User, "wallet_address">
}
declare class AdminAuthResourceCustom extends BaseResource {
  /**
   * Get the currently logged in user's details. Can also be used to check if there is an authenticated user.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminAuthRes>} Resolves to the logged-in user's details.
   *
   * @example
   * import Medusa from "@medusajs/medusa-js"
   * const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in or use api token
   * medusa.admin.auth.getSession()
   * .then(({ user }) => {
   *   console.log(user.id);
   * })
   */
  getSession(customHeaders?: Record<string, any>): ResponsePromise<AdminAuthRes>
  /**
   * Log out the user and remove their authentication session. This will only work if you're using Cookie session for authentication. If the API token is still passed in the header,
   * the user is still authorized to perform admin functionalities in other API Routes.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<void>} Resolves when user is logged out successfully.
   *
   * @example
   * import Medusa from "@medusajs/medusa-js"
   * const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
   * // must be previously logged in
   * medusa.admin.auth.deleteSession()
   */
  deleteSession(customHeaders?: Record<string, any>): ResponsePromise<void>
  /**
   * Log a User in using their credentials. If the user is authenticated successfully, the cookie is automatically attached to subsequent requests sent with the JS Client.
   * @param {AdminPostAuthReq} payload - The credentials of the user.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminAuthRes>} Resolves to the user's details.
   *
   * @example
   * import Medusa from "@medusajs/medusa-js"
   * const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
   * medusa.admin.AdminAuthResource.createSession({
   *   email: "user@example.com",
   *   password: "supersecret"
   * })
   * .then(({ user }) => {
   *   console.log(user.id);
   * })
   */
  createSession(
    payload: AdminPostAuthReq,
    customHeaders?: Record<string, any>
  ): ResponsePromise<AdminAuthRes>
  /**
   * Authenticate the user and retrieve a JWT token to use for subsequent authenticated requests.
   * @param {AdminPostAuthReq} payload - The credentials of the user.
   * @param {Record<string, any>} customHeaders - Custom headers to attach to the request.
   * @returns {ResponsePromise<AdminBearerAuthRes>} Resolves to the access token of the user, if they're authenticated successfully.
   *
   * @example
   * import Medusa from "@medusajs/medusa-js"
   * const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
   * medusa.admin.auth.getToken({
   *   email: 'user@example.com',
   *   password: 'supersecret'
   * })
   * .then(({ access_token }) => {
   *   console.log(access_token);
   * })
   */
  getToken(
    payload: AdminPostAuthReq,
    customHeaders?: Record<string, any>
  ): ResponsePromise<AdminBearerAuthRes>
}
