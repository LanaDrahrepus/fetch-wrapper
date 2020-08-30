import { request } from './fetch';

function post(url: string, body: any, options: RequestInit & { json?: boolean }) {
    options.method = 'POST';
    if (options.json != false) {
        options.body = JSON.stringify(body, null, 2);
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };
        return request(url, options);
    }
    options.body = body as any;
    return request(url, options);
}

function put(url: string, body: BodyInit | { [key: string]: any }, options: RequestInit & { json?: boolean }) {
    options.method = 'PUT';
    if (options.json != false) {
        options.body = JSON.stringify(body, null, 2);
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };
        return request(url, options);
    }
    options.body = body as any;
    return request(url, options);
}


function get(url: string, body: any, options: RequestInit) {
    options.method = 'GET';
    return request(url, options);
}

function del(url: string, body: any, options: RequestInit) {
    options.method = 'DELETE';
    return request(url, options);
}

export {
    post,
    put,
    get,
    del,
};
