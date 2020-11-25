export const API_KEY = '2df2b568cdcb4671aa6125543202511';

export async function responseToJson(response: Response) {
    const json = await response.json();
    if (response.ok) {
        return json;
    }
    return Promise.reject({ ...json.error });
}
