const ERROR_MESSAGES: Record<number, string> = {
    400: "リクエストが不正です。",
    404: "対象のデータが見つかりませんでした。",
    500: "サーバーエラーが発生しました。",
};

export async function apiFetch(
    url: string,
    options?: RequestInit,
): Promise<Response> {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(
            ERROR_MESSAGES[response.status] ?? "予期しないエラーが発生しました。",
        );
    }
    return response;
}
