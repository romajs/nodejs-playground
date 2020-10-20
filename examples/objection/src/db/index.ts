import Knex = require('knex');

import { Model } from 'objection'
import dbSettings from '../../knexfile'

export const knex: Knex = Knex(dbSettings);

Model.knex(knex);
