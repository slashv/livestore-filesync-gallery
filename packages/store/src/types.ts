import type { tables } from './schema'

// Image type derived from the table schema
export type Image = typeof tables.images.rowSchema.Type
