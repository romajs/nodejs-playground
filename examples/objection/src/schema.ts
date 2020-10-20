import Company from "./models/Company";
import Invoice from "./models/Invoice";
import Portfolio from "./models/Portfolio";

const { builder: graphQlBuilder } = require('objection-graphql');

export const buildSchema = () => graphQlBuilder()
  .model(Company, { fieldName: 'company', listFieldName: 'companies' })
  .model(Invoice, { fieldName: 'invoice', listFieldName: 'invoices' })
  .model(Portfolio, { fieldName: 'portfolio', listFieldName: 'portfolios' })
  .build();
