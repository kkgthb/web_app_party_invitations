import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createClient } from "./client";
import { type SupabaseClient } from "@supabase/supabase-js";

// AI maybe for later
// const shouldConnectUser = (client) => {
//     it("should be able to connect to Supabase", async () => {
//         const { data: { user }, error } = await client.auth.getUser();

//         if (error) {
//             // If we get a 401, it means the anon key is valid but no user is logged in
//             // If we get another error, the connection failed
//             console.log('Auth error status:', error.status);
//             console.log('Auth error message:', error.message);
//             expect(error.status).toBe(401);
//         } else {
//             // If we get here, someone is logged in
//             console.log('Authenticated as:', user?.email);
//         }
//     });
// }

// AI maybe for later
// const shouldConnectSession = (client) => {
//         it("should be able to connect via the client", async () => {
//         const { data, error } = await client.auth.getSession();
//         // Either we get a session (if someone is logged in) or we get no error
//         if (!data.session) {
//             expect(error).toBeNull();
//             console.log('No active session - this is expected if no user is logged in');
//         } else {
//             expect(data.session).toBeTruthy();
//             console.log('Active session found:', data.session.user?.email);
//         }
//     });
// }

describe("Supabase client with real URL and key", () => {
    let client: SupabaseClient;

    beforeAll(() => {
        vi.stubEnv('VITE_PUBLIC_SUPABASE_URL', process.env.VITE_PUBLIC_SUPABASE_URL);
        vi.stubEnv('VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY', process.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
    });

    beforeEach(() => {
        client = createClient();
    });

    it("should create the client", async () => {
        expect(client, 'client is defined').toBeDefined()
        expect(typeof client, 'client is object').toBe('object')
        expect(client.auth).toBeDefined();
        expect(typeof client.auth.getSession).toBe('function');
        expect(typeof client.auth.signInWithOtp).toBe('function');
    });

    it("should connect to a valid Supabase instance", async () => {
        // This makes a real HTTP request to the auth settings endpoint
        const response = await fetch(
            `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/auth/v1/settings`,
            {
                headers: {
                    'apikey': import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY
                }
            }
        );
        // A valid Supabase instance will return 200 OK with JSON settings
        expect(response.status, 'response 200').toBe(200);
        const settings = await response.json();
        expect(settings, 'settings has external').toHaveProperty('external');
    });
});


describe("Supabase client with fake URL and key", () => {
    let client: SupabaseClient;

    beforeAll(() => {
        vi.stubEnv('VITE_PUBLIC_SUPABASE_URL', 'https://example.com');
        vi.stubEnv('VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'nonsense_key');
    });

    beforeEach(() => {
        client = createClient();
    });

    it("should create the client", async () => {
        expect(client, 'client is defined').toBeDefined()
        expect(typeof client, 'client is object').toBe('object')
        expect(client.auth).toBeDefined();
        expect(typeof client.auth.getSession).toBe('function');
        expect(typeof client.auth.signInWithOtp).toBe('function');
    });

    it("should fail to connect to Supabase", async () => {
        // This makes a real HTTP request to the auth settings endpoint
        const response = await fetch(
            `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/auth/v1/settings`,
            {
                headers: {
                    'apikey': import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY
                }
            }
        );
        expect(response.status).toBe(404);
    });
});