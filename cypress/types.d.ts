/// <reference types="cypress" />

interface IDPOptions {
  idp: string;
  podUrl: string;
  webId: string;
  username: string;
  password: string;
  email: string;
}

declare namespace Cypress {
  // add custom Cypress command to the interface Chainable<Subject>
  interface Chainable<Subject> {
    createRandomAccount(): Chainable<IDPOptions>
    login(user: IDPOptions): void
    getAuthenticatedFetch(user: IDPOptions): Chainable<any>
    authenticatedFetch(user: IDPOptions, input: RequestInfo | URL, init: RequestInit): Chainable<any>
    inputFromLabel(label: string): Chainable<JQuery<HTMLElement>>
    givenFolder(user: IDPOptions, url: string): void
    givenTextFile(user: IDPOptions, url: string, body: BodyInit): void
  }
}