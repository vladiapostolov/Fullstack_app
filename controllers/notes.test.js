import { test, describe, after } from 'node:test'
import assert from 'node:assert/strict'
import supertest from 'supertest'
import mongoose from 'mongoose'
import { app } from '../app.js'
import { contain } from 'supertest/lib/cookies.js'

const api = supertest(app)

describe("GET REQUEST NOTES", () => {
    test("GET REQUEST", async () => {
        const response = await api.get('/api/notes')

        assert.strictEqual(response.status, 200)
        assert.ok(Array.isArray(response.body));
        assert.strictEqual();
    })
})

after(async () => {
    await mongoose.connection.close()
})