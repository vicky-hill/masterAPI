import { createClient, RedisClientType } from 'redis';
import { REDIS } from './constants';

const client: RedisClientType = createClient({
    url: "redis://default:uQ9W5y3lfgOph0pa6JTqbkxR88YXXqNg@redis-14878.c11.us-east-1-3.ec2.redns.redis-cloud.com:14878",
    socket: {
      reconnectStrategy: (retries) => {
        console.log('Redis reconnect attempt:', retries);
        return Math.min(retries * 50, 1000);
      }
    }
  });

client.on('error', err => console.log('Redis Client Error', err));

export async function connectClient(): Promise<void> {
    if (!client.isOpen) {
        await client.connect().catch(err => {
            console.error('Redis connection error:', err);
        });
    }
}

client.on("error", (err: Error) => {
    console.error("Redis Error:", err);
});

client.on("connect", () => {
    console.log("Redis connected successfully");
});

client.on("ready", () => {
    console.log("Redis client ready");
});

async function pullFromCache(key: string): Promise<any> {
    if (!REDIS) return;

    try {
        await connectClient();
        const reply = await client.get(key);
        return reply ? JSON.parse(reply) : null;
    } catch (err) {
        console.error('Error pulling from cache:', err);
        return null;
    }
}

export async function getValue(key: string): Promise<any> {
    if (!REDIS) return;

    try {
        await connectClient();
        const res = await pullFromCache(key);
        return res;
    } catch (err) {
        console.error('Error getting value:', err);
        return undefined;
    }
}

export async function setValue(key: string, value: any): Promise<void> {
    if (!REDIS) return;

    try {
        await connectClient();
        const stringifiedValue = JSON.stringify(value)

        console.log('value', stringifiedValue)
        await client.set(key, stringifiedValue);
    } catch (err) {
        console.error("Error setting value:", err);
    }
}

export async function deleteValue(key: string): Promise<void> {
    if (!REDIS) return;

    try {
        await connectClient();
        await client.del(key);
    } catch (err) {
        console.error("Error deleting value:", err);
    }
}

export async function flushAll(): Promise<void> {
    if (!REDIS) return ;

    try {
        await connectClient();
        await client.flushAll();
    } catch (err) {
        console.error("Error flushing all:", err);
    }
}

export async function updateValue(key: string, newValue: any): Promise<void> {
    if (!REDIS) return;

    await connectClient();
    await setValue(key, JSON.stringify(newValue));
}

export default client;