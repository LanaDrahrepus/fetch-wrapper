const _fetch = window.fetch;

function request(input: RequestInfo, options: RequestInit) {
    const url = (typeof input === 'string') ? input : input.url;
    const req = { url, ...options };

    return _fetch(input, options)
        .then(res => {
            if (res.status / 100 === 4) {
                throw new FetchError('Response status: 4xx Client errors', req, res);
            }
            if (res.status / 100 === 5) {
                throw new FetchError('Response status: 5xx Server errors', req, res);
            }
            return res;
        })
        .catch(e => {
            if (e instanceof FetchError) {
                throw e;
            }
            throw new FetchError(e.message, req, null);
        });
}

class FetchError extends Error {
    public request: RequestInit & { url: string };
    public response: Response | null;

    constructor(message: string, request: RequestInit & { url: string }, response: Response | null) {
        super(message);
        this.request = request;
        this.response = response;
    }
}

export {
    request,
};
