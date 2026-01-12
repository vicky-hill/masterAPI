import { createClient, RedisClientType } from 'redis'
import { REDIS } from './constants'

type CacheType = 'project:projectId' | 'feature:featureId' | 'features:projectId' | 'req:reqId' | 'team:members:teamId'
type CacheValue = { projectId?: number, featureId?: number, reqId?: number, teamId?: number }

const client: RedisClientType = createClient({
    url: "redis://redis-16514.c331.us-west1-1.gce.redns.redis-cloud.com:16514",
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

const getCacheKey = (cacheType: CacheType, { id, value }: { id?: number | string, value?: CacheValue }) => {
    if (!id && !value) return null;

    if (cacheType === 'feature:featureId') return value ? `feature:${value.featureId}` : `feature:${id}`;
    if (cacheType === 'features:projectId') return value ? `features:projectId:${value.projectId}` : `feature:${id}`;
    if (cacheType === 'project:projectId') return value ? `project:${value.projectId}` : `project:${id}`;
    if (cacheType === 'req:reqId') return value ? `req:${value.reqId}` : `project:${id}`;
    if (cacheType === 'team:members:teamId') return value ? `team:members:${value.teamId}` : `team:members:${id}`;

}

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

export async function getValue(cacheType: CacheType, id: string | number): Promise<any> {
    if (!REDIS) return;

    const key = getCacheKey(cacheType, { id });
    if (!key) return;

    await connectClient();
    const res = await pullFromCache(key);
    return res;
}

export async function setValue(cacheType: CacheType, value: CacheValue): Promise<void> {
    if (!REDIS) return;

    const key = getCacheKey(cacheType, { value });
    if (!key) return;

    await connectClient();
    const stringifiedValue = JSON.stringify(value)

    await client.set(key, stringifiedValue);
}

export async function updateValue(cacheType: CacheType, value: CacheValue): Promise<void> {
    if (!REDIS) return;

    const key = getCacheKey(cacheType, { value });
    if (!key) return;

    await connectClient();
    await setValue(cacheType, value);
}

export async function deleteValue(cacheType: CacheType, id: string | number): Promise<void> {
    if (!REDIS) return;

    const key = getCacheKey(cacheType, { id });
    if (!key) return;

    await connectClient();
    await client.del(key);
}



export async function flushAll(): Promise<void> {
    if (!REDIS) return;

    try {
        await connectClient();
        await client.flushAll();
    } catch (err) {
        console.error("Error flushing all:", err);
    }
}

export default client;