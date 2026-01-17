import { queryDb } from '@livestore/livestore'
import { tables } from '@repo/schema'

// Image type derived from the table schema
export type Image = typeof tables.images.rowSchema.Type

// Query non-deleted images
export const imagesQuery = queryDb(tables.images.where({ deletedAt: null }), { label: 'images' })
